import Axios from 'axios';
import { apiUrl } from './utils';

const axiosInstance = Axios.create();

export const getSignedUrl = (fileType) => {
  return axiosInstance
    .post(`${apiUrl}/api/gcs/signed-url/${fileType}`)
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
        'Content-Type': file.type,
      },
    })
    .then((res) => {
      console.log(res);
      return 1;
    })
    .catch((err) => {
      console.error(err);
      return 0;
    });
};
