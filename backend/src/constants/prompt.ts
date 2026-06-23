import { AddRecipeDTO } from "../dtos/recipeDTOs/addRecipeDTO";
import { IRecipe } from "../interface/recipies/IRecipies";

export  const AI_PROMPTS :IAI_PROMPTS ={
    DESC_ENHANCEMENT:(description:string,regenerate:boolean)=>{
        return  regenerate
        ? `
        Rewrite this recipe description differently.

        Description:
        ${description}

        Requirements:
        - Different wording
        - More engaging
        - Return only description
        `
            : `
        Improve this recipe description.

        Description:
        ${description}

        Requirements:
        - More engaging
        - Suitable for recipe website
        - Return only description
        `;
    },
    GENERATE_NUTRITION:(recipe)=>{
       return  `
       Analyze the recipe.
           
       Title:
       ${recipe.title}
           
       Ingredients:
       ${JSON.stringify(recipe.ingredients)}
           
       Return ONLY valid JSON:
           
       {
         "calories":0,
         "protein":0,
         "carbs":0,
         "fat":0,
         "fiber":0,
         "enhancedDescription":"",
         "nutritionHighlights":[],
         "dietaryLabels":[],
         "cookingTips":[],
         "healthScore":0
       }
       `;
    },
    AI_VALIDATION:(recipe)=>{
        return `
        You are a professional chef.

        Check whether this recipe is realistic.

        Recipe:
        ${JSON.stringify(recipe)}

        Return JSON only:

        {
          "isValid": true,
          "confidence": 95,
          "reason": ""
        }
        `;

    }

}

interface IAI_PROMPTS{
    DESC_ENHANCEMENT(description:string,regenerate:boolean):string;
    GENERATE_NUTRITION(recipe:IRecipe):string;
    AI_VALIDATION(recipe:AddRecipeDTO):string;
}



