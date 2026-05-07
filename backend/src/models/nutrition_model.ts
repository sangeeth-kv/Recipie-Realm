// models/nutrition.model.ts

import { Schema, model } from "mongoose";
import { INutrition } from "../interface/recipies/INutrition";

const nutritionSchema:Schema<INutrition> = new Schema<INutrition>(
  {
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
      unique: true,
    },

    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number,

    enhancedDescription: String,

    nutritionHighlights: [String],

    dietaryLabels: [String],

    cookingTips: [String],

    healthScore: Number,
  },
  {
    timestamps: true,
  }
);

export const NutritionModel = model<INutrition>(
  "Nutrition",
  nutritionSchema
);