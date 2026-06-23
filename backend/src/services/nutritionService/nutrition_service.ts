import logger from "../../config/logger";
import { IAiNutritionService } from "../../interface/ai/IAiNutritionService";
import INutritionRepository from "../../interface/recipies/nutrition/INutritionRepository";
import { INutritionService } from "../../interface/recipies/nutrition/INutritionService";
import IRecpieRepository from "../../interface/recipies/recipies/IRecipeRepository";
import { AppError } from "../../utils/AppError";
import OllamaService from "../ai/ollama_service";


export default class NutritionService implements INutritionService{
    constructor(
        private recipeRepository:IRecpieRepository,//for deals with the recipe db, because to find the recipe and get the details
        private nutritionRepository:INutritionRepository,//deals with the nutritions repo to save the data safely to databse.
        private ai_nutritionService:IAiNutritionService //for AI ,it wiil provide the data of nutritions using AI
    ){}

    //this function is called by the worker
    async generateNutrition(recipeId: string): Promise<void> {
        //checking the recipe is there.

        logger.debug("Before recipe repo call inside generate Nutrition");
        const recipe=await this.recipeRepository.findById(recipeId);
        logger.debug("After recipe repo called ");

        if(!recipe){
           throw new Error("RECIPE_NOT_FOUND");
        }

        if(recipe!=null){
             logger.debug("Before generateNutition in AI SERVIEC");
            const nutrition =await this.ai_nutritionService.generateNutrition(recipe); //ccalling the AI service

            console.log("REsponse in nutrition : ",nutrition)

             logger.debug("After AI Response");

            //create the new data of the nutritions and save to database
            await this.nutritionRepository.createNutrition({
                recipeId: recipe._id,

                calories: nutrition.calories,
                protein: nutrition.protein,
                carbs: nutrition.carbs,
                fat: nutrition.fat,
                fiber: nutrition.fiber,

                enhancedDescription:
                  nutrition.enhancedDescription,

                nutritionHighlights:
                  nutrition.nutritionHighlights,

                dietaryLabels:
                  nutrition.dietaryLabels,

                cookingTips:
                  nutrition.cookingTips,

                healthScore:
                  nutrition.healthScore
            });
        }
        

    }

    
    

}