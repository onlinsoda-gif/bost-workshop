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
2. In Supabase Dashboard > Authentication > Providers > Phone, enable phone/password
   sign-in and turn OFF phone confirmation if you want password sign-in without SMS.
   This means the manager must verify phone ownership separately before approving users.
3. Check supabase-config.js. It contains the project URL and publishable client key.
   A publishable key is intended for browser use; NEVER put service_role/secret keys here.
4. Deploy the Edge Function using Supabase CLI from this project folder:
      supabase functions deploy admin-password-reset
   The platform provides SUPABASE_URL, SUPABASE_ANON_KEY and
   SUPABASE_SERVICE_ROLE_KEY to the function environment. Never expose the service key.
5. Create the manager account through the app. In Supabase Dashboard > Authentication
   > Users, copy that account's UUID. In SQL Editor run:
      update public.profiles set role = 'admin' where id = 'PASTE-MANAGER-UUID';
6. Publish the complete folder to the GitHub Pages/site hosting root. Ensure
   supabase-config.js is alongside index.html and the Supabase CDN is reachable.
7. Test with a normal user and manager account. Confirm a normal user cannot see the
   admin panel or invoke the password-reset function.

SECURITY NOTES
- Do not commit a Supabase service_role/secret key, database password, or access token.
- The Edge Function uses the caller's authenticated JWT and checks public.profiles.role.
- Before production, restrict CORS in supabase/functions/_shared/cors.ts to the exact
  deployed site origin instead of '*'. Add rate limiting and audit logging for resets.
- Passwords must be at least 8 characters in this version; choose a strong password.

LOCAL PREVIEW
Open index.html through a local web server (not file://) after setup. Supabase auth
requires network access and a configured project.


AUTHENTICATION UPDATE
=====================
The login and registration flow now uses Supabase email/password authentication.
Registration fields: full name, Afghanistan phone number, email, password.
Login fields: email and password.
Password recovery: Supabase sends a recovery link to the account email. The
user opens that link and sets a new password on the same site. Profile phone
number remains stored in public.profiles; profile photo is optional.

SUPABASE DASHBOARD CHECKLIST
----------------------------
1. In Authentication > Providers, enable Email. Disable Phone provider if it
   is no longer needed for sign-in.
2. In Authentication > URL Configuration, add the deployed site's exact URL
   (and local development URL if used) to the Redirect URLs allow list.
3. Configure SMTP / email delivery in Authentication settings for reliable
   confirmation and password recovery messages.
4. Run supabase/schema.sql in the Supabase SQL Editor. Existing profiles and
   vehicle data are not deleted by this change.
5. For email confirmation, keep it enabled or disabled according to the
   workshop's policy. If enabled, users must confirm their email before the
   first sign-in.
6. Existing phone-only Auth accounts do not automatically gain an email
   address. Add/verify an email for each existing account in Supabase Auth
   before expecting email/password login for that account.

Only the password-recovery link has been removed from WhatsApp. The separate
WhatsApp contact-us shortcut is intentionally preserved.
