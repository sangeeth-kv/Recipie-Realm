import { useState } from "react";
import {
  Edit,
  MapPin,
  Calendar,
  Heart,
  Bookmark,
  MessageCircle,
} from "lucide-react";

export default function ProfilePage() {

  // 🔥 Dummy Logged User
  const user = {
    fullname: "Sangeeth KV",
    userName: "sangeeth",
    email: "sangeeth@gmail.com",
    bio: "Passionate food creator 🍕 | Exploring flavors around the world 🌍",
    avatar: "https://i.pravatar.cc/200?img=3",

    followers: 1240,
    following: 320,

    joinedAt: "January 2025",
  };

  // 🔥 Dummy Posts
  const posts = [
    {
      _id: "1",
      title: "Cheesy Pizza",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
      likes: 124,
      comments: 32,
      saved: 20,
    },

    {
      _id: "2",
      title: "Chocolate Cake",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
      likes: 220,
      comments: 54,
      saved: 78,
    },

    {
      _id: "3",
      title: "Burger Deluxe",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      likes: 89,
      comments: 14,
      saved: 11,
    },

    {
      _id: "4",
      title: "Healthy Salad",
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
      likes: 176,
      comments: 21,
      saved: 46,
    },
  ];

  const [activeTab, setActiveTab] = useState<
    "posts" | "saved"
  >("posts");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* 🔥 COVER */}
      <div className="h-48 bg-gradient-to-r from-orange-500 to-red-500" />

      {/* 🔥 PROFILE SECTION */}
      <div className="max-w-5xl mx-auto px-4">

        <div className="relative -mt-16 bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-6">

          {/* TOP */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            {/* LEFT */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">

              {/* AVATAR */}
              <img
                src={user.avatar}
                alt={user.fullname}
                className="
                  w-32
                  h-32
                  rounded-full
                  object-cover
                  border-4
                  border-white
                  shadow-lg
                "
              />

              {/* INFO */}
              <div>

                <h1 className="text-3xl font-bold dark:text-white">
                  {user.fullname}
                </h1>

                <p className="text-gray-500 text-lg">
                  @{user.userName}
                </p>

                <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-xl">
                  {user.bio}
                </p>

                {/* EXTRA INFO */}
                <div className="flex flex-wrap gap-5 mt-4 text-sm text-gray-500">

                  <div className="flex items-center gap-2">
                    <MapPin size={16} />
                    Kerala, India
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    Joined {user.joinedAt}
                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT */}
            <button
              className="
                flex
                items-center
                justify-center
                gap-2
                px-6
                py-3
                rounded-2xl
                bg-orange-500
                hover:bg-orange-600
                text-white
                font-semibold
                transition-all
              "
            >
              <Edit size={18} />
              Edit Profile
            </button>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 mt-8">

            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-5 text-center">

              <h2 className="text-2xl font-bold dark:text-white">
                {posts.length}
              </h2>

              <p className="text-gray-500 text-sm">
                Posts
              </p>

            </div>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-5 text-center">

              <h2 className="text-2xl font-bold dark:text-white">
                {user.followers.toLocaleString()}
              </h2>

              <p className="text-gray-500 text-sm">
                Followers
              </p>

            </div>

            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-5 text-center">

              <h2 className="text-2xl font-bold dark:text-white">
                {user.following.toLocaleString()}
              </h2>

              <p className="text-gray-500 text-sm">
                Following
              </p>

            </div>

          </div>

          {/* TABS */}
          <div className="flex gap-4 mt-10 border-b pb-3">

            <button
              onClick={() => setActiveTab("posts")}
              className={`
                px-5
                py-2
                rounded-xl
                font-semibold
                transition-all
                ${
                  activeTab === "posts"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                }
              `}
            >
              Posts
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`
                px-5
                py-2
                rounded-xl
                font-semibold
                transition-all
                ${
                  activeTab === "saved"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                }
              `}
            >
              Saved
            </button>

          </div>

        </div>

        {/* 🔥 POSTS GRID */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {posts.map((post) => (
            <div
              key={post._id}
              className="
                bg-white
                dark:bg-gray-800
                rounded-3xl
                overflow-hidden
                shadow-md
                hover:shadow-xl
                transition-all
                duration-300
              "
            >

              {/* IMAGE */}
              <img
                src={post.image}
                alt={post.title}
                className="
                  w-full
                  h-64
                  object-cover
                "
              />

              {/* CONTENT */}
              <div className="p-5">

                <h2 className="text-xl font-bold dark:text-white">
                  {post.title}
                </h2>

                {/* STATS */}
                <div className="flex items-center gap-5 mt-4 text-gray-500 dark:text-gray-400">

                  <div className="flex items-center gap-1">
                    <Heart size={18} />
                    {post.likes}
                  </div>

                  <div className="flex items-center gap-1">
                    <MessageCircle size={18} />
                    {post.comments}
                  </div>

                  <div className="flex items-center gap-1">
                    <Bookmark size={18} />
                    {post.saved}
                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}