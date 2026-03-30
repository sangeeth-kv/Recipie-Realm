import { API_URLS } from "../api/API_URLS";
import axiosInstance from "../api/axiosInstance";

export async function refreshService() {
    const res=await axiosInstance.post(API_URLS.REFRESH)
    return res.data.data
}