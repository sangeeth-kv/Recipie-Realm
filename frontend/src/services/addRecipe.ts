import { API_URLS } from "../api/API_URLS";
import axiosInstance from "../api/axiosInstance";



export default async function addRecipe(formData:FormData,onProgress?: (progress: number) => void
) {
    const response=await axiosInstance.post(API_URLS.ADD_RECIPE,formData,{
    
        onUploadProgress:(progressEvent)=>{
            if (!progressEvent.total) return;
            const percent = Math.round(
                (progressEvent.loaded * 100) /
                progressEvent.total
            );
            onProgress?.(percent);
        }

    })
    return response.data
}