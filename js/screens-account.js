// Jadwal (My Classes), profil, notifications

const MY_STATS = [['Classes', '12', 'this month'], ['Hours', '18', 'trained'], ['Attendance', '92%', 'accuracy']];
const ACTIVITY = [['Yoga', 40, '#00d0e7'], ['HIIT', 35, '#f59e0b'], ['Dance', 25, '#3b82f6']];
const WEEK = [['Mon', '26'], ['Tue', '27'], ['Wed', '28'], ['Thu', '29'], ['Fri', '30'], ['Sat', '31'], ['Sun', '01']];

const UPCOMING = ['Not Started', 'upcoming', 'class-detail-upcoming'];
const ONGOING = ['In Progress', 'ongoing', 'class-detail-ongoing'];
const DONE = ['Completed', 'done', 'class-detail-done'];

// Classes per day, keyed by the day number in WEEK. A day with an empty list shows the empty state.
// Each class: [time, class, gym, [status label, status key, route]]
const MY_SCHEDULE = {
  26: ['Mon, Jan 26', [
    ['07:00 - 08:00', 'Pilates Core', 'Body Balance', DONE],
    ['17:00 - 18:00', 'Boxing Fit', 'Iron Arena Gym', DONE],
  ]],
  27: ['Tue, Jan 27', []],
  28: ['Today, Wed, Jan 28', [
    ['08:00 - 09:15', 'Morning Vinyasa Yoga', 'Zen Studio', UPCOMING],
    ['12:00 - 13:00', 'HIIT Blast Power', 'Iron Arena Gym', ONGOING],
    ['18:30 - 19:30', 'Zumba Energy Blast', 'FitZone Studio', DONE],
  ]],
  29: ['Thu, Jan 29', [
    ['06:30 - 07:30', 'Morning Yoga', 'FitZone Studio', UPCOMING],
    ['18:30 - 19:30', 'Cardio Dance Party', 'Pulse Wellness', UPCOMING],
  ]],
  30: ['Fri, Jan 30', [
    ['12:00 - 13:00', 'HIIT Blast Power', 'Iron Arena Gym', UPCOMING],
  ]],
  31: ['Sat, Jan 31', []],
  1: ['Sun, Feb 1', [
    ['09:00 - 10:15', 'Yoga Flow', 'Zen Studio', UPCOMING],
  ]],
};

const TODAY = 28;
let selectedDay = TODAY; // survives leaving and coming back to the screen

const dayClasses = (day) => {
  const classes = MY_SCHEDULE[day][1];
  if (!classes.length) {
    return `
      <div class="empty-day">
        <span>${ic('917c6')}</span>
        <h3>No classes on this day</h3>
        <p>Book a class to fill your schedule.</p>
        <button class="add-btn" data-go="browse">${ic('04cc1')}Find a Class</button>
      </div>`;
  }
  return classes.map(([time, name, gym, [status, key, route]]) => `
    <a class="my-class" data-go="${route}">
      <div class="row-between"><span class="my-time">${time}</span><span class="status ${key}">${status}</span></div>
      <div><h3>${name}</h3><p>${gym}</p></div>
    </a>`).join('');
};

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-day]');
  if (!btn) return;
  selectedDay = +btn.dataset.day;
  document.getElementById('day-label').textContent = MY_SCHEDULE[selectedDay][0];
  document.getElementById('my-classes').innerHTML = dayClasses(selectedDay);
});

S['jadwal'] = () => `
  <section class="screen">
    <div class="scroll">
      ${statusBar()}
      <div class="title-header">
        <h1>My Classes</h1>
        <button class="add-btn" data-go="browse">${ic('04cc1')}Add Class</button>
      </div>
      <div class="list-section">
        <div class="block gap-10">
          <h2 class="caps">Class Summary</h2>
          <div class="stats-row">
            ${MY_STATS.map(([label, value, sub]) => `<div class="stat-card"><span>${label}</span><b>${value}</b><small>${sub}</small></div>`).join('')}
          </div>
        </div>
        <div class="block gap-10">
          <h2 class="caps">This Week’s Activity</h2>
          <div class="activity-card">
            ${ACTIVITY.map(([name, pct, color]) => `
              <div class="row-between activity-row"><span>${name}</span><b>${pct}%</b></div>
              <div class="bar-track"><i style="width:${pct * 3}px;background:${color}"></i></div>`).join('')}
          </div>
        </div>
        <div class="days week pb-10" data-group>
          ${WEEK.map(([d, n]) => `<button class="day${+n === selectedDay ? ' on' : ''}" data-pick data-day="${+n}"><span>${d}</span><b>${n}</b></button>`).join('')}
        </div>
        <p class="day-label" id="day-label">${MY_SCHEDULE[selectedDay][0]}</p>
        <div class="my-list" id="my-classes">${dayClasses(selectedDay)}</div>
      </div>
    </div>
    ${bottomNav('jadwal')}
  </section>`;

