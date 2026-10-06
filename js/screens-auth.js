// Onboarding, login, register

const onboarding = (step, hero, title, text, next) => `
  <section class="screen onboarding">
    <div>
      ${statusBar()}
      <div class="ob-hero">${ph(hero, 'cover')}</div>
    </div>
    <div class="ob-content">
      <div class="dots">${[0, 1, 2].map((i) => `<i class="${i === step ? 'on' : ''}"></i>`).join('')}</div>
      <div class="ob-text">
        <h1>${title}</h1>
        <p>${text}</p>
      </div>
      <div class="ob-actions">
        <button class="btn-primary" data-go="${next}">${step === 2 ? 'Get Started' : 'Next'}</button>
        ${step === 2 ? '' : '<a class="ob-skip" data-go="login">Skip</a>'}
      </div>
    </div>
    ${homeInd(true)}
  </section>`;

S['onboarding-1'] = () => onboarding(0, '4d463',
  'Find Your Ideal Fitness Class',
  'Explore hundreds of classes, from yoga to HIIT, at nearby gyms. Find the right fit for your schedule and goals.',
  'onboarding-2');

S['onboarding-2'] = () => onboarding(1, '72e41',
  'Hassle-Free Booking &amp; Check-in',
  'Book a class in seconds. Check in with a QR code at the gym—no waiting in line.',
  'onboarding-3');

S['onboarding-3'] = () => onboarding(2, '44975',
  'Track Progress with Your Smartwatch',
  'Connect your smartwatch to track heart rate, calories, and performance in real time during class.',
  'login');

const logo = () => `
  <div class="logo">
    <img class="logo-layer" src="${A}486ff.svg" alt="">
    <img class="logo-layer" src="${A}99796.svg" alt="">
    <div class="logo-row">${ic('02fe9')}<span>Prove Fit</span></div>
  </div>`;

const field = (label, placeholder, type = 'text') => `
  <label class="field">
    <span>${label}</span>
    <div class="input">
      <input type="${type}" placeholder="${placeholder}">
      ${type === 'password' ? `<button type="button" class="eye" aria-label="Show password">${ic('bef69')}</button>` : ''}
    </div>
  </label>`;

const social = (line, text) => `
  <div class="divider"><img class="line" src="${A}${line}.svg" alt=""><span>${text}</span><img class="line" src="${A}${line}.svg" alt=""></div>
  <div class="social-row">
    <button class="btn-social" data-go="beranda">${ic('d12ee')}Google</button>
    <button class="btn-social" data-go="beranda">${ic('a1527')}Apple</button>
  </div>`;

S['login'] = () => `
  <section class="screen auth">
    ${statusBar()}
    <div class="auth-form gap-32">
      <div class="auth-head">${logo()}<h1>Welcome Back!</h1></div>
      <div class="fields gap-20">
        ${field('Email or Phone Number', 'Enter your email or phone number')}
        ${field('Password', 'Enter your password', 'password')}
        <a class="forgot">Forgot Password?</a>
      </div>
      <div class="auth-actions gap-24">
        <button class="btn-primary" data-go="beranda">Log In</button>
        ${social('b448b', 'or log in with')}
      </div>
      <p class="auth-foot">Don’t have an account? <a data-go="register">Sign Up</a></p>
    </div>
    ${homeInd(true)}
  </section>`;

S['register'] = () => `
  <section class="screen auth scroll">
    ${statusBar()}
    <div class="auth-form gap-24">
      <div class="auth-head">${logo()}<h1>Create an Account</h1></div>
      <div class="fields gap-16">
        ${field('Full Name', 'Enter your full name')}
        ${field('Email', 'Enter your email address', 'email')}
        ${field('Phone Number', 'Enter your phone number', 'tel')}
        ${field('Password', 'Create a password', 'password')}
        ${field('Confirm Password', 'Re-enter your password', 'password')}
        <div class="terms">
          <button type="button" class="checkbox on" data-toggle aria-label="Agree">${ic('e4fc9')}</button>
          <p>I agree to the <a>Terms &amp; Conditions</a> and <a>Privacy Policy</a></p>
        </div>
      </div>
      <div class="auth-actions gap-20">
        <button class="btn-primary" data-go="beranda">Sign Up</button>
        ${social('a399e', 'or sign up with')}
      </div>
      <p class="auth-foot pb-12">Already have an account? <a data-go="login">Log In</a></p>
    </div>
    ${homeInd(true)}
  </section>`;
