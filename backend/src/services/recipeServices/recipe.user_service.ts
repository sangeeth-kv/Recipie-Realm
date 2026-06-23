import logger from "../../config/logger";
import { AddRecipeDTO } from "../../dtos/recipeDTOs/addRecipeDTO";
import { IAiRecipeEnhancementService } from "../../interface/ai/IAiRecipeEnhancementService";
import { IAiRecipeValidationService } from "../../interface/ai/IAiRecipeValidationService";
import { INutritionQueueService } from "../../interface/queue/INutritionQueueService";
import IRecpieRepository from "../../interface/recipies/recipies/IRecipeRepository";
import { IRecipeService } from "../../interface/recipies/recipies/IRecipeService";
import { AppError } from "../../utils/AppError";
import AiRecipeValidationService from "../ai/AiRecipeValidationService";



export default class  RecipeService implements IRecipeService{
    //dependency injection
    constructor(
        private recipeRepository:IRecpieRepository, //for manage withe the recipe repo
        private aiNutritionQueueService:INutritionQueueService, //for deals with the queue for generate nutritions data using AI
        private aiRecipeValidationService:IAiRecipeValidationService,
        private aiRecipeEnhancementService:IAiRecipeEnhancementService
    ){}

    addRecipe=async(data: AddRecipeDTO)=> {
        console.log("data in the add recipe service : ",data);

        let validation;

        validation=await this.aiRecipeValidationService.validateRecipe(data);

        if(!validation.isValid && validation.confidence>80){
            throw new AppError(validation.reason,400);
        }

        //calling the repo for create the recipie
        const recipe =await this.recipeRepository.createRecipie(data);
        logger.debug("After createRecipe");

        //add to the queue by passing the recipe id , the worker will do the AI nutrition extraction and save to DB
        await this.aiNutritionQueueService.addJob(
            recipe._id.toString()
        );

         logger.debug("After added ot jOB");

        return recipe;
    }

    getAllRecipies=async(currentUserId: string)=> {
        console.log("Current UsER ID in RECIPIE_SERVICE : ",currentUserId)
    }

    getEnhancedDesc=async(description: string, regenerate: boolean)=>{
        return this.aiRecipeEnhancementService.enhanceDescription(description,regenerate)
    }
}