import { useState } from 'react'
import { 
  Calendar, Users, FileText,
  CheckCircle2, Clock, MapPin, Phone, Mail,
  Send, Bot, User, Camera, Music, Palette, Truck, Flower2, ChefHat
} from 'lucide-react'
import Layout from '../components/Layout'

interface FAQMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const faqInitial: FAQMessage[] = [
  { id: '1', role: 'assistant', content: '¡Hola! 👋 Soy tu asistente virtual de Avril. Puedo ayudarte con cualquier consulta sobre tu evento.\n\n¿Qué necesitás saber?', timestamp: new Date() },
]

const quickQuestions = [
  '¿Cuál es el horario del evento?',
  '¿Qué incluye el catering?',
  '¿Podemos traer nuestro propio DJ?',
  '¿Hay estacionamiento?',
]

const responses: Record<string, string> = {
  '¿Cuál es el horario del evento?': '📅 El evento tiene una duración de 8 horas, incluyendo tiempo de decoración. El salón se abre a las 18:00 y la fiesta puede extenderse hasta las 3:00 AM.\n\n¿Necesitás algo más?',
  '¿Qué incluye el catering?': '🍽️ El menú premium incluye:\n• Cocktail de bienvenida\n• Entrada\n• Plato principal (2 opciones + vegetariano)\n• Postre\n• Mesa de dulces y frutas\n• Barra libre con tragos, vinos y bebidas sin alcohol\n\n¿Querés ver el menú completo?',
  '¿Podemos traer nuestro propio DJ?': '🎵 Por políticas del salón, el servicio de DJ está incluido en el paquete. Contamos con DJs profesionales que conocen perfectamente el espacio.\n\n¿Querés agendar una reunión con el equipo de música?',
  '¿Hay estacionamiento?': '🚗 ¡Sí! Contamos con estacionamiento privado gratuito para 80 vehículos, con servicio de valet parking disponible.',
}

