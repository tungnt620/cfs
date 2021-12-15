import Axios from 'axios';

const axiosInstance = Axios.create();

export const getSignedUrl = (fileType) => {
  return axiosInstance
    .post(`/api/gcs/signed-url/${fileType}`)
    .then((res) => {
      return res?.data?.signedUrl;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

export const uploadFileWithSignedUrl = (signedUrl, file) => {
  return axiosInstance
    .put(signedUrl, Buffer.from(file))
    .then((res) => {
      console.log(res);
      return 1;
    })
    .catch((err) => {
      console.error(err);
      return 0;
    });
};
