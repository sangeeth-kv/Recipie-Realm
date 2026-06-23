import logger from "../../config/logger";
import { AddRecipeDTO } from "../../dtos/recipeDTOs/addRecipeDTO";
import { IAiRecipeEnhancementService } from "../../interface/ai/IAiRecipeEnhancementService";
import { IAiRecipeValidationService } from "../../interface/ai/IAiRecipeValidationService";
import { INutritionQueueService } from "../../interface/queue/INutritionQueueService";
import { AiApproveStatus } from "../../interface/recipies/IRecipies";
import IRecpieRepository from "../../interface/recipies/recipies/IRecipeRepository";
import { IRecipeService } from "../../interface/recipies/recipies/IRecipeService";
import { AppError } from "../../utils/AppError";
import AiRecipeValidationService, { RecipeValidationResult } from "../ai/AiRecipeValidationService";



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

        const validation =await this.aiRecipeValidationService.validateRecipe(data);

        let aiApproveStatus:AiApproveStatus;

        if(validation.aiFailed){
            aiApproveStatus="PENDING";
        }else if(validation.isValid && validation?.confidence >= 80){
            aiApproveStatus="SUCCESS";
        }else{
            aiApproveStatus = "REJECTED";
        }

        //calling the repo for create the recipie
        const recipe =await this.recipeRepository.createRecipie({...data,aiApproveStatus});
        logger.debug("After createRecipe");

        if (aiApproveStatus === "SUCCESS") {
            await this.aiNutritionQueueService.addJob(recipe._id.toString());
        }

        return recipe;
    }

    getAllRecipies=async(currentUserId: string)=> {
        console.log("Current UsER ID in RECIPIE_SERVICE : ",currentUserId)
    }

    getEnhancedDesc=async(description: string, regenerate: boolean)=>{
        return this.aiRecipeEnhancementService.enhanceDescription(description,regenerate)
    }
}