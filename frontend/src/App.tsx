import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppSelector } from "./types/ThemeHookType";
import AuthRouter from "./app/router/AuthRouter";
import OtherRoutes from "./app/router/OtherRouter";
import AdminRouter from "./app/router/AdminRouter";
import UserRouter from "./app/router/UserRouter";
// import { useAuth } from './hooks/useAuth';

function App() {
  const mode = useAppSelector((state) => state.theme.mode);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { background: "#333", color: "#fff" },
        }}
      />

      
      <Routes>
        {/* Landing */}
        <Route path="/" element={<OtherRoutes />} />

        {/* Feature-based routers */}
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/*" element={<UserRouter />} />

        {/* 404 */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
