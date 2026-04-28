import { useEffect,  } from 'react'
import './App.css'
import { Routes, Route, Navigate, } from "react-router-dom";
import SignupPage from './pages/Signup';
import { Toaster } from 'react-hot-toast';
import SigninPage from './pages/Signin';
import { useAppSelector } from './types/ThemeHookType';
import Layout from './layout/UserLayout';
import { ProtectedRoute } from './componets/ProtectedRoutes/ProtectedRoutes';
import Recipies from './pages/Recipies';
import Home from './pages/Home';
import { PublicRoute } from './pages/PublicRoutes';
// import { useAuth } from './hooks/useAuth';

function App() {

  const mode = useAppSelector((state)=>state.theme.mode)
  useEffect(() => {
  document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);
   
  return(
    <>
    <Toaster position="top-right"toastOptions={{duration: 3000,style: {background: "#333",color: "#fff",},}}/>
    <Routes>
      <Route path="/auth">
        <Route path="signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
        <Route path="signin" element={<PublicRoute><SigninPage /></PublicRoute>} />
      </Route>
      <Route path="/" element={<Navigate to="/home"/>}/>
      <Route path='/home'element={<ProtectedRoute><Layout><Home/></Layout></ProtectedRoute>}/>
      <Route path='/recipies' element={<ProtectedRoute><Layout><Recipies/></Layout></ProtectedRoute>}/>
    </Routes>
    </>
  )
}

export default App
