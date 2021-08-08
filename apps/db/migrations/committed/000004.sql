--! Previous: sha1:c0e76568039216c9a939f9d5093edc21506f6736
--! Hash: sha1:69f49a09f3c0c8c3cd8df215e4a88403066512e7

--! split: 1-current.sql
DROP POLICY IF EXISTS select_all ON app_public.confession;
DROP POLICY IF EXISTS manage_as_admin ON app_public.confession;

DROP POLICY IF EXISTS select_all ON app_public.category;
DROP POLICY IF EXISTS manage_as_admin ON app_public.category;

DROP POLICY IF EXISTS select_all ON app_public.confession_category;
DROP POLICY IF EXISTS manage_as_admin ON app_public.confession_category;

DROP POLICY IF EXISTS select_all ON app_public.comment;
DROP POLICY IF EXISTS manage_as_admin ON app_public.comment;

grant
   select,
   insert (title, content, slug, image, is_public, thumbnail),
   update (title, content, slug, image, is_public, thumbnail),
   delete
 on app_public.confession to :DATABASE_VISITOR;

 create policy select_all on app_public.confession for select using (true);
 create policy manage_as_admin on app_public.confession for all using (exists (select 1 from app_public.users where is_admin is true and id = app_public.current_user_id()));

grant
   select,
   insert (name, slug, image),
   update (name, slug, image),
   delete
 on app_public.category to :DATABASE_VISITOR;

 create policy select_all on app_public.category for select using (true);
 create policy manage_as_admin on app_public.category for all using (exists (select 1 from app_public.users where is_admin is true and id = app_public.current_user_id()));

grant
   select,
   insert (confession_id, category_id),
   insert (confession_id, category_id),
   delete
 on app_public.confession_category to :DATABASE_VISITOR;

 create policy select_all on app_public.confession_category for select using (true);
 create policy manage_as_admin on app_public.confession_category for all using (exists (select 1 from app_public.users where is_admin is true and id = app_public.current_user_id()));

grant
   select,
   insert (confession_id, author_name, author, content, parent, image),
   update (confession_id, author_name, author, content, parent, image),
   delete
 on app_public.comment to :DATABASE_VISITOR;

 create policy select_all on app_public.comment for select using (true);
 create policy manage_as_admin on app_public.comment for all using (exists (select 1 from app_public.users where is_admin is true and id = app_public.current_user_id()));
