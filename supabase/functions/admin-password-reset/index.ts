import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  try {
    const url = Deno.env.get('SUPABASE_URL')!;
    const anon = Deno.env.get('SUPABASE_ANON_KEY')!;
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const authHeader = req.headers.get('Authorization') || '';
    if (!authHeader.startsWith('Bearer ')) return Response.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

    const callerClient = createClient(url, anon, { global: { headers: { Authorization: authHeader } } });
    const { data: { user: caller }, error: callerError } = await callerClient.auth.getUser();
    if (callerError || !caller) return Response.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });

    const adminClient = createClient(url, service, { auth: { persistSession: false } });
    const { data: callerProfile, error: profileError } = await adminClient
      .from('profiles').select('role').eq('id', caller.id).single();
    if (profileError || callerProfile?.role !== 'admin')
      return Response.json({ error: 'Forbidden: admin only' }, { status: 403, headers: corsHeaders });

    const body = await req.json();
    const userId = String(body.userId || '');
    const password = String(body.password || '');
    if (!userId || password.length < 8 || password.length > 72)
      return Response.json({ error: 'User ID is required; password must be 8–72 characters.' }, { status: 400, headers: corsHeaders });
    const { error } = await adminClient.auth.admin.updateUserById(userId, { password });
    if (error) return Response.json({ error: error.message }, { status: 400, headers: corsHeaders });
    return Response.json({ ok: true }, { headers: corsHeaders });
  } catch (_error) {
    return Response.json({ error: 'Unexpected server error' }, { status: 500, headers: corsHeaders });
  }
});
