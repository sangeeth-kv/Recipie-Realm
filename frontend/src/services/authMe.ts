// import axios from "axios";
import { API_URLS } from "../api/API_URLS";
import axiosInstance from "../api/axiosInstance";
import type { SigninResponse } from "../types/SignupResponseType";


export async function getMe():Promise<SigninResponse> {
     const res = await axiosInstance.get(API_URLS.GET_ME);
    return res.data.data;
}

// import { API_URLS } from "../api/API_URLS";
// import axiosInstance from "../api/axiosInstance";
// import type { SigninResponse } from "../types/SignupResponseType";

// export async function getMe(): Promise<SigninResponse> {
//   try {
//     const res = await axiosInstance.get(API_URLS.GET_ME);
//     return res.data.data;
//   } catch (error: any) {
//     const message = error?.response?.data?.message;

//     if (message === "TOKEN_EXPIRED") {
//       // Refresh inline — before React Query sees any error
//       await axiosInstance.post(API_URLS.REFRESH);
//       // Retry the original request with the new cookie
//       const res = await axiosInstance.get(API_URLS.GET_ME);
//       return res.data.data;
//     }

//     throw error; // hard failures (INVALID_TOKEN, NOT_AUTHENTICATED) bubble up normally
//   }
// }
// export async function getMe(): Promise<SigninResponse> {
//   try {
//     const res = await axiosInstance.get(API_URLS.GET_ME);
//     return res.data.data;
//   } catch (error: any) {
//     const message = error?.response?.data?.message;
//     console.log("getMe caught error:", message);  // 👈 add this

//     if (message === "TOKEN_EXPIRED") {
//       console.log("Attempting refresh...");  // 👈 add this
//       await axiosInstance.post(API_URLS.REFRESH);
//       const res = await axiosInstance.get(API_URLS.GET_ME);
//       return res.data.data;
//     }

//     throw error;
//   }
// }