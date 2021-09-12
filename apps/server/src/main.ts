import { setEnv } from '@cfs/config'
setEnv();
import { makeApp } from './app';

async function main() {
  const app = await makeApp();

  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to server!' });
  });

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
}

main().catch((e) => {
  console.error('Fatal error occurred starting server!');
  console.error(e);
  process.exit(101);
});
