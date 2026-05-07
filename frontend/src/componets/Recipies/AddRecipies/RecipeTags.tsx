// components/Recipes/AddRecipe/RecipeTags.tsx

import type { RecipeFormData } from "../../../pages/userPages/AddRecipePage";



interface Props {
  tags: string[];
  updateField: <K extends keyof RecipeFormData>(
    field: K,
    value: RecipeFormData[K]
  ) => void;
}

export default function RecipeTags({
  tags,
  updateField,
}: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Tags</h2>

      <input
        type="text"
        placeholder="eg: spicy, italian, biriyani"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();

            const value = e.currentTarget.value.trim();

            if (!value) return;

            updateField("tags", [...tags, value]);

            e.currentTarget.value = "";
          }
        }}
        className="w-full border rounded-xl px-4 py-3"
      />

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm"
          >
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
}