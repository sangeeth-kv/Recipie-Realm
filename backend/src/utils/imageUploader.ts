import { multerUpload } from "../config/multer.config";
import { IUploader } from "../interface/user/uploader/IUploader";

class ImageUploader implements IUploader {

    constructor(){
        console.log("Reaches Image uploader controller: ")
    }
    
  
  // Single image upload
  single(fieldName: string) {
    return multerUpload.single(fieldName);
  }

  // Multiple image upload
  multiple(fieldName: string, maxCount = 10) {
    console.log("Logged:")
    return multerUpload.array(fieldName, maxCount);
  }
}

export default ImageUploader