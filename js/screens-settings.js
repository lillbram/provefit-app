// Settings: akun, notifikasi, pembayaran, bantuan

const settings = (title, body) => `
  <section class="screen">
    ${statusBar()}
    <header class="toolbar set">${backBtn('a85d5')}<h1>${title}</h1><span class="toolbar-spacer"></span></header>
    <div class="scroll set-body">${body}</div>
  </section>`;

const toggle = (on) => `
  <button class="switch${on ? ' on' : ''}" data-toggle aria-label="Toggle">
    <img class="sw-on" src="${A}7f704.svg" alt=""><img class="sw-off" src="${A}e25fa.svg" alt="">
  </button>`;

const toggleRow = (label, on, cls = '') => `<div class="set-row ${cls}"><span>${label}</span>${toggle(on)}</div>`;
const navRow = (label) => `<a class="set-row p-16"><span>${label}</span>${ic('646d5')}</a>`;
const setInput = (label, value, type = 'text') => `
  <label class="set-input"><span>${label}</span><input type="${type}" value="${value}"></label>`;

S['settings-akun'] = () => settings('Account', `
  <div class="set-profile">
    <div class="avatar">${ph('d4c1e', 'cover')}</div>
    <button class="edit-photo">Change Photo</button>
  </div>
  <div class="set-form">
    ${setInput('Full Name', 'Alexander')}
    ${setInput('Email', 'alexander@email.com', 'email')}
    ${setInput('Phone Number', '+62 812 3456 7890', 'tel')}
    <div class="set-two">${setInput('Date of Birth', 'March 15, 1992')}${setInput('Gender', 'Male')}</div>
  </div>
  <div class="set-sec">
    <h2>Security</h2>
    ${navRow('Change Password')}
    ${toggleRow('Two-Step Verification', true, 'p-16')}
  </div>
  <div class="set-sec">
    <h2>Connected Devices</h2>
    <div class="set-row p-16">
      <div class="device">
        <span class="device-icon">${ic('66347')}</span>
        <div><b>Apple Watch SE</b><small>${ic('aa75f')}Connected</small></div>
      </div>
      <a class="disconnect">Disconnect</a>
    </div>
  </div>
  <a class="delete-account" data-go="login">Delete Account</a>`);

const NOTIF_SETTINGS = [
  ['Class Reminders', [['30 Minutes Before', 1], ['1 Hour Before', 0], ['1 Day Before', 1]]],
  ['Activity', [['Booking Confirmed', 1], ['Class Canceled', 1], ['Schedule Changes', 1]]],
  ['Promotions &amp; Offers', [['Gym Offers', 0], ['Class Discounts', 1], ['Weekly Newsletter', 0]]],
  ['Social', [['Friends’ Achievements', 0], ['New Challenges', 1]]],
];

S['settings-notifikasi'] = () => settings('Notifications', NOTIF_SETTINGS.map(([title, rows]) => `
  <div class="set-sec gap-8">
    <h2>${title}</h2>
    ${rows.map(([label, on]) => toggleRow(label, on)).join('')}
  </div>`).join(''));

const TRANSACTIONS = [
  ['Zumba Energy Blast', 'Jan 28, 2025', 'Rp275.000'],
  ['Gold Membership', 'Jan 1, 2025', 'Rp499.000'],
  ['HIIT Blast Power', 'Dec 25, 2024', 'Rp200.000'],
];

S['settings-pembayaran'] = () => settings('Payment', `
  <div class="set-sec">
    <h2>Payment Method</h2>
    <div class="set-row p-16">
      <div class="card-left">
        <span class="visa tag-bg">VISA</span>
        <div class="card-meta"><b>•••• 4242</b><small class="ok-badge fs-9">DEFAULT</small></div>
      </div>
      <a class="link">Change</a>
    </div>
    <button class="add-method">+ Add Payment Method</button>
  </div>
  <div class="set-sec">
    <h2>Membership Plan</h2>
    <div class="membership">
      <div class="row-between">
        <span class="member-badge heavy">GOLD MEMBER</span>
        <span class="member-price"><b>Rp499.000</b>/month</span>
      </div>
      <div class="member-period"><span>Active Period</span><b>Active until February 28, 2025</b></div>
      <button class="manage-btn">Manage Subscription</button>
    </div>
  </div>
  <div class="set-sec">
    <h2>Transaction History</h2>
    ${TRANSACTIONS.map(([name, date, amount]) => `
      <div class="trx">
        <div><b>${name}</b><span>${date}</span></div>
        <div class="right"><b class="amount">${amount}</b><small class="ok-badge">Successful</small></div>
      </div>`).join('')}
    <a class="see-all-btn">See All</a>
  </div>`);

// Answers are placeholder copy: the design only shows the collapsed questions.
const FAQ = [
  ['How do I cancel a booking?', 'Open Schedule, pick the class, then tap Cancel at least 2 hours before it starts.'],
  ['How do I reschedule a class?', 'Open Schedule, pick the class, then choose another available slot.'],
  ['What is the refund policy?', 'Full refund for cancellations made more than 2 hours before class.'],
  ['How do I connect my smartwatch?', 'After check-in, tap Connect Smartwatch and follow the pairing steps.'],
];

const CONTACTS = [['Live Chat', 'Quick response (2–5 min)', true], ['Email', 'support@provefit.app'], ['Phone', '+62 21 1234 5678']];

S['settings-bantuan'] = () => settings('Help', `
  <div class="set-sec">
    <h2>Help Center</h2>
    <label class="help-search">${ic('058ab')}<input type="search" placeholder="Search questions..."></label>
  </div>
  <div class="set-sec gap-8">
    ${FAQ.map(([q, a]) => `
      <button class="faq" data-toggle>
        <span class="faq-q"><span>${q}</span>${ic('6e32b')}</span>
        <span class="faq-a">${a}</span>
      </button>`).join('')}
  </div>
  <div class="set-sec">
    <h2>Contact Us</h2>
    ${CONTACTS.map(([title, sub, online]) => `
      <a class="set-row contact">
        <div><b>${title}${online ? ic('aa75f') : ''}</b><span>${sub}</span></div>${ic('13516')}
      </a>`).join('')}
  </div>
  <div class="set-sec gap-8">
    <h2>About the App</h2>
    <div class="set-row"><span>App Version</span><small class="version">2.1.0</small></div>
    ${navRow('Terms &amp; Conditions')}
    ${navRow('Privacy Policy')}
  </div>
  <button class="rate-cta">${ic('ff940')}Rate Us on the App Store</button>`);
