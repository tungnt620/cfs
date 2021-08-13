--! Previous: sha1:694a8b2ce43a7ee653bdaf029145876a65167f98
--! Hash: sha1:4a8b7cae5404e0e7c9a68c890eeec7a96634878f

--! split: 1-current.sql
-- Enter migration here

ALTER TABLE app_public.comment
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();


DROP TRIGGER IF EXISTS _100_timestamps on app_public.comment;

create trigger _100_timestamps
  before insert or update on app_public.comment
  for each row
  execute procedure app_private.tg__timestamps();



  ALTER TABLE app_public.category
    add column if not exists created_at timestamptz default now(),
    add column if not exists updated_at timestamptz default now();


  DROP TRIGGER IF EXISTS _100_timestamps on app_public.category;

  create trigger _100_timestamps
    before insert or update on app_public.category
    for each row
    execute procedure app_private.tg__timestamps();
