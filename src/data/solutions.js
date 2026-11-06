// Product and use-case pages. Same shape as feature details so they share one template.

const products = [
  {
    path: '/create', name: 'Certificates', icon: 'certificate', tint: 'tint-sky', mock: 'editor', eyebrow: 'Certificate maker',
    title: 'Create and send verifiable digital certificates',
    lead: 'Design a certificate, add your recipients and send them in minutes. Every certificate is hosted, shareable and instantly verifiable.',
    benefits: [
      ['pen', 'Design in minutes', 'Start from templates or build your own with the drag-and-drop editor.'],
      ['bolt', 'Issue in bulk', 'Generate thousands of personalized certificates from a spreadsheet.'],
      ['shield', 'Verify instantly', 'QR codes and unique IDs prove authenticity to anyone.'],
    ],
    sections: [
      { eyebrow: 'Design', title: 'Professional designs without a designer', text: 'Pick from hundreds of templates and adapt them to your brand with a few clicks.', bullets: ['Templates for every occasion', 'Brand kits', 'Custom fonts and backgrounds'], mock: 'templates', tint: 'tint-peach' },
      { eyebrow: 'Send', title: 'Deliver by email, link or integration', text: 'Send branded emails in bulk, share links in your LMS, or issue automatically from the tools you use.', bullets: ['Bulk email delivery', 'Scheduled sending', 'LMS and CRM integrations'], mock: 'send', tint: 'tint-mint' },
      { eyebrow: 'Verify', title: 'Credentials that can’t be faked', text: 'Each certificate links to a live verification page showing who issued it, when, and whether it is still valid.', bullets: ['Public verification pages', 'Expiry and revocation', 'Tamper-proof IDs'], mock: 'verify', tint: 'tint-lav' },
    ],
    faq: [
      ['How much does it cost to create certificates?', 'You can start free and issue up to 250 credentials per year. Paid plans add branding, automation and higher limits.'],
      ['Can I print certificates too?', 'Yes. Download print-ready PDFs individually or in bulk.'],
      ['Do recipients need an account?', 'No. Recipients can view, download and share without signing up.'],
    ],
  },
  {
    path: '/digital-badges', name: 'Digital badges', icon: 'award', tint: 'tint-lav', mock: 'badges', eyebrow: 'Digital badge platform',
    title: 'Recognize skills with verifiable digital badges',
    lead: 'Design and issue Open Badges 3.0 compliant badges that learners can stack, share and carry anywhere.',
    benefits: [
      ['award', 'Open Badges 3.0', 'Standards-compliant metadata recognized across platforms.'],
      ['layers', 'Stackable pathways', 'Combine badges into levels, tracks and learning journeys.'],
      ['share', 'Built for sharing', 'One-click sharing to LinkedIn and social profiles.'],
    ],
    sections: [
      { eyebrow: 'Badge designer', title: 'Design badges in seconds', text: 'Choose a shape, colors and icon, add your label and you’re done. Or upload your own badge artwork.', bullets: ['Shapes, ribbons and icons', 'Upload custom artwork', 'Consistent sets for levels'], mock: 'badges', tint: 'tint-sky' },
      { eyebrow: 'Metadata', title: 'Criteria and evidence built in', text: 'Each badge carries the skills, criteria and evidence behind it, so employers understand what it means.', bullets: ['Skills and alignment', 'Evidence links', 'Issuer verification'], mock: 'verify', tint: 'tint-mint' },
      { eyebrow: 'Wallet', title: 'A home for every badge', text: 'Learners collect all their badges in a branded wallet and share their whole profile with one link.', bullets: ['Branded wallet', 'Public profile', 'Export to other platforms'], mock: 'wallet', tint: 'tint-peach' },
    ],
    faq: [
      ['What is Open Badges 3.0?', 'An open standard for digital credentials that embeds verifiable information about the achievement, issuer and recipient.'],
      ['Can I issue badges and certificates together?', 'Yes. Many programs issue a certificate for completion and badges for skills.'],
      ['Can badges expire?', 'Yes. Set expiry dates and recipients are reminded before they lapse.'],
    ],
  },
  {
    path: '/credential-wallet', name: 'Credential wallet', icon: 'wallet', tint: 'tint-mint', mock: 'wallet', eyebrow: 'Credential wallet',
    title: 'A branded home for every credential you issue',
    lead: 'Give recipients one place to access, download and share all their credentials — no logins, no lost PDFs.',
    benefits: [
      ['user', 'Login-free access', 'Recipients open their wallet from a secure magic link.'],
      ['palette', 'Your brand', 'Logo, colors and domain match the rest of your site.'],
      ['globe', 'Public profiles', 'Recipients can share their full achievement history.'],
    ],
    sections: [
      { eyebrow: 'Recipients', title: 'Everything in one place', text: 'All certificates and badges from your organization, organized and searchable.', bullets: ['All credentials together', 'Download and share', 'Mobile friendly'], mock: 'wallet', tint: 'tint-sky' },
      { eyebrow: 'Brand', title: 'Fully white-labelled', text: 'Host the wallet on your own domain with your branding, so it feels like part of your platform.', bullets: ['Custom domain', 'Custom colors and logo', 'Remove our branding'], mock: 'share', tint: 'tint-lav' },
      { eyebrow: 'Verification', title: 'Trusted by employers', text: 'Every item in the wallet links to a live verification page.', bullets: ['Instant verification', 'Clear expiry status', 'Issuer details'], mock: 'verify', tint: 'tint-peach' },
    ],
    faq: [
      ['Is the wallet included in every plan?', 'A basic wallet is included in all plans. Branding and custom domains are available on higher plans.'],
      ['Can recipients add credentials from other issuers?', 'The wallet shows credentials issued by your organization.'],
      ['Do recipients need a password?', 'No. Access uses secure, one-time email links.'],
    ],
  },
  {
    path: '/forms', name: 'Forms', icon: 'form', tint: 'tint-butter', mock: 'form', eyebrow: 'Forms',
    title: 'Collect data and issue credentials the moment someone submits',
    lead: 'Build registration, attendance or feedback forms and connect them straight to your credential templates.',
    benefits: [
      ['form', 'Form builder', 'Text, choice, rating and consent fields with conditional logic.'],
      ['bolt', 'Instant issuing', 'Credentials are generated and sent automatically on submit.'],
      ['shield', 'Clean data', 'Validation ensures names and emails are correct the first time.'],
    ],
    sections: [
      { eyebrow: 'Build', title: 'Create forms in minutes', text: 'Drag fields into place, add your branding and publish with a link or embed.', bullets: ['Conditional logic', 'Custom branding', 'Embed anywhere'], mock: 'form', tint: 'tint-sky' },
      { eyebrow: 'Issue', title: 'From submission to credential, automatically', text: 'Map answers to fields on your design and choose which template each respondent receives.', bullets: ['Answer-to-field mapping', 'Rules per template', 'Immediate delivery'], mock: 'email', tint: 'tint-mint' },
      { eyebrow: 'Track', title: 'See every response', text: 'Responses and credentials live together, so you always know who received what.', bullets: ['Response history', 'CSV export', 'Analytics'], mock: 'send', tint: 'tint-lav' },
    ],
    faq: [
      ['Can I use forms for attendance?', 'Yes — a short attendance form after a session is one of the most popular uses.'],
      ['Can I add a quiz?', 'Yes. Add scored questions and only issue credentials above a passing score.'],
      ['Are forms included in all plans?', 'Forms are available on Pro plans and above.'],
    ],
  },
  {
    path: '/multi-page-credentials', name: 'Multi-page credentials', icon: 'pages', tint: 'tint-rose', mock: 'pages', eyebrow: 'Multi-page credentials',
    title: 'Transcripts, diplomas and supporting documents — together',
    lead: 'Combine a certificate with transcripts, skill summaries or legal pages in one verifiable credential.',
    benefits: [
      ['pages', 'Multiple pages', 'Add as many pages as you need to a single credential.'],
      ['table', 'Dynamic tables', 'Course lists, grades and hours filled from your data.'],
      ['download', 'Single PDF', 'Recipients download everything as one polished file.'],
    ],
    sections: [
      { eyebrow: 'Documents', title: 'Every page, fully personalized', text: 'Each page can use its own layout and dynamic fields, from grade tables to recommendation letters.', bullets: ['Different layout per page', 'Dynamic tables', 'Shared attributes'], mock: 'pages', tint: 'tint-sky' },
      { eyebrow: 'Templates', title: 'Start from proven layouts', text: 'Use templates for transcripts, letters, diplomas and membership cards.', bullets: ['Transcript templates', 'Letter templates', 'Card templates'], mock: 'docs', tint: 'tint-peach' },
      { eyebrow: 'Verify', title: 'One verification for the whole set', text: 'All pages share a single verification page and ID.', bullets: ['Single credential ID', 'Tamper-proof', 'Instant checks'], mock: 'verify', tint: 'tint-mint' },
    ],
    faq: [
      ['How many pages can a credential have?', 'Up to 20 pages per credential on Business and Enterprise plans.'],
      ['Can recipients download individual pages?', 'They download one combined PDF; you can also export pages separately.'],
      ['Are multi-page credentials verifiable?', 'Yes, the full set is verified together.'],
    ],
  },
];

