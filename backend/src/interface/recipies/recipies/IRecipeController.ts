import { NextFunction, Request, Response } from "express";


export interface IRecipeController{
    addRecipe:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
    editRecipe:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
    recipeDetails:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
    getRecipies:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
    getEnhancedDesc:(req:Request,res:Response,next:NextFunction)=>Promise<void>;
}

