--! Previous: sha1:4a8b7cae5404e0e7c9a68c890eeec7a96634878f
--! Hash: sha1:150a9e3e03a799c6508c5dbc112b13f23a62a88f

--! split: 1-current.sql
alter table app_public.comment
alter column parent TYPE integer;
