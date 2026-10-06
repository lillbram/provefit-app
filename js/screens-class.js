// My class flow: class detail (3 states), attendance QR, check-in success

const CLASS_STATE = {
  upcoming: ['Not Started', true],
  ongoing: ['In Progress', false],
  done: ['Completed', true],
};

const classBar = (state) => {
  if (state === 'done') return `<footer class="cd-bar bare">${homeInd(true)}</footer>`;
  const cta = state === 'ongoing'
    ? '<button class="btn-join" data-go="class-enroll">Join Class</button>'
    : '<button class="btn-join disabled" disabled>Not started</button>';
  return `
    <footer class="cd-bar">
      <div class="cd-btns">
        <button class="btn-reminder" data-reminder-open>${ic('67593')}Set Reminder</button>
        ${cta}
      </div>
      ${homeInd(true)}
    </footer>`;
};

const myClassDetail = (state) => {
  const [label, showRating] = CLASS_STATE[state];
  const vsep = `<span class="vsep"><img src="${A}059ea.svg" alt=""></span>`;
  return `
  <section class="screen">
    ${statusBar()}
    <header class="detail-header">
      ${backBtn()}
      <h1>Class Details</h1>
      <button class="circle-btn" data-go="share-socmed" aria-label="Share">${ic('22b66')}</button>
    </header>
    <div class="scroll cd-scroll">
      <div class="cd-hero"><div class="hero-img r-16">${ph('f619e', 'cover')}</div></div>
      <div class="cd-sec gap-16">
        <div class="row-between top">
          <div class="tags-row gap-8"><span class="tag main lg">Yoga</span><span class="tag lg">Beginner</span></div>
          <span class="status ${state}">${label}</span>
        </div>
        <h1 class="cd-title">Morning Vinyasa Yoga</h1>
        <div class="stats-pill">
          <span>${ic('9412c')}<b>4.8</b><small>Rating</small></span>${vsep}
          <span>${ic('e7c82')}<b>75 min</b></span>${vsep}
          <span>${ic('33bb9')}<b>12/20</b><small>Participants</small></span>
        </div>
      </div>
      <div class="cd-sec">
        <h2>Instructor</h2>
        <div class="instructor-card">
          <div class="instructor-avatar">${ph('71a36', 'cover')}</div>
          <div class="instructor-details"><b>Riana Amanda</b><span>Yoga Certified Instructor</span></div>
          ${showRating ? `<span class="instructor-rating">${ic('bddc4')}4.9</span>` : ''}
        </div>
      </div>
      <div class="cd-sec">
        <h2>Schedule &amp; Location</h2>
        <div class="loc-card">
          <div class="loc-rows">
            <span>${ic('ee022')}Wednesday, January 28, 2025</span>
            <span>${ic('1c47e')}08:00–09:15 UTC+7</span>
          </div>
          <img class="line" src="${A}10c1f.svg" alt="">
          <div class="loc">
            <span class="pin">${ic('122b9')}</span>
            <div><b>Zen Studio</b><span>45 Sudirman St., Jakarta</span></div>
          </div>
          <div class="map h-100">${ph('90c94', 'cover')}</div>
        </div>
      </div>
    </div>
    ${classBar(state)}
  </section>`;
};

S['class-detail-upcoming'] = () => myClassDetail('upcoming');
S['class-detail-ongoing'] = () => myClassDetail('ongoing');
S['class-detail-done'] = () => myClassDetail('done');

S['class-enroll'] = () => `
  <section class="screen">
    <div class="scroll">
      ${statusBar()}
      ${toolbar('Attendance Details', 'ac35e')}
      <div class="enroll-body">
        <div class="summary-card p-18 r-16 gap-14">
          <div class="class-titles"><h3 class="fs-18">Morning Vinyasa Yoga</h3><p class="fs-13">Zen Studio</p></div>
          <img class="line" src="${A}f3ed0.svg" alt="">
          <div class="detail-rows gap-10">
            ${detailRow('Date', 'Wednesday, January 28')}
            ${detailRow('Time', '08:00 - 09:15')}
            ${detailRow('Instructor', 'Riana Amanda')}
          </div>
        </div>
        <div class="qr-section">
          <span class="status done px-10">Confirmed</span>
          <a class="qr-wrapper" data-go="class-enrolled" aria-label="Scan QR">${ph('26a6b', 'cover')}</a>
          <div class="booking-code">
            <small>BOOKING CODE</small>
            <div><b>PF-284901</b><button class="copy-btn" data-copy="PF-284901" aria-label="Copy">${ic('a4d6d')}</button></div>
          </div>
          <img class="line" src="${A}ef90c.svg" alt="">
          <p>Show this QR or booking code at the gym reception.</p>
        </div>
      </div>
    </div>
    ${homeInd(true)}
  </section>`;

