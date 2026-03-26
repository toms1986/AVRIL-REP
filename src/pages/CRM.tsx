import { useState, useRef, useEffect } from 'react'
import { 
  Search, MoreVertical, Phone, Sparkles, Bot, User, 
  Calendar, Users, CheckCircle2, MessageCircle
} from 'lucide-react'
import Layout from '../components/Layout'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Lead {
  id: string
  name: string
  avatar: string
  event: string
  source: 'whatsapp' | 'instagram' | 'facebook' | 'web'
  status: 'new' | 'qualifying' | 'qualified' | 'quote_sent' | 'approved'
  phone: string
  date?: string
  guests?: number
  budget?: string
  notes: string
}

const leads: Lead[] = [
  { id: '1', name: 'Micaela Gutiérrez', avatar: 'MG', event: 'Casamiento', source: 'whatsapp', status: 'new', phone: '+54 11 5555 1234', date: '15 Nov 2026', guests: 180, budget: '$50.000 - $80.000', notes: 'Primera consulta, todavía no définit' },
  { id: '2', name: 'Lorena Martínez', avatar: 'LM', event: 'Cumpleaños 40', source: 'instagram', status: 'qualifying', phone: '+54 11 5555 2345', date: '22 Ago 2026', guests: 120, budget: '$30.000 - $50.000', notes: 'Interesada en salón principal' },
  { id: '3', name: 'Camila Rodríguez', avatar: 'CR', event: 'Baby Shower', source: 'facebook', status: 'qualified', phone: '+54 11 5555 3456', date: '05 Jul 2026', guests: 40, budget: '$15.000 - $25.000', notes: 'Confirmó fecha, esperando presupuesto' },
  { id: '4', name: 'Juan Pérez', avatar: 'JP', event: 'Corporate Event', source: 'web', status: 'quote_sent', phone: '+54 11 5555 4567', date: '10 Jun 2026', guests: 200, budget: '$80.000+', notes: 'Empresa de tecnología, presupuesto enviado' },
  { id: '5', name: 'Ana López', avatar: 'AL', event: 'Boda de Oro', source: 'whatsapp', status: 'approved', phone: '+54 11 5555 5678', date: '20 Dic 2026', guests: 100, budget: '$60.000', notes: '¡Contrato firmado! Adelanto pagado' },
]

const initialMessages: Message[] = [
  { id: '1', role: 'assistant', content: '¡Hola! 👋 Soy el asistente de Avril. Voy a ayudarte a organizar tu evento.\n\n¿Me decís tu nombre y qué tipo de evento estás planeando?', timestamp: new Date() },
]

const sourceIcons: Record<string, string> = {
  whatsapp: '💬',
  instagram: '📷',
  facebook: '📘',
  web: '🌐',
}

