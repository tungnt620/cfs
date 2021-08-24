--! Previous: sha1:172743c58b28f29e2a3970606c394a5303491df0
--! Hash: sha1:721871def21c3cbccc636d664a75492076603066

--! split: 1-current.sql
-- Enter migration here
grant
   select,
   insert (confession_id, content, parent_id, image),
   update (confession_id, content, parent_id, image),
   delete
 on app_public.comment to :DATABASE_VISITOR;
