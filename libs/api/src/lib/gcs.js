import Axios from 'axios';
import { apiUrl } from './utils';

const axiosInstance = Axios.create();

export const getSignedUrl = (fileType, file) => {
  return axiosInstance
    .post(`${apiUrl}/api/gcs/signed-url/${fileType}?fileSize=${file.size}`)
    .then((res) => {
      return res?.data || {};
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const uploadFileWithSignedUrl = async (signedUrl, file) => {
  return axiosInstance
    .put(signedUrl, file, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-Upload-Content-Length': file.size,
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
