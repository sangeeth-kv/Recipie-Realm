import { Types } from "mongoose";


export interface IComments extends Document{
    userId:Types.ObjectId;
    recipeId:Types.ObjectId;
    text:string;
    parentComment:Types.ObjectId;
    createdAt:Date;
    updatedAt:Date;
}