# GoDaddy cPanel Deployment

These steps are for a Windows computer using VS Code and Git Bash. Do not claim the contact form or forwarding works until the live tests below pass.

## 1. Prepare and test locally

Open the project folder in VS Code. In a Git Bash terminal run:

```bash
npm install
npm run lint
npm run test
npm run build
```

For responsive browser tests, install Chromium once and run Playwright:

```bash
npx playwright install chromium
npm run test:e2e
```

The production files are in the top-level `dist/` folder. Vite copies `.htaccess`, `robots.txt`, `sitemap.xml`, and `public/api/contact.php` into that folder during the build.

## 2. Prepare the domain and email

Complete `GODADDY-EMAIL-SETUP.md`. Confirm the `www` hostname is connected to the correct GoDaddy hosting account. Confirm an SSL certificate is installed and `https://www.naomigregorysalon.com` loads without a certificate warning.

The HTTPS redirect in `public/.htaccess` is intentionally commented out. Enable those two lines only after HTTPS works correctly, rebuild, and redeploy.

## 3. Back up the existing live website

1. Sign in to GoDaddy and open cPanel for the correct hosting account.
2. Open **File Manager** and enter `public_html`.
3. Select the existing contents.
4. Use cPanel's **Compress** action to create a dated archive such as `public-html-backup-YYYY-MM-DD.zip`.
5. Download the archive to the computer and confirm it opens.
6. Keep the server copy outside `public_html` when possible so it is not publicly downloadable.

Do not delete the current site until the backup is confirmed.

## 4. Upload the new build

1. On the computer, open `dist/` after a successful `npm run build`.
2. Compress the **contents inside** `dist/`, not the `dist` folder itself.
3. In cPanel File Manager, enter `public_html`.
4. Remove or move aside the old site files only after the backup is safe.
5. Upload the new archive into `public_html` and extract it there.
6. Confirm `public_html/index.html` exists. There must not be an extra `public_html/dist/` nesting level.
7. Confirm hidden files are visible and `public_html/.htaccess` exists.
8. Confirm `public_html/api/contact.php` exists. Do not move it into the fingerprinted `assets` directory.

The `.htaccess` rules preserve real files, real directories, and `/api/contact.php` before sending client-side routes to `index.html`. Directory listing is disabled, fingerprinted assets can be cached, and HTML/PHP responses are not cached.

## 5. Verify the live website

Open each URL directly in a private browser window:

- `https://www.naomigregorysalon.com/`
- `https://www.naomigregorysalon.com/about`
- `https://www.naomigregorysalon.com/contact`

Refresh each nested route. A refresh must keep the same page rather than returning a cPanel 404. Check desktop, tablet, and mobile widths. Confirm the mobile menu, phone link, and email link work.

## 6. Test the live contact workflow

1. Submit with First Name, Last Name, Email Address, and Message while Telephone Number is blank.
2. Confirm the server accepts it and only then shows `/thank-you`.
3. Confirm the message arrives at `info@naomigregorysalon.com` and its Gmail forwarding destination.
4. Reply to the message and verify Reply-To uses the visitor's test email.
5. Submit again with a telephone number using common formatting such as `(248) 956-0236`.
6. Confirm that version is also received correctly.
7. Try an invalid email and invalid telephone number and confirm visible validation.
8. Check both inbox and spam folders.
9. Confirm PHP errors, server paths, and configuration details are never shown in the browser response.

The PHP `mail()` function returning success means the hosting mail system accepted the message; it does not by itself prove final delivery. Verify actual receipt.

## 7. Roll back if necessary

1. Put the site into a temporary maintenance state through GoDaddy if available.
2. Move the new `public_html` contents into a dated troubleshooting folder.
3. Upload or move the confirmed backup archive back into `public_html`.
4. Extract it so its original `index` file is directly inside `public_html`.
5. Recheck the domain and SSL.
6. Keep the failed deployment copy for diagnosis; do not expose it under a public URL.
