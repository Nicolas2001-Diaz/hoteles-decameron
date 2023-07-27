import axios from "axios";

const axiosClient = axios.create({
  baseURL: `https://quadratic-echelon.000webhostapp.com/api`,
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.reload();

      return error;
    }

    throw error;
  }
);

export default axiosClient;
