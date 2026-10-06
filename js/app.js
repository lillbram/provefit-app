// Prove Fit prototype: static screens, hash router, no backend.
// Each screen registers itself in S as: S['route-name'] = () => htmlString

const S = {};
const A = 'assets/';
const FIRST = 'onboarding-1';

const ic = (f, cls = '') => `<img class="ic ${cls}" src="${A}${f}.svg" alt="">`;
const ph = (f, cls = '') => `<img class="${cls}" src="${A}${f}.jpg" alt="">`;

const statusBar = () => `
  <div class="statusbar">
    <span class="sb-time">9:41</span>
    <span class="sb-island"></span>
    <span class="sb-levels">${ic('c9686')}${ic('6025d')}<i class="sb-batt"></i></span>
  </div>`;

const homeInd = (faded = false) =>
  `<div class="home-ind${faded ? ' faded' : ''}"><i></i></div>`;

// [route, label, inactive icon, active icon]
const TABS = [
  ['beranda', 'Home', '97413', 'f576d'],
  ['browse', 'Search', '77751', '80e03'],
  ['jadwal', 'Schedule', '03753', '4ab0a'],
  ['profil', 'Profile', '3ae7a', 'e53f5'],
];

const bottomNav = (active) => `
  <nav class="bottom-nav">
    <div class="tabs">
      ${TABS.map(([route, label, off, on]) => `
        <a class="tab${route === active ? ' on' : ''}" data-go="${route}">
          ${ic(route === active ? on : off)}<span>${label}</span>
        </a>`).join('')}
    </div>
    ${homeInd()}
  </nav>`;

const backBtn = (icon = 'cca73') =>
  `<button class="circle-btn" data-back aria-label="Back">${ic(icon)}</button>`;

const toolbar = (title, icon = 'f7abd') => `
  <header class="toolbar">
    ${backBtn(icon)}<h1>${title}</h1><span class="toolbar-spacer"></span>
  </header>`;

function go(route, replace = false) {
  if (replace) location.replace('#/' + route);
  else location.hash = '/' + route;
}

function render() {
  const name = location.hash.slice(2) || FIRST;
  const app = document.getElementById('app');
  app.innerHTML = (S[name] || S[FIRST])();
  app.dataset.screen = name;
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-go],[data-replace],[data-back],[data-toggle],[data-pick]');
  if (!el) return;
  if (el.dataset.go) return go(el.dataset.go);
  if (el.dataset.replace) return go(el.dataset.replace, true);
  if ('back' in el.dataset) return history.length > 1 ? history.back() : go('beranda');
  // data-toggle: flip .on on the element itself (checkbox, heart, switch)
  if ('toggle' in el.dataset) return el.classList.toggle('on');
  // data-pick: single choice inside the nearest [data-group]
  if ('pick' in el.dataset) {
    el.closest('[data-group]').querySelectorAll('[data-pick]').forEach((n) => n.classList.toggle('on', n === el));
  }
});

// password eye
document.addEventListener('click', (e) => {
  const eye = e.target.closest('.eye');
  if (!eye) return;
  const input = eye.previousElementSibling;
  input.type = input.type === 'password' ? 'text' : 'password';
});

window.addEventListener('hashchange', render);
window.addEventListener('DOMContentLoaded', render);
