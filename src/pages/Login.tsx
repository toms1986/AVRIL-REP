import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight, Eye, EyeOff } from 'lucide-react'

const PIN = '1986'

export default function Login() {
  const navigate = useNavigate()
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === PIN) {
      navigate('/dashboard')
    } else {
      setError(true)
      setPin('')
      setTimeout(() => setError(false), 1000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pb-24 md:pb-4">
      <div className="w-full max-w-sm">
        {/* Logo & Branding */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl gradient-champagne mb-6 shadow-xl">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display text-4xl font-extrabold text-[var(--color-primary)] mb-1">AVRIL</h1>
          <p className="label-sm tracking-widest uppercase text-[var(--color-on-surface-variant)]">Sistema Operativo de Eventos</p>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-3xl p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <h2 className="font-display text-xl font-bold mb-2 text-center">Ingresar al sistema</h2>
          <p className="body-md text-[var(--color-on-surface-variant)] mb-8 text-center">
            Completá tu PIN de acceso
          </p>

          <form onSubmit={handleSubmit}>
            {/* PIN Input */}
            <div className="flex justify-center gap-4 mb-8">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all ${
                    error
                      ? 'bg-red-100 border-2 border-red-400 text-red-600'
                      : pin.length > i
                      ? 'gradient-champagne text-white'
                      : 'glass-input border-2 border-[var(--color-outline-variant)]'
                  }`}
                >
                  {pin.length > i ? (showPin ? pin[i] : '•') : ''}
                </div>
              ))}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'del'].map((key, i) => (
                <button
                  key={i}
                  type={key === 'del' ? 'button' : 'button'}
                  onClick={() => {
                    if (key === 'del') {
                      setPin(pin.slice(0, -1))
                    } else if (key !== null && pin.length < 4) {
                      const newPin = pin + key
                      setPin(newPin)
                      if (newPin.length === 4) {
                        setTimeout(() => {
                          if (newPin === PIN) {
                            navigate('/dashboard')
                          } else {
                            setError(true)
                            setPin('')
                            setTimeout(() => setError(false), 1000)
                          }
                        }, 200)
                      }
                    }
                  }}
                  className={`h-14 rounded-2xl text-lg font-semibold transition-all active:scale-95 ${
                    key === null
                      ? 'invisible'
                      : key === 'del'
                      ? 'bg-[var(--color-surface-container-low)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-high)]'
                      : 'bg-[var(--color-surface-container-low)] hover:bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)]'
                  }`}
                >
                  {key === 'del' ? '⌫' : key}
                </button>
              ))}
            </div>

            {/* Show/Hide PIN */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="label-sm text-[var(--color-on-surface-variant)] flex items-center gap-1 hover:text-[var(--color-primary)] transition-colors"
              >
                {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPin ? 'Ocultar' : 'Mostrar'} PIN
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary w-full justify-center py-4 text-base"
            >
              Ingresar
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="label-sm text-center text-[var(--color-on-surface-variant)] mt-6">
            PIN de demo: <span className="font-semibold text-[var(--color-primary)]">1986</span>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 label-sm text-[var(--color-on-surface-variant)] animate-fade-in" style={{ animationDelay: '0.2s' }}>
          ¿Olvidaste tu PIN? Contactá al administrador
        </p>
      </div>
    </div>
  )
}
