import axiosInstance from "../api/axiosInstance";

export const getAllUsers = async () => {
  const response = await axiosInstance.get("/profiles");

  return response.data.users;
};