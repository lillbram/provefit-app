// Bottom sheets over browse (filter, categories) and gym screens

// Sheets render on top of the real browse screen instead of a faked dimmed copy.
const sheet = (title, closeIcon, body) => `
  ${S['browse']()}
  <div class="sheet-overlay inter">
    <div class="dim" data-back></div>
    <div class="sheet">
      <div class="drag-handle"><i></i></div>
      <div class="sheet-header">
        <h2>${title}</h2>
        <button class="close-btn" data-back aria-label="Close">${ic(closeIcon)}</button>
      </div>
      ${body}
      ${homeInd()}
    </div>
  </div>`;

const fchips = (items, active, single = false) => `
  <div class="wrap"${single ? ' data-group' : ''}>
    ${items.map((c) => `<button class="chip f${active.includes(c) ? ' on' : ''}" ${single ? 'data-pick' : 'data-toggle'}>${c}</button>`).join('')}
  </div>`;

S['filter-popup'] = () => sheet('Filter', '8289f', `
  <div class="filters">
    <div class="fsec"><h3>Class Type</h3>${fchips(['Yoga', 'HIIT', 'Dance', 'Pilates', 'Cardio', 'Strength'], ['HIIT', 'Dance'])}</div>
    <div class="fsec"><h3>Difficulty Level</h3>${fchips(['Beginner', 'Intermediate', 'Advanced'], ['Intermediate'], true)}</div>
    <div class="fsec"><h3>Time</h3>${fchips(['Morning (06–10)', 'Midday (10–14)', 'Afternoon (14–18)', 'Evening (18–22)'], ['Afternoon (14–18)'])}</div>
    <div class="fsec gap-12">
      <div class="row-between"><h3>Price Range</h3><b class="price-range">Rp100.000 - Rp500.000</b></div>
      <div class="slider">
        <i class="slider-bg"></i><i class="slider-active"></i>
        <img class="handle" style="left:40px" src="${A}aeb58.svg" alt="">
        <img class="handle" style="left:240px" src="${A}aeb58.svg" alt="">
      </div>
    </div>
    <div class="fsec">
      <h3>Minimum Rating</h3>
      <div class="stars">
        <div>${[1, 2, 3, 4, 5].map((n) => `<img data-star="${n}" src="${A}${n <= 4 ? '7c280' : '9e6ca'}.svg" alt="">`).join('')}</div>
        <span>(4+ Stars)</span>
      </div>
    </div>
  </div>
  <div class="sheet-footer">
    <button class="reset-btn" data-reset>Reset Filters</button>
    <button class="apply-btn" data-back>Apply</button>
  </div>`);

const ALL_CATEGORIES = [
  ['4a389', 'Yoga'], ['10569', 'HIIT'], ['b9282', 'Dance'],
  ['47621', 'Pilates'], ['8f7fe', 'Cardio'], ['97626', 'Strength'],
  ['cb519', 'Boxing'], ['26b31', 'Cycling'], ['ad9ac', 'Swimming'],
  ['6cc0c', 'Meditation'], ['8091a', 'Stretching'], ['97626', 'CrossFit'],
];

S['categories-popup'] = () => sheet('All Categories', '32775', `
  <div class="cat-grid" data-group>
    ${ALL_CATEGORIES.map(([icon, label]) => `<button class="cat${label === 'Dance' ? ' on' : ''}" data-pick>${ic(icon)}${label}</button>`).join('')}
  </div>`);

document.addEventListener('click', (e) => {
  const star = e.target.closest('[data-star]');
  if (star) {
    const n = +star.dataset.star;
    star.parentNode.querySelectorAll('[data-star]').forEach((el, i) => { el.src = `${A}${i < n ? '7c280' : '9e6ca'}.svg`; });
    star.parentNode.nextElementSibling.textContent = `(${n}+ Stars)`;
  }
  if (e.target.closest('[data-reset]')) {
    document.querySelectorAll('.sheet .chip.on').forEach((c) => c.classList.remove('on'));
  }
});

// ---------- gym detail (Detail / Jadwal / Ulasan) ----------

const GYM_TABS = [['gym-detail', 'Details'], ['gym-schedule', 'Schedule'], ['gym-reviews', 'Reviews']];

const gymScreen = (route, hero, content, footer = '') => `
  <section class="screen">
    ${statusBar()}
    <header class="detail-header">
      ${backBtn()}
      <div class="right-actions">
        <button class="circle-btn heart" data-toggle aria-label="Favorite">${ic('16778')}</button>
        <button class="circle-btn" aria-label="Share">${ic('22b66')}</button>
      </div>
    </header>
    <div class="scroll gym-scroll">
      <div class="gym-hero"><div class="hero-img r-16 h-180">${ph(hero, 'cover')}</div></div>
      <div class="gym-core">
        <div class="row-between">
          <h1>FitZone Studio</h1>
          <span class="rating-badge">${ic('b3e8c')}4.8</span>
        </div>
        <div class="meta-row"><b>1.5 km</b>${ic('a551e')}<span>123 Sudirman St., Jakarta</span></div>
      </div>
      <div class="tab-bar">
        ${GYM_TABS.map(([r, label]) => `<a class="${r === route ? 'on' : ''}" data-replace="${r}">${label}</a>`).join('')}
      </div>
      ${content}
      ${footer ? '' : homeInd()}
    </div>
    ${footer}
  </section>`;

