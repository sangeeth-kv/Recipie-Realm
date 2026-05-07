import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SigninPage from '../../pages/userPages/Signin'
import SignupPage from '../../pages/userPages/Signup'
import { PublicRoute } from '../../pages/userPages/PublicRoutes'

function AuthRouter() {
  return (
    <Routes>
        <Route path='signin' element={<PublicRoute><SigninPage/></PublicRoute>} />
        <Route path='signup' element={<PublicRoute><SignupPage/></PublicRoute>} />
    </Routes>
  )
}

export default AuthRouter