export default function Portal() {
  const [messages, setMessages] = useState<FAQMessage[]>(faqInitial)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (question?: string) => {
    const text = question || inputValue
    if (!text.trim()) return

    const userMessage: FAQMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    if (!question) setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const response = responses[text] || 'Gracias por tu consulta. Un miembro de nuestro equipo se pondrá en contacto con vos a la brevedad para darte esa información.\n\n¿Hay algo más en lo que pueda ayudarte? 💛'
      
      const aiMessage: FAQMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <Layout title="Portal del Cliente" subtitle="María García & Carlos Rodríguez">
      <div className="container-main py-8 pb-24 md:pb-8">
        {/* Event Overview Card */}
        <div className="glass-card rounded-3xl p-8 mb-8 animate-fade-in overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--color-primary-fixed-dim)] to-transparent rounded-full opacity-20 blur-3xl" />
          
          <div className="relative">
            <div className="flex items-start justify-between flex-wrap gap-6">
              <div>
                <p className="label-sm text-[var(--color-on-surface-variant)] mb-1">EVENTO</p>
                <h2 className="font-display text-3xl font-bold text-[var(--color-primary)] mb-2">Casamiento</h2>
                <p className="headline-md">María García & Carlos Rodríguez</p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { icon: Calendar, label: 'Fecha', value: '15 Nov 2026' },
                  { icon: Users, label: 'Invitados', value: '180' },
                  { icon: Clock, label: 'Horario', value: '18:00 - 03:00' },
                  { icon: MapPin, label: 'Ubicación', value: 'Salón Principal' },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary-container)] flex items-center justify-center mx-auto mb-2">
                      <item.icon className="w-7 h-7 text-[var(--color-primary)]" />
                    </div>
                    <p className="body-md font-medium">{item.value}</p>
                    <p className="label-sm text-[var(--color-on-surface-variant)]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="mt-8 pt-6 border-t border-[var(--color-outline-variant)]">
              <div className="flex items-center justify-between mb-2">
                <p className="label-sm">Progreso de planificación</p>
                <p className="label-sm font-medium">65% completado</p>
              </div>
              <div className="h-2 bg-[var(--color-surface-container-high)] rounded-full overflow-hidden">
                <div className="h-full w-[65%] gradient-champagne rounded-full" />
              </div>
              <div className="flex justify-between mt-3">
                {['Contrato', 'Depósito', 'Menú', 'Mesa', 'Detalles'].map((step, i) => (
                  <div key={step} className="text-center">
                    <div className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center ${
                      i < 3 ? 'gradient-champagne text-white' : 
                      i === 3 ? 'bg-[var(--color-primary-container)] text-[var(--color-primary)]' :
                      'bg-[var(--color-surface-container-high)] text-[var(--color-on-surface-variant)]'
                    }`}>
                      {i < 3 ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-medium">{i + 1}</span>}
                    </div>
                    <p className="label-sm">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Chat */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="p-6 border-b border-[var(--color-outline-variant)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-champagne flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="body-md font-medium">Asistente Virtual</h3>
                    <p className="label-sm text-[var(--color-success)]">● En línea</p>
                  </div>
                </div>
              </div>

              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full gradient-champagne flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-[var(--color-surface-container-high)] flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-[var(--color-on-surface-variant)]" />
                      </div>
                    )}
                    <div className={`max-w-[80%] ${message.role === 'user' ? 'items-end' : ''} flex flex-col gap-1`}>
                      <div className={message.role === 'user' ? 'chat-bubble-outgoing' : 'chat-bubble-incoming'}>
                        <p className="body-md whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <span className="label-sm text-[var(--color-on-surface-variant)]">
                        {message.timestamp.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full gradient-champagne flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="chat-bubble-incoming">
                      <div className="flex gap-1 py-1 px-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-on-surface-variant)] animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-[var(--color-on-surface-variant)] animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-[var(--color-on-surface-variant)] animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 pb-4">
                <p className="label-sm text-[var(--color-on-surface-variant)] mb-2">Consultas rápidas:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSendMessage(q)}
                      className="text-xs py-1.5 px-3 rounded-full bg-[var(--color-surface-container-low)] hover:bg-[var(--color-surface-container-high)] transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-[var(--color-outline-variant)]">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribí tu consulta..."
                    className="flex-1 glass-input rounded-full py-3.5 px-5 body-md"
                  />
                  <button 
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim()}
                    className="btn-primary p-3.5 rounded-full disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Actions */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in">
              <h3 className="headline-md mb-4">Acciones Pendientes</h3>
              <div className="space-y-3">
                {[
                  { icon: Users, label: 'Confirmar lista de invitados', date: '15 Oct 2026', urgent: true },
                  { icon: FileText, label: 'Firmar addendum servicios', date: '01 Ago 2026', urgent: false },
                  { icon: ChefHat, label: 'Confirmar menú final', date: '01 Oct 2026', urgent: false },
                  { icon: Palette, label: 'Aprobar decoración', date: '15 Sep 2026', urgent: false },
                ].map((action, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-container-low)]">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      action.urgent ? 'bg-[rgba(239,68,68,0.1)]' : 'bg-[var(--color-primary-container)]'
                    }`}>
                      <action.icon className={`w-5 h-5 ${action.urgent ? 'text-[var(--color-error)]' : 'text-[var(--color-primary)]'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="body-md font-medium text-sm">{action.label}</p>
                      <p className="label-sm text-[var(--color-on-surface-variant)]">{action.date}</p>
                    </div>
                    {action.urgent && (
                      <span className="badge bg-red-100 text-red-700 text-xs py-1 px-2">Urgente</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Services Status */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in">
              <h3 className="headline-md mb-4">Servicios Contratados</h3>
              <div className="space-y-3">
                {[
                  { icon: Flower2, label: 'Decoración floral', status: 'Confirmado', statusClass: 'badge-success' },
                  { icon: Music, label: 'DJ & Audio', status: 'Confirmado', statusClass: 'badge-success' },
                  { icon: Camera, label: 'Fotografía', status: 'Confirmado', statusClass: 'badge-success' },
                  { icon: Truck, label: 'Transportes', status: 'Pendiente', statusClass: 'badge-warning' },
                  { icon: ChefHat, label: 'Catering', status: 'En revisión', statusClass: 'badge-pending' },
                ].map((service, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-surface-container-low)] flex items-center justify-center">
                      <service.icon className="w-4 h-4 text-[var(--color-on-surface-variant)]" />
                    </div>
                    <span className="flex-1 body-md text-sm">{service.label}</span>
                    <span className={`badge text-xs ${service.statusClass}`}>
                      {service.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in">
              <h3 className="headline-md mb-4">Contacto del Salón</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-container-low)] flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="label-sm">Teléfono</p>
                    <p className="body-md">+54 11 5555 0000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-container-low)] flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="label-sm">Email</p>
                    <p className="body-md">eventos@avril.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
