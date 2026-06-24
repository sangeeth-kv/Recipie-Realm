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
import SearchBar from "../../componets/SearchBar/SearchBar";

import type { IRecipe } from "../../interface/IRecipie";
import RecipeFilter from "../../componets/Recipies/RecipieFilter/RecipeFilter";
import TrendingRecipe from "../../componets/Recipies/RecipeTrending/TrendingRecipe";
import EmptyRecipe from "../../componets/Recipies/EmptyRecipie/EmptyRecipe";
import FilterToggleButton from "../../componets/Recipies/FilterToggleButton/FilterToggleButton";
import RecipeGrid from "../../componets/Recipies/RecipeGrid/RecipeGrid";
import AddRecipeButton from "../../componets/Buttons/AddRecipeButton";
import { data, useNavigate } from "react-router-dom";
import RecipeLoader from "../../componets/FallbackScreen/FallbackScreen";
import { getRecipies } from "../../services/getRecipies";

export default function Recipies() {

  console.log("HIIIIIIIII")

  const navigate=useNavigate()
  const [recipes, setRecipes] = useState<IRecipe[]>([
  {
    _id: "1",
    title: "Chicken Biryani",
    description: "Aromatic and flavorful Kerala style chicken biryani",
    images: [
      "https://images.unsplash.com/photo-1604908176997-431bfe6c2fdf",
    ],
    category: "Non-Veg",
    tags: ["biryani", "spicy", "kerala"],

    ingredients: ["Rice", "Chicken", "Masala"],
    steps: ["Cook rice", "Cook chicken", "Mix together"],
    prepTime: 45,

    difficulty: "Medium",

    userId: {
      _id: "1",
      fullname: "Sangeeth",
      profilePic: "https://i.pravatar.cc/150?img=3",
    },

    likes: 120,
    likedBy: [],

    saves: 20,
    savedBy: [],

    views: 980,
    averageRating: 4.5,

    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
  _id: "2",
  title: "Veg Pasta",
  description: "Creamy white sauce pasta loaded with fresh vegetables",
  images: [
    "https://images.unsplash.com/photo-1525755662778-989d0524087e",
  ],
  category: "Veg",
  tags: ["pasta", "italian", "creamy"],

  ingredients: ["Pasta", "Milk", "Cheese", "Vegetables"],
  steps: [
    "Boil pasta",
    "Prepare white sauce",
    "Mix vegetables and pasta",
  ],
  prepTime: 30,

  difficulty: "Easy",

  userId: {
    _id: "2",
    fullname: "Anjali",
    profilePic: "https://i.pravatar.cc/150?img=5",
  },

  likes: 80,
  likedBy: [],

  saves: 14,
  savedBy: [],

  views: 450,
  averageRating: 4.2,

  createdAt: new Date(),
  updatedAt: new Date(),
},

{
  _id: "3",
  title: "Chocolate Cake",
  description: "Rich and moist chocolate cake topped with ganache",
  images: [
    "https://images.unsplash.com/photo-1605475128023-7c4f59a07dfc",
  ],
  category: "Dessert",
  tags: ["cake", "dessert", "chocolate"],

  ingredients: ["Flour", "Cocoa Powder", "Eggs", "Chocolate"],
  steps: [
    "Prepare batter",
    "Bake the cake",
    "Add chocolate ganache",
  ],
  prepTime: 90,

  difficulty: "Hard",

  userId: {
    _id: "3",
    fullname: "Rahul",
    profilePic: "https://i.pravatar.cc/150?img=8",
  },

  likes: 200,
  likedBy: [],

  saves: 60,
  savedBy: [],

  views: 1500,
  averageRating: 4.8,

  createdAt: new Date(),
  updatedAt: new Date(),
},

{
  _id: "4",
  title: "Paneer Tikka",
  description: "Spicy grilled paneer cubes with smoky flavor",
  images: [
    "https://images.unsplash.com/photo-1599599810694-b3fa981175d7",
  ],
  category: "Veg",
  tags: ["paneer", "grill", "indian"],

  ingredients: ["Paneer", "Curd", "Spices", "Capsicum"],
  steps: [
    "Prepare marinade",
    "Marinate paneer",
    "Grill until smoky",
  ],
  prepTime: 40,

  difficulty: "Easy",

  userId: {
    _id: "4",
    fullname: "Priya",
    profilePic: "https://i.pravatar.cc/150?img=12",
  },

  likes: 150,
  likedBy: [],

  saves: 32,
  savedBy: [],

  views: 720,
  averageRating: 4.6,

  createdAt: new Date(),
  updatedAt: new Date(),
},

{
  _id: "5",
  title: "Beef Fry",
  description: "Kerala style spicy beef fry with coconut slices",
  images: [
    "https://images.unsplash.com/photo-1544025162-d76694265947",
  ],
  category: "Non-Veg",
  tags: ["beef", "kerala", "spicy"],

  ingredients: ["Beef", "Coconut", "Pepper", "Onion"],
  steps: [
    "Cook beef",
    "Roast spices",
    "Fry with coconut slices",
  ],
  prepTime: 60,

  difficulty: "Medium",

  userId: {
    _id: "5",
    fullname: "Akhil",
    profilePic: "https://i.pravatar.cc/150?img=15",
  },

  likes: 300,
  likedBy: [],

  saves: 85,
  savedBy: [],

  views: 2200,
  averageRating: 4.9,

  createdAt: new Date(),
  updatedAt: new Date(),
},

{
  _id: "6",
  title: "Strawberry Ice Cream",
  description: "Homemade creamy strawberry ice cream",
  images: [
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
  ],
  category: "Dessert",
  tags: ["icecream", "strawberry", "dessert"],

  ingredients: ["Milk", "Cream", "Strawberry", "Sugar"],
  steps: [
    "Blend strawberries",
    "Prepare cream mixture",
    "Freeze overnight",
  ],
  prepTime: 25,

  difficulty: "Easy",

  userId: {
    _id: "6",
    fullname: "Meera",
    profilePic: "https://i.pravatar.cc/150?img=20",
  },

  likes: 110,
  likedBy: [],

  saves: 25,
  savedBy: [],

  views: 680,
  averageRating: 4.3,

  createdAt: new Date(),
  updatedAt: new Date(),
}
]);




  useEffect(()=>{
    getRecipies()
    .then((data)=>{
      console.log("data got in response of recipes : ",data)
      setRecipes(data?.data.recipies);
    })
    .catch((err)=>{
      console.log("ERROR : ",err)
    })
    .finally(()=>{
      console.log("Completed recipie fetching..")
    })
  },[])




  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([]);
  const [trending, setTrending] = useState<IRecipe[]>([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    let data = [...recipes];

    console.log("Category : ",category)
    console.log("SORT : ",sort)
    console.log("SEARCH : ",search)
    console.log("FILTERRECIPE : ",filteredRecipes)

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

  if(!filteredRecipes){
    return <RecipeLoader/>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="flex items-center justify-between">
            <FilterToggleButton 
              setShowMobileFilters={setShowMobileFilters}
              showMobileFilters={showMobileFilters}
            />
          </div>
        <AddRecipeButton
  onClick={() =>navigate("/add-recipe") }
/>

      {/* Search Bar */}
      <SearchBar setSearch={setSearch} value={search}  placeholder="Search recipies.." />

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
              <RecipeFilter 
              category={category}
              getCategoryIcon={getCategoryIcon}
              resetFilters={resetFilters}
              setCategory={setCategory}
              setSort={setSort}
              sort={sort}

              />

              {/* Trending Section */}
              <TrendingRecipe trending={trending}/>
            </div>
          </div>

          {/* Main Feed */}
          <div className="md:col-span-3">
            {filteredRecipes.length > 0 ? (
              <RecipeGrid 
                getCategoryIcon={getCategoryIcon} 
                getDifficultyColor={getDifficultyColor}
                recipes={filteredRecipes}
              />
            ) : (
              <EmptyRecipe 
              resetFilters={resetFilters}
              search={search}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}