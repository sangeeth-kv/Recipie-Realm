import { Document, Types } from "mongoose";
import { IIngredient } from "../../dtos/recipeDTOs/addRecipeDTO";

export type CategoryType="Veg"|"Non-Veg"|"Dessert";
export type DifficultyType="Easy"|"Medium"|"Hard";
export type AiApproveStatus="PENDING"|"REJECTED"|"SUCCESS"


export interface IRecipe extends Document{
    _id:Types.ObjectId;
    title:string;
    description:string;
    images:string[];
    category:CategoryType;
    tags:string[];
    ingredients:IIngredient[];
    steps:string[];
    prepTime:number;
    difficulty:DifficultyType;
    userId:Types.ObjectId;
    likes:number;
    likedBy:Types.ObjectId[];
    saves:number;
    savedBy:Types.ObjectId[];
    views:number;
    averageRating:number;
    createdAt:Date;
    updatedAt:Date;
    aiApproveStatus:AiApproveStatus;
}