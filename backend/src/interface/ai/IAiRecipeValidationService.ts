
import { AddRecipeDTO } from "../../dtos/recipeDTOs/addRecipeDTO";

export interface IAiRecipeValidationService {
    validateRecipe(
        recipe: AddRecipeDTO
    ): Promise<{
        isValid:boolean;
        confidence:number;
        reason:string;
    }>
}