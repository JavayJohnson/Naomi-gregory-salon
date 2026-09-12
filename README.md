# Naomi Gregory Salon

Responsive informational website for Naomi Gregory Salon, built with Vite, React, React Router, custom CSS, and a small PHP contact endpoint for GoDaddy cPanel hosting.

## Requirements

- Node.js 20 or newer
- npm
- Git Bash (commands below assume Git Bash on Windows)
- PHP 8+ only when testing the contact endpoint locally

## Install and run

Open this repository in VS Code, select **Terminal → New Terminal**, and choose **Git Bash**.

```bash
npm install
npm run dev
```

Vite prints the local website URL, normally `http://localhost:5173`.

## Contact form local development

Vite cannot execute PHP. Run two Git Bash terminals.

Terminal 1 starts PHP in safe test mode. This accepts valid form submissions without calling `mail()`:

```bash
NGS_CONTACT_TEST_MODE=1 php -S 127.0.0.1:8787 -t public
```

Terminal 2 starts Vite. Vite proxies `/api` requests to the PHP server:

```bash
npm run dev
```

Never enable `NGS_CONTACT_TEST_MODE` on the live server. The setting contains no secret and should be supplied only to the local PHP process. Production uses `/api/contact.php` on the same domain.

## Quality checks

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
php -l public/api/contact.php
```

Install Playwright's Chromium browser once before the first responsive browser test:

```bash
npx playwright install chromium
```

## Routes

- `/` — Home
- `/about` — About
- `/contact` — Contact
- `/thank-you` — confirmation shown after server acceptance
- All unknown URLs — Not Found

## Photo approval workflow

The original hairstyle photographs and generated review candidates remain archived in `design-references/original-images/` and `image-approval/`. They are not used by the public website.


## Production build and deployment

```bash
npm install
npm run build
```

The deployable site is created in `dist/`. Follow `DEPLOYMENT.md` for the complete GoDaddy/cPanel checklist and `GODADDY-EMAIL-SETUP.md` before testing the live form.

Do not commit passwords, cPanel credentials, mailbox credentials, or other secrets.
