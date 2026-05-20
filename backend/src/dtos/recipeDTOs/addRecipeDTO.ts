export type CategoryType="Veg"|"Non-Veg"|"Dessert";
export type DifficultyType="Easy"|"Medium"|"Hard";
export interface AddRecipeDTO{
    title:string;
    description:string;
    catergory:CategoryType;
    prepTime:number;
    difficulty:DifficultyType;
    tags:string[];
    ingredients:string[];
    steps:string[];
    images:object[];
}



