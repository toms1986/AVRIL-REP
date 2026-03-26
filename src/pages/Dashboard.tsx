import { useState } from 'react'
import { 
  MessageCircle, User,
  Sparkles, Bell, Phone, Video, Paperclip,
  MoreVertical, Search, Send, Bot, User as UserIcon, ChevronLeft,
} from 'lucide-react'

const tabs = [
  { id: 'chats', label: 'Chats', icon: MessageCircle },
  { id: 'perfil', label: 'Perfil', icon: User },
]

const conversations = [
  { id: '1', name: 'Micaela Gutiérrez', last: '¿Tiene disponibilidad para...', time: '10:32', unread: 2, avatar: 'MG', event: 'Casamiento' },
  { id: '2', name: 'Lorena Martínez', last: 'Perfecto, muchas gracias', time: '09:15', unread: 0, avatar: 'LM', event: 'Cumple 40' },
  { id: '3', name: 'Cami Rodríguez', last: '¿Podemos ir a ver el salón?', time: 'Ayer', unread: 0, avatar: 'CR', event: 'Baby Shower' },
  { id: '4', name: 'Juan Pérez', last: 'Necesitamos agregar 20 personas', time: 'Ayer', unread: 0, avatar: 'JP', event: 'Corporativo' },
  { id: '5', name: 'Ana López', last: '¡El evento fue hermoso!', time: 'Lun', unread: 0, avatar: 'AL', event: 'Boda de Oro' },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('chats')
  const [showChat, setShowChat] = useState(false)
  const [messages, setMessages] = useState([
    { id: '1', role: 'user', content: 'Hola! Quiero consultar por disponibilidad para un casamiento en noviembre', time: '10:30' },
    { id: '2', role: 'assistant', content: '¡Hola! 👋 Qué alegría que nos contactes. Contame, ¿para qué fecha sería el casamiento y cuántos invitados estiman?', time: '10:31' },
    { id: '3', role: 'user', content: 'Sería para el 15 de noviembre, estamos pensando en unas 180 personas', time: '10:32' },
    { id: '4', role: 'assistant', content: '¡Qué hermosa fecha! El 15 de noviembre tenemos disponible nuestro Salón Principal que tiene capacidad para hasta 250 personas. ¿Te gustaría que te envíe un presupuesto personalizado?', time: '10:33' },
  ])
  const [inputValue, setInputValue] = useState('')
  const [selectedConv, setSelectedConv] = useState<typeof conversations[0] | null>(null)

  const handleSend = () => {
    if (!inputValue.trim()) return
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: inputValue, time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) }])
    setInputValue('')
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Gracias por la información. Un momento mientras preparo el presupuesto personalizado para vos. 💛', time: new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) }])
    }, 1500)
  }

  const openConversation = (conv: typeof conversations[0]) => {
    setSelectedConv(conv)
    setShowChat(true)
  }

  if (showChat && selectedConv) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
        {/* Chat Header */}
        <header className="glass sticky top-0 z-50" style={{ borderBottom: '1px solid var(--color-outline-variant)' }}>
          <div className="flex items-center gap-3 px-4 py-3">
            <button onClick={() => setShowChat(false)} className="p-2 rounded-full hover:bg-[var(--color-surface-container-low)] transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 rounded-full gradient-champagne flex items-center justify-center text-white font-semibold text-sm">
              {selectedConv.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="body-md font-medium truncate">{selectedConv.name}</p>
              <p className="label-sm text-[var(--color-on-surface-variant)]">{selectedConv.event}</p>
            </div>
            <button className="p-2 rounded-full hover:bg-[var(--color-surface-container-low)]">
              <Phone className="w-5 h-5 text-[var(--color-on-surface-variant)]" />
            </button>
            <button className="p-2 rounded-full hover:bg-[var(--color-surface-container-low)]">
              <Video className="w-5 h-5 text-[var(--color-on-surface-variant)]" />
            </button>
            <button className="p-2 rounded-full hover:bg-[var(--color-surface-container-low)]">
              <MoreVertical className="w-5 h-5 text-[var(--color-on-surface-variant)]" />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-2 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full gradient-champagne flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[var(--color-surface-container-high)] flex items-center justify-center flex-shrink-0">
                  <UserIcon className="w-4 h-4 text-[var(--color-on-surface-variant)]" />
                </div>
              )}
              <div className={`max-w-[75%] ${msg.role === 'user' ? 'items-end' : ''} flex flex-col gap-1`}>
                <div className={msg.role === 'user' ? 'chat-bubble-outgoing' : 'chat-bubble-incoming'}>
                  <p className="body-md whitespace-pre-wrap">{msg.content}</p>
                </div>
                <span className="label-sm text-[var(--color-on-surface-variant)]">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 glass fixed bottom-0 left-0 right-0" style={{ borderTop: '1px solid var(--color-outline-variant)' }}>
          <div className="flex items-center gap-3 max-w-3xl mx-auto">
            <button className="p-2 text-[var(--color-on-surface-variant)]">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribí un mensaje..."
              className="flex-1 glass-input rounded-full py-3 px-4 body-md"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-10 h-10 rounded-full gradient-champagne flex items-center justify-center disabled:opacity-50"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--color-background)' }}>
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl gradient-champagne flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-extrabold text-[var(--color-primary)]">AVRIL</h1>
              <p className="label-sm text-[var(--color-on-surface-variant)]">Panel de Control</p>
            </div>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6 text-[var(--color-on-surface-variant)]" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[var(--color-error)] flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">2</span>
            </span>
          </div>
        </div>

        {/* User greeting */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary-fixed-dim)] to-[var(--color-primary)] flex items-center justify-center text-white font-bold text-lg">
            JA
          </div>
          <div>
            <p className="font-display text-lg font-bold">¡Buen día, Juan!</p>
            <p className="label-sm text-[var(--color-on-surface-variant)]">4 consultas nuevas</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Eventos', value: '23', sub: 'totales' },
            { label: 'Consultas', value: '4', sub: 'nuevas' },
            { label: 'Convers', value: '12', sub: 'activas' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl p-3 text-center" style={{ background: 'var(--color-surface-container-low)' }}>
              <p className="font-display text-2xl font-extrabold text-[var(--color-primary)]">{stat.value}</p>
              <p className="label-sm font-medium text-[var(--color-on-surface)]">{stat.label}</p>
              <p className="label-sm text-[var(--color-on-surface-variant)]">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-on-surface-variant)]" />
          <input
            type="text"
            placeholder="Buscar conversación..."
            className="w-full rounded-full py-2.5 pl-10 pr-4 body-md"
            style={{ background: 'var(--color-surface-container-low)', border: '1px solid var(--color-outline-variant)' }}
          />
        </div>
      </header>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto px-4">
        <p className="label-sm font-medium text-[var(--color-on-surface-variant)] mb-3 px-1">CONVERSACIONES</p>
        <div className="space-y-2">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => openConversation(conv)}
              className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all hover:scale-[1.01]"
              style={{ background: 'var(--color-surface)' }}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary-fixed-dim)] to-[var(--color-primary)] flex items-center justify-center text-white font-semibold text-sm">
                  {conv.avatar}
                </div>
                {conv.unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                    <span className="text-white text-[10px] font-bold">{conv.unread}</span>
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="body-md font-semibold truncate">{conv.name}</p>
                  <span className="label-sm text-[var(--color-on-surface-variant)]">{conv.time}</span>
                </div>
                <p className="label-sm text-[var(--color-on-surface-variant)] truncate">{conv.last}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="glass safe-area-bottom" style={{ borderTop: '1px solid var(--color-outline-variant)' }}>
        <div className="flex justify-around py-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors ${
                  isActive
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-on-surface-variant)]'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                  isActive ? 'gradient-champagne' : ''
                }`}>
                  <tab.icon className={`w-6 h-6 ${isActive ? 'text-white' : ''}`} />
                </div>
                <span className="text-xs font-semibold">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
