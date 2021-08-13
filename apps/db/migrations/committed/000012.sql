--! Previous: sha1:5af9886ddc8469ce1c1cab168022fd47e3f338e2
--! Hash: sha1:68d3b319d3578f04cc7f33c19297260426c3a983

--! split: 1-current.sql
-- Enter migration here

alter table app_public.confession_category
alter column confession_id TYPE integer,
    ALTER COLUMN confession_id SET NOT NULL;

alter table app_public.confession_category
  DROP CONSTRAINT IF EXISTS confession_category_confession_id_fkey,
  add constraint confession_category_confession_id_fkey
  foreign key ("confession_id") references app_public.confession(id) on delete cascade;

alter table app_public.confession_category
  DROP CONSTRAINT IF EXISTS confession_category_category_id_fkey,
  add constraint confession_category_category_id_fkey
  foreign key ("category_id") references app_public.category(id) on delete cascade;
