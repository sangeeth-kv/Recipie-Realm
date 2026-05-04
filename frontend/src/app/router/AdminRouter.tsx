import React from 'react'
import { Route, Routes } from 'react-router-dom'

function AdminRouter() {
  return (
    <Routes>
        <Route path='login' element={<h1>Admin Login Page</h1>} />
    </Routes>
  )
}

export default AdminRouter