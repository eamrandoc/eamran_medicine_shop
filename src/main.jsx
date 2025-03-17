import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import Register from './pages/Register/Register.jsx'
import Login from './pages/Login/Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout></MainLayout>} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="/login" element={<Login></Login>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