const statusInfo: Record<string, { label: string; color: string; bg: string }> = {
  new: { label: 'Nuevo', color: 'var(--color-primary)', bg: 'var(--color-primary-container)' },
  qualifying: { label: 'En calificación', color: 'var(--color-warning)', bg: 'rgba(125,87,0,0.1)' },
  qualified: { label: 'Calificado', color: 'var(--color-success)', bg: 'rgba(30,122,74,0.1)' },
  quote_sent: { label: 'Presupuesto enviado', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  approved: { label: 'Aprobado', color: 'var(--color-success)', bg: 'rgba(30,122,74,0.1)' },
}

const aiResponses = [
  '¡Qué bueno! Los casamientos son nuestra especialidad 💍\n\n¿Ya tienen una fecha definida o todavía están evaluando opciones?',
  'Perfecto, el 15 de noviembre es una fecha hermosa 🌸\n\n¿Cúantos invitados estiman para la celebración?',
  '180 invitados es un evento hermoso. Tenemos dos salones que se adaptan perfecto a esa cantidad.\n\nNuestro **Salón Principal** tiene capacidad para hasta 250 personas con una terraza adicional.\n\n¿Querés que te envíe un presupuesto preliminar?',
  'Generando presupuesto personalizado...',
  'Gracias por la información. Un responsable del salón se pondrá en contacto con vos a la brevedad para ultimar los detalles. 💛',
]

export default function CRM() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(leads[0])
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const responseIndex = useRef(0)

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.event.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim() || !selectedLead) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    setTimeout(() => {
      const response = aiResponses[responseIndex.current % aiResponses.length]
      responseIndex.current++
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const selectLead = (lead: Lead) => {
    setSelectedLead(lead)
    responseIndex.current = 0
    setMessages([
      { id: '1', role: 'assistant', content: `¡Hola! 👋 Soy el asistente de Avril. Voy a ayudarte a organizar tu evento de ${lead.event}.\n\n¿Me contás un poco más sobre lo que están pensando?`, timestamp: new Date() }
    ])
  }

  return (
    <Layout title="CRM & Chatbot" subtitle="Conversaciones con clientes potenciales">
      <div className="flex h-[calc(100vh-180px)] md:h-[calc(100vh-140px)]">
        {/* Leads List - Desktop */}
        <aside className="hidden md:flex w-80 flex-col border-r border-[var(--color-outline-variant)] bg-[var(--color-surface)]">
          <div className="p-4 border-b border-[var(--color-outline-variant)]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-on-surface-variant)]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar lead..."
                className="w-full glass-input rounded-full py-2.5 pl-10 pr-4 body-md"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredLeads.map((lead) => {
              const status = statusInfo[lead.status]
              const isSelected = selectedLead?.id === lead.id
              return (
                <div
                  key={lead.id}
                  onClick={() => selectLead(lead)}
                  className={`p-4 cursor-pointer border-b border-[var(--color-outline-variant)] transition-colors ${
                    isSelected 
                      ? 'bg-[var(--color-surface-container-high)]' 
                      : 'hover:bg-[var(--color-surface-container-low)]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[var(--color-primary-fixed-dim)] to-[var(--color-primary)] flex items-center justify-center text-white font-semibold text-sm">
                        {lead.avatar}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 text-sm">{sourceIcons[lead.source]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="body-md font-medium truncate">{lead.name}</p>
                        <span 
                          className="badge text-xs"
                          style={{ color: status.color, backgroundColor: status.bg }}
                        >
                          {status.label}
                        </span>
                      </div>
                      <p className="label-sm truncate">{lead.event}</p>
                      <p className="label-sm text-[var(--color-on-surface-variant)] truncate mt-1">{lead.notes}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </aside>

        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-[var(--color-background)]">
          {selectedLead ? (
            <>
              {/* Chat Header */}
              <div className="glass border-b border-[var(--color-outline-variant)] p-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    {/* Mobile lead selector */}
                    <select 
                      value={selectedLead.id}
                      onChange={(e) => {
                        const lead = leads.find(l => l.id === e.target.value)
                        if (lead) selectLead(lead)
                      }}
                      className="md:hidden glass-input rounded-full py-2 px-3 body-md"
                    >
                      {leads.map(l => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                      ))}
                    </select>
                    
                    <div className="hidden md:flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary-fixed-dim)] to-[var(--color-primary)] flex items-center justify-center text-white font-semibold">
                        {selectedLead.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="body-md font-medium">{selectedLead.name}</p>
                          <span className="text-sm">{sourceIcons[selectedLead.source]}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="label-sm flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {selectedLead.date}
                          </span>
                          <span className="label-sm flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {selectedLead.guests} pax
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="btn-secondary py-2.5 px-4 flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      <span className="hidden sm:inline">Llamar</span>
                    </button>
                    <button className="btn-primary py-2.5 px-4 flex items-center gap-2 text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span className="hidden sm:inline">Presupuesto</span>
                    </button>
                    <button className="p-2.5 glass rounded-full hover:bg-[var(--color-surface-container-low)]">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 animate-slide-in ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
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
                    <div className={`flex flex-col gap-1 max-w-[70%] ${message.role === 'user' ? 'items-end' : ''}`}>
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
                  <div className="flex gap-3 animate-slide-in">
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
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-[var(--color-outline-variant)] glass">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribí un mensaje..."
                    className="flex-1 glass-input rounded-full py-3.5 px-5 body-md"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="btn-primary p-3.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <p className="label-sm text-[var(--color-on-surface-variant)]">
                    💡 IA calificando lead · Powered by OpenRouter
                  </p>
                  <button className="label-sm text-[var(--color-primary)] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Marcar como completado
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl gradient-champagne flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
                <p className="headline-md mb-2">Seleccioná un lead</p>
                <p className="body-md text-[var(--color-on-surface-variant)]">
                  Elegí una conversación de la lista para comenzar
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Lead Details Panel - Desktop */}
        {selectedLead && (
          <aside className="hidden lg:block w-80 border-l border-[var(--color-outline-variant)] bg-[var(--color-surface)] p-5 overflow-y-auto">
            <h3 className="headline-md mb-6">Detalles del Lead</h3>
            
            <div className="space-y-6">
              <div>
                <label className="label-sm mb-2 block">Estado</label>
                <div 
                  className="badge text-sm py-2 px-4"
                  style={{ 
                    color: statusInfo[selectedLead.status].color, 
                    backgroundColor: statusInfo[selectedLead.status].bg 
                  }}
                >
                  {statusInfo[selectedLead.status].label}
                </div>
              </div>

              <div>
                <label className="label-sm mb-2 block">Teléfono</label>
                <p className="body-md">{selectedLead.phone}</p>
              </div>

              <div>
                <label className="label-sm mb-2 block">Tipo de Evento</label>
                <p className="body-md">{selectedLead.event}</p>
              </div>

              <div>
                <label className="label-sm mb-2 block">Fecha Preferida</label>
                <p className="body-md flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[var(--color-primary)]" />
                  {selectedLead.date}
                </p>
              </div>

              <div>
                <label className="label-sm mb-2 block">Invitados</label>
                <p className="body-md flex items-center gap-2">
                  <Users className="w-4 h-4 text-[var(--color-primary)]" />
                  {selectedLead.guests} personas
                </p>
              </div>

              <div>
                <label className="label-sm mb-2 block">Presupuesto</label>
                <p className="body-md font-medium text-[var(--color-primary)]">{selectedLead.budget}</p>
              </div>

              <div>
                <label className="label-sm mb-2 block">Notas</label>
                <p className="body-md text-[var(--color-on-surface-variant)]">{selectedLead.notes}</p>
              </div>

              <div className="pt-4 border-t border-[var(--color-outline-variant)] space-y-3">
                <button className="btn-primary w-full justify-center">
                  <Sparkles className="w-4 h-4" />
                  Generar Presupuesto
                </button>
                <button className="btn-secondary w-full justify-center">
                  <Calendar className="w-4 h-4" />
                  Agendar Reunión
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </Layout>
  )
}
