import { AddRecipeDTO } from "../../dtos/recipeDTOs/addRecipeDTO";
import { IRecipeService } from "../../interface/recipies/recipies/IRecipeService";



export default class  RecipeService implements IRecipeService{
    constructor(private recipeRepository:IRecpieRepository){}

    addRecipe=async(data: AddRecipeDTO)=> {
        
    }
}