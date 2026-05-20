import { API_URLS } from "../api/API_URLS";
import axiosInstance from "../api/axiosInstance";

export const getAllUsers = async (
  page: number,
  limit: number,
  search: string
) => {

  const response =
    await axiosInstance.get(
      `${API_URLS.PROFILE}?page=${page}&limit=${limit}&search=${search}`
    );

  return response.data.data;
};