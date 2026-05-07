import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/userPages/Home'
import Recipies from '../../pages/userPages/Recipies'
import Layout from '../../layout/UserLayout'
import { ProtectedRoute } from '../../componets/ProtectedRoutes/ProtectedRoutes'
import RecipeDetails from '../../pages/userPages/RecipieDetails'
import Profiles from '../../pages/userPages/Profiles'
import ProfilePage from '../../pages/userPages/UserDetails'
import AddRecipePage from '../../pages/userPages/AddRecipePage'

function UserRouter() {
  return (
    <Routes>
  <Route element={<Layout/>}>
    <Route element={<ProtectedRoute/>}>
        <Route path="home" element={<Home />} />
        <Route path="recipies" element={<Recipies />} />
        <Route path="profiles" element={<Profiles/>} />
        <Route path="profile/:id" element={<ProfilePage/>} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="add-recipe" element={<AddRecipePage />} />
        <Route path="accounts" element={<h1>Accounts page</h1>}/>
        <Route path="chat" element={<h1>chat page</h1>}/>
    </Route>    
  </Route>
</Routes>
  )
}

export default UserRouter