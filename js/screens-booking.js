// Booking flow: class detail (Deskripsi / Jadwal), checkout, payment success

const slot = ([name, coach, time, left, low], { on = false, hl = false, sm = false, icon = '90897' } = {}) => `
  <button class="slot${on ? ' on' : ''}${hl ? ' hl' : ''}${sm ? ' sm' : ''}" ${hl ? '' : 'data-pick'}>
    <span class="gym-logo">${ic(icon)}</span>
    <span class="slot-left"><b>${name}</b><span>Instructor: ${coach}</span></span>
    <span class="slot-right"><i class="time-badge">${time}</i><b class="${low ? 'low' : ''}">${left} spots left</b></span>
  </button>`;

const classDetail = (tab, content, footer = '') => `
  <section class="screen">
    ${statusBar()}
    <header class="detail-header">
      ${backBtn()}
      <div class="right-actions">
        <button class="circle-btn heart" data-toggle aria-label="Favorite">${ic('16778')}</button>
        <button class="circle-btn" data-go="share-socmed" aria-label="Share">${ic('22b66')}</button>
      </div>
    </header>
    <div class="scroll pb-20">
      <div class="hero-block"><div class="hero-img">${ph('c129a', 'cover')}</div></div>
      <div class="core-info">
        <div class="tags-row">
          <span class="tag main">Zumba</span><span class="tag">Intermediate</span><span class="tag">45–90 min</span>
        </div>
        <h1>Zumba Energy Blast</h1>
      </div>
      <div class="tab-bar">
        <a class="${tab === 'desc' ? 'on' : ''}" data-replace="class-detail-description">Description</a>
        <a class="${tab === 'schedule' ? 'on' : ''}" data-replace="class-detail-schedule">Schedule</a>
      </div>
      ${content}
    </div>
    ${footer}
  </section>`;

const bookBar = `
  <footer class="sticky-bar">
    <div class="price-side"><span>Total price</span><b>Rp275.000</b></div>
    <button class="btn-book" data-go="checkout-screen">Book this class</button>
  </footer>`;

const GYM_AVAIL = [['Gym A', 1], ['Gym B', 0], ['Gym C', 1], ['Gym D', 1], ['Gym E', 0], ['Gym F', 1], ['Gym G', 0]];

S['class-detail-description'] = () => classDetail('desc', `
  <div class="tab-content gap-20">
    <a class="info-card" data-go="gym-detail">
      <div class="row-between">
        <div><h3>FitZone Studio</h3><p>123 Sudirman St., Jakarta</p></div>
        <span class="dist">0.5 km</span>
      </div>
      <div class="map">${ph('24714', 'cover')}</div>
    </a>
    <div class="block">
      <h3>Class Description</h3>
      <p class="body-text">Zumba Energy Blast is a high-energy dance fitness class combining Latin rhythms with easy-to-follow moves. Suitable for all fitness levels, it burns 400–600 calories per session while keeping you smiling.</p>
    </div>
    <div class="block">
      <h3>What to Bring</h3>
      <div class="wrap">
        ${['Water Bottle', 'Towels', 'Comfortable Shoes', 'Your Best Energy'].map((t) => `<span class="pill">${t}</span>`).join('')}
      </div>
    </div>
    <div class="block gap-10">
      <h3>Available Gyms</h3>
      <div class="wrap">
        ${GYM_AVAIL.map(([g, on]) => `<span class="gym-tag${on ? ' on' : ''}">${g}</span>`).join('')}
      </div>
    </div>
  </div>`, bookBar);

const DAYS = [['Mon', 27], ['Tue', 28], ['Wed', 29], ['Thu', 30], ['Fri', 31], ['Sat', 1], ['Sun', 2]];

const SLOTS = [
  ['FitZone Studio', 'Maria S.', '18:00', 4, false],
  ['PowerHouse Gym', 'Jason K.', '07:30', 8, false],
  ['PowerHouse Gym', 'Jason K.', '07:30', 2, true],
];

S['class-detail-schedule'] = () => classDetail('schedule', `
  <div class="tab-content gap-16">
    <div class="days" data-group>
      ${DAYS.map(([d, n]) => `<button class="day${n === 30 ? ' on' : ''}" data-pick><span>${d}</span><b>${n}</b></button>`).join('')}
    </div>
    <div class="slots" data-group>
      ${SLOTS.map((s, i) => slot(s, { on: i === 0 })).join('')}
    </div>
  </div>`, bookBar);

const detailRow = (label, value, cls = '') =>
  `<div class="row-between detail-row"><span>${label}</span><b class="${cls}">${value}</b></div>`;

// [name, coach, time, spots left, low stock, price]. Prices are placeholders: the design shows none for these.
const OTHER_CLASSES = [
  ['HIIT Burn', 'Alex G.', '09:00', 5, false, 200000],
  ['Yoga Flow', 'Serena W.', '10:30', 3, true, 225000],
  ['Spin Class', 'Marcus L.', '12:00', 7, false, 250000],
];

const BASE_PRICE = 275000;
const cart = new Set(); // indexes into OTHER_CLASSES added on the payment page
const rupiah = (n) => 'Rp' + n.toLocaleString('id-ID');
const cartTotal = () => [...cart].reduce((sum, i) => sum + OTHER_CLASSES[i][5], BASE_PRICE);

