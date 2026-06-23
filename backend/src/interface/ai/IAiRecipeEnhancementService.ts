import { IRecipe } from "../recipies/IRecipies";

export interface IAiRecipeEnhancementService {
  enhanceDescription(
    description:string,
    regenerate:boolean
  ):Promise<any>;
}