const FACILITIES = [
  ['3cdef', 'Lockers'], ['f919a', 'Shower'], ['2a0e2', 'Parking'], ['9551a', 'WiFi'],
  ['dda03', 'A/C'], ['246e5', 'Towels'], ['f4b54', 'Sauna'], ['b4f54', 'Cafeteria'],
];

S['gym-detail'] = () => gymScreen('gym-detail', 'cdb9c', `
  <div class="gym-content">
    <div class="block">
      <h3>About the Gym</h3>
      <p class="body-text">FitZone Studio is a premium fitness center designed to support your wellness journey. It offers world-class equipment, certified professional instructors, and dynamic studio classes for all fitness levels.</p>
    </div>
    <div class="block">
      <h3>Amenities</h3>
      <div class="facilities">
        ${FACILITIES.map(([icon, label]) => `<span class="facility">${ic(icon)}${label}</span>`).join('')}
      </div>
    </div>
    <div class="hours-card">
      <h3>Opening Hours</h3>
      <div>
        <div class="row-between"><span>Monday–Friday</span><b>06:00 - 22:00</b></div>
        <div class="row-between"><span>Saturday–Sunday</span><b>07:00 - 20:00</b></div>
      </div>
    </div>
    <div class="block">
      <h3>Location</h3>
      <div class="location-card">
        <p>123 Sudirman St., South Jakarta</p>
        <div class="map h-100 r-10">${ph('c9397', 'cover')}</div>
      </div>
    </div>
    <div class="pt-8"><button class="btn-pill" data-replace="gym-schedule">View Available Classes</button></div>
  </div>`);

// [time, availability label, level, class, coach, price]
const GYM_CLASSES = [
  ['06:30 - 07:30', '8/20 available', 'ok', 'Morning Yoga', 'Riana Amanda', 'Rp150.000'],
  ['08:00 - 09:00', '5/15 available', 'ok', 'HIIT Blast', 'Coach Dimas', 'Rp200.000'],
  ['10:00 - 11:15', '12/20 available', 'ok', 'Pilates Core', 'Sarah Lee', 'Rp175.000'],
  ['13:00 - 14:00', '3/20 available', 'few', 'Zumba Energy', 'Maria Santos', 'Rp275.000'],
  ['16:00 - 17:00', 'Full', 'full', 'Boxing Fit', 'Coach Aldi', 'Rp225.000'],
  ['18:30 - 19:30', '10/20 available', 'ok', 'Cardio Dance', 'Yuna Park', 'Rp180.000'],
];

S['gym-schedule'] = () => gymScreen('gym-schedule', '803ae', `
  <div class="days sm" data-group>
    ${WEEK.map(([d, n]) => `<button class="day${n === '28' ? ' on' : ''}" data-pick><span>${d}</span><b>${n}</b></button>`).join('')}
  </div>
  <div class="gym-classes" data-group>
    ${GYM_CLASSES.map(([time, avail, level, name, coach, price], i) => `
      <button class="gym-class${i === 0 ? ' on' : ''}" ${level === 'full' ? 'disabled' : `data-pick data-price="${price}"`}>
        <span class="row-between"><span class="gc-time">${time}</span><span class="avail ${level}">${avail}</span></span>
        <span class="row-between bottom">
          <span class="gc-info"><b>${name}</b><span>Instructor: ${coach}</span></span>
          <b class="gc-price">${price}</b>
        </span>
      </button>`).join('')}
  </div>`, `
  <footer class="sticky-bar">
    <div class="price-side"><span>Total price</span><b id="gym-total">Rp150.000</b></div>
    <button class="btn-book" data-go="checkout-screen">Book this class</button>
  </footer>`);

const RATING_BARS = [[5, 98, '65%'], [4, 33, '22%'], [3, 12, '8%'], [2, 5, '3%'], [1, 3, '2%']];

const REVIEWS = [
  ['54656', 'Andi Pratama', '2 weeks ago', 5, 'The equipment is excellent and clean. Friendly instructors—I highly recommend the HIIT Blast class!'],
  ['c72de', 'Sari Dewi', '1 month ago', 4, 'The studio classes are varied and fun. Parking can be limited during busy hours.'],
  ['c653d', 'Rizky F.', '1 month ago', 5, 'HIIT Blast with Coach Dimas is amazing! Always motivating, with infectious energy. The shower facilities are good too.'],
];

S['gym-reviews'] = () => gymScreen('gym-reviews', '40c11', `
  <div class="rating-overview">
    <div class="overview-left">
      <b>4.8</b>
      <div>${ic('e68b2').repeat(5)}</div>
      <small>324 reviews</small>
    </div>
    <div class="rating-bars">
      ${RATING_BARS.map(([n, w, pct]) => `
        <div><span>${n}</span><div class="bar-track thin"><i style="width:${w}px;background:var(--primary)"></i></div><small>${pct}</small></div>`).join('')}
    </div>
  </div>
  <div class="reviews">
    ${REVIEWS.map(([avatar, name, when, stars, text]) => `
      <div class="review">
        <div class="row-between">
          <div class="reviewer">
            <img src="${A}${avatar}.png" width="32" height="32" alt="">
            <div><b>${name}</b><small>${when}</small></div>
          </div>
          <span class="stars-badge">${ic('e68b2')}${stars}</span>
        </div>
        <p>${text}</p>
      </div>`).join('')}
  </div>`);

// picking a class in gym schedule updates the total in the sticky bar
document.addEventListener('click', (e) => {
  const card = e.target.closest('[data-price]');
  const total = document.getElementById('gym-total');
  if (card && total) total.textContent = card.dataset.price;
});
