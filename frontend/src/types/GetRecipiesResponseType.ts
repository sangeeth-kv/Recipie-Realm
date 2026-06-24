import type { IRecipe } from "../interface/IRecipie";

export type GetRecipiesResponse = {
  success: boolean;
  message: string;
  result?: IRecipe[];
};