const MENU = [
  ['3e176', 'Account', 'settings-akun'],
  ['71789', 'Notifications', 'settings-notifikasi'],
  ['f3e02', 'Payment', 'settings-pembayaran'],
  ['a2522', 'Help', 'settings-bantuan'],
];

S['profil'] = () => `
  <section class="screen">
    <div class="scroll">
      ${statusBar()}
      <div class="profile-header">
        <div class="avatar">${ph('f4e1e', 'cover')}</div>
        <div class="user-meta"><h1>Alexander</h1><span class="member-badge">GOLD MEMBER</span></div>
      </div>
      <div class="settings-menu">
        <h2>Settings</h2>
        ${MENU.map(([icon, label, route]) => `
          <a class="menu-item" data-go="${route}"><span>${ic(icon)}${label}</span>${ic('c0581')}</a>`).join('')}
        <a class="menu-item danger" data-go="login"><span>${ic('a02e5')}Log Out</span></a>
      </div>
    </div>
    ${bottomNav('profil')}
  </section>`;

// [icon, icon bg, label color, label, time, title, text]
const NOTIF_TODAY = [
  ['917c6', 'rgba(0,208,231,.13)', '#00d0e7', 'Class Reminders', '07:00', 'Morning Vinyasa Yoga', 'Morning Vinyasa Yoga starts in 30 minutes. Get ready!'],
  ['fde7c', 'rgba(51,217,153,.13)', '#33d999', 'Booking Confirmed', '09:15', 'HIIT Blast Power Confirmed', 'HIIT Blast Power is booked for Thursday, January 30.'],
  ['72470', 'rgba(255,140,51,.13)', '#ff8c33', 'Special Offer', '10:30', '25% Off at Zen Studio', 'Get 25% off your first class at Zen Studio! Use code ZENFIT25.'],
];
const NOTIF_OLD = [
  ['Class Completed', 'Yoga Flow Completed', 'Well done! You completed Yoga Flow. A 5-day streak!'],
  ['App Update', 'Prove Fit v2.1 Available', 'Prove Fit v2.1 is available. New: real-time calorie tracking.'],
];

const notifCard = (unread, icon, bg, color, label, time, title, text) => `
  <div class="notif${unread ? ' unread' : ''}">
    <span class="notif-icon" style="background:${bg}">${ic(icon)}</span>
    <div class="notif-text">
      <div class="row-between">
        <span class="notif-label" style="color:${color}">${label}${unread ? ic('4fc99', 'dot') : ''}</span>
        <time>${time}</time>
      </div>
      <h3>${title}</h3>
      <p>${text}</p>
    </div>
  </div>`;

S['notifications'] = () => `
  <section class="screen" id="notif-screen">
    ${statusBar()}
    <header class="toolbar">
      <div class="left-section">${backBtn('a85d5')}<h1 class="big">Notifications</h1></div>
      <a class="mark-read" data-mark-read>Mark all as read</a>
    </header>
    <div class="filter-tabs" data-group>
      ${['All', 'Classes', 'Offers', 'System'].map((t, i) => `<button class="ftab${i === 0 ? ' on' : ''}" data-pick>${t}</button>`).join('')}
    </div>
    <div class="scroll notif-list">
      <div class="block gap-12">
        <h2>Today</h2>
        ${NOTIF_TODAY.map((n) => notifCard(true, ...n)).join('')}
      </div>
      <div class="block gap-12">
        <h2 class="muted">Yesterday</h2>
        ${NOTIF_OLD.map(([label, title, text]) => notifCard(false, '6e9c2', 'rgba(22,27,34,.1)', '#667080', label, 'Yesterday', title, text)).join('')}
      </div>
    </div>
    ${homeInd()}
  </section>`;

document.addEventListener('click', (e) => {
  if (!e.target.closest('[data-mark-read]')) return;
  document.querySelectorAll('.notif.unread').forEach((n) => n.classList.remove('unread'));
});
