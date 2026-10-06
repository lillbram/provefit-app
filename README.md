# Prove Fit

A clickable prototype of the Prove Fit mobile app: find fitness classes, book and pay, check in at the gym with a QR code, and track a session with a smartwatch.

This is a front-end prototype for showing the screens and the flow. There is no backend and no database. All content is sample data written into the code, and nothing you do is saved after a page reload.

## Run it

No install and no build step.

**Quickest:** open `index.html` in a browser.

**With a local server** (needed to open it on a phone):

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`. On a phone connected to the same Wi-Fi, open `http://<your-computer-ip>:4173`.

The fonts load from Google Fonts, so the first load needs an internet connection.

## How it looks

- **On a desktop browser** the app sits inside a black phone frame with a mock status bar.
- **On a screen narrower than 480px** the frame and mock status bar are hidden and the app fills the screen.

To preview the phone layout on a desktop, open the browser dev tools and switch on device emulation.

## What you can click through

| Flow | Path |
|---|---|
| Getting started | Onboarding (3 steps) → Log in or Sign up → Home |
| Book a class | Search → class detail → Schedule tab → Payment → Payment successful |
| Browse a gym | Gym card → Details, Schedule, and Reviews tabs → Payment |
| Attend a class | Schedule → class detail → Join Class → QR code → Check-in → live session → Activity summary → Share |
| Account | Profile → Account, Notifications, Payment, Help |

Things that respond to taps:

- **Search:** category chips, a filter sheet, and a category sheet.
- **Class detail:** "Set Reminder" opens a popup, then a confirmation.
- **Payment:** tap a class under "More Classes at This Gym" to add it to the order. The total updates.
- **Schedule:** tap a date to see that day's classes. Days with no classes show an empty state.
- **Settings:** toggles, and questions in Help expand to show an answer.

To jump straight to a screen, add its name after `#/` in the address, for example `index.html#/beranda` (Home) or `index.html#/gym-detail`.

## Project layout

```
index.html              Page shell; loads the styles and scripts
styles.css              All styles
js/app.js               Router, shared pieces (status bar, bottom nav), tap handling
js/screens-auth.js      Onboarding, log in, sign up
js/screens-main.js      Home and Search
js/screens-booking.js   Class detail, payment, payment successful, cart
js/screens-account.js   Schedule (My Classes), Profile, Notifications
js/screens-class.js     Booked class detail, QR check-in, reminder popup
js/screens-session.js   Live session, activity summary, share
js/screens-gym.js       Filter and category sheets, gym screens
js/screens-settings.js  Account, Notifications, Payment, Help settings
assets/                 Images and icons exported from the design
```

It is plain HTML, CSS, and JavaScript with no framework and no dependencies. Each screen is a function that returns HTML, registered under a route name:

```js
S['beranda'] = () => `<section class="screen">…</section>`;
```

Navigation uses attributes in the markup, so most screens need no JavaScript of their own:

| Attribute | Effect |
|---|---|
| `data-go="route"` | Go to a screen |
| `data-replace="route"` | Go to a screen without adding a history entry (used for tabs) |
| `data-back` | Go back |
| `data-toggle` | Switch the element's `on` state (toggles, favourites) |
| `data-pick` | Select one item inside the nearest `data-group` (chips, dates) |

Route names follow the frame names in the design file, so some are in Indonesian: `beranda` is Home, `jadwal` is Schedule, `profil` is Profile.

## Changing the sample data

The data lives in arrays near the top of each screen file. Two that are likely to be edited:

- **Classes per day** on the Schedule screen: `MY_SCHEDULE` in `js/screens-account.js`. A day with an empty list shows the empty state.
- **Extra classes on the Payment screen**, including their prices: `OTHER_CLASSES` in `js/screens-booking.js`.

## Differences from the design

The screens were built from the Figma design. A few parts are not in the design and were added so the prototype works end to end:

- The confirmation shown after setting a reminder.
- The price and "Add" row on each extra class on the Payment screen, and the order lines above it. The prices are placeholders.
- Classes for every day except Wednesday the 28th on the Schedule screen, and the empty state.
- The answers under the Help questions.

Some buttons have no screen to go to in the design and do nothing: "Forgot Password?", "Save to Gallery", "Change Photo", "+ Add Payment Method", "Manage Subscription", and the contact rows in Help.
