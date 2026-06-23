import { AI_PROMPTS } from "../../constants/prompt";
import { IAiClient } from "../../interface/ai/IAiClient";
import { IAiNutritionService } from "../../interface/ai/IAiNutritionService";
import { IRecipe } from "../../interface/recipies/IRecipies";

export default class AiNutritionService
implements IAiNutritionService {

  constructor(
    private geminiClient: IAiClient
  ) {}

  async generateNutrition(recipe:IRecipe) {

      const prompt = AI_PROMPTS.GENERATE_NUTRITION(recipe)

      const response =
        await this.geminiClient.generate(prompt);

      return JSON.parse(response!);
  }
}