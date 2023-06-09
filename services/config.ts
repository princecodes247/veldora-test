import axios from "axios";

const baseURL = "http://ibuzzup.com/sender";
// const baseURL = new URL("");

const api = axios.create({
  baseURL: baseURL.toString(),
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
  },
});
const waitlistApi = axios.create({
  baseURL: "https://tame-teal-cormorant-tux.cyclic.app",
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
  },
});
const uninterceptedApi = axios.create({
  baseURL: baseURL.toString(),
  maxBodyLength: Infinity,
  headers: {
    "Content-Type": "application/json",
  },
});
// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("interceptor error", error, error?.response?.data?.message);
    if (
      error?.response?.data?.message.toLowerCase().includes("unauthenticated")
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.log("interceptor errorssq");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

const authHeaders = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
  };
};
export { baseURL, authHeaders, waitlistApi, uninterceptedApi };
export default api;