S['class-enrolled'] = () => `
  <section class="screen">
    <div class="scroll">
      ${statusBar()}
      <div class="success-hero pt-40">
        <div class="glow-badge"><div>${ic('5a24b')}</div></div>
        <div class="titles">
          <h1>Check-in Successful!</h1>
          <p>Have a great workout! Enjoy your class.</p>
        </div>
      </div>
      <div class="receipt col gap-16">
        <div class="summary-card p-20 r-16">
          <div class="class-titles"><h3>Morning Vinyasa Yoga</h3><p class="fs-13">Zen Studio • Riana Amanda</p></div>
          <img class="line" src="${A}ef90c.svg" alt="">
          <div class="detail-rows">
            ${detailRow('Class Time', '08:00 - 09:15')}
            ${detailRow('Check-in Status', `${ic('add34')}Checked in: 07:52 UTC+7`, 'primary with-ic')}
          </div>
        </div>
        <div class="tip-card">
          <span>${ic('41dd0')}</span>
          <p>Tip: Remember to stretch before class!</p>
        </div>
        <button class="btn-watch" data-go="smartwatch-connected">${ic('70d3e')}Connect Smartwatch</button>
      </div>
    </div>
    <footer class="plain-footer">
      <button class="btn-cta" data-go="jadwal">Back to Schedule</button>
      ${homeInd(true)}
    </footer>
  </section>`;

document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-copy]');
  if (!btn) return;
  navigator.clipboard?.writeText(btn.dataset.copy).catch(() => {});
  btn.classList.add('on');
  setTimeout(() => btn.classList.remove('on'), 800);
});

// ---------- Set Reminder popup (opens over the class detail screen) ----------

const REMINDER_OPTIONS = ['15 minutes before class', '1 hour before class', '1 day before class'];

const reminderPopup = () => `
  <div class="modal-overlay" id="reminder-modal">
    <div class="dim" data-reminder-close></div>
    <div class="reminder-popup" role="dialog" aria-label="Set Reminder">
      <div class="popup-header">
        <h2>Set Reminder</h2>
        <p>Choose when you want to be reminded about this class.</p>
      </div>
      <div class="reminder-options">
        <h3>Reminder Time</h3>
        <div class="radio-list" data-group>
          ${REMINDER_OPTIONS.map((label, i) => `
            <button class="radio-row${i === 0 ? ' on' : ''}" data-pick>
              <i class="radio-on"></i><i class="radio-off"></i>${label}
            </button>`).join('')}
        </div>
        <label class="custom-time">
          <span>Custom Time</span>
          <input type="text" placeholder="e.g. 07:45 AM">
        </label>
      </div>
      <div class="popup-actions">
        <button class="btn-round" data-reminder-save>Set Reminder</button>
        <button class="btn-round outline" data-reminder-close>Cancel</button>
      </div>
    </div>
  </div>`;

// No Figma frame exists for this state: built from the payment-success badge and the popup's own buttons.
const reminderSuccess = (when) => `
  <div class="modal-overlay" id="reminder-modal">
    <div class="dim" data-reminder-close></div>
    <div class="reminder-popup success" role="dialog" aria-label="Reminder Set">
      <div class="glow-badge"><div>${ic('4ee56')}</div></div>
      <div class="titles">
        <h2>Reminder Set!</h2>
        <p>We’ll remind you ${when}.</p>
      </div>
      <button class="btn-round" data-reminder-close>Done</button>
    </div>
  </div>`;

document.addEventListener('click', (e) => {
  const app = document.getElementById('app');
  const modal = document.getElementById('reminder-modal');
  if (e.target.closest('[data-reminder-open]')) {
    if (!modal) app.insertAdjacentHTML('beforeend', reminderPopup());
    return;
  }
  if (!modal) return;
  if (e.target.closest('[data-reminder-save]')) {
    const picked = modal.querySelector('.radio-row.on');
    const custom = modal.querySelector('.custom-time input').value.trim();
    const when = picked ? picked.textContent.trim() : custom ? `at ${custom}` : REMINDER_OPTIONS[0];
    // mark the trigger button so the prototype shows the reminder as set
    app.querySelector('[data-reminder-open]')?.classList.add('on');
    modal.outerHTML = reminderSuccess(when);
  } else if (e.target.closest('[data-reminder-close]')) {
    modal.remove();
  }
});

// typing a custom time clears the preset choice
document.addEventListener('input', (e) => {
  if (!e.target.closest('.custom-time') || !e.target.value) return;
  document.querySelectorAll('#reminder-modal .radio-row.on').forEach((r) => r.classList.remove('on'));
});
