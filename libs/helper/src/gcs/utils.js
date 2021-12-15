import { Storage } from '@google-cloud/storage';

export const storage = new Storage({ keyFilename: './google-cloud-key.json' });
