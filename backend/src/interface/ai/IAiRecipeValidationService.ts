
import { AddRecipeDTO } from "../../dtos/recipeDTOs/addRecipeDTO";
import { RecipeValidationResult } from "../../services/ai/AiRecipeValidationService";

export interface IAiRecipeValidationService {
    validateRecipe(
        recipe: AddRecipeDTO
    ): Promise<RecipeValidationResult>
}