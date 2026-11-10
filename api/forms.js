const { createHmac } = require('crypto');
const { database, handleError, readBody, sendJson } = require('../lib/support');

const ALLOWED_ORIGINS = new Set(['https://trustedgrp.com', 'https://www.trustedgrp.com']);
const CONTACT_TOPICS = new Set(['Sales question', 'Product support', 'Billing', 'Partnerships', 'Press', 'Something else']);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setCors(req, res) {
  const origin = req.headers.origin;
  if (!origin) return true;

  const host = req.headers['x-forwarded-host'] || req.headers.host;
  let sameOrigin = false;
  try {
    sameOrigin = new URL(origin).host === host;
  } catch {
    return false;
  }
  if (!sameOrigin && !ALLOWED_ORIGINS.has(origin)) return false;

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '600');
  res.setHeader('Vary', 'Origin');
  return true;
}

function text(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function validWebsite(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) && Boolean(url.hostname);
  } catch {
    return false;
  }
}

function clientHash(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const address = req.headers['x-real-ip'] || (forwarded && forwarded.split(',')[0].trim()) || req.socket?.remoteAddress || 'unknown';
  return createHmac('sha256', process.env.SUPPORT_SESSION_SECRET || process.env.DATABASE_URL)
    .update(address)
    .digest('hex');
}

function validate(body) {
  const type = body.type;
  const email = text(body.email || body['c-email'] || body['af-email']).toLowerCase();
  if (email.length > 254 || !EMAIL.test(email)) return { error: 'Enter a valid email address.' };

  if (type === 'newsletter') {
    return { type, email, name: null, data: {}, consent: true };
  }

  const name = text(body['c-name'] || body['af-name']);
  if (!name || name.length > 120) return { error: 'Enter your name (up to 120 characters).' };
  if (body.consent !== 'yes') return { error: 'Please accept the consent notice to continue.' };

  if (type === 'contact') {
    const topic = text(body['c-topic']);
    const message = text(body.message);
    if (!CONTACT_TOPICS.has(topic)) return { error: 'Choose a valid message topic.' };
    if (message.length < 10 || message.length > 5000) return { error: 'Write a message between 10 and 5,000 characters.' };
    return { type, email, name, data: { topic, message }, consent: true };
  }

  if (type === 'affiliate') {
    const website = text(body['af-site']);
    const promotionPlan = text(body.promotionPlan);
    if (website.length > 2048 || !validWebsite(website)) return { error: 'Enter a valid website or profile URL.' };
    if (promotionPlan.length < 10 || promotionPlan.length > 2000) return { error: 'Describe how you plan to promote Trusted Verifier in 10 to 2,000 characters.' };
    return { type, email, name, data: { website, promotionPlan }, consent: true };
  }

  return { error: 'Unknown form type.' };
}

module.exports = async function handler(req, res) {
  try {
    if (!setCors(req, res)) return sendJson(res, 403, { error: 'This website is not allowed to submit forms.' });
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST, OPTIONS');
      return sendJson(res, 405, { error: 'Method not allowed.' });
    }

    const body = readBody(req);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return sendJson(res, 400, { error: 'A valid form submission is required.' });
    }
    const submission = validate(body);
    if (submission.error) return sendJson(res, 400, { error: submission.error });

    const sql = database();
    const windowStart = new Date(Math.floor(Date.now() / 3600000) * 3600000);
    const ipHash = clientHash(req);
    await sql`DELETE FROM site_form_rate_limits WHERE window_start < now() - interval '24 hours'`;
    const [limit] = await sql`INSERT INTO site_form_rate_limits (ip_hash, window_start, request_count)
      VALUES (${ipHash}, ${windowStart}, 1)
      ON CONFLICT (ip_hash, window_start)
      DO UPDATE SET request_count = site_form_rate_limits.request_count + 1
      RETURNING request_count`;
    if (limit.request_count > 10) return sendJson(res, 429, { error: 'Too many submissions. Please try again later.' });

    await sql`INSERT INTO site_form_submissions (form_type, name, email, form_data, consent)
      VALUES (${submission.type}, ${submission.name}, ${submission.email}, ${JSON.stringify(submission.data)}::jsonb, ${submission.consent})
      ON CONFLICT (lower(email)) WHERE form_type = 'newsletter' DO NOTHING`;
    return sendJson(res, 201, { submitted: true });
  } catch (error) {
    return handleError(res, error);
  }
};