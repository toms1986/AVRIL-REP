import { Link } from 'react-router-dom'
import { 
  MessageCircle, FileText, Users, Calendar, 
  TrendingUp, Clock, ChevronRight, Plus
} from 'lucide-react'
import Layout from '../components/Layout'

const recentConversations = [
  { name: 'Micaela Gutiérrez', event: 'Casamiento', time: 'Hace 5 min', status: 'pending', avatar: 'MG' },
  { name: 'Lorena Martínez', event: 'Cumpleaños 40', time: 'Hace 23 min', status: 'qualified', avatar: 'LM' },
  { name: 'Camila Rodríguez', event: 'Baby Shower', time: 'Hace 1 hora', status: 'quote_sent', avatar: 'CR' },
  { name: 'Juan Pérez', event: 'Corporate Event', time: 'Hace 2 horas', status: 'approved', avatar: 'JP' },
]

const stats = [
  { label: 'Consultas activas', value: '12', trend: '+3 hoy', icon: MessageCircle, color: 'var(--color-primary)' },
  { label: 'Presupuestos pendientes', value: '8', trend: '2 urgent', icon: FileText, color: 'var(--color-warning)' },
  { label: 'Eventos próximos', value: '5', trend: 'Esta semana', icon: Calendar, color: 'var(--color-success)' },
  { label: 'Tasa de conversión', value: '68%', trend: '+12%', icon: TrendingUp, color: '#8b5cf6' },
]

const quickActions = [
  { label: 'Nuevo Lead', icon: Plus, href: '/crm', color: 'var(--color-primary)' },
  { label: 'Presupuesto', icon: FileText, href: '/quotes', color: 'var(--color-warning)' },
  { label: 'Armado de Mesas', icon: Users, href: '/tables', color: 'var(--color-success)' },
  { label: 'Portal Cliente', icon: Calendar, href: '/portal', color: '#8b5cf6' },
]

const getStatusBadge = (status: string) => {
  const badges: Record<string, { text: string; class: string }> = {
    pending: { text: 'Pendiente', class: 'badge-pending' },
    qualified: { text: 'Calificado', class: 'badge-success' },
    quote_sent: { text: 'Presupuesto enviado', class: 'badge-warning' },
    approved: { text: 'Aprobado', class: 'badge-success' },
  }
  return badges[status] || badges.pending
}

export default function Dashboard() {
  return (
    <Layout>
      <div className="container-main py-8">
        {/* Welcome */}
        <div className="mb-10 animate-fade-in">
          <h2 className="headline-lg mb-2">¡Buenos días, Juan! 👋</h2>
          <p className="body-md text-[var(--color-on-surface-variant)]">
            Tenés 3 consultas nuevas esperando tu atención.{' '}
            <span className="text-[var(--color-primary)] font-medium cursor-pointer">Ver todas</span>
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div 
              key={stat.label}
              className="glass-card rounded-2xl p-5 animate-fade-in"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <span className="label-sm text-[var(--color-success)] font-medium">{stat.trend}</span>
              </div>
              <p className="headline-lg mb-1">{stat.value}</p>
              <p className="label-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 pb-24 md:pb-8">
          {/* Recent Conversations */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h3 className="headline-md">Conversaciones Recientes</h3>
              <Link to="/crm" className="label-sm text-[var(--color-primary)] flex items-center gap-1 hover:underline">
                Ver todas <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="glass-card rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="divide-y divide-[var(--color-outline-variant)]">
                {recentConversations.map((conv) => {
                  const badge = getStatusBadge(conv.status)
                  return (
                    <div 
                      key={conv.name}
                      className="flex items-center gap-4 p-4 hover:bg-[var(--color-surface-container-low)] transition-colors cursor-pointer"
                      onClick={() => window.location.href = '/crm'}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary-fixed-dim)] to-[var(--color-primary)] flex items-center justify-center text-white font-semibold text-sm">
                        {conv.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="body-md font-medium truncate">{conv.name}</p>
                        <p className="label-sm truncate">{conv.event}</p>
                      </div>
                      <div className="text-right">
                        <span className={`badge ${badge.class} mb-1`}>{badge.text}</span>
                        <p className="label-sm flex items-center gap-1 justify-end">
                          <Clock className="w-3 h-3" />
                          {conv.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="headline-md mb-5">Acciones Rápidas</h3>
            <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.15s' }}>
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.href}
                  className="glass-card rounded-2xl p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${action.color}15` }}
                  >
                    <action.icon className="w-6 h-6" style={{ color: action.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="body-md font-medium">{action.label}</p>
                    <p className="label-sm text-[var(--color-on-surface-variant)]">Ir al módulo</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--color-on-surface-variant)]" />
                </Link>
              ))}
            </div>

            {/* Upcoming Events */}
            <div className="mt-8">
              <h3 className="headline-md mb-5">Próximos Eventos</h3>
              <div className="glass-card rounded-2xl p-5 space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {[
                  { name: 'Casamiento - García', date: '28 Mar', days: 2 },
                  { name: 'Cumple 40 - López', date: '02 Abr', days: 7 },
                  { name: 'Corporate - Tech Corp', date: '05 Abr', days: 10 },
                ].map((event) => (
                  <div key={event.name} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[var(--color-primary-container)] flex flex-col items-center justify-center">
                      <span className="text-xs font-medium text-[var(--color-on-primary-container)]">{event.date.split(' ')[0]}</span>
                      <span className="text-lg font-bold text-[var(--color-on-primary-container)] leading-none">{event.date.split(' ')[1]}</span>
                    </div>
                    <div className="flex-1">
                      <p className="body-md font-medium">{event.name}</p>
                      <p className="label-sm text-[var(--color-on-surface-variant)]">En {event.days} días</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
