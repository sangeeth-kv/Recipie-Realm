import { AddRecipeDTO } from "../../../dtos/recipeDTOs/addRecipeDTO";


export interface IRecipeService {
    addRecipe(data:AddRecipeDTO):Promise
}