import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return Response.json({ error: 'Method not allowed' }, { status: 405, headers: corsHeaders });
  try {
    const url = Deno.env.get('SUPABASE_URL')!;
    const anon = Deno.env.get('SUPABASE_ANON_KEY')!;
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const body = await req.json();
    const phone = String(body.phone || '').replace(/\D/g, '');
    const password = String(body.password || '');
    if (!/^\d{10}$/.test(phone) || !password || password.length > 72) {
      return Response.json({ error: 'Invalid phone number or password.' }, { status: 400, headers: corsHeaders });
    }

    // Resolve the stored phone to its account only on the server; never expose its email.
    const admin = createClient(url, service, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: profile } = await admin.from('profiles').select('id').eq('phone', phone).maybeSingle();
    if (!profile) return Response.json({ error: 'Invalid phone number or password.' }, { status: 401, headers: corsHeaders });
    const { data: account, error: accountError } = await admin.auth.admin.getUserById(profile.id);
    const email = account?.user?.email;
    if (accountError || !email) return Response.json({ error: 'Invalid phone number or password.' }, { status: 401, headers: corsHeaders });

    const auth = createClient(url, anon, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await auth.auth.signInWithPassword({ email, password });
    if (error || !data.session || !data.user) {
      return Response.json({ error: 'Invalid phone number or password.' }, { status: 401, headers: corsHeaders });
    }
    return Response.json({ session: data.session, user: data.user }, { headers: corsHeaders });
  } catch (_error) {
    return Response.json({ error: 'Unexpected server error.' }, { status: 500, headers: corsHeaders });
  }
});
