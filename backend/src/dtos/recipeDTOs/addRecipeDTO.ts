import { IRecipe } from "../../interface/recipies/IRecipies";

export type CategoryType="Veg"|"Non-Veg"|"Dessert";
export type DifficultyType="Easy"|"Medium"|"Hard";
export interface IIngredient {
  name: string;
  quantity: number;
  unit: string;
}

export interface AddRecipeDTO{
    title:string;
    description:string;
    catergory:CategoryType;
    prepTime:number;
    difficulty:DifficultyType;
    tags:string[];
    ingredients:IIngredient[];
    steps:string[];
    images?:string[];
}


export interface AddRecipeResponseDTO{
    recipe:IRecipe
}



