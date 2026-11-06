// Content data shared across pages. All names, quotes and figures are placeholders — replace with your own.

const integrations = [
  { name: 'Zapier', mono: 'Z', color: '#ff4f00', category: 'Automation', desc: 'Connect 6,000+ apps and issue credentials from any trigger.' },
  { name: 'Make', mono: 'M', color: '#6d00cc', category: 'Automation', desc: 'Build visual scenarios that create and send credentials.' },
  { name: 'HubSpot', mono: 'H', color: '#ff7a59', category: 'CRM & marketing', desc: 'Issue credentials when a deal closes or a contact hits a stage.' },
  { name: 'Salesforce', mono: 'S', color: '#00a1e0', category: 'CRM & marketing', desc: 'Sync recipients and credential status with CRM records.' },
  { name: 'Google Sheets', mono: 'GS', color: '#0f9d58', category: 'Forms & data', desc: 'Generate a certificate for every new row in a sheet.' },
  { name: 'Moodle', mono: 'Mo', color: '#f98012', category: 'LMS', desc: 'Award certificates automatically on course completion.' },
  { name: 'Canvas LMS', mono: 'C', color: '#e72429', category: 'LMS', desc: 'Map Canvas courses to credential templates.' },
  { name: 'Typeform', mono: 'Tf', color: '#262627', category: 'Forms & data', desc: 'Send a credential when someone completes a form or quiz.' },
  { name: 'Google Forms', mono: 'GF', color: '#673ab7', category: 'Forms & data', desc: 'Issue on submission, with answers mapped to fields.' },
  { name: 'TalentLMS', mono: 'T', color: '#2b7de9', category: 'LMS', desc: 'Replace default LMS certificates with verifiable ones.' },
  { name: 'LearnWorlds', mono: 'LW', color: '#1c1c3c', category: 'LMS', desc: 'Award credentials to learners as they finish courses.' },
  { name: 'Thinkific', mono: 'Th', color: '#1c3d5a', category: 'LMS', desc: 'Automatically certify students in your online school.' },
  { name: 'Teachable', mono: 'Te', color: '#1d1d1d', category: 'LMS', desc: 'Send branded certificates on course completion.' },
  { name: 'Kajabi', mono: 'K', color: '#2e91fc', category: 'LMS', desc: 'Reward members and course buyers with credentials.' },
  { name: 'Docebo', mono: 'D', color: '#3aa1d8', category: 'LMS', desc: 'Enterprise learning paths with verifiable outcomes.' },
  { name: 'WordPress', mono: 'W', color: '#21759b', category: 'Website', desc: 'Embed credential verification on your WordPress site.' },
  { name: 'Webflow', mono: 'Wf', color: '#4353ff', category: 'Website', desc: 'Add verification and wallet links to Webflow pages.' },
  { name: 'Jotform', mono: 'J', color: '#ff6100', category: 'Forms & data', desc: 'Turn form submissions into ready-to-send credentials.' },
  { name: 'Airtable', mono: 'A', color: '#e8a400', category: 'Forms & data', desc: 'Use Airtable bases as your recipient source.' },
  { name: 'Microsoft Excel', mono: 'X', color: '#217346', category: 'Forms & data', desc: 'Import spreadsheets with automatic column matching.' },
  { name: 'Eventbrite', mono: 'E', color: '#f05537', category: 'Events & video', desc: 'Certify attendees once an event has ended.' },
  { name: 'Zoom', mono: 'Zo', color: '#2d8cff', category: 'Events & video', desc: 'Issue certificates to webinar attendees by duration.' },
  { name: 'Microsoft Teams', mono: 'MT', color: '#5059c9', category: 'Communication', desc: 'Notify teams when credentials are issued or expire.' },
  { name: 'Slack', mono: 'Sl', color: '#4a154b', category: 'Communication', desc: 'Celebrate new credentials in your Slack channels.' },
  { name: 'Mailchimp', mono: 'Mc', color: '#241c15', category: 'CRM & marketing', desc: 'Sync recipients to audiences for follow-up campaigns.' },
  { name: 'Pipedrive', mono: 'P', color: '#017737', category: 'CRM & marketing', desc: 'Trigger partner certifications from pipeline stages.' },
  { name: 'LinkedIn', mono: 'in', color: '#0a66c2', category: 'Communication', desc: 'One-click “Add to profile” for every recipient.' },
  { name: 'Webhooks', mono: '{}', color: '#161616', category: 'Developer', desc: 'Get real-time events for issues, opens and shares.' },
  { name: 'REST API', mono: '</>', color: '#0b65ad', category: 'Developer', desc: 'Create, send and manage credentials programmatically.' },
  { name: 'MCP server', mono: 'AI', color: '#7a4ee0', category: 'Developer', desc: 'Let AI assistants issue and look up credentials safely.' },
];

