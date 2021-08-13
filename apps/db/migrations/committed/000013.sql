--! Previous: sha1:68d3b319d3578f04cc7f33c19297260426c3a983
--! Hash: sha1:b0c4a4429d5b4a18b499e1f79cf0cb52651c8456

--! split: 1-current.sql
-- Enter migration here
alter table app_public.confession_category
drop constraint if exists fk_category,
drop constraint if exists fk_confession;

alter table app_public.confession_category enable row level security;
