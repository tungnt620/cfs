--! Previous: sha1:b74cc5604f98b5842616aea74e94e455dff2bacf
--! Hash: sha1:ed54181eacc116186180e69b64794a806b23b33a

--! split: 1-current.sql
-- Enter migration here
  CREATE INDEX ON "app_public"."comment"("parent_id");
