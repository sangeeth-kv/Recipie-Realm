import { Request, Response, NextFunction } from "express";
import { IRecipeController } from "../../interface/recipies/recipies/IRecipeController";
import { IRecipeService } from "../../interface/recipies/recipies/IRecipeService";



export default class RecipeController implements IRecipeController{
    constructor(private recipeService:IRecipeService){}


    addRecipe=async (req: Request, res: Response, next: NextFunction):Promise<void>=> {

    }   

    getRecipies=async (req: Request, res: Response, next: NextFunction):Promise<void> =>{

    }

    RecipeDetails=async (req: Request, res: Response, next: NextFunction): Promise<void> =>{

    }

    editRecipe=async (req: Request, res: Response, next: NextFunction):Promise<void> => {

    }
}