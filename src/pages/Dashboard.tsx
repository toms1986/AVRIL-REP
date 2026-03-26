import { Link } from 'react-router-dom'
import {
  Sparkles, Bell, MessageCircle,
  Calendar, FileText, Users, MapPin,
  ArrowRight, Star
} from 'lucide-react'

const stats = [
  { label: 'Eventos', value: '23', icon: Calendar, color: '#775a19' },
  { label: 'Consultas', value: '4', icon: FileText, color: '#c9941f' },
  { label: 'Conversaciones', value: '12', icon: MessageCircle, color: '#1e7a4a' },
]

const recentChats = [
  { id: '1', name: 'Sofía Martínez', last: '¿Tiene disponibilidad para octubre?', time: '10:30', unread: 2, avatar: 'SM', event: 'Casamiento' },
  { id: '2', name: 'Carlos Ríos', last: 'Presupuesto enviado ✓', time: '09:15', unread: 0, avatar: 'CR', event: 'Corporate' },
  { id: '3', name: 'Ana Lucía Velt', last: '¿Puedo visitar mañana?', time: 'Ayer', unread: 1, avatar: 'AV', event: 'Cumple 40' },
]

const quickActions = [
  { label: 'Ver salón', icon: MapPin, href: '/profile/1', color: '#775a19' },
  { label: 'Presupuesto', icon: FileText, href: '/quotes', color: '#c9941f' },
  { label: 'Mesas', icon: Users, href: '/tables', color: '#1e7a4a' },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen pb-24 md:pb-8" style={{ background: '#f9f9f9' }}>
      {/* Header */}
      <div className="px-4 pt-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #775a19, #c9941f)' }}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight" style={{ color: '#775a19' }}>AVRIL</h1>
              <p className="text-xs" style={{ color: '#6f7671' }}>Panel de Control</p>
            </div>
          </div>
          <button className="relative p-2.5 rounded-2xl"
            style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(119,90,25,0.1)' }}>
            <Bell className="w-5 h-5" style={{ color: '#6f7671' }} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
              style={{ background: '#775a19' }}>2</span>
          </button>
        </div>

        {/* Greeting */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ background: 'linear-gradient(135deg, #775a19, #c9941f)' }}>
            JA
          </div>
          <div>
            <p className="font-display text-lg font-bold" style={{ color: '#2d3435' }}>¡Buen día, Juan!</p>
            <p className="text-xs" style={{ color: '#6f7671' }}>4 consultas nuevas esta semana</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl p-3 text-center"
              style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(119,90,25,0.08)' }}>
              <s.icon className="w-4 h-4 mx-auto mb-1" style={{ color: s.color }} />
              <div className="font-display text-2xl font-extrabold" style={{ color: '#2d3435' }}>{s.value}</div>
              <div className="text-xs" style={{ color: '#6f7671' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {quickActions.map((a) => (
            <Link
              key={a.label}
              to={a.href}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(119,90,25,0.12)',
                color: '#775a19',
              }}>
              <a.icon className="w-4 h-4" />
              {a.label}
            </Link>
          ))}
        </div>

        {/* Salon card */}
        <Link
          to="/profile/1"
          className="block rounded-2xl overflow-hidden mb-6 transition-all active:scale-[0.99]"
          style={{
            background: 'linear-gradient(135deg, rgba(119,90,25,0.08), rgba(201,148,31,0.12))',
            border: '1px solid rgba(119,90,25,0.12)',
          }}>
          <div className="h-28 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #775a19 0%, #c9941f 60%, #f8cf83 100%)' }}>
            <div className="text-center text-white">
              <div className="text-4xl mb-1">✨</div>
              <p className="text-xs uppercase tracking-widest opacity-80">Proyección AR</p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-display text-lg font-bold" style={{ color: '#2d3435' }}>Salón Cristal</h3>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#c9941f] text-[#c9941f]" />
                <span className="text-xs font-semibold" style={{ color: '#2d3435' }}>4.9</span>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-3">
              <MapPin className="w-3.5 h-3.5" style={{ color: '#775a19' }} />
              <span className="text-xs" style={{ color: '#6f7671' }}>Palermo, Buenos Aires · 350 personas</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold" style={{ color: '#775a19' }}>$45.000 / hora</span>
              <span className="text-xs flex items-center gap-1" style={{ color: '#6f7671' }}>
                Ver perfil <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </Link>

        {/* Conversations */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold" style={{ color: '#2d3435' }}>Conversaciones recientes</p>
          <Link to="/crm" className="text-xs font-semibold" style={{ color: '#775a19' }}>
            Ver todas
          </Link>
        </div>

        <div className="space-y-2">
          {recentChats.map((conv) => (
            <Link
              key={conv.id}
              to="/crm"
              className="flex items-center gap-3 p-3 rounded-2xl transition-all active:scale-[0.99]"
              style={{
                background: 'rgba(255,255,255,0.8)',
                border: '1px solid rgba(119,90,25,0.08)',
              }}>
              <div className="relative">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: 'linear-gradient(135deg, #775a19, #c9941f)' }}>
                  {conv.avatar}
                </div>
                {conv.unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                    style={{ background: '#775a19' }}>{conv.unread}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-sm font-semibold truncate" style={{ color: '#2d3435' }}>{conv.name}</span>
                  <span className="text-xs ml-2 flex-shrink-0" style={{ color: '#6f7671' }}>{conv.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                    style={{ background: 'rgba(119,90,25,0.08)', color: '#775a19' }}>{conv.event}</span>
                  <p className="text-xs truncate" style={{ color: '#6f7671' }}>{conv.last}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
