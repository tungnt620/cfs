--! Previous: sha1:721871def21c3cbccc636d664a75492076603066
--! Hash: sha1:a95581c474b20088c8551d72a1ba330b80b5dd78

--! split: 1-current.sql
-- Enter migration here
grant
   select,
   insert (confession_id, content, parent_id, image),
   update (confession_id, content, parent_id, image)
 on app_public.comment to :DATABASE_VISITOR;

grant
   select,
   insert (name, slug, image),
   update (name, slug, image)
 on app_public.category to :DATABASE_VISITOR;
