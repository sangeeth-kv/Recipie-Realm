import { AI_PROMPTS } from "../../constants/prompt";
import { AddRecipeDTO } from "../../dtos/recipeDTOs/addRecipeDTO";
import { IAiClient } from "../../interface/ai/IAiClient";

export default class AiRecipeValidationService {

    constructor(
        private aiClient: IAiClient
    ){}

    async validateRecipe(
        recipe:AddRecipeDTO
    ){

        const prompt = AI_PROMPTS.AI_VALIDATION(recipe)
        const response =
          await this.aiClient.generate(prompt);

        return JSON.parse(response!);
    }
}