import React from "react";

export default function RecipeCard({ recipe }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      
      {/* User Info */}
      <div className="flex items-center p-4 gap-3">
        <img
          src={recipe.userId?.profilePic}
          className="w-10 h-10 rounded-full"
        />
        <p className="font-semibold">{recipe.userId?.name}</p>
      </div>

      {/* Image */}
      <img
        src={recipe.images[0]}
        className="w-full h-80 object-cover"
      />

      {/* Actions */}
      <div className="p-4 space-y-2">
        <div className="flex gap-4 text-xl">
          ❤️ 🔖 ⭐
        </div>

        <p className="font-semibold">{recipe.likes} likes</p>

        <p>
          <span className="font-semibold">{recipe.title}</span>{" "}
          {recipe.description}
        </p>

        <p className="text-sm text-gray-500">
          {recipe.views} views
        </p>
      </div>
    </div>
  );
}