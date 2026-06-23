import { Request, Response, NextFunction } from "express";
import { IRecipeController } from "../../interface/recipies/recipies/IRecipeController";
import { IRecipeService } from "../../interface/recipies/recipies/IRecipeService";
import logger from "../../config/logger";
import { AddRecipeDTO, AddRecipeResponseDTO } from "../../dtos/recipeDTOs/addRecipeDTO";
import { apiResponse } from "../../helpers/apiResponse";
import { IRecipe } from "../../interface/recipies/IRecipies";
import { AppError } from "../../utils/AppError";
import GetRecipiesResponseDTO from "../../dtos/recipeDTOs/getRecipesDTO";
import { EnhanceDescriptionRequestDTO, EnhanceDescriptionResponseDTO } from "../../dtos/AiEnhanceDTOs/AiEnhanceDTO";



export default class RecipeController implements IRecipeController{
    constructor(private recipeService:IRecipeService){}

    //for add recipe
    addRecipe=async (req: Request, res: Response, next: NextFunction):Promise<void>=> {

        try {
            logger.debug("Hitted  add recipei controller!");

            const files = req.files as Express.Multer.File[]; //extract the req file for the images

            const imageUrls = files.map(file => file.path); //getting the image path, that is already uploaded to the cloudinary

            logger.debug("After setting image url");

            const recipeData: AddRecipeDTO = {
                ...req.body,
                images: imageUrls,
            };

            //calling the recipe service to add the recipe to database
            logger.debug("Before recipe service add recipe");
            const recipe=await this.recipeService.addRecipe(recipeData);
            logger.debug("After add recipe service ");

            apiResponse<AddRecipeResponseDTO>(res,201,true,"Recipe uploaded!",recipe)  
        } catch (error) {
            console.log(error)
            next(error)
        }

    }   

    getRecipies=async (req: Request, res: Response, next: NextFunction):Promise<void> =>{
        try {
            logger.debug("Hitted get recipe controller!");

            const currentUserId=req.user?.userId;

            console.log("Current User : ",currentUserId);

            if(!currentUserId){
                throw new AppError("UNAUTHORIZED",401);
            }

            const recipies:IRecipe[]=await this.recipeService.getAllRecipies(currentUserId.toString());

            const response: GetRecipiesResponseDTO = {recipies};

            apiResponse<GetRecipiesResponseDTO>(res,200,true,"RECIPE_FETCHED",response);

        } catch (error) {
            console.log(error)
            next(error)
        }

    }

    recipeDetails=async (req: Request, res: Response, next: NextFunction): Promise<void> =>{
        try {
            logger.debug("hitted recipe details controller!")



        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    editRecipe=async (req: Request, res: Response, next: NextFunction):Promise<void> => {
        try {
            logger.debug("hitted edit recipe controller!")

            
        } catch (error) {
         console.log(error)
            next(error)   
        }
    }

    getEnhancedDesc=async(req: Request, res: Response, next: NextFunction):Promise<void>=>{
        try {
            logger.debug("hitted edit recipe controller! Enhanced Descp")
            
            const {description,regenerate}:EnhanceDescriptionRequestDTO=req.body;

            const result=await this.recipeService.getEnhancedDesc(description,regenerate);

            console.log(result)

            apiResponse<EnhanceDescriptionResponseDTO>(res,200,true,"DESCRIPTION_ENHANCED",{desc:result});
        } catch (error) {
            console.log(error)
            next(error)   
        }
    }
}