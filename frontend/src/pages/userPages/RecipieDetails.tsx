import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Heart,
  Share2,
  Bookmark,
  Clock,
  Users,
  ChefHat,
  Star,
  Eye,
  MessageCircle,
  ArrowLeft,
  PrinterIcon,
  Flame,
} from "lucide-react";

interface User {
  name: string;
  profilePic: string;
}

interface Recipe {
  _id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  prepTime: number;
  cookTime?: number;
  difficulty: string;
  likes: number;
  views: number;
  averageRating: number;
  servings?: number;
  userId: User;
}

interface ReviewType {
  _id: number;
  user: User;
  rating: number;
  reviews: string;
  likes: number;
  createdAt: string;
}

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const recipe: Recipe = {
    _id: id || "",
    title: "Chicken Biryani",
    description:
      "Aromatic Kerala style chicken biryani with rich flavors and spices. A traditional dish that combines perfectly cooked basmati rice with tender, marinated chicken.",
    images: [
      "https://images.unsplash.com/photo-1604908176997-431bfe6c2fdf",
      "https://images.unsplash.com/photo-1563379091339-03246963d29c",
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a",
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
    ],
    category: "Non-Veg",
    tags: ["Spicy", "Kerala", "Rice", "Festive"],
    ingredients: [
      "1kg Chicken (cut into medium pieces)",
      "2 cups Basmati Rice",
      "3 tbsp Ghee",
      "2 onions (sliced)",
      "4 tomatoes (chopped)",
      "Ginger-garlic paste",
      "Yogurt (1 cup)",
      "Spices (cinnamon, cloves, bay leaves, cumin)",
      "Fresh cilantro and mint",
      "Salt and pepper to taste",
    ],
    steps: [
      "Soak basmati rice for 30 minutes and marinate chicken with yogurt, ginger-garlic paste, and spices for 1 hour.",
      "Heat ghee and fry onions until golden brown, then set aside.",
      "In a heavy-bottomed pot, layer the marinated chicken at the bottom.",
      "Parboil rice and layer it on top of the chicken, alternating with fried onions.",
      "Sprinkle remaining ghee, cilantro, and mint on top.",
      "Cover with aluminum foil and place the lid firmly.",
      "Cook on high heat for 3-4 minutes until you hear a sizzle, then reduce to low heat.",
      "Cook for 20-25 minutes until rice is fully cooked and aromatic.",
    ],
    prepTime: 60,
    cookTime: 30,
    difficulty: "Medium",
    likes: 120,
    views: 980,
    averageRating: 4.5,
    servings: 4,
    userId: {
      name: "Sangeeth",
      profilePic: "https://i.pravatar.cc/150?img=3",
    },
  };

  const reviews: ReviewType[] = [
    {
      _id: 1,
      user: {
        name: "Rahul",
        profilePic: "https://i.pravatar.cc/150?img=8",
      },
      rating: 5,
      reviews:
        "Absolutely loved this recipe! The biryani turned out perfectly aromatic and the chicken was so tender. Will definitely make it again!",
      likes: 12,
      createdAt: "2 days ago",
    },
    {
      _id: 2,
      user: {
        name: "Anjali",
        profilePic: "https://i.pravatar.cc/150?img=5",
      },
      rating: 4,
      reviews:
        "Very tasty and easy to cook. My family loved it! Just needed a bit more salt according to our taste.",
      likes: 5,
      createdAt: "5 days ago",
    },
    {
      _id: 3,
      user: {
        name: "Arjun",
        profilePic: "https://i.pravatar.cc/150?img=10",
      },
      rating: 5,
      reviews:
        "Restaurant level biryani! Following the steps carefully made all the difference. Worth every minute spent cooking.",
      likes: 20,
      createdAt: "1 week ago",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(recipe.images[0]);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(recipe.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const ratingPercentage = (recipe.averageRating / 5) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Go back"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 flex-1 text-center">
            Recipe Details
          </h1>
          <button
            onClick={() => window.print()}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Print recipe"
          >
            <PrinterIcon size={24} className="text-gray-700" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image Gallery */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-100 aspect-square">
              <img
                src={selectedImage}
                alt={recipe.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                {recipe.category}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {recipe.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === image
                      ? "border-orange-500 ring-2 ring-orange-200"
                      : "border-gray-300 hover:border-orange-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Recipe Info */}
          <div className="space-y-6">
            {/* Author Card */}
            <div className="bg-white rounded-2xl p-4 shadow-md border border-gray-200">
              <div className="flex items-center gap-4">
                <img
                  src={recipe.userId.profilePic}
                  alt={recipe.userId.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {recipe.userId.name}
                  </p>
                  <p className="text-xs text-gray-500">Posted this recipe</p>
                  <button className="text-xs text-orange-600 font-semibold hover:text-orange-700 mt-1">
                    Follow
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {recipe.averageRating}
                </div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.floor(recipe.averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-2">Rating</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {recipe.likes}
                </div>
                <p className="text-xs text-gray-600 mt-2">Likes</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {recipe.views}
                </div>
                <p className="text-xs text-gray-600 mt-2">Views</p>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 text-center">
                <div className="flex items-center justify-center gap-1 text-lg font-bold text-red-600">
                  <Clock size={18} />
                  {recipe.prepTime + (recipe.cookTime || 0)}
                </div>
                <p className="text-xs text-gray-600 mt-2">Total mins</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleLike}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isLiked
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-900 hover:bg-red-50"
                }`}
              >
                <Heart
                  size={20}
                  className={isLiked ? "fill-white" : ""}
                />
                {isLiked ? "Liked" : "Like this recipe"}
              </button>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSaved
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 text-gray-900 hover:bg-orange-50"
                }`}
              >
                <Bookmark
                  size={20}
                  className={isSaved ? "fill-white" : ""}
                />
                {isSaved ? "Saved" : "Save recipe"}
              </button>

              <button className="w-full py-3 rounded-xl font-semibold bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                <Share2 size={20} />
                Share
              </button>
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mt-8 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {recipe.title}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Recipe Info Section */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-orange-600 mb-2">
              <Clock size={20} />
              <span className="text-sm font-semibold">Prep Time</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {recipe.prepTime}
            </p>
            <p className="text-xs text-gray-600">minutes</p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Flame size={20} />
              <span className="text-sm font-semibold">Cook Time</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {recipe.cookTime || 30}
            </p>
            <p className="text-xs text-gray-600">minutes</p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-purple-600 mb-2">
              <Users size={20} />
              <span className="text-sm font-semibold">Servings</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {recipe.servings || 4}
            </p>
            <p className="text-xs text-gray-600">people</p>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-red-600 mb-2">
              <ChefHat size={20} />
              <span className="text-sm font-semibold">Difficulty</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {recipe.difficulty}
            </p>
            <p className="text-xs text-gray-600">level</p>
          </div>
        </div>

        {/* Ingredients Section */}
        <div className="mt-12 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ingredients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recipe.ingredients.map((ingredient, index) => (
              <label
                key={index}
                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 cursor-pointer transition-all duration-200"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-orange-600 cursor-pointer"
                />
                <span className="text-gray-800 font-medium">{ingredient}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Steps Section */}
        <div className="mt-12 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Cooking Steps
          </h2>
          <div className="space-y-4">
            {recipe.steps.map((step, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-white rounded-lg border border-gray-200 hover:border-orange-300 transition-all duration-200"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 leading-relaxed">{step}</p>
                  <div className="mt-3 flex gap-2">
                    <button className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                      Save
                    </button>
                    <button className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Customer Reviews
            </h2>
            <button className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Write Review
            </button>
          </div>

          {/* Rating Summary */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-orange-600">
                  {recipe.averageRating}
                </div>
                <div className="flex gap-1 mt-2 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < Math.floor(recipe.averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {reviews.length} reviews
                </p>
              </div>

              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-12">
                      {rating} stars
                    </span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{
                          width: `${Math.random() * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-orange-300 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={review.user.profilePic}
                      alt={review.user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {review.user.name}
                      </h3>
                      <p className="text-xs text-gray-500">{review.createdAt}</p>
                    </div>
                  </div>

                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-800 mb-4 leading-relaxed">
                  {review.reviews}
                </p>

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-red-600 hover:text-red-700 font-medium transition-colors">
                    <Heart size={16} />
                    <span className="text-sm">{review.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-gray-600 hover:text-orange-600 font-medium transition-colors">
                    <MessageCircle size={16} />
                    <span className="text-sm">Reply</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}