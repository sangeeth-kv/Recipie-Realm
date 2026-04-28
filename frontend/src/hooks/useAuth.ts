import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/authMe";

// export const useAuth = () => {
//   return useQuery({
//     queryKey: ["me"],
//     queryFn: getMe,
//     retry: 1,
//     staleTime: 5 * 60 * 1000,
//     refetchOnWindowFocus: true, 
//   });
// };
// hooks/useAuth.ts
export const useAuth = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,

    // ✅ ADD THIS
    // enabled: window.location.pathname !== "/auth/signin",
  });
};