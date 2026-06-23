// components/Recipes/AddRecipe/RecipeBasicInfo.tsx

import { Clock } from "lucide-react";
import type { RecipeFormData } from "../../../pages/userPages/AddRecipePage";
import RecipeDescriptionAI from "../../AiComponents/RecipeDescriptionAI";


interface Props {
  formData: RecipeFormData;

  updateField: <K extends keyof RecipeFormData>(
    field: K,
    value: RecipeFormData[K]
  ) => void;

  enhancedDescription: string;
  isEnhancing: boolean;
  showEnhanced: boolean;

  onEnhance: () => void;
  onAccept: () => void;
  onReject: () => void;
  onRegenerate: () => void;
}

export default function RecipeBasicInfo({
  formData,
  updateField,
  enhancedDescription,
  isEnhancing,
  onAccept,
  onEnhance,
  onRegenerate,
  onReject,
  showEnhanced

}: Props) {
  return (
    <div className="space-y-5">
      <h2 className="text-xl font-semibold">Basic Info</h2>

      <input
        type="text"
        placeholder="Recipe title"
        value={formData.title}
        onChange={(e) => updateField("title", e.target.value)}
        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
      />

      <textarea
        placeholder="Recipe description"
        rows={4}
        value={formData.description}
        onChange={(e) => updateField("description", e.target.value)}
        className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
      />

      <RecipeDescriptionAI
  original={formData.description}
  enhanced={enhancedDescription}
  loading={isEnhancing}
  showEnhanced={showEnhanced}
  onEnhance={onEnhance}
  onAccept={onAccept}
  onReject={onReject}
  onRegenerate={onRegenerate}
/>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={formData.category}
          onChange={(e) => updateField("category", e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Dessert">Dessert</option>
        </select>

        <select
          value={formData.difficulty}
          onChange={(e) => updateField("difficulty", e.target.value)}
          className="border rounded-xl px-4 py-3"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <div className="relative">
          <Clock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />

          <input
            type="number"
            placeholder="Prep time"
            value={formData.prepTime}
            onChange={(e) =>
              updateField("prepTime", Number(e.target.value))
            }
            className="w-full border rounded-xl pl-10 pr-4 py-3"
          />
        </div>
      </div>
    </div>
  );
}