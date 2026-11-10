const { randomUUID, randomBytes } = require('crypto');
const {
  database,
  ensureSchema,
  getCookie,
  handleError,
  ipHash,
  readBody,
  sendJson,
  visitorTokenHash,
  visitorCookie,
  validUuid,
} = require('../lib/support');

module.exports = async function handler(req, res) {
  try {
    await ensureSchema();
    const sql = database();

    if (req.method === 'POST') {
      const body = readBody(req);
      if (!body || typeof body.action !== 'string') {
        return sendJson(res, 400, { error: 'A valid action is required.' });
      }

      if (body.action === 'start') {
        const name = typeof body.name === 'string' ? body.name.trim() : '';
        const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
        if (!name || name.length > 120) return sendJson(res, 400, { error: 'Enter your name (up to 120 characters).' });
        if (email && (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
          return sendJson(res, 400, { error: 'Enter a valid email address or leave it blank.' });
        }

        const visitorIpHash = ipHash(req);
        const recentStarts = await sql`SELECT count(*)::int AS count
          FROM support_conversations
          WHERE visitor_ip_hash = ${visitorIpHash}
            AND created_at > now() - interval '1 hour'`;
        if (recentStarts[0].count >= 5) return sendJson(res, 429, { error: 'Too many new chats. Please try again later.' });

        const id = randomUUID();
        const token = randomBytes(32).toString('base64url');
        const tokenHash = visitorTokenHash(token);
        await sql`INSERT INTO support_conversations
          (id, visitor_token_hash, visitor_ip_hash, visitor_name, visitor_email)
          VALUES (${id}, ${tokenHash}, ${visitorIpHash}, ${name}, ${email || null})`;
        await sql`INSERT INTO support_messages (conversation_id, sender, sender_name, body)
          VALUES (${id}, 'visitor', ${name}, 'Started a support conversation.')`;
        res.setHeader('Set-Cookie', visitorCookie(token));
        return sendJson(res, 201, { conversationId: id });
      }

      if (body.action === 'message') {
        const id = body.conversationId;
        const token = getCookie(req, 'visitor_session');
        const message = typeof body.message === 'string' ? body.message.trim() : '';
        if (!validUuid(id) || token.length < 32) return sendJson(res, 400, { error: 'This chat session is invalid. Start a new chat.' });
        if (!message || message.length > 5000) return sendJson(res, 400, { error: 'Messages must be between 1 and 5,000 characters.' });

        const conversations = await sql`SELECT id, visitor_name, status
          FROM support_conversations
          WHERE id = ${id} AND visitor_token_hash = ${visitorTokenHash(token)}
          LIMIT 1`;
        if (!conversations.length) return sendJson(res, 404, { error: 'Chat not found. Start a new conversation.' });
        if (conversations[0].status !== 'open') return sendJson(res, 409, { error: 'This conversation is closed. Start a new chat to contact support.' });

        const recentMessages = await sql`SELECT count(*)::int AS count
          FROM support_messages
          WHERE conversation_id = ${id} AND sender = 'visitor'
            AND created_at > now() - interval '5 minutes'`;
        if (recentMessages[0].count >= 20) return sendJson(res, 429, { error: 'You have sent several messages. Please wait a few minutes.' });

        await sql`INSERT INTO support_messages (conversation_id, sender, sender_name, body)
          VALUES (${id}, 'visitor', ${conversations[0].visitor_name}, ${message})`;
        await sql`UPDATE support_conversations SET updated_at = now(), last_message_at = now() WHERE id = ${id}`;
        return sendJson(res, 201, { sent: true });
      }

      return sendJson(res, 400, { error: 'Unknown chat action.' });
    }

    if (req.method === 'GET') {
      const id = req.query?.conversationId;
      const token = getCookie(req, 'visitor_session');
      if (!validUuid(id) || typeof token !== 'string') return sendJson(res, 400, { error: 'A valid chat session is required.' });
      const conversations = await sql`SELECT id, status
        FROM support_conversations
        WHERE id = ${id} AND visitor_token_hash = ${visitorTokenHash(token)}
        LIMIT 1`;
      if (!conversations.length) return sendJson(res, 404, { error: 'Chat not found. Start a new conversation.' });
      const messages = await sql`SELECT id, sender, sender_name AS "senderName", body, created_at AS "createdAt"
        FROM support_messages WHERE conversation_id = ${id}
        ORDER BY id DESC LIMIT 100`;
      return sendJson(res, 200, { status: conversations[0].status, messages: messages.reverse() });
    }

    res.setHeader('Allow', 'GET, POST');
    return sendJson(res, 405, { error: 'Method not allowed.' });
  } catch (error) {
    return handleError(res, error);
  }
};
