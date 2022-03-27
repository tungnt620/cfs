import { getSignedUrl, uploadFileWithSignedUrl } from '@cfs/api/gcs';

const uploadFile = async (file) => {
  if (file) {
    const fileExt = file.type?.split('/')[1];
    if (fileExt) {
      const { signedUrl, publicUrl } = await getSignedUrl(fileExt, file);
      const result = await uploadFileWithSignedUrl(signedUrl, file);

      return result ? publicUrl : null;
    }
  }
};

export default uploadFile;
