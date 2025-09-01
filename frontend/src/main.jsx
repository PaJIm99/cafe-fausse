import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/global.css'
import App from './App'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Reservations from './pages/Reservations'
import About from './pages/About'
import Gallery from './pages/Gallery'
import AdminReservations from './pages/AdminReservations'
createRoot(document.getElementById('root')).render(
<BrowserRouter>
<App>
<Routes>
<Route path="/" element={<Home/>} />
<Route path="/menu" element={<Menu/>} />
<Route path="/reservations" element={<Reservations/>} />
<Route path="/about" element={<About/>} />
<Route path="/gallery" element={<Gallery/>} />
<Route path="/admin/reservations" element={<AdminReservations/>} />
</Routes>
</App>
</BrowserRouter>
)
