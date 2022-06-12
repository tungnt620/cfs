import { uploadFileWithGCS } from '@cfs/api/gcs';

const uploadFile = async (file, toast) => {
  if (file) {
    const fileExt = file.type?.split('/')[1];
    if (fileExt) {
      const publicUrl = await uploadFileWithGCS(file);
      if (publicUrl) {

        return publicUrl;
      } else {
        toast?.({
          title: 'Có lỗi khi tải file, có thể do file quá lớn.',
          position: 'top',
          isClosable: true,
          status: 'error'
        });

        return 'error';
      }
    }
  }
};

export default uploadFile;
