import { getPublicUrl, storage } from './utils';
import { DEFAULT_BUCKET_NAME } from './constants';

const uuid = require('uuid');

/**
 * This function generates a signed URL for uploading a file to Google Cloud Storage.
 * It returns a promise that resolves to the signed URL.
 * Client use PUT method to upload the file to the signed URL.
 * @returns {Promise<unknown>}
 */
export default function generateV4WriteSignedUrl(fileExt, fileSize) {
  if (fileSize > 2000000) {
    return new Promise((resolve, reject) => {
      reject('Dung lượng file quá lớn');
    });
  }

  if (['png', 'jpg', 'jpeg', 'gif'].indexOf(fileExt) === -1) {
    return new Promise((resolve, reject) => {
      reject('Kiểu file không hỗ trợ');
    });
  }

  const options = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 30 * 60 * 1000, // 15 minutes
    // contentType: `application/octet-stream`,
    extensionHeaders: {
      'x-google-content-length-range': `${fileSize},${fileSize}`,
    },
  };

  const filename = fileExt ? `${uuid.v4()}.${fileExt}` : uuid.v4(); // v4 is a random uuid
  const file = storage.bucket(DEFAULT_BUCKET_NAME).file(filename);

  return new Promise((resolve, reject) => {
    file.getSignedUrl(options, (err, url) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve({
          url,
          publicUrl: getPublicUrl(filename),
        });
      }
    });
  });
}
