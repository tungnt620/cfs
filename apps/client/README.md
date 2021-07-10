# Confession v2

## Libs

### Relative import

- Use `babel-plugin-root-import`

### Import css of ant mobile design

- Use plugin `babel-plugin-import` and config in .bablerc file

### Use proposal feature nullish Coalescing for JavaScript

- Add babel plugin `@babel/plugin-proposal-nullish-coalescing-operator` `.balbelrc` file

### Use proposal feature optional chaining for JavaScript

- Add babel plugin `@babel/plugin-proposal-optional-chaining` `.balbelrc` file

### Ant design modularity import

- Use plugin `babel-plugin-import` and config in `.babelrc` file

### Play around with apollo client

```javascript
import ApolloClient from "apollo-boost";
// For fetch in web, nodejs and react native
import "cross-fetch/polyfill";
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000",
});

client
  .query({
    query: gql`
      {
        confession(id: 3) {
          slug
        }
      }
    `,
  })
  .then((result) => console.log(result));
```

## Run

- Install pm2 if not exits

```bash
yarn global add pm2
```

- Start in local dev

```bash
pm2 start yarn --name "bid-game-fe" --watch -- --interpreter bash -- dev
```

## Deploy

- Install yarn

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn
```

- Install pm2:

```bash
yarn global add pm2
pm2 completion install
```

### Run as node app use PM2

- First run

```bash
yarn install
yarn build
# Run pm2 with scale to use all cpu of server
pm2 start yarn --name "bid-game-fe" -i max --interpreter bash -- start
```

- When have code update

```bash
yarn install
yarn build
pm2 reload bid-game-fe
```

- Start pm2 at reboot

```bash
pm2 startup
```

- Save this app to auto start when reboot

```bash
pm2 save
```

- Other

```bash
# stop the process (kill the process but keep it in the process list)
pm2 stop bid-game-fe

# start the process
pm2 start bid-game-fe

# both stop and start
pm2 restart bid-game-fe
```

- View logs:
  - Access your logs in realtime

```bash
pm2 logs bid-game-fe
```

- Consult your logs history files in the `~/.pm2/logs` folder.

### Run as static app use export feature

```bash
yarn install
yarn build
yarn export
```

- Output we have `out` directory

### Config nginx forward request to pm2 or `out` directory

## Current Nextjs not support basePath: https://github.com/zeit/next.js/issues/4998

- Make sure Link component have as property and it match as server url
- In next.config.js file, make sure and assetPrefix same with subdirectory
