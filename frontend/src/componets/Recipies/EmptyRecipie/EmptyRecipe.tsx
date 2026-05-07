import { ChefHat } from 'lucide-react'
import React from 'react'

interface IEmptyRecipeProps {
  search: string;
  resetFilters: () => void;
}

function EmptyRecipe({search,resetFilters}:IEmptyRecipeProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
                <ChefHat className="w-16 h-16 text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  No recipes found
                </h3>
                <p className="text-slate-600 text-center max-w-sm mb-6">
                  {search
                    ? `No recipes match "${search}". Try different keywords!`
                    : "Try adjusting your filters to find more recipes."}
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  Reset Filters
                </button>
              </div>
  )
}

export default EmptyRecipe