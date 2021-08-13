--! Previous: sha1:b0c4a4429d5b4a18b499e1f79cf0cb52651c8456
--! Hash: sha1:b74cc5604f98b5842616aea74e94e455dff2bacf

--! split: 1-current.sql
-- Enter migration here


alter table app_public.comment
  drop column if exists parent,
  drop column if exists parent_id,
  drop constraint if exists comment_parent_id_fkey;

alter table app_public.comment
  add column parent_id integer,
  add constraint comment_parent_id_fkey
  foreign key ("parent_id")
  references  app_public.comment(id);
