import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Pages/auth/login';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Welcome to DoQueue</h1>} />
         <Route path="/login" element={<Login />} />
    </Routes>
     
    </BrowserRouter>
  )
}

export default App
