import multer from "multer";
import path from "path";
import cloudinary from "./cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";


const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {

    let folder="recipe-realm"

    if (file.fieldname === "images") {
      folder = "recipe-realm/recipes";
    }

    if (file.fieldname === "profile") {
      folder = "recipe-realm/profiles";
    }

    return {
      folder,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Only image files are allowed"));
  }

  cb(null, true);
};

export const multerUpload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter,
});