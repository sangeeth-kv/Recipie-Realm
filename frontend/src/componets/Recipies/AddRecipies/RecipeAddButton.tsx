// components/Recipes/AddRecipe/RecipeSubmitBar.tsx

export default function RecipeSubmitBar({ submitting }: { submitting?: boolean }) {
  return (
    <div className="pt-6 border-t">
      <button
         disabled={submitting}
        type="submit"
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
      >
        {submitting ? "Submitting…" : "Add Recipe"}
      </button>
    </div>
  );
}