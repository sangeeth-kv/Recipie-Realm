import { INutrition } from "../../interface/recipies/INutrition";
import { IRecipe } from "../../interface/recipies/IRecipies";
import INutritionRepository from "../../interface/recipies/nutrition/INutritionRepository";
import { NutritionModel } from "../../models/nutrition_model";
import { BaseRepository } from "../baseRepository";


export default class NutritionRepository extends BaseRepository<INutrition> implements INutritionRepository{
    constructor(){
        super(NutritionModel);
    }

    async findByRecipeId(recipeId: string): Promise<INutrition | null> {
        return await this._model.findOne({recipeId});
    }

    async createNutrition(data: Partial<INutrition>): Promise<INutrition> {
        return await this._model.create(data);
    }
}