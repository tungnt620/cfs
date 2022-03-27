import { setEnv } from '@cfs/config';
// This function call must always be the first in the file. It loads the env file
setEnv();

import { makeApp } from './app';
import generateV4WriteSignedUrl from '@cfs/helper/gcs/generateV4WriteSignedUrl';

async function main() {
  const app = await makeApp();

  app.get('/api', (req, res) => {
    res.send({ message: 'Welcome to server!' });
  });

  app.post('/api/gcs/signed-url/:fileExt', async (req, res) => {
    const fileExt = req.params.fileExt;
    const fileSize = req.query.fileSize;
    const { url: signedUrl, publicUrl } = await generateV4WriteSignedUrl(fileExt, fileSize);
    res.send({ signedUrl, publicUrl });
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
