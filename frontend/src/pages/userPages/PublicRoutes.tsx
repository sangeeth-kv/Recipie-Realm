import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function PublicRoute({ children }: { children: React.ReactNode }) {

    
  const { data: user, isLoading } = useAuth();

  console.log("in public routes :=> user : ",user,"isLoading : ",isLoading)

  // ⛔ WAIT until auth is resolved
  if (isLoading) return <h1>Loading...</h1>;

  console.log("before navigate inthe public routes= :::")

  // ✅ If logged in → block access
  if (user) return <Navigate to="/home" replace />;
   
  console.log("ag")

  return <>{children}</>;
}