const { createHash, createHmac, randomBytes, timingSafeEqual } = require('crypto');
const { neon } = require('@neondatabase/serverless');

let sql;
let schemaPromise;

function database() {
  if (!process.env.DATABASE_URL) {
    const error = new Error('Support chat is not configured: DATABASE_URL is missing.');
    error.statusCode = 503;
    throw error;
  }
  sql ||= neon(process.env.DATABASE_URL);
  return sql;
}

async function ensureSchema() {
  const query = database();
  schemaPromise ||= (async () => {
    await query`CREATE TABLE IF NOT EXISTS support_conversations (
      id uuid PRIMARY KEY,
      visitor_token_hash text NOT NULL,
      visitor_ip_hash text NOT NULL,
      visitor_name varchar(120) NOT NULL,
      visitor_email varchar(254),
      status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed')),
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),
      last_message_at timestamptz NOT NULL DEFAULT now()
    )`;
    await query`CREATE TABLE IF NOT EXISTS support_messages (
      id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      conversation_id uuid NOT NULL REFERENCES support_conversations(id) ON DELETE CASCADE,
      sender text NOT NULL CHECK (sender IN ('visitor', 'staff')),
      sender_name varchar(120) NOT NULL,
      body varchar(5000) NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )`;
    await query`CREATE TABLE IF NOT EXISTS support_login_attempts (
      id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      ip_hash text NOT NULL,
      attempted_at timestamptz NOT NULL DEFAULT now()
    )`;
    await query`CREATE INDEX IF NOT EXISTS support_messages_conversation_created_idx
      ON support_messages (conversation_id, created_at)`;
    await query`CREATE INDEX IF NOT EXISTS support_conversations_status_updated_idx
      ON support_conversations (status, last_message_at DESC)`;
    await query`CREATE INDEX IF NOT EXISTS support_login_attempts_ip_time_idx
      ON support_login_attempts (ip_hash, attempted_at DESC)`;
  })();
  try {
    await schemaPromise;
  } catch (error) {
    schemaPromise = undefined;
    throw error;
  }
}

function requireSecrets() {
  if (!process.env.SUPPORT_SESSION_SECRET || process.env.SUPPORT_SESSION_SECRET.length < 32) {
    const error = new Error('Support chat is not configured: SUPPORT_SESSION_SECRET must be at least 32 characters.');
    error.statusCode = 503;
    throw error;
  }
}

function hash(value) {
  return createHash('sha256').update(value).digest('hex');
}

function ipHash(req) {
  requireSecrets();
  const forwarded = req.headers['x-forwarded-for'];
  const ip = req.headers['x-real-ip'] || (forwarded && forwarded.split(',')[0].trim()) || req.socket?.remoteAddress || 'unknown';
  return createHmac('sha256', process.env.SUPPORT_SESSION_SECRET).update(ip).digest('hex');
}

function visitorTokenHash(token) {
  return hash(token);
}

function issueSession() {
  requireSecrets();
  const expiresAt = Math.floor(Date.now() / 1000) + 60 * 60 * 12;
  const payload = `${expiresAt}.${randomBytes(24).toString('base64url')}`;
  const signature = createHmac('sha256', process.env.SUPPORT_SESSION_SECRET).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

function validSession(token) {
  if (!token || !process.env.SUPPORT_SESSION_SECRET) return false;
  const parts = token.split('.');
  if (parts.length !== 3 || !/^\d+$/.test(parts[0])) return false;
  if (Number(parts[0]) < Math.floor(Date.now() / 1000)) return false;
  const expected = createHmac('sha256', process.env.SUPPORT_SESSION_SECRET).update(`${parts[0]}.${parts[1]}`).digest();
  let actual;
  try {
    actual = Buffer.from(parts[2], 'base64url');
  } catch {
    return false;
  }
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function sessionCookie(token, maxAge = 60 * 60 * 12) {
  return `support_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/api/support; Max-Age=${maxAge}`;
}

function visitorCookie(token, maxAge = 60 * 60 * 24 * 30) {
  return `visitor_session=${token}; HttpOnly; Secure; SameSite=Lax; Path=/api/chat; Max-Age=${maxAge}`;
}

function getCookie(req, name) {
  const cookie = req.headers.cookie || '';
  const entry = cookie.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return entry ? entry.slice(name.length + 1) : '';
}

function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return true;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return null;
}

function sendJson(res, status, value) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  return res.status(status).json(value);
}

function handleError(res, error) {
  if (error.statusCode) return sendJson(res, error.statusCode, { error: error.message });
  console.error('Support API error:', error);
  return sendJson(res, 500, { error: 'Support service is temporarily unavailable. Please try again.' });
}

function validUuid(value) {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function compareSecret(received, expected) {
  const a = createHash('sha256').update(received).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}

function getSession(req) {
  const token = getCookie(req, 'support_session');
  return validSession(token);
}

module.exports = {
  compareSecret,
  database,
  ensureSchema,
  getSession,
  getCookie,
  handleError,
  ipHash,
  issueSession,
  readBody,
  sameOrigin,
  sendJson,
  sessionCookie,
  visitorCookie,
  validUuid,
  visitorTokenHash,
};
