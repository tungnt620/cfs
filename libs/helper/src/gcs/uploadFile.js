import { getSignedUrl, uploadFileWithSignedUrl } from '@cfs/api/gcs';

const uploadFile = async (file, toast) => {
  if (file) {
    const fileExt = file.type?.split('/')[1];
    if (fileExt) {
      const { signedUrl, publicUrl, error } = await getSignedUrl(fileExt, file);
      if (signedUrl) {
        const result = await uploadFileWithSignedUrl(signedUrl, file);

        return result ? publicUrl : '';
      }
      if (error) {
        toast?.({
          title: error,
          position: 'top',
          isClosable: true,
          status: 'error',
        });

        return '';
      }
    }
  }
};

export default uploadFile;
