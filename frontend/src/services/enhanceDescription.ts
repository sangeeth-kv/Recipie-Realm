// services/enhanceDescription.ts

import axiosInstance from "../api/axiosInstance";

export async function enhanceDescription(
  description: string,
  isReGenerate:boolean=false
) {
  const response = await axiosInstance.post(
    "/recipe/enhance-description",
    { description,isReGenerate }
  );

  return response.data.data;
}