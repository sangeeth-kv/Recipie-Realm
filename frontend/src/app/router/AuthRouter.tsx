import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SigninPage from '../../pages/userPages/Signin'
import SignupPage from '../../pages/userPages/Signup'

function AuthRouter() {
  return (
    <Routes>
        <Route path='signin' element={<SigninPage/>} />
        <Route path='signup' element={<SignupPage/>} />
    </Routes>
  )
}

export default AuthRouter