--! Previous: sha1:69f49a09f3c0c8c3cd8df215e4a88403066512e7
--! Hash: sha1:79e51b915df82767090b806473b15958b218d6e6

--! split: 1-current.sql
-- Enter migration here
ALTER TABLE app_public.confession
DROP COLUMN IF EXISTS is_public,
DROP COLUMN IF EXISTS source_id,
DROP COLUMN IF EXISTS thumbnail;

DROP TRIGGER IF EXISTS _100_timestamps on app_public.confession;

create trigger _100_timestamps
  before insert or update on app_public.confession
  for each row
  execute procedure app_private.tg__timestamps();

alter table app_public.confession
add column if not exists user_id uuid default app_public.current_user_id() references app_public.users on delete cascade;

create index if not exists idx_confession_user on app_public.confession (user_id);
