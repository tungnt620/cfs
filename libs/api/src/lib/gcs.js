import Axios from 'axios';
import { apiUrl } from './utils';

const axiosInstance = Axios.create();

export const getSignedUrl = (fileType, file) => {
  return axiosInstance
    .post(`${apiUrl}/api/gcs/signed-url/${fileType}?fileSize=${file.size}`)
    .then((res) => {
      return res?.data || {};
    });
};

export const uploadFileWithSignedUrl = async (signedUrl, file) => {
  return axiosInstance
    .put(signedUrl, file, {
      headers: {
        // 'Content-Type': `application/octet-stream`,
        'x-google-content-length-range': file.size,
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

export const uploadFileWithGCS = async (file) => {
  const bodyFormData = new FormData();
  bodyFormData.append('file', file);

  return axiosInstance
    .post(`${apiUrl}/upload`, bodyFormData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error(err);
      return 0;
    });
};
