import axios from "axios";
import { refreshService } from "../services/refreshService";
import type { QueueItem } from "../types/QueueItem";
import type { CustomAxiosRequestConfig } from "../interface/CustomAxiosRequestConfig";

const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    timeout:10000,
    withCredentials: true,
    headers:{
        "Content-Type":"application/json"
    },
})


axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("accessToken");

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

// const inValidMessages:string[]=[
//     "INVALID_TOKEN",
//     "UNAUTHORIZED",
//     "INVALID_USER",
//     "USER_NOT_FOUND",

// ]

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.log("error respose : ",error.response.data)
//     if (error.response?.status === 401) {
//       console.log("Unauthorized - maybe token expired");
//       // redirect to login or refresh token
//     }
//     if(inValidMessages.includes(error?.response?.data?.message)){
//         // window.location.href = "/auth/signin"
//         return Promise.reject(error);
//     }

//     return Promise.reject(error);
//   }
// );


let isRefreshing = false;
let failedQueue: QueueItem[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};




axiosInstance.interceptors.response.use(
  (response) =>{
    console.log("✅ RESPONSE INTERCEPTED");
    return response;
  },
  async (error) => {
    // if(!window.location.pathname.includes("/auth")){
      console.log("🔥 INTERCEPTOR HIT");

    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    console.log(error.response)

    console.log("FULL ERROR:", error.response?.data);

    const message = error?.response?.data?.message;

    console.log("message in response : ",message)

    // 🔥 HANDLE TOKEN EXPIRED
    // if (message === "TOKEN_EXPIRED" && !originalRequest._retry) {
  //   const shouldRefresh =
  // message === "TOKEN_EXPIRED" ||
  // message === "NOT_AUTHENTICATED";

if (message==="TOKEN_EXPIRED" && !originalRequest._retry){

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
           return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refreshService()
         
        processQueue(null);
        isRefreshing = false;

        return axiosInstance(originalRequest);
        // return Promise.reject(error);

      } catch (err) {
        processQueue(err, null);
        isRefreshing = false;

        if (window.location.pathname !== "/auth/signin") {
            window.location.href = "/auth/signin";
        }


        // ❌ refresh failed → logout
        window.location.href = "/auth/signin";
        return Promise.reject(err);
      }
    }

    // ❌ INVALID TOKEN → logout immediately
    if (
  message === "INVALID_TOKEN" ||
  message === "INVALID_REFRESH_TOKEN" ||
  message === "REFRESH_TOKEN_EXPIRED" ||
  message==="NOT_AUTHENTICATED"
) {
  // if (window.location.pathname !== "/auth/signin") {
    window.location.href = "/auth/signin";
  // }
}

    return Promise.reject(error);
    }
  // }
);

export default axiosInstance;