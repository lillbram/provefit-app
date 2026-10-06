// Tab screens: beranda, browse (Cari)

const STATS = [
  ['Classes This Month', '24 Classes', '#00d0e7'],
  ['Total Workout Hours', '36 Hours', '#33d999'],
  ['Calories Burned', '8.4k kcal', '#ff8c33'],
  ['Attendance Rate', '92%', '#6699ff'],
];

const RECOMMENDED = [
  ['399ef', 'HIIT Performance', 'Iron Arena Gym', '4.9', 'Rp150k'],
  ['3c94b', 'Vinyasa Yoga Flow', 'Zen Studio', '4.8', 'Rp120k'],
];

S['beranda'] = () => `
  <section class="screen">
    <div class="scroll">
      ${statusBar()}
      <div class="greeting">
        <div class="user-header">
          <div>
            <p class="hello">Good morning,</p>
            <h1>Alexander</h1>
          </div>
          <button class="notif-btn" data-go="notifications" aria-label="Notifications">${ic('71789')}</button>
        </div>
        <div class="stats">
          ${STATS.map(([label, value, color]) => `
            <div class="stat"><span>${label}</span><b style="color:${color}">${value}</b></div>`).join('')}
        </div>
      </div>

      <div class="section pb-20">
        <h2>Upcoming Class</h2>
        <a class="reminder" data-go="class-detail-ongoing">
          <div class="row-between">
            <span class="badge-today">TODAY</span>
            <span class="reminder-time">18:30 UTC+7</span>
          </div>
          <div>
            <h3>Zumba Energy Blast</h3>
            <p>FitZone Studio · Kebayoran Baru</p>
          </div>
        </a>
      </div>

      <div class="section pb-24">
        <div class="promo">
          ${ph('9dd6d', 'cover')}
          <div class="promo-shade"></div>
          <div class="promo-body">
            <div>
              <span class="promo-tag">LIMITED-TIME OFFER</span>
              <h3>20% Off New Studio Packages</h3>
            </div>
            <p>Use code PROVEFIT20 for your first class booking at a new partner studio.</p>
          </div>
        </div>
      </div>

      <div class="section pb-24">
        <div class="row-between section-head">
          <h2>Recommended for You</h2>
          <a class="see-all muted" data-go="browse">See all</a>
        </div>
        <div class="carousel">
          ${RECOMMENDED.map(([img, name, gym, rating, price]) => `
            <a class="preview-card" data-go="class-detail-description">
              <div class="thumb h-90">${ph(img, 'cover')}</div>
              <div class="preview-body">
                <h4>${name}</h4>
                <p>${gym}</p>
                <div class="row-between pt-6">
                  <span class="rating">${ic('2b992')}${rating}</span>
                  <b class="price">${price}</b>
                </div>
              </div>
            </a>`).join('')}
        </div>
      </div>
    </div>
    ${bottomNav('beranda')}
  </section>`;

const CATEGORIES = ['Dance', 'Strength', 'Yoga', 'HIIT', 'Pilates'];

const GYMS = [
  ['d0585', 'FitZone Studio', '0.5 km', '4.8', '12 classes today'],
  ['fe82c', 'Performance Gym', '1.1 km', '4.6', '8 classes today'],
  ['2ea4b', 'Zen Space', '1.9 km', '4.9', '6 classes today'],
];

const CLASSES = [
  ['12ed3', 'Zumba Energy Blast', 'FitZone Studio', '130 enrolled', 'Rp275.000'],
  ['6b6b7', 'Cardio Dance Party', 'Pulse Wellness', '85 enrolled', 'Rp300.000'],
  ['63709', 'PoundFit Rhythm', 'Core &amp; Beat', '60 enrolled', 'Rp325.000'],
  ['ac8f1', 'Yoga Flow', 'Zen Studio', '45 enrolled', 'Rp225.000'],
  ['846cb', 'HIIT Performance', 'Iron Arena', '110 enrolled', 'Rp375.000'],
  ['45637', 'Core Pilates', 'Body Balance', '70 enrolled', 'Rp300.000'],
];

S['browse'] = () => `
  <section class="screen inter">
    <div class="scroll">
      ${statusBar()}
      <div class="browse-title"><h1>Find Your Class</h1></div>
      <div class="search-section">
        <label class="search-bar">${ic('ec1d8')}<input type="search" placeholder="Find a class or gym"></label>
      </div>
      <div class="chips" data-group>
        <button class="chip" data-go="filter-popup" aria-label="Filter">${ic('fa1b3')}</button>
        ${CATEGORIES.map((c, i) => `<button class="chip${i === 0 ? ' on' : ''}" data-pick>${c}</button>`).join('')}
      </div>

      <div class="section pb-20">
        <div class="row-between section-head">
          <h2>Nearby Gyms</h2>
          <a class="see-all" data-go="categories-popup">See all</a>
        </div>
        <div class="carousel">
          ${GYMS.map(([img, name, dist, rating, count]) => `
            <a class="gym-card" data-go="gym-detail">
              <div class="thumb h-72">${ph(img, 'cover')}</div>
              <div class="gym-body">
                <h4>${name}</h4>
                <div class="row-between"><span>${dist}</span><span class="rating">${ic('79588')}${rating}</span></div>
                <span>${count}</span>
              </div>
            </a>`).join('')}
        </div>
      </div>

      <div class="section pb-24">
        <h2>Classes for You</h2>
        <div class="class-grid">
          ${CLASSES.map(([img, name, gym, joined, price]) => `
            <a class="class-card" data-go="class-detail-description">
              <div class="thumb h-123">${ph(img, 'cover')}</div>
              <div class="class-body">
                <div><h4>${name}</h4><p>${gym}</p></div>
                <span>${joined}</span>
                <b class="price">${price}</b>
              </div>
            </a>`).join('')}
        </div>
      </div>
    </div>
    ${bottomNav('browse')}
  </section>`;
