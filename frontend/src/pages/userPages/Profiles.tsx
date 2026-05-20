import React, { useEffect, useState } from "react";
import {
  UserPlus,
  UserCheck,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {useSearchParams} from "react-router-dom"
import SearchBar from "../../componets/SearchBar/SearchBar";
import useDebounce from "../../hooks/useDebounce";
import { getAllUsers } from "../../services/getUsers";
import type { IUser } from "../../interface/IUser";
import Pagination from "../../componets/Pagination/Pagination";
import EmptyState from "../../componets/EmptyState/EmptyState";

export default function Profiles() {

  const [searchParams, setSearchParams] = useSearchParams(); 
  const [page,setPage]=useState(Number(searchParams.get("page")) || 1)
  const [users,setUsers]=useState<IUser[]>([])
  const [totalPage,setTotalPage]=useState(1)
  const [search, setSearch] = useState("");

  // 🔥 Pagination State

  const debouncedSeachQuery=useDebounce(search,500)

  const USERS_PER_PAGE = 6;

  useEffect(()=>{
    getAllUsers(page,USERS_PER_PAGE,debouncedSeachQuery)
    .then((response)=>{
      console.log("Response : ",response)
      setUsers(response.users)
      setTotalPage(response.totalPage)
    })
    .catch((err)=>{
      console.log(err)
    })
  },[page,debouncedSeachQuery])


  useEffect(() => {
    setSearchParams({
        page: String(page),
    });
  }, [page, setSearchParams]);


  // 🔥 Follow State
  const [followState, setFollowState] = useState(
    users.reduce((acc: any, user) => {
      acc[user._id] = user.following;
      return acc;
    }, {})
  );

  // 🔍 Search Filter


  // // 👥 Follow Toggle
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
          <SearchBar placeholder="Search user.." setSearch={setSearch} />
      </div>

      {/* 👥 USERS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {users.map((user) => {

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
                  src={user?.profilePic}
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
                {user?.bio}
              </p>

              {/* FOLLOWERS */}
              <div className="mt-5 text-sm text-gray-500 dark:text-gray-400">

                <span className="font-semibold">
                  {user?.followersCount.toLocaleString()}
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
      {totalPage >= 1 && (
        <Pagination currentPage={page} onPageChange={setPage} totalPages={totalPage}/>
      )}

      {/* EMPTY STATE */}
      {users.length === 0 && (
        <EmptyState title="No User Found" />
      )}
      
    </div>
  );
}