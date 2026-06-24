import RecipeCard from "../RecipieCard/RecipieCard";
import type { IRecipe } from "../../../interface/IRecipie";
import Pagination from "../../Pagination/Pagination";

interface IRecipeGridProps {
  recipes: IRecipe[];

  getCategoryIcon: (category: string) => React.ReactNode;

  getDifficultyColor: (difficulty: string) => string;
}

export default function RecipeGrid({
  recipes,
  getCategoryIcon,
  getDifficultyColor,
}: IRecipeGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe._id}
          recipe={recipe}
          getCategoryIcon={getCategoryIcon}
          getDifficultyColor={getDifficultyColor}
        />
      ))}

      <Pagination />
    </div>
  );
}