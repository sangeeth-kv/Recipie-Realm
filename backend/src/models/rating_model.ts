// models/review.model.ts

import { Schema, model } from "mongoose";
import { IRatings } from "../interface/recipies/IRatings";

const ratingModel: Schema<IRatings> = new Schema<IRatings>(
  {
    // 👤 User
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🍽 Recipe
    recipeId: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },

    // ⭐ Rating
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // 📝 Review Text
    reviews: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    // ❤️ Helpful likes
    likes: {
      type: Number,
      default: 0,
    },

    // likedBy: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
  },
  { timestamps: true }
);

// 🚫 One review per user per recipe
ratingModel.index(
  { userId: 1, recipeId: 1 },
  { unique: true }
);

export const RecipieModel= model<IRatings>("Rating", ratingModel);