const testimonials = [
  { quote: 'We used to spend two days formatting certificates after every cohort. Now it takes about ten minutes, and graduates have them the same afternoon.', name: 'Priya Raman', role: 'Program Lead, Northwind Academy', metric: ['90%', 'less admin time'], tint: 'var(--peach)' },
  { quote: 'The analytics surprised us. We can see who opened, who shared, and which courses drive the most LinkedIn posts.', name: 'Marcus Bell', role: 'Head of Marketing, Brightpath', metric: ['3.4×', 'more social shares'], tint: 'var(--sky)' },
  { quote: 'Verification was the deal-breaker. Employers scan the QR code and see a live record — nobody emails our office to confirm anymore.', name: 'Elena Varga', role: 'Registrar, Meridian University', metric: ['0', 'manual verifications'], tint: 'var(--lav)' },
  { quote: 'We issue badges for forty conference tracks. Setting up the rules once and letting the integration do the rest is exactly what we needed.', name: 'Tomás Herrera', role: 'Events Director, Polaris Institute', metric: ['12k', 'badges per event'], tint: 'var(--mint)' },
  { quote: 'Our members actually show off their CPD certificates now. The branded wallet makes it feel like part of the association.', name: 'Grace Mensah', role: 'Membership Manager, Atlas Learning', metric: ['68%', 'of members share'], tint: 'var(--butter)' },
];

const homeFaq = [
  { q: 'What is a digital certificate?', a: '<p>A digital certificate is an online version of a paper certificate that proves someone completed a course, earned a skill or attended an event. Unlike a PDF on its own, it is hosted on a unique URL, can be verified instantly and can be shared to LinkedIn or a digital wallet.</p>' },
  { q: 'How do I create certificates in bulk?', a: '<p>Design a template once, then upload a CSV or Excel file (or connect a tool like Google Sheets or your LMS). Each row becomes a personalized credential, and you can send them all by email in one click or on a schedule.</p>' },
  { q: 'Can recipients and employers verify credentials?', a: '<p>Yes. Every credential has a unique ID, a public verification page and a QR code. Anyone can confirm that it is genuine, who issued it and whether it is still valid — without contacting you.</p>' },
  { q: 'Is there a free plan?', a: '<p>Yes. The Starter plan is free forever and includes up to 250 credentials per year, the design builder, email delivery and verification pages. Upgrade only when your program grows.</p>' },
  { q: 'Can I use my own branding and domain?', a: '<p>Paid plans let you use your logo, colors, fonts, custom email sender and branded credential pages. Enterprise customers can host everything on their own domain, such as <em>credentials.yourschool.edu</em>.</p>' },
  { q: 'Which integrations are supported?', a: '<p>We connect natively with popular LMS, CRM, form and event tools, plus Zapier and Make for thousands more. Developers can use the REST API, webhooks or the MCP server. <a class="text-link" href="/integrations">See all integrations</a>.</p>' },
  { q: 'Is my data secure?', a: '<p>Data is encrypted in transit and at rest, hosted in the EU or US, and protected by role-based permissions, audit logs and SSO on higher plans. Read more on our <a class="text-link" href="/legal-and-security">security page</a>.</p>' },
];

// Template galleries ---------------------------------------------------------
const PALETTES = [
  ['#0b65ad', '#ffb547'], ['#0a3260', '#c99a2e'], ['#0e7a6b', '#f2b84b'], ['#7a4ee0', '#ff9ec7'],
  ['#d9468f', '#ffd166'], ['#161616', '#c99a2e'], ['#f07b2d', '#1d3557'], ['#2b9348', '#aacc00'],
  ['#8a1c2b', '#d4a373'], ['#0e9aa7', '#f6cd61'], ['#3d348b', '#f7b801'], ['#c1121f', '#003049'],
];
const certCats = [
  ['Completion', 'Certificate', 'of Completion'],
  ['Achievement', 'Certificate', 'of Achievement'],
  ['Training', 'Training', 'Certificate'],
  ['Appreciation', 'Certificate', 'of Appreciation'],
  ['Participation', 'Certificate', 'of Participation'],
  ['Award', 'Award', 'of Excellence'],
  ['Event', 'Certificate', 'of Attendance'],
  ['Course', 'Course', 'Certificate'],
];
const certStyles = ['classic', 'modern', 'geo', 'ribbon', 'minimal', 'wave'];
const styleNames = { classic: 'Classic', modern: 'Modern', geo: 'Geometric', ribbon: 'Ribbon', minimal: 'Minimal', wave: 'Wave' };
const colorNames = ['Blue', 'Navy', 'Emerald', 'Violet', 'Berry', 'Noir', 'Sunset', 'Fresh', 'Burgundy', 'Teal', 'Indigo', 'Crimson'];

