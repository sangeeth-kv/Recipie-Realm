import { Router } from "express";
import { authMiddleware } from "../../container/auth.user.container";
import ImageUploader from "../../utils/imageUploader";
const imageUploader=new ImageUploader()



const router = Router();
router.post("/add-recipe",authMiddleware.authHandle,imageUploader.multiple("images"),(req, res) => {

    console.log("BODY:");
    console.log(req.body);

    console.log("FILES:");
    console.log(req.files);

    return res.json({
      success: true,
    });
  })

export default router;