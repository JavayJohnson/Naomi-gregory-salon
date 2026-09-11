# GoDaddy Email Launch Checklist

The website code is ready to send mail to `info@naomigregorysalon.com`, but this mailbox and forwarding must be configured and tested manually in GoDaddy/cPanel before launch.

1. Create `info@naomigregorysalon.com` as an actual mailbox.
2. Create forwarding from that address to `naomigregorysalon@gmail.com`.
3. Confirm that the mailbox can receive bounce-back notices.
4. Configure or verify the domain's SPF record without incorrectly replacing an existing SPF record.
5. Send an ordinary test message to `info@naomigregorysalon.com`.
6. Confirm receipt in the business mailbox and Gmail forwarding destination.
7. Deploy and test the website form.
8. Test Reply-To behavior.
9. Check inbox and spam folders.
10. Do not expose account passwords in Git, JavaScript, documentation, or browser-delivered files.
