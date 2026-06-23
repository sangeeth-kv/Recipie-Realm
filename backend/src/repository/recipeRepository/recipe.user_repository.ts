import { AddRecipeDTO } from "../../dtos/recipeDTOs/addRecipeDTO";
import { IRecipe } from "../../interface/recipies/IRecipies";
import IRecpieRepository from "../../interface/recipies/recipies/IRecipeRepository";
import { RecipieModel } from "../../models/recipie_model";
import { BaseRepository } from "../baseRepository";



export default class RecipeRepository extends BaseRepository<IRecipe> implements IRecpieRepository{
    constructor(){
        super(RecipieModel)
    }

    async createRecipie(data: AddRecipeDTO): Promise<IRecipe> {
        return await this._model.create(data as Partial<IRecipe>);
    }
    
    async findById(id: string): Promise<IRecipe | null> {
        return this._model.findById(id)
    }


    
}