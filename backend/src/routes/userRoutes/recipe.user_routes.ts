import { Router } from "express";
import { authMiddleware } from "../../container/auth.user.container";
import ImageUploader from "../../utils/imageUploader";
import { recipeController } from "../../container/recipe.user.container";
import { enhanceDescriptionSchema } from "../../validators/descValidation";
import { validate } from "../../middlewares/validationMiddleware";
import { createRecipeSchema } from "../../validators/recipeValidation";
const imageUploader=new ImageUploader()



const router = Router();
router.post("/add-recipe",authMiddleware.authHandle,imageUploader.multiple("images"),validate(createRecipeSchema),recipeController.addRecipe)
router.get("/",authMiddleware.authHandle,recipeController.getRecipies)
router.get("/recipe-details/:id",authMiddleware.authHandle,recipeController.recipeDetails)
router.put("/edit-recipe/:id",authMiddleware.authHandle,recipeController.editRecipe)
router.post("/enhance-description",authMiddleware.authHandle,validate(enhanceDescriptionSchema),recipeController.getEnhancedDesc)


export default router;