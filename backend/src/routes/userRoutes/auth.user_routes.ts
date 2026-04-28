import { Router } from "express";
import { authMiddleware, authUserController } from "../../container/auth.user.container";
import { validate } from "../../middlewares/validationMiddleware";
import { signupSchema } from "../../validators/signupvalidation";
import { signinSchema } from "../../validators/signinValidation";



const router = Router();
router.post("/signup", validate(signupSchema),authUserController.signup)
router.post("/signin",validate(signinSchema),authUserController.signin)
router.get("/me",authMiddleware.authHandle,authUserController.getMe)
router.post("/refresh-token",authUserController.refresh)



export default router;