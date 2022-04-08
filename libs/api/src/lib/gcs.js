import Axios from 'axios';
import { apiUrl } from './utils';

const axiosInstance = Axios.create();

export const getSignedUrl = (fileType, file) => {
  return axiosInstance
    .post(`${apiUrl}/api/gcs/signed-url/${fileType}?fileSize=${file.size}`)
    .then((res) => {
      return res?.data || {};
    })
};

export const uploadFileWithSignedUrl = async (signedUrl, file) => {
  const fileExt = file.type?.split('/')[1];

  return axiosInstance
    .put(signedUrl, file, {
      headers: {
        'Content-Type': `image/${fileExt}`,
      },
    })
    .then(() => {
      return 1;
    })
    .catch((err) => {
      console.error(err);
      return 0;
    });
};
