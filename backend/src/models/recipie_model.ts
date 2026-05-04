// models/recipe.model.ts
import { Schema, model } from "mongoose";
import { IRecipe } from "../interface/recipies/IRecipies";

const recipeSchema:Schema<IRecipe> = new Schema<IRecipe>(
  {
    title: {type:String,require:true},
    description: {type:String,require:true},

    images: [String], // multiple images

    category: {
      type: String,
      enum: ["Veg", "Non-Veg", "Dessert"],
    },

    tags: [String], // 🔥 important

    ingredients: [String],
    steps: [String],

    prepTime: Number,
    // cookTime: Number,
    // servings: Number,
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
    },

    userId: { type: Schema.Types.ObjectId, ref: "User" },

    likes: { type: Number, default: 0 },
    likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],

    saves: { type: Number, default: 0 },
    savedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],

    views: { type: Number, default: 0 }, // 🔥 trending

    averageRating: { type: Number, default: 0 },

  },
  { timestamps: true }
);

// 🔍 Smart Search Index
recipeSchema.index({
  title: "text",
  description: "text",
  ingredients: "text",
  tags: "text",
  difficulty:"text"
});

export const RecipieModel= model<IRecipe>("Recipe", recipeSchema);