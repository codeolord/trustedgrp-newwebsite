const support = {
  path: '/support',
  title: 'Support inbox',
  description: 'Private Trusted Verifier support staff inbox.',
  noIndex: true,
  body: `
<section class="section support-admin" data-support-admin>
  <div class="container">
    <div class="support-page-head">
      <div><span class="eyebrow">Trusted Verifier</span><h1 class="h2">Support inbox</h1><p class="muted">Respond to visitor chats from your team dashboard.</p></div>
      <a class="btn btn--secondary" href="/">View website</a>
    </div>
    <section class="support-login card-flat" data-support-login>
      <h2 class="h4">Staff sign in</h2>
      <p class="muted">This inbox is for authorized support staff.</p>
      <form class="form" data-support-login-form>
        <div class="field"><label for="support-password">Staff password</label><input class="input" id="support-password" name="password" type="password" autocomplete="current-password" required></div>
        <p class="support-error" data-support-login-error role="alert" hidden></p>
        <button class="btn btn--primary" type="submit">Sign in</button>
      </form>
    </section>
    <div class="support-workspace" data-support-workspace hidden>
      <aside class="support-sidebar">
        <div class="support-list-head"><h2 class="h4">Conversations</h2><button class="btn btn--secondary btn--sm" type="button" data-support-logout>Sign out</button></div>
        <label class="sr-only" for="support-filter">Filter conversations</label>
        <select class="select" id="support-filter" data-support-filter><option value="open">Open</option><option value="all">All conversations</option></select>
        <p class="support-error" data-support-list-error role="alert" hidden></p>
        <div class="support-conversation-list" data-support-list aria-live="polite"></div>
      </aside>
      <section class="support-thread" data-support-detail hidden aria-label="Conversation">
        <header class="support-thread-head"><div><span class="eyebrow">Visitor conversation</span><h2 class="h4" data-support-visitor></h2><small class="muted" data-support-email hidden></small></div><button class="btn btn--secondary btn--sm" type="button" data-support-status></button></header>
        <div class="support-thread-messages" data-support-messages role="log" aria-live="polite"></div>
        <p class="support-error" data-support-detail-error role="alert" hidden></p>
        <form class="support-reply" data-support-reply>
          <label class="sr-only" for="support-reply-message">Reply to visitor</label>
          <textarea class="input" id="support-reply-message" name="message" rows="3" maxlength="5000" placeholder="Write a reply…" required></textarea>
          <button class="btn btn--primary" type="submit">Send reply</button>
        </form>
      </section>
      <section class="support-thread support-thread-placeholder" data-support-placeholder><p class="muted">Select a conversation to view messages and reply.</p></section>
    </div>
  </div>
</section>`,
};

module.exports = [support];
