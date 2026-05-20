import { IRecipe } from "../../interface/recipies/IRecipies";
import { RecipieModel } from "../../models/recipie_model";
import { BaseRepository } from "../baseRepository";



export default class RecipeRepository extends BaseRepository<IRecipe> implements IRecpieRepository{
    constructor(){
        super(RecipieModel)
    }
}