const certificateTemplates = [];
certCats.forEach(([cat, title, subtitle], ci) => {
  for (let k = 0; k < 3; k++) {
    const style = certStyles[(ci + k * 2) % certStyles.length];
    const pi = (ci * 3 + k * 5) % PALETTES.length;
    certificateTemplates.push({
      id: `${cat.toLowerCase()}-${style}-${pi}`,
      name: `${styleNames[style]} ${colorNames[pi]} ${cat}`,
      category: cat, style, accent: PALETTES[pi][0], accent2: PALETTES[pi][1], title, subtitle,
      pro: (ci + k) % 4 === 3,
    });
  }
});

const badgeShapes = ['hex', 'shield', 'circle', 'star'];
const badgeDefs = [
  ['Skills', 'EXPERT', 'star'], ['Skills', 'ADVANCED', 'bolt'], ['Skills', 'CODER', 'code'], ['Events', 'SPEAKER', 'bolt'],
  ['Events', 'ATTENDEE', 'check'], ['Events', 'VOLUNTEER', 'heart'], ['Membership', 'MEMBER', 'shield'], ['Membership', 'FELLOW', 'star'],
  ['Levels', 'LEVEL 1', 'leaf'], ['Levels', 'LEVEL 2', 'leaf'], ['Levels', 'LEVEL 3', 'star'], ['Courses', 'GRADUATE', 'book'],
  ['Courses', 'CERTIFIED', 'check'], ['Courses', 'MENTOR', 'heart'], ['Skills', 'SECURITY', 'shield'], ['Events', 'HACKATHON', 'code'],
];
const lighten = ['#5b9bff', '#ffd27a', '#3fc6a3', '#b892ff', '#ff8cc0', '#7a7a7a', '#ffb36b', '#7ed957', '#d98a95', '#5fd3dc', '#8f86ff', '#ff6b74'];
const badgeTemplates = badgeDefs.map(([cat, label, glyph], i) => {
  const pi = (i * 5) % PALETTES.length;
  return {
    id: `${label.toLowerCase().replace(/\s/g, '-')}-${i}`,
    name: `${label.charAt(0) + label.slice(1).toLowerCase()} ${['hexagon', 'shield', 'medal', 'seal'][i % 4]}`,
    category: cat, shape: badgeShapes[i % 4], accent: PALETTES[pi][0], accent2: lighten[pi], glyph, label,
    top: ['2026', 'CERTIFIED', '', 'OFFICIAL'][i % 4], pro: i % 5 === 4,
  };
});

const documentTemplates = [
  { id: 'transcript-blue', name: 'Academic transcript', category: 'Transcripts', kind: 'transcript', accent: '#0b65ad', title: 'Academic Transcript' },
  { id: 'transcript-green', name: 'Course record', category: 'Transcripts', kind: 'transcript', accent: '#0e7a6b', title: 'Course Record', org: 'Northwind Academy' },
  { id: 'transcript-violet', name: 'Training log', category: 'Transcripts', kind: 'transcript', accent: '#7a4ee0', title: 'Training Log', org: 'Kestrel Labs' },
  { id: 'letter-blue', name: 'Letter of recommendation', category: 'Letters', kind: 'letter', accent: '#0b65ad', title: 'Letter of Recommendation' },
  { id: 'letter-orange', name: 'Letter of completion', category: 'Letters', kind: 'letter', accent: '#f07b2d', title: 'Letter of Completion', org: 'Brightpath' },
  { id: 'letter-navy', name: 'Internship confirmation', category: 'Letters', kind: 'letter', accent: '#123c7a', title: 'Internship Confirmation', org: 'Harbor & Co.' },
  { id: 'diploma-navy', name: 'Diploma (portrait)', category: 'Diplomas', kind: 'diploma', accent: '#123c7a', title: 'Diploma', org: 'Meridian University' },
  { id: 'diploma-burgundy', name: 'Graduate diploma', category: 'Diplomas', kind: 'diploma', accent: '#8a1c2b', title: 'Graduate Diploma', org: 'Cedar College' },
  { id: 'diploma-green', name: 'Professional diploma', category: 'Diplomas', kind: 'diploma', accent: '#0e7a6b', title: 'Professional Diploma', org: 'Polaris Institute' },
  { id: 'card-blue', name: 'Membership card', category: 'Cards', kind: 'card', accent: '#0b65ad', title: 'Full Member', org: 'Atlas Learning' },
  { id: 'card-violet', name: 'Student ID', category: 'Cards', kind: 'card', accent: '#7a4ee0', title: 'Student · Class of 2027', org: 'Northwind' },
  { id: 'card-dark', name: 'License card', category: 'Cards', kind: 'card', accent: '#161616', title: 'Licensed Practitioner', org: 'Summit Health' },
];

