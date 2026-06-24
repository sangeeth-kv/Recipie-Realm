import { AddRecipeDTO, IIngredient } from "../../dtos/recipeDTOs/addRecipeDTO";
import { AiApproveStatus, CategoryType, DifficultyType, IRecipe } from "../../interface/recipies/IRecipies";
import IRecpieRepository from "../../interface/recipies/recipies/IRecipeRepository";
import { RecipieModel } from "../../models/recipie_model";
import { BaseRepository } from "../baseRepository";
import { Types } from "mongoose";



export default class RecipeRepository extends BaseRepository<IRecipe> implements IRecpieRepository{
    constructor(){
        super(RecipieModel)
    }

    async createRecipie(data: AddRecipeDTO): Promise<IRecipe> {
        return await this._model.create(data);
    }
    
    async findById(id: string): Promise<IRecipe | null> {
        return this._model.findById(id)
    }

    async getRecipies(currentUserId: string): Promise<IRecipe[]> {
        return this._model.find({userId:{$ne:currentUserId},aiApproveStatus: "SUCCESS"}).populate("userId","fullname profilePic userName").sort({ createdAt: -1 });;
    }


    
}