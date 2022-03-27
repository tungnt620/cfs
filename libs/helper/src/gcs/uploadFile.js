import { getSignedUrl, uploadFileWithSignedUrl } from '@cfs/api/gcs';

const uploadFile = async (file) => {
  const fileExt = file.type.split('/')[1];
  const { signedUrl, publicUrl } = await getSignedUrl(fileExt);
  const result = await uploadFileWithSignedUrl(signedUrl, file);

  return result ? publicUrl : null;
};

export default uploadFile;
