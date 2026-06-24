import axios from "axios";
import { API_URLS } from "../api/API_URLS";
import axiosInstance from "../api/axiosInstance";
import type { GetRecipiesResponse } from "../types/GetRecipiesResponseType";




export async function getRecipies():Promise<GetRecipiesResponse> {
    try {
        const response=await axiosInstance.get(API_URLS.GET_RECIPIES);
        console.log("response : ",response)
        return response.data
    } catch (error:unknown) {
        console.log(error);
        if (axios.isAxiosError(error)) {
      return error.response?.data ?? {
        success: false,
        message: "Server error",
      };
    }

    return { success: false, message: "Network error" };
    }
}