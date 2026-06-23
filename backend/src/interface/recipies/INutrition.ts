import { Document, Types } from "mongoose";

export interface INutrition extends Document {
    _id:Types.ObjectId;
    recipeId:Types.ObjectId;
    calories:number;
    protein:number;
    carbs:number;
    fat:number;
    fiber:number;
    enhancedDescription:string;
    nutritionHighlights:string[];
    dietaryLabels:string[];
    cookingTips:string[];
    healthScore:number;

}