// Blog -----------------------------------------------------------------------
const authors = {
  maya: { name: 'Maya Lindqvist', role: 'Head of Content' },
  daniel: { name: 'Daniel Osei', role: 'Product Manager' },
  ines: { name: 'Inês Carvalho', role: 'Customer Success Lead' },
};

const posts = [
  {
    slug: 'how-to-create-certificates-in-bulk', category: 'Guides', icon: 'bolt', date: 'Oct 21, 2026', read: '7 min', author: 'daniel', featured: true,
    title: 'How to create hundreds of certificates in bulk (without a design team)',
    excerpt: 'A practical, step-by-step workflow for generating personalized certificates from a spreadsheet — and sending them the same day.',
    sections: [
      ['Why bulk generation matters', ['If you run cohorts, workshops or events, certificates usually arrive at the worst moment: right after the program ends, when your team is already exhausted. Doing them one by one in a slide tool is slow and error-prone — a single typo in a name is the fastest way to turn a celebration into a support ticket.', 'Bulk generation flips the process. You design one template with placeholders, prepare one data file, and let software do the repetitive part.']],
      ['Step 1: Design a template with dynamic fields', ['Start from a template or a blank canvas and add your logo, colors and signature. Wherever a value changes per recipient — name, course, date, grade — insert a dynamic field instead of typed text.', 'Keep long values in mind. Preview the design with your longest recipient name so that nothing overflows.']],
      ['Step 2: Prepare your recipient data', ['Export a CSV or Excel file from your LMS, registration form or CRM. One row per recipient, one column per dynamic field, plus an email column for delivery.', 'Clean the data before you import it: remove duplicates, check capitalization and make sure dates use one format.']],
      ['Step 3: Match columns and generate', ['After uploading, match each column to a field on your template. Good tools match obvious columns automatically. Spot-check a few generated credentials, then generate the rest in one go.']],
      ['Step 4: Send, then measure', ['Send every credential by email with a personal message, or schedule delivery for the morning after the course ends. Afterwards, look at open rates, shares and verifications to understand which programs create the most visibility.']],
    ],
  },
  {
    slug: 'digital-badges-vs-certificates', category: 'Digital badges', icon: 'award', date: 'Oct 9, 2026', read: '6 min', author: 'maya',
    title: 'Digital badges vs. certificates: which one should you issue?',
    excerpt: 'They look similar but serve different purposes. Here is how to decide — and when to issue both.',
    sections: [
      ['Two formats, one goal', ['Both digital certificates and digital badges recognize achievement. The difference is in how they are used: certificates document a completed program, while badges represent a specific skill or milestone that is easy to display and stack.']],
      ['When certificates work best', ['Choose certificates for formal completions: courses, degrees, compliance training and accredited programs. Their familiar layout carries weight with employers and is easy to print or attach to an application.']],
      ['When badges work best', ['Badges shine for granular skills, levels and community recognition. They are small, visual and designed to be shared on social profiles. With metadata standards such as Open Badges, each badge carries the criteria and evidence behind it.']],
      ['Why many programs issue both', ['A common pattern is a certificate for the full program and badges for each module along the way. Learners stay motivated, and your brand appears more often on their profiles.']],
    ],
  },
  {
    slug: 'certificate-design-tips', category: 'Templates', icon: 'palette', date: 'Sep 30, 2026', read: '5 min', author: 'maya',
    title: '9 certificate design tips that make recipients want to share',
    excerpt: 'Small design choices have a big effect on how often credentials end up on LinkedIn. Here is what to get right.',
    sections: [
      ['Start with hierarchy', ['The recipient’s name should be the most prominent element, followed by the achievement. Your logo matters, but it should not compete with the person you are celebrating.']],
      ['Use your brand — lightly', ['Pick one primary color and one accent. Use them for borders, ribbons or a side band, and keep the rest neutral so the certificate still feels premium.']],
      ['Make it verifiable at a glance', ['A QR code and credential ID signal authenticity. Place them in a corner where they are visible but quiet.']],
      ['Design for the thumbnail', ['Most people will first see your certificate as a small image in a feed. Test it at 300 pixels wide: can you still read the title and name?']],
      ['Quick checklist', ['Generous margins; at most two typefaces; a real signature; an issue date and, if relevant, an expiry date; enough contrast for accessibility.']],
    ],
  },
  {
    slug: 'automate-certificates-from-your-lms', category: 'Product', icon: 'refresh', date: 'Sep 12, 2026', read: '6 min', author: 'daniel',
    title: 'Automate certificates straight from your LMS',
    excerpt: 'Connect your learning platform once and every learner gets a verifiable credential the moment they finish.',
    sections: [
      ['The problem with built-in LMS certificates', ['Most learning platforms can generate a basic PDF, but those files are hard to verify, rarely on brand and cannot be updated once they are sent.']],
      ['How automation works', ['Connect your LMS through a native integration or Zapier. Choose a trigger — usually “course completed” — and map the learner’s name, email and course to your template fields.', 'From then on, every completion creates and sends a hosted, verifiable credential automatically.']],
      ['What to automate next', ['Add expiry dates and reminders for recertification, issue badges for each module, and send completions to your CRM so sales and success teams can follow up.']],
    ],
  },
  {
    slug: 'credential-marketing-playbook', category: 'Marketing', icon: 'megaphone', date: 'Aug 28, 2026', read: '8 min', author: 'ines',
    title: 'The credential marketing playbook: turning graduates into promoters',
    excerpt: 'Every shared certificate is a recommendation from a happy customer. Here is how to get more of them.',
    sections: [
      ['Credentials are social proof', ['When a learner shares a certificate, their network sees your brand alongside a personal success story. That is more persuasive than almost any ad.']],
      ['Make sharing effortless', ['Include one-click buttons for LinkedIn and other networks on the credential page and in the delivery email. Pre-fill the post text so recipients do not have to think about what to write.']],
      ['Add a call to action', ['Your credential page is seen by the recipient’s colleagues and recruiters. Add a tasteful link to your next course or program.']],
      ['Measure what matters', ['Track shares and the traffic they create. Compare programs to see which ones produce the most advocates, and invest there.']],
    ],
  },
  {
    slug: 'continuing-education-credentials', category: 'Industry', icon: 'graduation', date: 'Aug 7, 2026', read: '5 min', author: 'ines',
    title: 'Managing continuing education credits without spreadsheets',
    excerpt: 'Associations and professional bodies track thousands of CE credits a year. Here is a calmer way to do it.',
    sections: [
      ['The CE tracking challenge', ['Members attend sessions across the year, credits must be recorded accurately, and certificates often expire. Keeping all of that in spreadsheets quickly becomes fragile.']],
      ['One record per member', ['Issue a credential for each completed activity with credits stored as an attribute. Members see everything in a single wallet, and you can export totals at any time.']],
      ['Renewals and reminders', ['Set expiry dates on time-limited certifications and send automatic reminders before they lapse. Renewed credentials keep the same verification link, so nothing breaks for employers.']],
    ],
  },
];

