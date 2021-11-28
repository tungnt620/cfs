## Deploy
### Client
- In local
  - `nx run client:serve`
  - Watch graphql query and generate apollo query hook
    - `yarn run generate-graphql --watch`
- Deploy in production
  - `yarn deploy-client`
  - Note: we build client app in local and push build result to server because server have limited resource and can't build success.
### Server
- In local
  - `nx run server:serve`
- Deploy to production
  - `pm2 deploy ./apps/server/ecosystem.config.js production` 

### DB
- In local
  - `nx run db:watch` watch change in `1-current.sql` file and run to database
  - `nx run db:commit` commit sql change to migration files
- Migrate in production `nx run db:migrate`

### Worker
- In local
  - `nx run worker:serve`
- Deploy to production
  - `pm2 deploy ./apps/worker/ecosystem.config.js production`
- Add job in db to worker run:
  - `SELECT graphile_worker.add_job('generate_sitemap');`
