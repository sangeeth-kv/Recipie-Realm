import logger from "../../config/logger";
import { AI_PROMPTS } from "../../constants/prompt";
import { IAiClient } from "../../interface/ai/IAiClient";
import { IAiRecipeEnhancementService } from "../../interface/ai/IAiRecipeEnhancementService";
import ICacheService from "../../interface/cache/ICacheService";
import { IRecipe } from "../../interface/recipies/IRecipies";
import crypto from "crypto";

export default class AiRecipeEnhancementService implements IAiRecipeEnhancementService {

    constructor(
        private aiClient: IAiClient,
        private cacheService:ICacheService
    ){}

    async enhanceDescription(
        description:string,
        regenerate:boolean
    ){
        const hash = crypto.createHash("sha256").update(description).digest("hex");

        const cacheKey= `recipe-desc:${hash}`;

        if(!regenerate){
            try {     //Add try catch if the redis fails AI should works
                const cached =
                await this.cacheService.get(cacheKey);

                if (cached) {
                    return cached;
                }
            }
            catch (err) {
                logger.error("Redis error", err);
            }
        }

       const prompt = AI_PROMPTS.DESC_ENHANCEMENT(description,regenerate);

        const response =await this.aiClient.generate(prompt);

        if (!response?.trim()) {
            throw new Error("Empty response");
        }

        await this.cacheService.set(cacheKey,String(response),3600)

        return response
    }
}