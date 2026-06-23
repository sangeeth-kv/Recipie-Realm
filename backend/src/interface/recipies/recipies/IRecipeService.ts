import { AddRecipeDTO } from "../../../dtos/recipeDTOs/addRecipeDTO";


export interface IRecipeService {
    addRecipe(data:AddRecipeDTO):Promise<any>;
    getAllRecipies(currentUserId:string):Promise<any>;
    getEnhancedDesc(description:string,regenerate:boolean):Promise<any>;
}