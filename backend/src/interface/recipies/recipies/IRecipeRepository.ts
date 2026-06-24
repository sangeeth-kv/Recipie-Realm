import { AddRecipeDTO } from "../../../dtos/recipeDTOs/addRecipeDTO";
import { IRecipe } from "../IRecipies";


export default interface IRecpieRepository{
    createRecipie(data:AddRecipeDTO):Promise<IRecipe>;
    findById(recipeId:string):Promise<IRecipe |null>;
    getRecipies(currentUserId:string):Promise<IRecipe[]>;
}