import { setEnv } from '@cfs/config';
// This function call must always be the first in the file. It loads the env file
setEnv();
import Multer from 'multer';

const uuid = require('uuid');
import axios from 'axios';
import { makeApp } from './app';
import { DEFAULT_BUCKET_NAME } from '@cfs/helper/gcs/constants';
import { storage, getPublicUrl } from '@cfs/helper/gcs/utils';

const bucket = storage.bucket(DEFAULT_BUCKET_NAME);

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024 // no larger than 2mb, you can change as needed.
  }
});

async function main() {
  const app = await makeApp();

  // Process the file upload and upload to Google Cloud Storage.
  app.post('/upload', multer.single('file'), (req, res) => {
    if (!req.file) {
      res.status(400).send('No file uploaded.');
      return;
    }
    const filename = `${uuid.v4()}.${req.file.originalname}`;

    axios
      .post(process.env.NEXT_PUBLIC_BASE_API_URL_SERVER_SIDE + '/graphql', {
        query: 'query MyQuery { isUserLoggedIn }'
      }, {
        headers: {
          Cookie: req.headers.cookie || ''
        }
      })
      .then(async (checkLoggedInRes) => {
        if (checkLoggedInRes.data?.data?.isUserLoggedIn) {
          try {
            // Create a new blob in the bucket and upload the file data.
            const blob = bucket.file(filename);
            const blobStream = blob.createWriteStream();

            blobStream.on('error', err => {
              res.status(500).send({
                message: `Could not upload the file: ${err.message}`
              });
            });

            blobStream.on('finish', () => {
              // The public URL can be used to directly access the file via HTTP.
              const publicUrl = getPublicUrl(blob.name);
              res.status(200).send(publicUrl);
            });

            blobStream.end(req.file.buffer);
          } catch (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
              return res.status(500).send({
                message: 'File size cannot be larger than 2MB!'
              });
            }
            res.status(500).send({
              message: `Could not upload the file: ${filename}. ${err}`
            });
          }
        } else {
          res.status(401).send('You are not logged in!');
        }
      })
      .catch(error => {
        res.status(500).send({
          message: `Could not upload the file: ${filename}. ${error}`
        });
      });
  });

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