// Customer stories --------------------------------------------------------------
const customers = [
  {
    slug: 'northwind-academy', org: 'Northwind Academy', industry: 'Online education', glyph: 'graduation', tint: 'var(--sky)',
    headline: 'How Northwind Academy cut certificate admin by 90%',
    summary: 'An online academy with 30,000 learners moved from hand-made PDFs to automated, verifiable credentials.',
    metrics: [['90%', 'less admin time'], ['30k', 'learners certified'], ['Same day', 'delivery after each cohort']],
    challenge: 'Every cohort ended with two days of copy-pasting names into slides, exporting PDFs and emailing them one by one. Mistakes were common and learners had no way to prove their credentials to employers.',
    solution: 'Northwind connected its LMS, built three branded templates and set certificates to send automatically when a learner passes the final assessment.',
    results: 'Certificates now arrive minutes after completion. Support tickets about certificates dropped to almost zero, and LinkedIn shares became one of the academy’s top referral sources.',
    quote: testimonials[0],
  },
  {
    slug: 'meridian-university', org: 'Meridian University', industry: 'Higher education', glyph: 'building', tint: 'var(--lav)',
    headline: 'Meridian University made every diploma instantly verifiable',
    summary: 'The registrar’s office replaced manual verification requests with secure, self-serve credential pages.',
    metrics: [['0', 'manual verifications'], ['12k', 'diplomas issued'], ['4 weeks', 'to full rollout']],
    challenge: 'Employers emailed the registrar daily to confirm degrees, and each request took staff time to research and answer.',
    solution: 'Meridian issued digital diplomas and transcripts on its own domain, each with a QR code and public verification page.',
    results: 'Verification requests now resolve themselves. Graduates share diplomas proudly, and the office reclaimed hours every week.',
    quote: testimonials[2],
  },
  {
    slug: 'polaris-institute', org: 'Polaris Institute', industry: 'Events & conferences', glyph: 'ticket', tint: 'var(--mint)',
    headline: 'Polaris Institute issues 12,000 badges per conference — automatically',
    summary: 'A global conference organizer recognizes speakers, volunteers and attendees across forty tracks.',
    metrics: [['12k', 'badges per event'], ['40', 'tracks automated'], ['3.1×', 'more social mentions']],
    challenge: 'Different roles needed different credentials, and attendance data lived in the event platform.',
    solution: 'Polaris connected its event tool and set up rules that issue the right badge to each attendee based on sessions attended.',
    results: 'Badges go out the evening the event closes. Social mentions during the following week tripled.',
    quote: testimonials[3],
  },
  {
    slug: 'atlas-learning', org: 'Atlas Learning', industry: 'Professional association', glyph: 'users', tint: 'var(--butter)',
    headline: 'Atlas Learning turned CPD certificates into a member benefit',
    summary: 'A professional association gave members a branded wallet for every course and credit they earn.',
    metrics: [['68%', 'of members share'], ['22k', 'CPD credits tracked'], ['−75%', 'renewal follow-ups']],
    challenge: 'Members lost track of CPD certificates and staff spent renewal season chasing paperwork.',
    solution: 'Atlas issued credentials with credits as attributes and enabled automatic expiry reminders.',
    results: 'Members now keep everything in one place and renew on time, and the wallet has become a reason to join.',
    quote: testimonials[4],
  },
];

