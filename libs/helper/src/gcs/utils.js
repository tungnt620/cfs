import { Storage } from '@google-cloud/storage';
import { DEFAULT_BUCKET_NAME } from './constants';

export const storage = new Storage({ keyFilename: './google-cloud-key.json' });

export const getPublicUrl = (fileName) =>
  `https://storage.googleapis.com/${DEFAULT_BUCKET_NAME}/${fileName}`;
