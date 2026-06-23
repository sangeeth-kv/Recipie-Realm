import redis from "../config/redis";
import RecipeController from "../controller/recipeController/recipe.user_controller";
import RecipeRepository from "../repository/recipeRepository/recipe.user_repository";
import AiRecipeEnhancementService from "../services/ai/AiRecipeEnhancementService";
import AiRecipeValidationService from "../services/ai/AiRecipeValidationService";
import GeminiClient from "../services/ai/GeminiClient";
import RedisService from "../services/cacheServices/redisService";
import NutritionQueueService from "../services/nutritionService/nutrition.Queue_Service";
import RecipeService from "../services/recipeServices/recipe.user_service";






const recipeRepository=new RecipeRepository()
const nutritionQueueService =new NutritionQueueService();
const geminiClient=new GeminiClient();
const redisClient=redis;
const cacheService=new RedisService(redisClient);
const recipeEnhancementService =new AiRecipeEnhancementService(geminiClient,cacheService);
const recipeValidationService=new AiRecipeValidationService(geminiClient);
const recipeService=new RecipeService(recipeRepository,nutritionQueueService,recipeValidationService,recipeEnhancementService)
const recipeController=new RecipeController(recipeService,)

export {recipeController}