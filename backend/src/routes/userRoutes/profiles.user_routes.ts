import { Router } from "express";
import { authMiddleware } from "../../container/auth.user.container";
import { profileUserController } from "../../container/profile.user.container";


const router = Router();
router.get("/profiles",authMiddleware.authHandle,profileUserController.getProfiles)

export default router;