const changelog = [
  { date: 'October 2026', title: 'Forms: collect data and issue on submit', tag: 'New', items: [['New', 'Build registration or feedback forms and issue a credential the moment someone submits.'], ['New', 'Conditional logic decides which template each respondent receives.'], ['Improved', 'Form answers can be used as dynamic fields on the design.']], art: 'form' },
  { date: 'September 2026', title: 'MCP server for AI assistants', tag: 'New', items: [['New', 'Connect AI assistants to create, send and look up credentials with scoped permissions.'], ['Improved', 'API keys can now be limited to a single workspace.']], art: 'code' },
  { date: 'August 2026', title: 'Multi-page credentials', tag: 'New', items: [['New', 'Combine a certificate with a transcript or supporting pages in a single credential.'], ['Improved', 'PDF exports keep vector quality across all pages.'], ['Fixed', 'Long names no longer wrap unexpectedly on narrow templates.']], art: 'pages' },
  { date: 'July 2026', title: 'Smarter analytics', tag: 'Improved', items: [['Improved', 'New funnel view from sent to opened to shared.'], ['New', 'Export analytics to CSV for any date range.']], art: 'chart' },
  { date: 'June 2026', title: 'Wallet passes', tag: 'New', items: [['New', 'Recipients can add credentials to Apple and Google wallets.'], ['Improved', 'Faster credential page loading on mobile.']], art: 'wallet' },
];

const team = [
  ['Lena Hart', 'Co-founder & CEO', 'var(--sky)'], ['Omar Haddad', 'Co-founder & CTO', 'var(--peach)'],
  ['Maya Lindqvist', 'Head of Content', 'var(--lav)'], ['Daniel Osei', 'Product Manager', 'var(--mint)'],
  ['Inês Carvalho', 'Customer Success Lead', 'var(--butter)'], ['Kenji Mori', 'Lead Designer', 'var(--rose)'],
  ['Sara Novak', 'Engineering Manager', 'var(--sky)'], ['Ade Bello', 'Partnerships', 'var(--peach)'],
];

module.exports = {
  integrations, testimonials, homeFaq, certificateTemplates, badgeTemplates, documentTemplates,
  posts, authors, customers, changelog, team, PALETTES,
};
