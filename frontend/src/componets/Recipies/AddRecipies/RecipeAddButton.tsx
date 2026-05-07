// components/Recipes/AddRecipe/RecipeSubmitBar.tsx

export default function RecipeSubmitBar() {
  return (
    <div className="pt-6 border-t">
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
      >
        Publish Recipe
      </button>
    </div>
  );
}