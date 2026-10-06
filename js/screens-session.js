// Live session with smartwatch, activity summary, share result

const navHeader = (title, icon = 'f04b5') => `
  <header class="header-nav">
    <button class="circle-btn lg" data-back aria-label="Back">${ic(icon)}</button>
    <h1>${title}</h1><span class="spacer-40"></span>
  </header>`;

const LIVE_STATS = [
  ['ef4bd', 'Heart Rate', '142 BPM'],
  ['83456', 'Calories', '186 kcal'],
  ['1cc06', 'Steps', '2,340'],
  ['b5a12', 'Duration', '32:15'],
];

S['smartwatch-connected'] = () => `
  <section class="screen">
    <div class="scroll">
      ${statusBar()}
      ${navHeader('Active Session')}
      <div class="session-body">
        <div class="live-bar"><span>${ic('5522c')}Live Session</span><time>00:32:15</time></div>
        <div class="class-info">
          <div class="class-thumb sz-48">${ph('cb1d2', 'cover')}</div>
          <div><b>Morning Vinyasa Yoga</b><span>Zen Studio • 08:00 - 09:15</span></div>
        </div>
        <div class="watch-card">
          <div class="watch">
            <i class="band top"></i><i class="band bottom"></i>
            <div class="watch-body">${ic('ef4bd')}<b>142</b><small>BPM</small></div>
          </div>
          <div class="watch-status">
            <span class="watch-badge">${ic('e4fc9')}Apple Watch SE</span>
            <small>Smartwatch Connected</small>
          </div>
          <p>Track your progress on your smartwatch. Your data syncs automatically after class.</p>
        </div>
        <div class="live-grid">
          ${LIVE_STATS.map(([icon, label, value]) => `
            <div class="live-stat"><span>${ic(icon)}${label}</span><b>${value}</b></div>`).join('')}
        </div>
      </div>
    </div>
    <footer class="plain-footer pt-0">
      <button class="btn-cta danger" data-go="class-summary">End Session</button>
      ${homeInd(true)}
    </footer>
  </section>`;

// [label, value, color]
const SESSION_STATS = [
  ['Class Duration', '75 min', ''],
  ['Calories Burned', '420 kcal', '#00d0e7'],
  ['Average Heart Rate', '128 BPM', '#ef4444'],
  ['Step Count', '4,520 steps', ''],
];

// [label, minutes, bar width px, color]
const HR_ZONES = [
  ['Peak (Max Effort)', 8, 78, '#ef4444'],
  ['Cardio (Aerobic)', 22, 202, '#f59e0b'],
  ['Fat Burn', 30, 264, '#eab308'],
  ['Warm-up', 15, 140, '#22c55e'],
];

S['class-summary'] = () => `
  <section class="screen">
    <div class="scroll">
      ${statusBar()}
      ${navHeader('Activity Summary')}
      <div class="session-body">
        <div class="done-banner">
          <span class="done-badge">${ic('dcfe2')}</span>
          <div><h2>Class Completed!</h2><p>Wed, Jan 28 • Morning Vinyasa Yoga</p></div>
        </div>
        <div class="summary-card p-18 r-16 gap-14">
          <div class="row-between"><h3 class="caps muted">Session Stats</h3><small class="src">Apple Watch Data</small></div>
          <img class="line" src="${A}f3ed0.svg" alt="">
          <div class="detail-rows">
            ${SESSION_STATS.map(([label, value, color]) => `
              <div class="row-between stat-row"><span>${label}</span><b${color ? ` style="color:${color}"` : ''}>${value}</b></div>`).join('')}
          </div>
        </div>
        <div class="summary-card p-18 r-16 gap-14">
          <h3 class="caps muted">Heart Rate Zones</h3>
          <div class="detail-rows">
            ${HR_ZONES.map(([label, min, width, color]) => `
              <div class="zone">
                <div class="row-between"><span>${label}</span><b>${min} m</b></div>
                <div class="bar-track"><i style="width:${width}px;background:${color}"></i></div>
              </div>`).join('')}
          </div>
        </div>
        <div class="perf-card">
          <span>${ic('51060')}</span>
          <div><b>Performance vs. Average</b><p>This session was 15% more active than your average workout.</p></div>
        </div>
      </div>
    </div>
    <footer class="plain-footer pt-0">
      <button class="btn-cta" data-go="beranda">Back to Home</button>
      <button class="btn-cta outline" data-go="share-socmed">Share Results</button>
      ${homeInd(true)}
    </footer>
  </section>`;

const DESTINATIONS = [['e231c', 'Stories'], ['16bcd', 'WhatsApp'], ['1c403', 'Twitter / X'], ['33072', 'More']];

S['share-socmed'] = () => `
  <section class="screen">
    ${statusBar()}
    ${navHeader('Share Results', 'a85d5')}
    <div class="scroll share-preview">
      <div class="share-card">
        ${ph('5c5f7', 'cover')}
        <span class="glass share-camera">${ic('e769f')}</span>
        <div class="glass share-heading"><small>Workout Complete!</small><b>Morning Vinyasa Yoga</b></div>
        <div class="glass share-stats">
          <div><small>DURATION</small><b>75 Min</b></div>
          <div><small>CALORIES</small><b>420 kcal</b></div>
          <div><small>AVG. HR</small><b>128 BPM</b></div>
        </div>
        <div class="glass share-brand"><i>${ic('24b5d')}</i>PROVE FIT</div>
      </div>
    </div>
    <div class="destinations">
      <img class="line" src="${A}48312.svg" alt="">
      <div class="row-between" data-group>
        ${DESTINATIONS.map(([icon, label], i) => `
          <button class="dest${i === 1 ? ' on' : ''}" data-pick>
            <span class="dest-icon">${ic(icon)}</span>${label}
            <i class="dest-check">${ic('75e3e')}</i>
          </button>`).join('')}
      </div>
    </div>
    <footer class="share-footer">
      <button class="btn-save">${ic('28615')}Save to Gallery</button>
      <button class="btn-cta r-12" data-go="beranda">Share Now</button>
      ${homeInd(true)}
    </footer>
  </section>`;
