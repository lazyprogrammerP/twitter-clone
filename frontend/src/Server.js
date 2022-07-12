import axios from "axios";

const Server = axios.create({
  baseURL: "http://localhost:8000/",
});

Server.interceptors.request.use((axiosConfig) => {
  axiosConfig["headers"]["x-auth-token"] = localStorage.getItem("x-auth-token");
  return axiosConfig;
});

Server.interceptors.response.use(
  (response) => {
    console.log(response.headers);
    if (response.headers["x-auth-token"] && response.headers["x-auth-token"] !== localStorage.getItem("x-auth-token")) {
      localStorage.setItem("x-auth-token", response.headers["x-auth-token"]);
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      window.location = "/auth/sign-up";
      return;
    }

    return Promise.reject(error);
  }
);

export default Server;
