import React from 'react'
import chatpage from './pages/chatpage.jsx'
import loginpage from './pages/loginpage.jsx'
import signuppage from './pages/signuppage.jsx'
import { Routes, Route, Navigate } from 'react-router'

function App() {
  return (
        <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* DECORATORS - GRID BG & GLOW SHAPES */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" />

      <Routes>
        <Route path="/" element={<chatpage />} />
        <Route path="/login" element={<loginpage /> } />
        <Route path="/signup" element={<signuppage />} />
      </Routes>

     
    </div>
  )
}

export default App
