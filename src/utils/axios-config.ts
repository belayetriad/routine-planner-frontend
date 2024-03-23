import axios from "axios";
import Cookies from "js-cookie";

const apiRequest = axios.create({
  baseURL: process.env.API_BASE_URL,
});

apiRequest.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  const currentWarehouseId = Cookies.get("currentWarehouseId");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
apiRequest.interceptors.response.use(function (response) {
  return response.data;
});

export default apiRequest;
