import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Chatbot from './pages/Chatbot'
import Profile from './pages/Profile'
import Quotes from './pages/Quotes'
import Tables from './pages/Tables'
import Portal from './pages/Portal'

function AuthenticatedRoute({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>
}

export default function App() {
  return (
    <div className="gradient-hero min-h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AuthenticatedRoute><Dashboard /></AuthenticatedRoute>} />
        <Route path="/crm" element={<AuthenticatedRoute><Chatbot /></AuthenticatedRoute>} />
        <Route path="/profile/:id" element={<AuthenticatedRoute><Profile /></AuthenticatedRoute>} />
        <Route path="/quotes" element={<AuthenticatedRoute><Quotes /></AuthenticatedRoute>} />
        <Route path="/tables" element={<AuthenticatedRoute><Tables /></AuthenticatedRoute>} />
        <Route path="/portal" element={<AuthenticatedRoute><Portal /></AuthenticatedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
