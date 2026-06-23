import axios from "axios";
import { IRecipe } from "../../interface/recipies/IRecipies";

export default class OllamaService {
    //called by nutrition service 
  async generateNutrition(
    recipe: IRecipe
  ) {

    console.log("Data reached in the generate Nutrition",recipe);

    const prompt = `
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

    const response =
      await axios.post(
        "http://localhost:11434/api/generate",
        {
          model: "llama3",
          prompt,
          stream: false,
        }
      );


      console.log("here is the response got in AI_OLAMA SERVICE: ",response.data)

    return JSON.parse(
      response.data.response
    );
  }
}