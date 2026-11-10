const { page, visitorChat } = require('../layout');

const supportWidget = {
  path: '/support-widget',
  title: 'Trusted Verifier Support',
  description: 'Chat with the Trusted Verifier support team.',
  noIndex: true,
  bare: true,
  body: `<div class="support-widget-frame" data-help-panel data-chat-embed data-chat-auto-open>
  <div data-chat-home hidden></div>
  ${visitorChat({ embedded: true })}
</div>`,
};

module.exports = [supportWidget];
