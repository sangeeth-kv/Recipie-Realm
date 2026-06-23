import NutritionRepository from "../repository/nutritionRepository/nutrition.user_repository";
import RecipeRepository from "../repository/recipeRepository/recipe.user_repository";
import AiNutritionService from "../services/ai/AiNutritionService";
import GeminiClient from "../services/ai/GeminiClient";
import OllamaService from "../services/ai/ollama_service";
import NutritionService from "../services/nutritionService/nutrition_service";

const recipeRepository =
  new RecipeRepository();

const nutritionRepository =
  new NutritionRepository();

const ollamaService =
  new OllamaService();

const geminiClient=
  new GeminiClient();

const aiNutritionService =new AiNutritionService(geminiClient);


export const nutritionService =
  new NutritionService(
    recipeRepository,
    nutritionRepository,
    aiNutritionService
  );

