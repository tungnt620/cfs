-- Enter migration here
alter table app_public.users
drop column if EXISTS "role" CASCADE;

alter table app_public.category
drop column if EXISTS deleted_at,
drop column if EXISTS created_by,
drop column if exists banner_image;

drop POLICY if EXISTS manage_as_moderator on app_public.category;

REVOKE delete ON app_public.category FROM cfs_visitor;

ALTER TABLE app_public.category
ADD COLUMN deleted_at timestamptz,
ADD COLUMN created_by uuid default app_public.current_user_id() references app_public.users(id) on delete set null,
add column banner_image character varying(255);

grant
   select,
   insert (name, slug, image, banner_image),
   update (name, slug, image, banner_image, deleted_at)
 on app_public.category to :DATABASE_VISITOR;

CREATE INDEX ON "app_public"."category"("created_by");

alter table app_public.users
add column role character varying(255);

create policy manage_as_moderator on app_public.category for all using
  (created_by = app_public.current_user_id()
  and exists (select 1 from app_public.users where role = 'moderator' and id = app_public.current_user_id()));

