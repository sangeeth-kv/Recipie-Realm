import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env";


console.log("SEC:",ENV.CLOUDINARY_API_SECRET)
console.log("KEY:",ENV.CLOUDINARY_API_KEY)
console.log("NAM:",ENV.CLOUDINARY_NAME)


cloudinary.config({
    cloud_name: ENV.CLOUDINARY_NAME,
    api_key:ENV.CLOUDINARY_API_KEY,
    api_secret:ENV.CLOUDINARY_API_SECRET,
})

export default cloudinary;