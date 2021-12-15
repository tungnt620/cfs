// const { Storage } = require('@google-cloud/storage');
// const path = require('path');
// const uuid = require('uuid');
// // Instantiate a storage client with credentials
// const storage = new Storage({ keyFilename: 'google-cloud-key.json' });
//
// /**
//  * Copy file from local to a GCS bucket.
//  * Uploaded file will be made publicly accessible.
//  *
//  * @param {string} localFilePath
//  * @param {string} bucketName
//  * @param {Object} [options]
//  * @return {Promise.<string>} - The public URL of the uploaded file.
//  */
// const copyFileToGCS = (localFilePath, bucketName) => {
//   const bucket = storage.bucket(bucketName);
//   const fileName = path.basename(localFilePath);
//
//   return bucket
//     .upload(localFilePath, {
//       destination: 'tungnguyen.json',
//     })
//     .then(() => `https://storage.googleapis.com/${bucketName}/${fileName}`);
// };
//
// // copyFileToGCS('./nx.json', 'confession-v3')
// //   .then((url) => console.log(url))
// //   .catch((err) => console.error(err));
//
// async function generateV4WriteSignedUrl() {
//   // These options will allow temporary read access to the file
//   const options = {
//     version: 'v4',
//     action: 'write',
//     expires: Date.now() + 30 * 60 * 1000, // 15 minutes
//   };
//
//   const filename = uuid.v4(); // v4 is a random uuid
//   const file = storage.bucket('confession-v3').file(filename);
//
//   file.getSignedUrl(options, function (err, url) {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log('URL');
//     console.log('-----');
//     console.log(url);
//     console.log('-----');
//     console.log(
//       'PUT to this URL to upload to Google Cloud Storage as ' + filename
//     );
//   });
// }
//
// generateV4WriteSignedUrl().catch(console.error);
