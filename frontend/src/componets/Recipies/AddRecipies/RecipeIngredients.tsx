// components/Recipes/AddRecipe/RecipeIngredients.tsx

import { Plus, Trash2 } from "lucide-react";
import type { RecipeFormData } from "../../../pages/userPages/AddRecipePage";


interface Props {
  ingredients: string[];
  updateField: <K extends keyof RecipeFormData>(
    field: K,
    value: RecipeFormData[K]
  ) => void;
}

export default function RecipeIngredients({
  ingredients,
  updateField,
}: Props) {
  const updateIngredient = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    updateField("ingredients", updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Ingredients</h2>

        <button
          type="button"
          onClick={() =>
            updateField("ingredients", [...ingredients, ""])
          }
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {ingredients.map((ingredient, index) => (
        <div key={index} className="flex gap-3">
          <input
            type="text"
            placeholder={`Ingredient ${index + 1}`}
            value={ingredient}
            onChange={(e) =>
              updateIngredient(index, e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          <button
            type="button"
            onClick={() =>
              updateField(
                "ingredients",
                ingredients.filter((_, i) => i !== index)
              )
            }
            className="p-3 bg-red-100 text-red-500 rounded-xl"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}