import { Flame, Heart, Star } from 'lucide-react'
import React from 'react'
import type { IRecipe } from '../../../interface/IRecipie';

interface ITrendingRecipeProps {
  trending: IRecipe[];
}

function TrendingRecipe({trending}:ITrendingRecipeProps) {
  return (
    <div className="pt-4 border-t border-slate-200">
                <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  Trending Now
                </h3>
                <div className="space-y-3">
                  {trending.map((item) => (
                    <div
                      key={item._id}
                      className="group cursor-pointer p-3 rounded-lg hover:bg-orange-50 transition-colors duration-200"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-24 object-cover rounded-lg mb-2 group-hover:opacity-90 transition-opacity"
                      />
                      <p className="font-medium text-sm text-slate-900 line-clamp-1 group-hover:text-orange-600">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                        <Heart className="w-3 h-3" fill="currentColor" />
                        {item.likes}
                        <span>•</span>
                        <Star className="w-3 h-3" fill="currentColor" />
                        {item.averageRating}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
  )
}

export default TrendingRecipe