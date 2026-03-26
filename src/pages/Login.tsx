import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'

const PIN = '1986'

export default function Login() {
  const navigate = useNavigate()
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  const handleKey = (digit: string) => {
    if (error) setError(false)
    if (pin.length >= 4) return
    const newPin = pin + digit
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

  const handleDelete = () => {
    setPin(pin.slice(0, -1))
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Background atmosphere logo - subtle watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="text-[20rem] font-display font-black text-[#775a19] opacity-[0.03] select-none leading-none">
          AVRIL
        </div>
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Logo & Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-5"
            style={{ background: 'radial-gradient(circle at 40% 40%, #f8cf83, #775a19)' }}>
            <Sparkles className="w-9 h-9 text-white" />
          </div>
          <h1 className="font-display text-5xl font-extrabold mb-2 tracking-tighter"
            style={{ color: '#775a19' }}>
            AVRIL
          </h1>
          <p className="text-xs tracking-[0.25em] uppercase" style={{ color: '#6f7671' }}>
            Sistema Operativo de Eventos
          </p>
        </div>

        {/* Login Card - Glassmorphism */}
        <div className="rounded-3xl p-8"
          style={{
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(12px) saturate(120%)',
            WebkitBackdropFilter: 'blur(12px) saturate(120%)',
            border: '1px solid rgba(119,90,25,0.12)',
          }}>
          <h2 className="font-display text-2xl font-bold mb-1 text-center"
            style={{ color: '#2d3435' }}>
            Bienvenido
          </h2>
          <p className="text-sm text-center mb-8" style={{ color: '#6f7671' }}>
            Ingresá tu PIN de acceso
          </p>

          {/* PIN Dots */}
          <div className="flex justify-center gap-4 mb-10">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold transition-all"
                style={
                  error
                    ? { background: '#fee2e2', border: '2px solid #ef4444', color: '#ef4444' }
                    : pin.length > i
                    ? { background: 'linear-gradient(135deg, #775a19, #c9941f)', color: '#fff', boxShadow: '0 4px 16px rgba(119,90,25,0.3)' }
                    : { background: 'rgba(255,255,255,0.8)', border: '1.5px solid rgba(119,90,25,0.15)' }
                }
              >
                {pin.length > i ? '•' : ''}
              </div>
            ))}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map((key, i) => (
              <button
                key={i}
                onClick={() => key === '⌫' ? handleDelete() : key !== '' && handleKey(String(key))}
                className="h-14 rounded-2xl text-lg font-semibold transition-all active:scale-95"
                style={
                  key === ''
                    ? { visibility: 'hidden' }
                    : key === '⌫'
                    ? { background: 'rgba(255,255,255,0.5)', color: '#6f7671', border: '1px solid rgba(119,90,25,0.1)' }
                    : { background: 'rgba(255,255,255,0.7)', color: '#2d3435', border: '1px solid rgba(119,90,25,0.1)' }
                }
              >
                {key}
              </button>
            ))}
          </div>

          {/* Submit */}
          <button
            onClick={() => {
              if (pin === PIN) navigate('/dashboard')
              else { setError(true); setPin(''); setTimeout(() => setError(false), 1000) }
            }}
            className="w-full py-4 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, #775a19 0%, #c9941f 100%)',
              boxShadow: '0 4px 20px rgba(119,90,25,0.25)',
            }}
          >
            Ingresar
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-xs text-center mt-6" style={{ color: '#6f7671' }}>
            PIN de demo: <span className="font-semibold" style={{ color: '#775a19' }}>1986</span>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-xs" style={{ color: '#6f7671' }}>
          ¿Olvidaste tu PIN? Contactá al administrador
        </p>
      </div>
    </div>
  )
}
