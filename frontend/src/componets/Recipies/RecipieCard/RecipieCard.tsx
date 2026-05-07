import React from "react";
import type { IRecipe } from "../../../interface/IRecipie";
import { Eye, Heart, Star } from "lucide-react";


interface IRecipeCardProps {
  recipe: IRecipe;

  getCategoryIcon: (category: IRecipe["category"]) => React.ReactNode;

  getDifficultyColor: (difficulty: IRecipe["difficulty"]) => string;
}

export default function RecipeCard({ recipe,getCategoryIcon,getDifficultyColor }:IRecipeCardProps) {
  return (
    <div
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden bg-slate-200 h-48 sm:h-56">
                      <img
                        src={recipe.images[0]}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                            recipe.difficulty
                          )}`}
                        >
                          {recipe.difficulty}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-slate-900 flex items-center gap-1">
                          {getCategoryIcon(recipe.category)}
                          {recipe.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                        {recipe.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                        {recipe.description}
                      </p>

                      {/* User Info */}
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200">
                        <img
                          src={recipe.userId?.profilePic}
                          alt={recipe.userId?.fullname}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-slate-900">
                          {recipe.userId?.fullname}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-2 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                            <Heart className="w-4 h-4" fill="currentColor" />
                          </div>
                          <p className="font-bold text-slate-900 text-sm">
                            {recipe.likes}
                          </p>
                          <p className="text-xs text-slate-500">Likes</p>
                        </div>
                        <div className="p-2 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                            <Eye className="w-4 h-4" />
                          </div>
                          <p className="font-bold text-slate-900 text-sm">
                            {(recipe.views / 1000).toFixed(1)}k
                          </p>
                          <p className="text-xs text-slate-500">Views</p>
                        </div>
                        <div className="p-2 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                            <Star className="w-4 h-4" fill="currentColor" />
                          </div>
                          <p className="font-bold text-slate-900 text-sm">
                            {recipe.averageRating}
                          </p>
                          <p className="text-xs text-slate-500">Rating</p>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {recipe.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                        {recipe.tags.length > 2 && (
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                            +{recipe.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
  );
}