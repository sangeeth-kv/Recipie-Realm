import { Flame, Heart, Star } from 'lucide-react'
import React from 'react'



interface IRecipeFilterProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;

  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;

  resetFilters: () => void;

  getCategoryIcon: (cat: string) => React.ReactNode;
}

export default function RecipeFilter({category,setCategory,sort,setSort,resetFilters,getCategoryIcon}:IRecipeFilterProps) {
  return (
    <>
    <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Category
                </label>
                <div className="space-y-2">
                  {["All", "Veg", "Non-Veg", "Dessert"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() =>
                        setCategory(cat === "All" ? "" : cat)
                      }
                      className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        (cat === "All" && category === "") ||
                        category === cat
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {cat !== "All" && getCategoryIcon(cat)}
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Sort By
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white text-slate-900 transition-all duration-300"
                  onChange={(e) => setSort(e.target.value)}
                  value={sort}
                >
                  <option value="">Default</option>
                  <option value="likes">Most Liked</option>
                  <option value="difficulty">Difficulty</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors duration-200 font-medium"
              >
                Reset Filters
              </button>
    </>
  )
}