const useCases = [
  {
    path: '/solutions/education', name: 'Education', icon: 'graduation', tint: 'tint-sky', mock: 'docs', eyebrow: 'For schools & universities',
    title: 'Digital diplomas and certificates for modern institutions',
    lead: 'Issue verifiable diplomas, transcripts and course certificates that graduates can share and employers can trust.',
    benefits: [['building', 'Registrar-friendly', 'Bulk issuing from your SIS exports.'], ['shield', 'Fraud-proof', 'Live verification ends fake diplomas.'], ['globe', 'Your domain', 'Credentials hosted on your university domain.']],
    sections: [
      { eyebrow: 'Diplomas', title: 'Diplomas and transcripts, together', text: 'Issue multi-page credentials with grades and course lists for every graduate.', bullets: ['Multi-page credentials', 'Grade tables', 'Print-ready PDFs'], mock: 'pages', tint: 'tint-lav' },
      { eyebrow: 'Verification', title: 'Stop answering verification emails', text: 'Employers verify degrees themselves with a QR code or link.', bullets: ['Self-serve verification', 'Expiry and revocation', 'Audit trail'], mock: 'verify', tint: 'tint-mint' },
      { eyebrow: 'Alumni', title: 'Stay connected with alumni', text: 'A branded wallet keeps your institution present throughout graduates’ careers.', bullets: ['Branded wallet', 'Lifelong access', 'Alumni engagement'], mock: 'wallet', tint: 'tint-peach' },
    ],
    faq: [['Can we import from our SIS?', 'Yes, via CSV export or API.'], ['Do you support SSO?', 'Yes, SAML SSO is available on Enterprise.'], ['Can we host on our domain?', 'Yes, custom domains are supported.']],
  },
  {
    path: '/solutions/training', name: 'Training providers', icon: 'book', tint: 'tint-peach', mock: 'editor', eyebrow: 'For training providers',
    title: 'Certify every learner automatically',
    lead: 'Connect your LMS and give learners beautiful, verifiable certificates the moment they finish a course.',
    benefits: [['plug', 'LMS integrations', 'Moodle, Canvas, TalentLMS, Thinkific and more.'], ['megaphone', 'Free marketing', 'Every share promotes your courses.'], ['refresh', 'Recertification', 'Expiry dates and reminders bring learners back.']],
    sections: [
      { eyebrow: 'Automate', title: 'Issue on course completion', text: 'Map courses to templates once, and every completion triggers a credential.', bullets: ['Native LMS integrations', 'Zapier & Make', 'API'], mock: 'integrations', tint: 'tint-beige' },
      { eyebrow: 'Grow', title: 'Turn graduates into advocates', text: 'Credential pages include share buttons and a link to your next course.', bullets: ['LinkedIn sharing', 'Calls to action', 'Share analytics'], mock: 'share', tint: 'tint-sky' },
      { eyebrow: 'Measure', title: 'Know which courses perform', text: 'Compare engagement and shares across programs.', bullets: ['Program analytics', 'Exports', 'Trends'], mock: 'analytics', tint: 'tint-mint' },
    ],
    faq: [['Which LMS do you support?', 'Most major platforms natively, and any other via Zapier, Make or API.'], ['Can I issue badges per module?', 'Yes, combine module badges with a final certificate.'], ['Can I charge for certificates?', 'Many customers include certificates in course pricing; payment collection is handled by your platform.']],
  },
  {
    path: '/solutions/events', name: 'Events & conferences', icon: 'ticket', tint: 'tint-mint', mock: 'badges', eyebrow: 'For events & conferences',
    title: 'Certificates and badges for every attendee',
    lead: 'Recognize attendees, speakers and volunteers automatically — and keep your event trending long after it ends.',
    benefits: [['users', 'Role-based credentials', 'Different designs for attendees, speakers and staff.'], ['clock', 'Same-day delivery', 'Send credentials the evening the event closes.'], ['share', 'Social buzz', 'Attendees share badges with their networks.']],
    sections: [
      { eyebrow: 'Attendance', title: 'Issue from your event platform', text: 'Connect your registration or webinar tool and certify attendees automatically.', bullets: ['Eventbrite & Zoom', 'Attendance rules', 'CE credits'], mock: 'integrations', tint: 'tint-beige' },
      { eyebrow: 'Badges', title: 'Badges for speakers and volunteers', text: 'Reward contributors with distinctive badges they’ll be proud to share.', bullets: ['Role-specific designs', 'Stackable series', 'Year-over-year sets'], mock: 'badges', tint: 'tint-lav' },
      { eyebrow: 'Reach', title: 'Measure post-event reach', text: 'See how many attendees shared and how much traffic it created.', bullets: ['Share tracking', 'Referral clicks', 'Reports'], mock: 'analytics', tint: 'tint-sky' },
    ],
    faq: [['Can I issue CE credits?', 'Yes, add credits as an attribute on each certificate.'], ['Can I issue based on session attendance?', 'Yes, with rules or by importing attendance data.'], ['Is there a per-event plan?', 'Contact sales for event-based pricing.']],
  },
  {
    path: '/solutions/corporate', name: 'HR & corporate', icon: 'briefcase', tint: 'tint-lav', mock: 'analytics', eyebrow: 'For HR & L&D teams',
    title: 'Track and recognize employee learning',
    lead: 'Certify compliance training, onboarding and upskilling — and keep every record audit-ready.',
    benefits: [['shield', 'Compliance-ready', 'Expiry dates, reminders and audit logs.'], ['key', 'SSO & permissions', 'Secure access for every team.'], ['chart', 'Workforce insights', 'See skills across your organization.']],
    sections: [
      { eyebrow: 'Compliance', title: 'Never miss a renewal', text: 'Time-limited certifications automatically remind employees before they expire.', bullets: ['Expiry tracking', 'Automatic reminders', 'Audit logs'], mock: 'verify', tint: 'tint-mint' },
      { eyebrow: 'Recognition', title: 'Celebrate growth', text: 'Badges for skills and milestones keep employees motivated.', bullets: ['Skill badges', 'Internal sharing', 'Slack & Teams'], mock: 'badges', tint: 'tint-peach' },
      { eyebrow: 'Insights', title: 'Know your skills inventory', text: 'Report on certifications across teams and locations.', bullets: ['Dashboards', 'Exports', 'API access'], mock: 'analytics', tint: 'tint-sky' },
    ],
    faq: [['Do you integrate with HRIS?', 'Via API, webhooks, Zapier or Make.'], ['Can we restrict visibility?', 'Yes, credentials can be private or internal-only.'], ['Is SSO available?', 'Yes, on Enterprise plans.']],
  },
  {
    path: '/solutions/associations', name: 'Associations', icon: 'users', tint: 'tint-butter', mock: 'wallet', eyebrow: 'For associations & member bodies',
    title: 'Membership, CPD and certifications in one place',
    lead: 'Give members verifiable credentials for every course, credit and membership level — and make renewals effortless.',
    benefits: [['wallet', 'Member wallet', 'Every credential in one branded place.'], ['refresh', 'Renewals', 'Automatic reminders before memberships lapse.'], ['award', 'Member pride', 'Members share and promote your association.']],
    sections: [
      { eyebrow: 'Membership', title: 'Digital membership cards', text: 'Issue cards and certificates for every membership tier.', bullets: ['Card templates', 'Tier-based designs', 'Wallet passes'], mock: 'docs', tint: 'tint-sky' },
      { eyebrow: 'CPD', title: 'Track continuing education credits', text: 'Record credits on each credential and give members a running history.', bullets: ['Credit attributes', 'History per member', 'Exports'], mock: 'wallet', tint: 'tint-mint' },
      { eyebrow: 'Engagement', title: 'Grow through member advocacy', text: 'Shared credentials introduce your association to new professionals.', bullets: ['Social sharing', 'Calls to action', 'Analytics'], mock: 'share', tint: 'tint-lav' },
    ],
    faq: [['Can we connect our AMS?', 'Yes, via API, Zapier or Make.'], ['Can members see their total credits?', 'Yes, in their wallet.'], ['Do you offer nonprofit pricing?', 'Yes — contact sales.']],
  },
];

module.exports = { products, useCases };
