import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CRM from './pages/CRM'
import Quotes from './pages/Quotes'
import Tables from './pages/Tables'
import Portal from './pages/Portal'

export default function App() {
  return (
    <div className="gradient-hero min-h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Atmosphere Logo Watermark */}
      <svg
        className="atmosphere-logo"
        viewBox="0 0 200 100"
        fill="currentColor"
        aria-hidden="true"
      >
        <text 
          x="0" 
          y="70" 
          fontFamily="Plus Jakarta Sans" 
          fontSize="60" 
          fontWeight="800" 
          fill="#775a19"
        >
          AVRIL
        </text>
      </svg>
    </div>
  )
}
