import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Sparkles, Bell, Search, ChevronLeft, 
  MessageCircle, FileText, Users, Calendar, Home
} from 'lucide-react'

interface LayoutProps {
  children: ReactNode
  title?: string
  subtitle?: string
  showBack?: boolean
  backTo?: string
}

const navItems = [
  { path: '/dashboard', label: 'Inicio', icon: Home },
  { path: '/crm', label: 'CRM', icon: MessageCircle },
  { path: '/quotes', label: 'Presupuestos', icon: FileText },
  { path: '/tables', label: 'Mesas', icon: Users },
  { path: '/portal', label: 'Portal', icon: Calendar },
]

export default function Layout({ children, title, subtitle, showBack, backTo }: LayoutProps) {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass sticky top-0 z-50 safe-area-top">
        <div className="container-main py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {showBack ? (
                <Link 
                  to={backTo || '/dashboard'} 
                  className="p-2.5 glass rounded-full hover:bg-[var(--color-surface-container-low)] transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Link>
              ) : (
                <div className="w-10 h-10 rounded-xl gradient-champagne flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              )}
              <div>
                {title ? (
                  <>
                    <h1 className="headline-md">{title}</h1>
                    {subtitle && <p className="label-sm">{subtitle}</p>}
                  </>
                ) : (
                  <>
                    <h1 className="font-display font-bold text-lg text-[var(--color-primary)]">Avril</h1>
                    <p className="label-sm">Sistema Operativo de Eventos</p>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              {currentPath !== '/' && (
                <>
                  <button className="p-2.5 glass rounded-full hover:bg-[var(--color-surface-container-low)] transition-colors hidden sm:block">
                    <Search className="w-5 h-5 text-[var(--color-on-surface-variant)]" />
                  </button>
                  <button className="relative p-2.5 glass rounded-full hover:bg-[var(--color-surface-container-low)] transition-colors">
                    <Bell className="w-5 h-5 text-[var(--color-on-surface-variant)]" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-error)] rounded-full" />
                  </button>
                  <div className="w-9 h-9 rounded-full gradient-champagne flex items-center justify-center text-white font-semibold text-sm">
                    JA
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Bottom Navigation - Mobile */}
      {currentPath !== '/' && (
        <nav className="glass fixed bottom-0 left-0 right-0 safe-area-bottom md:hidden">
          <div className="flex justify-around py-2">
            {navItems.map((item) => {
              const isActive = currentPath === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors ${
                    isActive 
                      ? 'text-[var(--color-primary)] bg-[var(--color-primary-container)]' 
                      : 'text-[var(--color-on-surface-variant)]'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </div>
  )
}
