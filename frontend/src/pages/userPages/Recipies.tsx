import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Flame,
  Leaf,
  Cake,
  Clock,
  Star,
  Heart,
  Eye,
  ChefHat,
  X,
} from "lucide-react";

interface Recipe {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  difficulty: string;
  userId: {
    name: string;
    profilePic: string;
  };
  likes: number;
  views: number;
  averageRating: number;
}

export default function Recipies() {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      _id: "1",
      title: "Chicken Biryani",
      description: "Aromatic and flavorful Kerala style chicken biryani",
      images: ["https://images.unsplash.com/photo-1604908176997-431bfe6c2fdf"],
      category: "Non-Veg",
      tags: ["biryani", "spicy", "kerala"],
      difficulty: "Medium",
      userId: {
        name: "Sangeeth",
        profilePic: "https://i.pravatar.cc/150?img=3",
      },
      likes: 120,
      views: 980,
      averageRating: 4.5,
    },
    {
      _id: "2",
      title: "Veg Pasta",
      description: "Creamy white sauce pasta with fresh vegetables",
      images: ["https://images.unsplash.com/photo-1525755662778-989d0524087e"],
      category: "Veg",
      tags: ["pasta", "creamy", "italian"],
      difficulty: "Easy",
      userId: {
        name: "Anjali",
        profilePic: "https://i.pravatar.cc/150?img=5",
      },
      likes: 80,
      views: 450,
      averageRating: 4.2,
    },
    {
      _id: "3",
      title: "Chocolate Cake",
      description: "Rich and decadent chocolate cake with ganache",
      images: ["https://images.unsplash.com/photo-1605475128023-7c4f59a07dfc"],
      category: "Dessert",
      tags: ["cake", "chocolate", "dessert"],
      difficulty: "Hard",
      userId: {
        name: "Rahul",
        profilePic: "https://i.pravatar.cc/150?img=8",
      },
      likes: 200,
      views: 1500,
      averageRating: 4.8,
    },
    {
      _id: "4",
      title: "Paneer Tikka",
      description: "Grilled cottage cheese cubes marinated in spices",
      images: ["https://images.unsplash.com/photo-1599599810694-b3fa981175d7"],
      category: "Veg",
      tags: ["paneer", "indian", "grilled"],
      difficulty: "Easy",
      userId: {
        name: "Priya",
        profilePic: "https://i.pravatar.cc/150?img=12",
      },
      likes: 150,
      views: 720,
      averageRating: 4.6,
    },
  ]);

  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [trending, setTrending] = useState<Recipe[]>([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    let data = [...recipes];

    if (search) {
      data = data.filter(
        (r) =>
          r.title.toLowerCase().includes(search.toLowerCase()) ||
          r.tags.join(" ").toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      data = data.filter((r) => r.category === category);
    }

    if (sort === "likes") {
      data.sort((a, b) => b.likes - a.likes);
    } else if (sort === "difficulty") {
      const order: { [key: string]: number } = {
        Easy: 1,
        Medium: 2,
        Hard: 3,
      };
      data.sort(
        (a, b) => (order[a.difficulty] || 0) - (order[b.difficulty] || 0)
      );
    } else if (sort === "rating") {
      data.sort((a, b) => b.averageRating - a.averageRating);
    }

    setFilteredRecipes(data);

    const shuffled = [...recipes].sort(() => 0.5 - Math.random());
    setTrending(shuffled.slice(0, 3));
  }, [recipes, category, sort, search]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Hard":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Veg":
        return <Leaf className="w-4 h-4" />;
      case "Non-Veg":
        return <Flame className="w-4 h-4" />;
      case "Dessert":
        return <Cake className="w-4 h-4" />;
      default:
        return <ChefHat className="w-4 h-4" />;
    }
  };

  const resetFilters = () => {
    setCategory("");
    setSort("");
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      {/* <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm"> */}
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"> */}
          <div className="flex items-center justify-between">
            {/* <div className="flex items-center gap-3">
              {/* <div className="p-2 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg">
                {/* <ChefHat className="w-6 h-6 text-white" /> */}
              {/* </div>  */}
              {/* <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                RecipeHub
              </h1> */}
            {/* </div> */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Filter className="w-6 h-6 text-slate-700" />
            </button>
          </div>
        {/* </div> */}
      {/* </div> */}

      {/* Search Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative">
            <Search className="absolute left-4 top-3 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search recipes by name or tags..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 bg-white text-slate-900 placeholder-slate-500 transition-all duration-300"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div
            className={`md:col-span-1 ${
              showMobileFilters ? "block" : "hidden md:block"
            }`}
          >
            <div className="bg-white rounded-xl shadow-sm p-6 space-y-6 sticky top-32">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg text-slate-900">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="md:hidden p-1 hover:bg-slate-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category Filter */}
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

              {/* Trending Section */}
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
            </div>
          </div>

          {/* Main Feed */}
          <div className="md:col-span-3">
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredRecipes.map((recipe) => (
                  <div
                    key={recipe._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer group"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden bg-slate-200 h-48 sm:h-56">
                      <img
                        src={recipe.images[0]}
                        alt={recipe.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                            recipe.difficulty
                          )}`}
                        >
                          {recipe.difficulty}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-slate-900 flex items-center gap-1">
                          {getCategoryIcon(recipe.category)}
                          {recipe.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                        {recipe.title}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                        {recipe.description}
                      </p>

                      {/* User Info */}
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-200">
                        <img
                          src={recipe.userId.profilePic}
                          alt={recipe.userId.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-slate-900">
                          {recipe.userId.name}
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="p-2 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                            <Heart className="w-4 h-4" fill="currentColor" />
                          </div>
                          <p className="font-bold text-slate-900 text-sm">
                            {recipe.likes}
                          </p>
                          <p className="text-xs text-slate-500">Likes</p>
                        </div>
                        <div className="p-2 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                            <Eye className="w-4 h-4" />
                          </div>
                          <p className="font-bold text-slate-900 text-sm">
                            {(recipe.views / 1000).toFixed(1)}k
                          </p>
                          <p className="text-xs text-slate-500">Views</p>
                        </div>
                        <div className="p-2 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                            <Star className="w-4 h-4" fill="currentColor" />
                          </div>
                          <p className="font-bold text-slate-900 text-sm">
                            {recipe.averageRating}
                          </p>
                          <p className="text-xs text-slate-500">Rating</p>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {recipe.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                        {recipe.tags.length > 2 && (
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                            +{recipe.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}