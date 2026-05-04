import React from 'react'
import { Routes, Route } from "react-router-dom";

function OtherRoutes() {
  return (
    <Routes>
        <Route path='/' element={<h1>Landing page</h1>} />
    </Routes>

  )
}

export default OtherRoutes