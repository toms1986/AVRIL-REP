import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Mail, Lock, ArrowRight, Users, Calendar, MessageCircle } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pb-24 md:pb-4">
      <div className="w-full max-w-md">
        {/* Logo & Branding */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-champagne mb-6 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display display-lg text-[var(--color-primary)] mb-2">Avril</h1>
          <p className="label-sm tracking-widest uppercase">Sistema Operativo de Eventos</p>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-3xl p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="headline-md mb-2">Bienvenido de vuelta</h2>
          <p className="body-md text-[var(--color-on-surface-variant)] mb-8">
            Ingresá tus credenciales para acceder al sistema
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="label-sm mb-2 block">Correo electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-on-surface-variant)]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input rounded-full py-3.5 pl-12 pr-4 body-md"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="label-sm mb-2 block">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-on-surface-variant)]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full glass-input rounded-full py-3.5 pl-12 pr-4 body-md"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center py-4"
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Ingresar
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button className="label-sm text-[var(--color-primary)] hover:underline">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-3 gap-3 mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="glass rounded-2xl p-4 text-center">
            <MessageCircle className="w-6 h-6 text-[var(--color-primary)] mx-auto mb-2" />
            <p className="label-sm">Chatbot IA</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <Calendar className="w-6 h-6 text-[var(--color-primary)] mx-auto mb-2" />
            <p className="label-sm">Presupuestos</p>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <Users className="w-6 h-6 text-[var(--color-primary)] mx-auto mb-2" />
            <p className="label-sm">Armado Mesas</p>
          </div>
        </div>
      </div>
    </div>
  )
}
