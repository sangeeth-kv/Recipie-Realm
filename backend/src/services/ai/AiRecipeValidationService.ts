import logger from "../../config/logger";
import { AI_PROMPTS } from "../../constants/prompt";
import { AddRecipeDTO } from "../../dtos/recipeDTOs/addRecipeDTO";
import { IAiClient } from "../../interface/ai/IAiClient";
export interface RecipeValidationResult {
    aiFailed: boolean ;
    isValid: boolean;
    confidence: number;
    reason?: string;
}
export default class AiRecipeValidationService {

    constructor(
        private aiClient: IAiClient
    ){}

    async validateRecipe(recipe:AddRecipeDTO):Promise<RecipeValidationResult>{

        try {
            const prompt = AI_PROMPTS.AI_VALIDATION(recipe);

            const response =await this.aiClient.generate(prompt);

            const result= JSON.parse(response!);
            return {
                aiFailed:false,
                ...result
            }
        } catch (error) {
            logger.error("AI validation failed", error);
            return {
                aiFailed:true,
                isValid:true,
                confidence:0
            }
        }
    }
}