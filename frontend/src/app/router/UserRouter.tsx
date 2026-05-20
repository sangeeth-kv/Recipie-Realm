import React, { Suspense,lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../../layout/UserLayout'
import  ProtectedRoute from '../../componets/ProtectedRoutes/ProtectedRoutes'
import RecipeLoader from '../../componets/FallbackScreen/FallbackScreen'

const Recipies =lazy(()=>
  import("../../pages/userPages/Recipies")
)

const Home =lazy(()=>
  import("../../pages/userPages/Home")
)

const Profiles = lazy(() =>
  import("../../pages/userPages/Profiles")
);

const RecipeDetails = lazy(() =>
  import("../../pages/userPages/RecipieDetails")
);

const ProfilePage = lazy(() =>
  import("../../pages/userPages/UserDetails")
);

const AddRecipePage = lazy(() =>
  import("../../pages/userPages/AddRecipePage")
);



function UserRouter() {
  return (
  

    <Routes>
      <Route element={<Layout/>}>
        <Route element={<ProtectedRoute/>}>

            {/* Home page */}
            <Route path="home" element={  <Suspense fallback={<RecipeLoader/>}>
            <Home />
            </Suspense>} />

            {/* Recipies page */}
            <Route path="recipies" element={<Suspense fallback={<RecipeLoader/>}>
            <Recipies />
            </Suspense>} />

            {/* Profiles page */}
            <Route path="profiles" element={<Suspense fallback={<RecipeLoader/>}>
            <Profiles/>
            </Suspense>} />

            {/* ProfileDetails page */}
            <Route path="profile/:id" element={<Suspense fallback={<RecipeLoader/>}>
            <ProfilePage/>
            </Suspense>} />

            {/* Recipie Details page */}
            <Route path="recipe/:id" element={<Suspense fallback={<RecipeLoader/>}>
            <RecipeDetails />
            </Suspense>} />

            {/* Add recipie page */}
            <Route path="add-recipe" element={<Suspense fallback={<RecipeLoader/>}>
            <AddRecipePage />
            </Suspense>} />

            {/*Settings page  */}
            <Route path="settings" element={<Suspense fallback={<RecipeLoader/>}>
            <h1>Settings page</h1>
            </Suspense>}/>

        </Route>    
      </Route>
</Routes>

  )
}

export default UserRouter