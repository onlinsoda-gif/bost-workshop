-- BOST WORKSHOP Supabase schema
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  phone text unique not null,
  full_name text not null default '',
  photo_data_url text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- A signed-in user can read/update only their own profile. Admin role changes
-- must be performed from the SQL editor by the project owner.
create or replace function public.is_workshop_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin');
$$;

grant execute on function public.is_workshop_admin() to authenticated;
drop policy if exists "profile select own or admin" on public.profiles;
create policy "profile select own or admin" on public.profiles
for select to authenticated using (auth.uid() = id or public.is_workshop_admin());
drop policy if exists "profile update own" on public.profiles;
create policy "profile update own" on public.profiles
for update to authenticated using (auth.uid() = id) with check (auth.uid() = id and role = 'user');

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, phone, full_name, photo_data_url)
  values (
    new.id,
    coalesce(new.phone, new.raw_user_meta_data->>'phone'),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'photo_data_url'
  )
  on conflict (id) do update set
    phone = excluded.phone,
    full_name = excluded.full_name,
    photo_data_url = excluded.photo_data_url,
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_bost on auth.users;
create trigger on_auth_user_created_bost
after insert or update of phone, raw_user_meta_data on auth.users
for each row execute function public.handle_new_user();

-- After registering the intended manager account, copy that account's UUID
-- from Authentication > Users and run:
-- update public.profiles set role = 'admin' where id = 'MANAGER-USER-UUID';
