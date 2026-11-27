BOST WORKSHOP — Supabase authentication and manager password reset

WHAT CHANGED
- Replaced browser-only account/password checking with Supabase Auth phone + password.
- Kept the existing vehicle/workshop application and its localStorage-based records.
- Added a manager-only user list and password-reset interface.
- Added a database schema with profiles and role-based row-level security.
- Added a protected Supabase Edge Function. It checks the caller's JWT and admin role
  before using the server-side service-role key to change another user's password.
- Removed the automatic WhatsApp password-reset request link. No SMS or WhatsApp is
  sent by this password reset flow.

IMPORTANT LIMITATIONS
- Existing prototype accounts and their SHA-256 password hashes cannot be imported as
  working Supabase passwords. Every existing user must create a new Supabase account
  once with their phone and a new password. Do not delete old browser storage until
  the user has successfully signed in and checked their existing vehicle records.
- Vehicle details, service history, expenses, reminders and other app records still
  use localStorage and remain on each device. This package does NOT yet synchronize
  those records to the cloud or consolidate data from multiple devices.
- The phone conversion assumes the existing 10-digit local numbers are Afghanistan
  numbers: a leading 0 is replaced by +93. Review this rule if numbers are from elsewhere.
- Profile photos are saved as small data URLs in auth user metadata/profile rows. For a
  production deployment, Supabase Storage is preferable for larger images.

SETUP — DO THESE STEPS BEFORE PUBLISHING
1. In Supabase SQL Editor, run supabase/schema.sql.
2. In Supabase Dashboard > Authentication > Sign In / Providers > Email:
   - Keep the Email provider enabled.
   - Turn OFF Confirm email so users can sign in immediately after registration.
   - Do NOT enable Phone sign-in; phone is profile data only.
3. In Authentication > URL Configuration, set the Site URL to the deployed site URL
   and add that exact URL (plus any required local test URL) to Redirect URLs.
4. Check supabase-config.js. It contains the project URL and publishable client key.
   A publishable key is intended for browser use; NEVER put service_role/secret keys here.
5. Deploy the manager Edge Function if manager password-reset controls are required:
      supabase functions deploy admin-password-reset
   Never expose the service-role key in browser files.
6. Create the manager account through the app. In Authentication > Users, copy its UUID.
   In SQL Editor run:
      update public.profiles set role = 'admin' where id = 'PASTE-MANAGER-UUID';
7. Publish the complete folder to the hosting root. Ensure supabase-config.js is
   alongside index.html and the Supabase CDN is reachable.
8. Test registration, email/password login, email password recovery, 10-digit phone
   profile storage, and normal-user/admin access.

LOCAL PREVIEW
Open index.html through a local web server (not file://) after setup. Supabase auth
requires network access and a configured project.


FINAL AUTH FORM UPDATE (2026-11-27)
==================================
- Registration requires full name, a 10-digit phone number, email, password and password confirmation.
- Phone input accepts Persian, Arabic and Western numerals, normalizes them to Western digits, warns while fewer than 10 digits are entered, and stores the exact 10-digit value in the profile. Phone is profile information only; it is NOT used for sign-in and no SMS/phone provider is needed.
- Sign-in uses email + password only. Password recovery is by email only.
- Email confirmation must be disabled in Supabase Dashboard > Authentication > Sign In / Providers > Email (Confirm email OFF). This is a dashboard setting and cannot be changed by uploading website files. Keep the Email provider enabled.
- All form fields are required. Password visibility eye buttons appear on the LEFT side of each password field.
- Profile-photo upload has been removed from registration and no photo metadata is sent on signup. The legacy nullable photo_data_url database column is intentionally retained to avoid destructive schema changes.
- Existing profile and application data are not deleted by these changes.
