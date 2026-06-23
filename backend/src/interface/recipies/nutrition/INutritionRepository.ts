import { INutrition } from "../INutrition";



export default interface INutritionRepository{
    findByRecipeId(recipeId:string):Promise<INutrition | null>;
    createNutrition(data: Partial<INutrition>):Promise<INutrition>;
}