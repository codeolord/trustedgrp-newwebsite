// Feature detail pages + the grouped feature index.

const featureDetails = [
  {
    slug: 'design', name: 'Design builder', icon: 'pen', tint: 'tint-sky', mock: 'editor',
    title: 'Design certificates that look like your brand',
    lead: 'A drag-and-drop editor with templates, brand kits and dynamic fields. No design skills required.',
    benefits: [
      ['grid', 'Hundreds of templates', 'Start from a professionally designed layout for any occasion.'],
      ['palette', 'Brand kits', 'Save your logos, colors and fonts and reuse them in every design.'],
      ['type', 'Dynamic fields', 'Personalize names, dates, grades and anything else from your data.'],
    ],
    sections: [
      { eyebrow: 'Editor', title: 'Edit every element with a click', text: 'Move, resize and style text, shapes, images and signatures directly on the canvas. Snap guides keep everything aligned.', bullets: ['Custom fonts and colors', 'Upload backgrounds and illustrations', 'Layers, grouping and alignment tools'], mock: 'editor', tint: 'tint-lav' },
      { eyebrow: 'Personalization', title: 'One design, thousands of unique credentials', text: 'Insert attributes like [recipient.name] or [course.hours] and they are filled in automatically for each person.', bullets: ['Unlimited custom attributes', 'Preview with real recipient data', 'Automatic text fitting for long names'], mock: 'sheet', tint: 'tint-mint' },
      { eyebrow: 'Verification', title: 'Built-in QR codes and credential IDs', text: 'Every design can include a QR code and unique ID that link to a live verification page.', bullets: ['Auto-generated QR codes', 'Unique, tamper-proof IDs', 'Optional expiry dates'], mock: 'verify', tint: 'tint-peach' },
    ],
    faq: [
      ['Can I upload my own design?', 'Yes. Upload a PNG, JPG or PDF background designed elsewhere and add dynamic fields on top of it.'],
      ['Which file formats can recipients download?', 'Recipients can download high-resolution PDF and PNG files, and you can export JSON metadata.'],
      ['Can multiple people edit designs?', 'Yes. Team plans include shared designs, roles and permissions.'],
    ],
  },
  {
    slug: 'generator', name: 'Bulk generator', icon: 'bolt', tint: 'tint-peach', mock: 'sheet',
    title: 'Generate thousands of certificates in one go',
    lead: 'Upload a spreadsheet or connect your tools, and create personalized credentials for every recipient in seconds.',
    benefits: [
      ['upload', 'CSV & Excel import', 'Drag in a file and columns are matched automatically.'],
      ['clock', 'Seconds, not days', 'Generate credentials for entire cohorts in one click.'],
      ['check', 'No more typos', 'Validation flags missing emails and duplicate names before you send.'],
    ],
    sections: [
      { eyebrow: 'Import', title: 'Bring your data from anywhere', text: 'Upload a file, paste rows, or connect Google Sheets, your LMS or CRM so new recipients appear automatically.', bullets: ['CSV, XLSX and Google Sheets', 'Automatic column matching', 'Duplicate and error detection'], mock: 'sheet', tint: 'tint-mint' },
      { eyebrow: 'Export', title: 'Download everything at once', text: 'Export all credentials as individual PDFs, a single merged file or a ZIP — perfect for print runs and archives.', bullets: ['PDF, PNG and ZIP exports', 'Print-ready resolution', 'Consistent file naming'], mock: 'certs', tint: 'tint-butter' },
      { eyebrow: 'Hosting', title: 'Every credential gets its own page', text: 'Each generated credential is hosted on a unique URL that recipients can share and employers can verify.', bullets: ['Unlimited hosting', 'Custom domain on higher plans', 'Mobile-friendly credential pages'], mock: 'share', tint: 'tint-sky' },
    ],
    faq: [
      ['How many credentials can I generate at once?', 'There is no hard limit per batch. Customers regularly generate tens of thousands of credentials in a single run.'],
      ['Can I fix a mistake after generating?', 'Yes. Edit any credential and the hosted version updates instantly — the link stays the same.'],
      ['Do I need to send credentials by email?', 'No. You can generate and download them, share links manually, or send by email later.'],
    ],
  },
  {
    slug: 'distribution', name: 'Automated delivery', icon: 'send', tint: 'tint-mint', mock: 'send',
    title: 'Deliver credentials automatically, right on time',
    lead: 'Send personalized emails in bulk, schedule deliveries, or trigger credentials from the tools you already use.',
    benefits: [
      ['mail', 'Branded emails', 'Customize the subject, message and sender name for every campaign.'],
      ['calendar', 'Scheduling', 'Send the morning after a course ends, while motivation is high.'],
      ['refresh', 'Triggers', 'Issue on course completion, form submission or a CRM event.'],
    ],
    sections: [
      { eyebrow: 'Email', title: 'Emails people actually open', text: 'Recipients get a friendly, branded message with a preview of their credential and a clear button to view it.', bullets: ['Custom sender name and reply-to', 'Personalized subject lines', 'Automatic reminders for unopened emails'], mock: 'email', tint: 'tint-sky' },
      { eyebrow: 'Tracking', title: 'Know exactly what was delivered', text: 'See which credentials were delivered, opened, downloaded and shared, and resend with one click.', bullets: ['Delivery and open status', 'Bounce detection', 'One-click resend'], mock: 'send', tint: 'tint-lav' },
      { eyebrow: 'Automation', title: 'Set it once, let it run', text: 'Connect your LMS, form or CRM and credentials are issued and sent the moment someone qualifies.', bullets: ['Native integrations', 'Zapier and Make', 'Webhooks and API'], mock: 'integrations', tint: 'tint-beige' },
    ],
    faq: [
      ['Can I send from my own email domain?', 'Yes. Higher plans support a custom sending domain with SPF and DKIM.'],
      ['What happens if an email bounces?', 'Bounced emails are flagged so you can correct the address and resend.'],
      ['Can I deliver without email?', 'Yes. Share links directly, embed them in your LMS, or use the API.'],
    ],
  },
  {
    slug: 'management', name: 'Credential management', icon: 'folder', tint: 'tint-lav', mock: 'wallet',
    title: 'Every credential you have issued, in one organized place',
    lead: 'Search, edit, renew, revoke and organize credentials across programs — and keep a full history of every change.',
    benefits: [
      ['search', 'Find anything', 'Search by recipient, group, attribute or status in milliseconds.'],
      ['refresh', 'Edit after sending', 'Fix a typo and the hosted credential updates instantly.'],
      ['clock', 'Expiry & renewals', 'Set validity periods and remind recipients before they lapse.'],
    ],
    sections: [
      { eyebrow: 'Organize', title: 'Groups for every program', text: 'Keep each course, cohort or event in its own group with its own design, email and settings.', bullets: ['Unlimited groups', 'Bulk actions', 'Filters and saved views'], mock: 'send', tint: 'tint-mint' },
      { eyebrow: 'Lifecycle', title: 'Renew, revoke and reissue with confidence', text: 'Expired or revoked credentials are clearly marked on the verification page, so everyone sees the current status.', bullets: ['Expiry dates', 'Revocation with reason', 'Full audit history'], mock: 'verify', tint: 'tint-peach' },
      { eyebrow: 'Recipients', title: 'A wallet for every recipient', text: 'Recipients see all the credentials they have earned from you in one branded, login-free wallet.', bullets: ['Login-free access', 'Branded wallet', 'Profile sharing'], mock: 'wallet', tint: 'tint-sky' },
    ],
    faq: [
      ['Can I import credentials issued elsewhere?', 'Yes. Import historical records so all credentials live in one place.'],
      ['Is there an audit log?', 'Business and Enterprise plans include a full audit log of actions taken by your team.'],
      ['Can recipients update their own name?', 'You can allow recipients to request corrections that you approve.'],
    ],
  },
  {
    slug: 'sharing', name: 'Social sharing', icon: 'share', tint: 'tint-butter', mock: 'share',
    title: 'Turn every recipient into a promoter',
    lead: 'One-click sharing to LinkedIn and social networks puts your brand in front of the people who matter most.',
    benefits: [
      ['linkedin', 'Add to LinkedIn', 'Recipients add credentials to their profile with fields pre-filled.'],
      ['megaphone', 'Pre-written posts', 'Suggest share text and hashtags so posting takes seconds.'],
      ['link', 'Calls to action', 'Add a link to your next course on every credential page.'],
    ],
    sections: [
      { eyebrow: 'Credential page', title: 'A share-ready page for every achievement', text: 'Beautiful, mobile-friendly credential pages with share buttons, downloads and verification in one place.', bullets: ['LinkedIn, X, Facebook and more', 'PDF and image download', 'Wallet passes'], mock: 'share', tint: 'tint-sky' },
      { eyebrow: 'Marketing', title: 'Promote your next program', text: 'Show a banner or button on credential pages pointing to related courses, events or memberships.', bullets: ['Custom call-to-action', 'UTM tracking', 'Per-group settings'], mock: 'certs', tint: 'tint-peach' },
      { eyebrow: 'Results', title: 'Measure your reach', text: 'Track shares and the traffic they create so you know which programs generate the most advocates.', bullets: ['Share tracking', 'Referral clicks', 'Program comparisons'], mock: 'analytics', tint: 'tint-mint' },
    ],
    faq: [
      ['Which networks are supported?', 'LinkedIn, X, Facebook, WhatsApp and email, plus a copyable link for anywhere else.'],
      ['Do recipients need an account?', 'No. Credentials can be viewed and shared without creating an account.'],
      ['Can I turn sharing off?', 'Yes, sharing options can be configured per group.'],
    ],
  },
  {
    slug: 'analytics', name: 'Analytics', icon: 'chart', tint: 'tint-rose', mock: 'analytics',
    title: 'See how your credentials perform',
    lead: 'Track deliveries, opens, downloads, shares and verifications across every program in real time.',
    benefits: [
      ['eye', 'Engagement', 'Opens, views and downloads for every credential.'],
      ['share', 'Social reach', 'Shares and referral clicks from social networks.'],
      ['shield', 'Verifications', 'How often employers and institutions check your credentials.'],
    ],
    sections: [
      { eyebrow: 'Dashboard', title: 'All your numbers on one screen', text: 'A clear dashboard for every group and for your whole account, with trends over time.', bullets: ['Real-time metrics', 'Date range filters', 'Program comparison'], mock: 'analytics', tint: 'tint-sky' },
      { eyebrow: 'Recipients', title: 'Drill down to individual recipients', text: 'See exactly who opened, downloaded or shared — and follow up with those who didn’t.', bullets: ['Per-recipient activity', 'Segment unopened', 'One-click reminders'], mock: 'send', tint: 'tint-lav' },
      { eyebrow: 'Export', title: 'Take your data anywhere', text: 'Export analytics to CSV or pull them through the API into your BI tools.', bullets: ['CSV export', 'API access', 'Webhooks for every event'], mock: 'integrations', tint: 'tint-beige' },
    ],
    faq: [
      ['Is analytics included in the free plan?', 'Basic delivery stats are included. Advanced analytics are part of paid plans.'],
      ['Do you track recipients across the web?', 'No. We only measure interactions with credentials and credential pages.'],
      ['Can I export analytics?', 'Yes, to CSV or via the API.'],
    ],
  },
];

