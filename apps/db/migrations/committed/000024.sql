--! Previous: sha1:0b7f0e978c9fa1dd44f44fc7fc3b837580aa9986
--! Hash: sha1:9880d60713c0ace22832e7875817ff9eea466c97

--! split: 1-current.sql
-- Enter migration here

ALTER TABLE app_public.comment
  add column if not exists total_reaction INTEGER NOT NULL default 0;

ALTER TABLE app_public.confession
  add column if not exists total_reaction INTEGER NOT NULL default 0;
