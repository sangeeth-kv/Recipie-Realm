import { Plus, Trash2 } from "lucide-react";
import type { RecipeFormData } from "../../../pages/userPages/AddRecipePage";

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface Props {
  ingredients: Ingredient[];
  updateField: <K extends keyof RecipeFormData>(
    field: K,
    value: RecipeFormData[K]
  ) => void;
}

export default function RecipeIngredients({
  ingredients,
  updateField,
}: Props) {
  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    const updated = [...ingredients];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    updateField("ingredients", updated);
  };

  const addIngredient = () => {
    updateField("ingredients", [
      ...ingredients,
      {
        name: "",
        quantity: 0,
        unit: "g",
      },
    ]);
  };

  const removeIngredient = (index: number) => {
    updateField(
      "ingredients",
      ingredients.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Ingredients</h2>

        <button
          type="button"
          onClick={addIngredient}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {ingredients.map((ingredient, index) => (
        <div
          key={index}
          className="grid grid-cols-12 gap-3 items-center"
        >
          {/* Ingredient Name */}
          <input
            type="text"
            placeholder="Ingredient"
            value={ingredient.name}
            onChange={(e) =>
              updateIngredient(index, "name", e.target.value)
            }
            className="col-span-5 border rounded-xl px-4 py-3"
          />

          {/* Quantity */}
          <input
            type="number"
            min="0"
            placeholder="Qty"
            value={ingredient.quantity}
            onChange={(e) =>
              updateIngredient(
                index,
                "quantity",
                Number(e.target.value)
              )
            }
            className="col-span-3 border rounded-xl px-4 py-3"
          />

          {/* Unit */}
          <select
            value={ingredient.unit}
            onChange={(e) =>
              updateIngredient(index, "unit", e.target.value)
            }
            className="col-span-3 border rounded-xl px-4 py-3"
          >
            <option value="g">Gram (g)</option>
            <option value="kg">Kilogram (kg)</option>
            <option value="ml">Milliliter (ml)</option>
            <option value="l">Liter (l)</option>
            <option value="cup">Cup</option>
            <option value="tbsp">Tablespoon</option>
            <option value="tsp">Teaspoon</option>
            <option value="piece">Piece</option>
          </select>

          {/* Delete Button */}
          <button
            type="button"
            onClick={() => removeIngredient(index)}
            className="p-3 bg-red-100 text-red-500 rounded-xl"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}