const extraSlot = ([name, coach, time, left, low, price], i) => `
  <button class="slot hl sm extra${cart.has(i) ? ' on' : ''}" data-cart="${i}">
    <span class="gym-logo">${ic('a9f42')}</span>
    <span class="slot-left"><b>${name}</b><span>Instructor: ${coach}</span></span>
    <span class="slot-right"><i class="time-badge">${time}</i><b class="${low ? 'low' : ''}">${left} spots left</b></span>
    <span class="slot-cart"><b>${rupiah(price)}</b><i class="add-pill"></i></span>
  </button>`;

// order lines inside the summary card; hidden while only the original class is in the cart
const cartLines = () => (cart.size === 0 ? '' : `
  <img class="line" src="${A}f3ed0.svg" alt="">
  <div class="detail-rows">
    ${detailRow('Zumba Energy Blast', rupiah(BASE_PRICE))}
    ${[...cart].sort().map((i) => detailRow(`${OTHER_CLASSES[i][0]} · ${OTHER_CLASSES[i][2]}`, rupiah(OTHER_CLASSES[i][5]))).join('')}
    ${detailRow(`Total (${cart.size + 1} classes)`, rupiah(cartTotal()), 'primary')}
  </div>`);

document.addEventListener('click', (e) => {
  const card = e.target.closest('[data-cart]');
  if (!card) return;
  const i = +card.dataset.cart;
  cart.has(i) ? cart.delete(i) : cart.add(i);
  card.classList.toggle('on', cart.has(i));
  document.getElementById('cart-lines').innerHTML = cartLines();
  document.getElementById('pay-total').textContent = rupiah(cartTotal());
});

S['checkout-screen'] = () => `
  <section class="screen">
    <div class="scroll">
      ${statusBar()}
      ${toolbar('Payment')}
      <div class="checkout-body">
        <div class="summary-card p-18">
          <div class="card-top">
            <div class="class-thumb">${ph('7a775', 'cover')}</div>
            <div class="class-titles"><h3>Zumba Energy Blast</h3><p class="fs-13">PowerHouse Gym • Maria Santos</p></div>
          </div>
          <img class="line" src="${A}f3ed0.svg" alt="">
          <div class="detail-rows">
            ${detailRow('Date', 'Wednesday, October 16')}
            ${detailRow('Time', '07:30')}
            ${detailRow('Duration', '45 min')}
          </div>
          <div id="cart-lines" class="cart-lines">${cartLines()}</div>
        </div>
        <div class="block">
          <h2 class="caps">Payment Method</h2>
          <div class="payment-card">
            <div class="card-left"><span class="visa">VISA</span><b>•••• 4242</b></div>
            <a class="link" data-go="settings-pembayaran">Change</a>
          </div>
        </div>
        <div class="block gap-10">
          <h2 class="caps">More Classes at This Gym</h2>
          <div class="slots">
            ${OTHER_CLASSES.map(extraSlot).join('')}
          </div>
        </div>
      </div>
    </div>
    <footer class="actions-footer">
      <button class="btn-confirm" data-go="payment-success">Confirm &amp; Pay — <span id="pay-total">${rupiah(cartTotal())}</span></button>
      ${homeInd()}
    </footer>
  </section>`;

S['payment-success'] = () => `
  <section class="screen">
    <div class="scroll">
      ${statusBar()}
      <div class="success-hero">
        <div class="glow-badge"><div>${ic('4ee56')}</div></div>
        <div class="titles">
          <h1>Payment Successful!</h1>
          <p>Your workout session has been booked and confirmed.</p>
        </div>
      </div>
      <div class="receipt">
        <div class="summary-card p-20 r-16">
          <div class="card-top">
            <div class="class-thumb">${ph('285dd', 'cover')}</div>
            <div class="class-titles">
              <span class="tag main">Zumba</span>
              <h3>Zumba Energy Blast</h3>
              <p>PowerHouse Gym • Maria Santos</p>
            </div>
          </div>
          <img class="line" src="${A}ef90c.svg" alt="">
          <div class="detail-rows">
            ${detailRow('Date', 'Wednesday, October 16')}
            ${detailRow('Time', '07:30 UTC+7')}
            ${detailRow('Duration', '45 min')}
            ${detailRow('Booking ID', '#PF-948201')}
            ${[...cart].sort().map((i) => detailRow(`+ ${OTHER_CLASSES[i][0]}`, `${OTHER_CLASSES[i][2]} UTC+7`)).join('')}
            <img class="line" src="${A}ef90c.svg" alt="">
            ${detailRow('Total Payment', rupiah(cartTotal()), 'primary')}
          </div>
        </div>
      </div>
    </div>
    <footer class="success-footer">
      <button class="btn-cta" data-go="jadwal" data-cart-clear>View My Schedule</button>
      <button class="btn-cta outline" data-go="beranda" data-cart-clear>Back to Home</button>
      ${homeInd(true)}
    </footer>
  </section>`;

// order is done once the user leaves the receipt: start the next booking with an empty cart
document.addEventListener('click', (e) => { if (e.target.closest('[data-cart-clear]')) cart.clear(); }, true);