const featureGroups = [
  { id: 'design', name: 'Design builder', href: '/features/design', items: [
    ['Drag-and-drop editor', 'Edit text, images, shapes and signatures directly on the canvas.'],
    ['Brand kits', 'Save logos, colors and fonts for consistent designs.'],
    ['Custom backgrounds', 'Upload your own artwork or PDF as a base layer.'],
    ['Dynamic attributes', 'Personalize any text with recipient data.'],
  ] },
  { id: 'generator', name: 'Bulk generator', href: '/features/generator', items: [
    ['Spreadsheet import', 'CSV, XLSX and Google Sheets with auto-matching.'],
    ['Data validation', 'Catch missing emails and duplicates before sending.'],
    ['Bulk PDF export', 'Download everything as PDFs or a ZIP archive.'],
    ['Unlimited hosting', 'Each credential lives on its own shareable URL.'],
  ] },
  { id: 'distribution', name: 'Automated delivery', href: '/features/distribution', items: [
    ['Bulk email', 'Personalized, branded emails sent in one click.'],
    ['Scheduled sending', 'Pick the perfect time for delivery.'],
    ['Reminders', 'Automatically nudge recipients who haven’t opened.'],
    ['Custom sender domain', 'Send from your own domain with SPF and DKIM.'],
  ] },
  { id: 'management', name: 'Credential management', href: '/features/management', items: [
    ['Groups', 'Organize credentials by course, cohort or event.'],
    ['Edit after issuing', 'Updates apply instantly to hosted credentials.'],
    ['Expiry & renewals', 'Validity periods with automatic reminders.'],
    ['Revocation', 'Revoke credentials with a visible reason.'],
  ] },
  { id: 'sharing', name: 'Social sharing', href: '/features/sharing', items: [
    ['Add to LinkedIn', 'Pre-filled certification fields on LinkedIn profiles.'],
    ['Share buttons', 'X, Facebook, WhatsApp, email and copy link.'],
    ['Calls to action', 'Promote your next course on credential pages.'],
    ['Wallet passes', 'Apple and Google wallet support.'],
  ] },
  { id: 'analytics', name: 'Analytics', href: '/features/analytics', items: [
    ['Engagement metrics', 'Opens, views and downloads at a glance.'],
    ['Share tracking', 'See social reach for every program.'],
    ['Verification logs', 'Know when credentials are checked.'],
    ['CSV export', 'Take your data to any BI tool.'],
  ] },
  { id: 'integrations', name: 'API & integrations', href: '/integrations', items: [
    ['Native integrations', 'LMS, CRM, forms and event platforms.'],
    ['Zapier & Make', 'Connect thousands of apps without code.'],
    ['REST API & webhooks', 'Full programmatic control.'],
    ['MCP server', 'Let AI assistants work with your credentials.'],
  ] },
  { id: 'branding', name: 'Branding & white label', href: '/enterprise', items: [
    ['Custom domain', 'Host credentials on your own domain.'],
    ['Branded wallet', 'Your logo and colors on every page.'],
    ['Remove our branding', 'A fully white-labelled experience.'],
    ['Custom email templates', 'Match your existing communications.'],
  ] },
  { id: 'security', name: 'Security & compliance', href: '/legal-and-security', items: [
    ['SSO / SAML', 'Single sign-on with your identity provider.'],
    ['Roles & permissions', 'Control what each teammate can do.'],
    ['Audit logs', 'A full record of account activity.'],
    ['Data residency', 'Choose EU or US hosting.'],
  ] },
];

module.exports = { featureDetails, featureGroups };
