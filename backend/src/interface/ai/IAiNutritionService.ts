import { IRecipe } from "../recipies/IRecipies";

export interface IAiNutritionService {
  generateNutrition(recipe:IRecipe):Promise<any>;
}