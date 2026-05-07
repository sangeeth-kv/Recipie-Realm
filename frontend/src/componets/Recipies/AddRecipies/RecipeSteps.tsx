// components/Recipes/AddRecipe/RecipeSteps.tsx

import { Plus, Trash2 } from "lucide-react";
import type { RecipeFormData } from "../../../pages/userPages/AddRecipePage";


interface Props {
  steps: string[];
  updateField: <K extends keyof RecipeFormData>(
    field: K,
    value: RecipeFormData[K]
  ) => void;
}

export default function RecipeSteps({
  steps,
  updateField,
}: Props) {
  const updateStep = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    updateField("steps", updated);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Cooking Steps</h2>

      {steps.map((step, index) => (
        <div key={index} className="flex gap-3">
          <textarea
            rows={3}
            placeholder={`Step ${index + 1}`}
            value={step}
            onChange={(e) =>
              updateStep(index, e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3"
          />

          <button
            type="button"
            onClick={() =>
              updateField(
                "steps",
                steps.filter((_, i) => i !== index)
              )
            }
            className="p-3 bg-red-100 text-red-500 rounded-xl h-fit"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => updateField("steps", [...steps, ""])}
        className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl"
      >
        <Plus className="w-4 h-4" />
        Add Step
      </button>
    </div>
  );
}