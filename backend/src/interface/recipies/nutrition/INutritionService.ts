export interface INutritionService {
  generateNutrition(recipeId: string): Promise<void>;
}