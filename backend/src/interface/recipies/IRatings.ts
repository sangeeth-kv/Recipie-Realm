import { Types } from "mongoose";

export interface IRatings extends Document{
    userId:Types.ObjectId;
    recipeId:Types.ObjectId;
    rating:number;
    reviews:string;
    likes:number;
    createdAt:Date;
    updatedAt:Date;
}