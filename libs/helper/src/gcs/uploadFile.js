import { getSignedUrl, uploadFileWithSignedUrl } from '@cfs/api/gcs';

const uploadFile = async (file, fileName) => {
  const signedUrl = await getSignedUrl(fileName);
  return uploadFileWithSignedUrl(file, signedUrl);
};
