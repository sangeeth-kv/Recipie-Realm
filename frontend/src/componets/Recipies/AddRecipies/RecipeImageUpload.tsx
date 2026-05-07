// components/Recipes/AddRecipe/RecipeImageUpload.tsx

import { ImagePlus, Trash2 } from "lucide-react";
import type { RecipeFormData } from "../../../pages/userPages/AddRecipePage";


interface Props {
  images: string[];
  updateField: <K extends keyof RecipeFormData>(
    field: K,
    value: RecipeFormData[K]
  ) => void;
}

export default function RecipeImageUpload({
  images,
  updateField,
}: Props) {
  const updateImage = (index: number, value: string) => {
    const updated = [...images];
    updated[index] = value;
    updateField("images", updated);
  };

  const addImage = () => {
    updateField("images", [...images, ""]);
  };

  const removeImage = (index: number) => {
    updateField(
      "images",
      images.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recipe Images</h2>

        <button
          type="button"
          onClick={addImage}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-xl"
        >
          <ImagePlus className="w-4 h-4" />
          Add Image
        </button>
      </div>

      <div className="space-y-3">
        {images.map((image, index) => (
          <div key={index} className="flex gap-3">
            <input
              type="text"
              placeholder="Paste image URL"
              value={image}
              onChange={(e) => updateImage(index, e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

            <button
              type="button"
              onClick={() => removeImage(index)}
              className="p-3 bg-red-100 text-red-500 rounded-xl"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}