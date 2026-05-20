import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default  function ProtectedRoute() {
  const { data: user, isLoading, isError,fetchStatus } = useAuth();

  // if (isLoading) return <h1>Loading...</h1>;
   if (isLoading || fetchStatus === "fetching") return null;
  // if (isLoading) return <h1>Loading...</h1>;

  console.log("user : ",user)
  if (isError || !user) return <Navigate to="/auth/signin" />;

  return <Outlet/>;
}