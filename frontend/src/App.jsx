import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { Toaster } from 'sonner';
import Login from './Pages/auth/login';
import AdminDashboard from './Pages/Admin/Dashboard';

function App() {

  return (
    <BrowserRouter>
    <Toaster richColors position='bottom-center'/>
    <Routes>
      <Route path="/" element={<h1>Welcome to DoQueue</h1>} />
         <Route path="/login" element={<Login />} />
         <Route path='/adminDashboard' element={<AdminDashboard />} />
         
    </Routes>
     
    </BrowserRouter>
  )
}

export default App
