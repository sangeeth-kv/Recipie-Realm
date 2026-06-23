import mongoose, { Schema, model } from "mongoose";
import { IRecipe } from "../interface/recipies/IRecipies";

const ingredientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const recipeSchema:Schema<IRecipe> = new Schema<IRecipe>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      enum: ["Veg", "Non-Veg", "Dessert"],
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    ingredients: {
      type: [ingredientSchema],
      required: true,
    },

    steps: {
      type: [String],
      required: true,
    },

    prepTime: {
      type: Number,
      required: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    likes: {
      type: Number,
      default: 0,
    },

    likedBy: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],

    saves: {
      type: Number,
      default: 0,
    },

    savedBy: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],

    views: {
      type: Number,
      default: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
    },
    aiApproveStatus:{
      type: String,
      enum: ["PENDING", "REJECTED", "SUCCESS"],
      required: true,
      default:"PENDING"
    }
  },
  {
    timestamps: true,
  }
);

export const RecipieModel = mongoose.model<IRecipe>("Recipe", recipeSchema);