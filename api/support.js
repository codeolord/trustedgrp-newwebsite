const {
  compareSecret,
  database,
  ensureSchema,
  getSession,
  handleError,
  ipHash,
  issueSession,
  readBody,
  sameOrigin,
  sendJson,
  sessionCookie,
  validUuid,
} = require('../lib/support');

module.exports = async function handler(req, res) {
  try {
    const action = req.query?.action;
    if (req.method === 'GET' && action === 'session') {
      return getSession(req)
        ? sendJson(res, 200, { authenticated: true })
        : sendJson(res, 401, { error: 'Sign in to open the support inbox.' });
    }

    if (req.method === 'POST' && !sameOrigin(req)) return sendJson(res, 403, { error: 'Request origin is not allowed.' });
    const body = req.method === 'POST' ? readBody(req) : null;

    if (req.method === 'POST' && action === 'login') {
      if (!body || typeof body.password !== 'string') return sendJson(res, 400, { error: 'Enter the staff password.' });
      if (body.password.length > 256) return sendJson(res, 400, { error: 'Password is too long.' });
      if (!process.env.SUPPORT_ADMIN_PASSWORD || process.env.SUPPORT_ADMIN_PASSWORD.length < 16) {
        return sendJson(res, 503, { error: 'Staff login is not configured. Set SUPPORT_ADMIN_PASSWORD in Vercel.' });
      }
      if (!process.env.SUPPORT_SESSION_SECRET || process.env.SUPPORT_SESSION_SECRET.length < 32) {
        return sendJson(res, 503, { error: 'Staff login is not configured. Set SUPPORT_SESSION_SECRET in Vercel.' });
      }

      await ensureSchema();
      const sql = database();
      const addressHash = ipHash(req);
      const attempts = await sql`SELECT count(*)::int AS count FROM support_login_attempts
        WHERE ip_hash = ${addressHash} AND attempted_at > now() - interval '15 minutes'`;
      if (attempts[0].count >= 10) return sendJson(res, 429, { error: 'Too many sign-in attempts. Try again in 15 minutes.' });
      await sql`DELETE FROM support_login_attempts WHERE attempted_at < now() - interval '1 day'`;
      await sql`INSERT INTO support_login_attempts (ip_hash) VALUES (${addressHash})`;
      if (!compareSecret(body.password, process.env.SUPPORT_ADMIN_PASSWORD)) {
        return sendJson(res, 401, { error: 'Incorrect staff password.' });
      }

      await sql`DELETE FROM support_login_attempts WHERE ip_hash = ${addressHash}`;
      res.setHeader('Set-Cookie', sessionCookie(issueSession()));
      return sendJson(res, 200, { authenticated: true });
    }

    if (req.method === 'POST' && action === 'logout') {
      res.setHeader('Set-Cookie', sessionCookie('', 0));
      return sendJson(res, 200, { authenticated: false });
    }

    if (!getSession(req)) return sendJson(res, 401, { error: 'Sign in to open the support inbox.' });
    await ensureSchema();
    const sql = database();

    if (req.method === 'GET' && action === 'conversations') {
      const status = req.query?.status === 'all' ? 'all' : 'open';
      const conversations = status === 'all'
        ? await sql`SELECT c.id, c.visitor_name AS "visitorName", c.visitor_email AS "visitorEmail",
            c.status, c.created_at AS "createdAt", c.last_message_at AS "lastMessageAt",
            m.body AS "lastMessage"
          FROM support_conversations c
          LEFT JOIN LATERAL (SELECT body FROM support_messages WHERE conversation_id = c.id ORDER BY id DESC LIMIT 1) m ON true
          ORDER BY c.last_message_at DESC LIMIT 100`
        : await sql`SELECT c.id, c.visitor_name AS "visitorName", c.visitor_email AS "visitorEmail",
            c.status, c.created_at AS "createdAt", c.last_message_at AS "lastMessageAt",
            m.body AS "lastMessage"
          FROM support_conversations c
          LEFT JOIN LATERAL (SELECT body FROM support_messages WHERE conversation_id = c.id ORDER BY id DESC LIMIT 1) m ON true
          WHERE c.status = 'open'
          ORDER BY c.last_message_at DESC LIMIT 100`;
      return sendJson(res, 200, { conversations });
    }

    if (req.method === 'GET' && action === 'messages') {
      const id = req.query?.conversationId;
      if (!validUuid(id)) return sendJson(res, 400, { error: 'A valid conversation is required.' });
      const messages = await sql`SELECT id, sender, sender_name AS "senderName", body, created_at AS "createdAt"
        FROM support_messages WHERE conversation_id = ${id}
        ORDER BY id DESC LIMIT 200`;
      return sendJson(res, 200, { messages: messages.reverse() });
    }

    if (req.method === 'POST' && action === 'reply') {
      const id = body?.conversationId;
      const message = typeof body?.message === 'string' ? body.message.trim() : '';
      if (!validUuid(id)) return sendJson(res, 400, { error: 'A valid conversation is required.' });
      if (!message || message.length > 5000) return sendJson(res, 400, { error: 'Replies must be between 1 and 5,000 characters.' });
      const conversations = await sql`SELECT id, status FROM support_conversations WHERE id = ${id} LIMIT 1`;
      if (!conversations.length) return sendJson(res, 404, { error: 'Conversation not found.' });
      if (conversations[0].status !== 'open') return sendJson(res, 409, { error: 'Reopen this conversation before replying.' });
      await sql`INSERT INTO support_messages (conversation_id, sender, sender_name, body)
        VALUES (${id}, 'staff', 'Trusted Verifier Support', ${message})`;
      await sql`UPDATE support_conversations SET updated_at = now(), last_message_at = now() WHERE id = ${id}`;
      return sendJson(res, 201, { sent: true });
    }

    if (req.method === 'POST' && action === 'status') {
      const id = body?.conversationId;
      if (!validUuid(id) || !['open', 'closed'].includes(body?.status)) {
        return sendJson(res, 400, { error: 'A valid conversation and status are required.' });
      }
      const conversations = await sql`UPDATE support_conversations
        SET status = ${body.status}, updated_at = now(), last_message_at = now()
        WHERE id = ${id} RETURNING id`;
      if (!conversations.length) return sendJson(res, 404, { error: 'Conversation not found.' });
      return sendJson(res, 200, { status: body.status });
    }

    res.setHeader('Allow', 'GET, POST');
    return sendJson(res, 400, { error: 'Unknown support action.' });
  } catch (error) {
    return handleError(res, error);
  }
};
