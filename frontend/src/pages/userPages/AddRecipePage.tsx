// src/pages/AddRecipe/AddRecipe.tsx

import { useState } from "react";
import RecipeBasicInfo from "../../componets/Recipies/AddRecipies/RecipeBasicInfo";
import RecipeImageUpload from "../../componets/Recipies/AddRecipies/RecipeImageUpload";
import RecipeTags from "../../componets/Recipies/AddRecipies/RecipeTags";
import RecipeIngredients from "../../componets/Recipies/AddRecipies/RecipeIngredients";
import RecipeSteps from "../../componets/Recipies/AddRecipies/RecipeSteps";
import RecipeSubmitBar from "../../componets/Recipies/AddRecipies/RecipeAddButton";


export interface RecipeFormData {
  title: string;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  prepTime: number;
  difficulty: string;
}

export default function AddRecipePage() {
  const [formData, setFormData] = useState<RecipeFormData>({
    title: "",
    description: "",
    images: [""],
    category: "Veg",
    tags: [],
    ingredients: [""],
    steps: [""],
    prepTime: 0,
    difficulty: "Easy",
  });

  const updateField = <K extends keyof RecipeFormData>(
    field: K,
    value: RecipeFormData[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    // API CALL HERE
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Add New Recipe
          </h1>
          <p className="text-slate-500 mt-2">
            Share your amazing recipe with the community.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <RecipeBasicInfo
            formData={formData}
            updateField={updateField}
          />

          <RecipeImageUpload
            images={formData.images}
            updateField={updateField}
          />

          <RecipeTags
            tags={formData.tags}
            updateField={updateField}
          />

          <RecipeIngredients
            ingredients={formData.ingredients}
            updateField={updateField}
          />

          <RecipeSteps
            steps={formData.steps}
            updateField={updateField}
          />

          <RecipeSubmitBar />
        </form>
      </div>
    </div>
  );
}