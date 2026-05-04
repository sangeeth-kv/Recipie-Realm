import React, { useMemo, useState } from "react";
import {
  Search,
  UserPlus,
  UserCheck,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function Profiles() {

  // 🔥 Dummy Users
  const users = [
    {
      _id: "1",
      fullname: "Sangeeth KV",
      userName: "sangeeth",
      bio: "Food lover 🍕",
      profilePic: "https://i.pravatar.cc/150?img=3",
      followers: 1200,
      following: false,
    },

    {
      _id: "2",
      fullname: "Anjali",
      userName: "anjali_foodie",
      bio: "Dessert Specialist 🍰",
      profilePic: "https://i.pravatar.cc/150?img=5",
      followers: 840,
      following: true,
    },

    {
      _id: "3",
      fullname: "Rahul",
      userName: "rahul_cooks",
      bio: "Spicy food addict 🌶",
      profilePic: "https://i.pravatar.cc/150?img=8",
      followers: 540,
      following: false,
    },

    {
      _id: "4",
      fullname: "Arjun",
      userName: "arjun_recipes",
      bio: "Traditional Kerala recipes 🥘",
      profilePic: "https://i.pravatar.cc/150?img=10",
      followers: 2100,
      following: true,
    },

    {
      _id: "5",
      fullname: "Meera",
      userName: "meera_bakes",
      bio: "Cake artist 🎂",
      profilePic: "https://i.pravatar.cc/150?img=12",
      followers: 980,
      following: false,
    },

    {
      _id: "6",
      fullname: "John",
      userName: "john_cook",
      bio: "BBQ master 🔥",
      profilePic: "https://i.pravatar.cc/150?img=15",
      followers: 300,
      following: false,
    },

    {
      _id: "7",
      fullname: "Akhil",
      userName: "akhil_chef",
      bio: "Street food explorer 🌮",
      profilePic: "https://i.pravatar.cc/150?img=16",
      followers: 430,
      following: true,
    },

    {
      _id: "8",
      fullname: "Maria",
      userName: "maria_foods",
      bio: "Healthy recipes 🥗",
      profilePic: "https://i.pravatar.cc/150?img=18",
      followers: 1500,
      following: false,
    },
  ];

  const [search, setSearch] = useState("");

  // 🔥 Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  const USERS_PER_PAGE = 6;

  // 🔥 Follow State
  const [followState, setFollowState] = useState(
    users.reduce((acc: any, user) => {
      acc[user._id] = user.following;
      return acc;
    }, {})
  );

  // 🔍 Search Filter
  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.fullname
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        user.userName
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [search]);

  // 🔥 Pagination Logic
  const totalPages = Math.ceil(
    filteredUsers.length / USERS_PER_PAGE
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  // 👥 Follow Toggle
  const toggleFollow = (id: string) => {
    setFollowState((prev: any) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* 🔥 HEADER */}
      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="p-3 rounded-2xl bg-orange-500 text-white">
            <Users size={24} />
          </div>

          <div>
            <h1 className="text-4xl font-bold dark:text-white">
              Discover Users
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Follow food creators and explore recipes 🍽
            </p>
          </div>

        </div>
      </div>

      {/* 🔍 SEARCH BAR */}
      <div className="relative mb-10">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="
            w-full
            pl-12
            pr-4
            py-4
            rounded-2xl
            border
            border-gray-200
            dark:border-gray-700
            bg-white
            dark:bg-gray-800
            dark:text-white
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-orange-500
          "
        />

      </div>

      {/* 👥 USERS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {paginatedUsers.map((user) => {

          const isFollowing = followState[user._id];

          return (
            <div
              key={user._id}
              className="
                bg-white
                dark:bg-gray-800
                rounded-3xl
                p-6
                shadow-md
                hover:shadow-xl
                transition-all
                duration-300
                border
                border-transparent
                hover:border-orange-200
                dark:hover:border-orange-900
              "
            >

              {/* USER INFO */}
              <div className="flex items-center gap-4">

                <img
                  src={user.profilePic}
                  alt={user.fullname}
                  className="
                    w-16
                    h-16
                    rounded-full
                    object-cover
                    ring-4
                    ring-orange-100
                    dark:ring-orange-900
                  "
                />

                <div>

                  <h2 className="font-bold text-lg dark:text-white">
                    {user.fullname}
                  </h2>

                  <p className="text-sm text-gray-500">
                    @{user.userName}
                  </p>

                </div>

              </div>

              {/* BIO */}
              <p className="mt-5 text-gray-600 dark:text-gray-300 leading-relaxed">
                {user.bio}
              </p>

              {/* FOLLOWERS */}
              <div className="mt-5 text-sm text-gray-500 dark:text-gray-400">

                <span className="font-semibold">
                  {user.followers.toLocaleString()}
                </span>{" "}
                followers

              </div>

              {/* FOLLOW BUTTON */}
              <div className="mt-6">

                <button
                  onClick={() => toggleFollow(user._id)}
                  className={`
                    w-full
                    py-3
                    rounded-2xl
                    font-semibold
                    transition-all
                    duration-300
                    flex
                    items-center
                    justify-center
                    gap-2
                    ${
                      isFollowing
                        ? `
                          bg-green-100
                          text-green-700
                          dark:bg-green-900
                          dark:text-green-300
                        `
                        : `
                          bg-orange-500
                          hover:bg-orange-600
                          text-white
                        `
                    }
                  `}
                >

                  {isFollowing ? (
                    <>
                      <UserCheck size={18} />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus size={18} />
                      Follow
                    </>
                  )}

                </button>

              </div>

            </div>
          );
        })}
      </div>

      {/* 🔥 PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-12">

          {/* Previous */}
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage((prev) => prev - 1)
            }
            className="
              p-3
              rounded-xl
              bg-white
              dark:bg-gray-800
              border
              disabled:opacity-50
            "
          >
            <ChevronLeft size={20} />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`
                w-10
                h-10
                rounded-xl
                font-semibold
                transition-all
                ${
                  currentPage === index + 1
                    ? "bg-orange-500 text-white"
                    : "bg-white dark:bg-gray-800 border"
                }
              `}
            >
              {index + 1}
            </button>
          ))}

          {/* Next */}
          <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => prev + 1)
            }
            className="
              p-3
              rounded-xl
              bg-white
              dark:bg-gray-800
              border
              disabled:opacity-50
            "
          >
            <ChevronRight size={20} />
          </button>

        </div>
      )}

      {/* EMPTY STATE */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-20">

          <h2 className="text-2xl font-bold dark:text-white">
            No Users Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try searching with another username
          </p>

        </div>
      )}
    </div>
  );
}