import { useState, useRef, useEffect } from 'react'
import { Send, Phone, Mail, MapPin, Paperclip, ImageIcon, Smile, MoreHorizontal, Sparkles, ChevronLeft } from 'lucide-react'

const conversations = [
  { id: '1', name: 'Ana Lucía Velt', avatar: 'AV', last: 'Do you have availability for April 19?', time: '2:07 PM', unread: 1, event: 'Wedding', online: true },
  { id: '2', name: 'Micaela Gutiérrez', avatar: 'MG', last: 'Perfect, thank you!', time: '1:34 PM', unread: 0, event: 'Bachelorette', online: false },
  { id: '3', name: 'Carlos Ríos', avatar: 'CR', last: 'What services are included?', time: '12:50 PM', unread: 0, event: 'Corporate', online: true },
  { id: '4', name: 'Sofía Martínez', avatar: 'SM', last: 'Is parking available?', time: 'Yesterday', unread: 2, event: 'Wedding', online: false },
  { id: '5', name: 'Juan Pérez', avatar: 'JP', last: 'Interested in booking', time: 'Yesterday', unread: 0, event: 'Birthday', online: true },
]

const messagesInitial: Record<string, Array<{from: 'them' | 'me' | 'ai'; text: string; time: string}>> = {
  '1': [
    { from: 'them', text: 'Hello! Do you have availability for April 19?', time: '2:05 PM' },
    { from: 'ai', text: 'Good afternoon! Let me check our calendar for April 19. What type of event are you planning?', time: '2:05 PM' },
    { from: 'them', text: 'It\'s a wedding reception. We\'re expecting about 120 guests.', time: '2:07 PM' },
  ],
}

const quickReplies = ['Check availability', 'Send brochure', 'Share pricing', 'Schedule tour']

export default function Chatbot() {
  const [selected, setSelected] = useState(conversations[0])
  const [messages, setMessages] = useState(messagesInitial['1'])
  const [input, setInput] = useState('')
  const [, setMobileShow] = useState<'list' | 'chat'>('list')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(m => [...m, { from: 'me', text: input, time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) }])
    setInput('')
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#f5f4f0' }}>
      {/* Col 1: Conversation list */}
      <div className="w-72 flex-shrink-0 flex flex-col"
        style={{ background: '#fff', borderRight: '1px solid rgba(0,0,0,0.06)' }}>
        <div className="p-4">
          <h2 className="font-display text-xl font-bold mb-4" style={{ color: '#1a1a1a' }}>Chats</h2>
          {/* Search */}
          <div className="relative mb-3">
            <input type="text" placeholder="Search conversations..."
              className="w-full rounded-2xl py-2.5 pl-10 pr-4 text-sm"
              style={{ background: '#f5f4f0', border: 'none', color: '#1a1a1a', outline: 'none' }} />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          {/* Filter tabs */}
          <div className="flex gap-1 p-1 rounded-2xl"
            style={{ background: '#f5f4f0' }}>
            {['All', 'Open', 'Pending'].map((f, i) => (
              <button key={f} className="flex-1 py-1.5 rounded-xl text-xs font-semibold transition-all"
                style={i === 0 ? { background: '#fff', color: '#1a1a1a', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' } : { color: '#888' }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => { setSelected(c); setMobileShow('chat') }}
              className="w-full px-4 py-3 text-left transition-all"
              style={{
                background: selected.id === c.id ? 'rgba(201,148,31,0.06)' : 'transparent',
                borderBottom: '1px solid rgba(0,0,0,0.04)',
              }}>
              <div className="flex items-center gap-3">
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: 'linear-gradient(135deg, #775a19, #c9941f)' }}>
                    {c.avatar}
                  </div>
                  {c.online && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-semibold truncate" style={{ color: '#1a1a1a' }}>{c.name}</span>
                    <span className="text-xs ml-2 flex-shrink-0" style={{ color: '#999' }}>{c.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: 'rgba(119,90,25,0.1)', color: '#775a19' }}>{c.event}</span>
                    <p className="text-xs truncate" style={{ color: '#888' }}>{c.last}</p>
                  </div>
                </div>
                {c.unread > 0 && (
                  <span className="ml-2 w-5 h-5 rounded-full text-[10px] font-bold text-white flex items-center justify-center flex-shrink-0"
                    style={{ background: '#775a19' }}>{c.unread}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Col 2: Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="px-6 py-4 flex items-center gap-4"
          style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <button onClick={() => setMobileShow('list')} className="hidden md:flex w-9 h-9 rounded-full items-center justify-center" style={{ color: '#666' }}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #775a19, #c9941f)' }}>
            {selected.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm" style={{ color: '#1a1a1a' }}>{selected.name}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: '#888' }}>{selected.event}</span>
              {selected.online && <span className="text-xs" style={{ color: '#22c55e' }}>● Online</span>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.04)', color: '#666' }}>
              <Phone className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.04)', color: '#666' }}>
              <Mail className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.04)', color: '#999' }}>
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {/* AI indicator */}
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#c9941f' }} />
            <span className="text-xs font-semibold" style={{ color: '#775a19' }}>AI Assistant</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />
          </div>

          {messages.map((msg, i) => {
            const isMe = msg.from === 'me'
            const isAI = msg.from === 'ai'
            return (
              <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'} gap-2`}>
                {!isMe && (
                  <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold mt-1"
                    style={{ background: isAI ? 'linear-gradient(135deg, #775a19, #c9941f)' : 'rgba(0,0,0,0.2)' }}>
                    {isAI ? <Sparkles className="w-3.5 h-3.5" /> : selected.avatar[0]}
                  </div>
                )}
                <div className={`max-w-[68%] ${isMe ? 'order-1' : ''}`}>
                  <div className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
                    style={
                      isMe
                        ? { background: 'linear-gradient(135deg, #775a19, #c9941f)', color: '#fff', borderRadius: '18px 18px 4px 18px' }
                        : isAI
                        ? { background: '#fff', color: '#1a1a1a', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '18px 18px 18px 4px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }
                        : { background: 'rgba(0,0,0,0.04)', color: '#1a1a1a', borderRadius: '18px 18px 18px 4px' }
                    }>
                    {msg.text}
                  </div>
                  <div className={`text-xs mt-1 px-1 ${isMe ? 'text-right' : 'text-left'}`} style={{ color: '#999' }}>
                    {msg.time}
                  </div>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick replies */}
        <div className="px-6 py-2 flex gap-2 flex-wrap">
          {quickReplies.map((r) => (
            <button
              key={r}
              onClick={() => setMessages(m => [...m, { from: 'me', text: r, time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }) }])}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105"
              style={{ background: 'rgba(119,90,25,0.08)', color: '#775a19', border: '1px solid rgba(119,90,25,0.15)' }}>
              {r}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-6 py-4"
          style={{ background: '#fff', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex items-end gap-3">
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ color: '#999' }}>
                <Paperclip className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ color: '#999' }}>
                <ImageIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Write a message..."
                className="w-full px-4 py-3 pr-10 rounded-2xl text-sm"
                style={{ background: '#f5f4f0', border: 'none', color: '#1a1a1a', outline: 'none' }}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#999' }}>
                <Smile className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleSend}
              className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all active:scale-95"
              style={{
                background: input.trim() ? 'linear-gradient(135deg, #775a19, #c9941f)' : 'rgba(0,0,0,0.06)',
                color: input.trim() ? '#fff' : '#999',
              }}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Col 3: Context panel */}
      <div className="w-72 flex-shrink-0 p-4 overflow-y-auto hidden lg:block"
        style={{ borderLeft: '1px solid rgba(0,0,0,0.04)' }}>
        {/* Client info */}
        <div className="rounded-2xl p-4 mb-4"
          style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ background: 'linear-gradient(135deg, #775a19, #c9941f)' }}>
              {selected.avatar}
            </div>
            <div>
              <div className="font-semibold text-sm" style={{ color: '#1a1a1a' }}>{selected.name}</div>
              <div className="text-xs" style={{ color: '#888' }}>{selected.event}</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs" style={{ color: '#888' }}>
              <Mail className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{selected.name.toLowerCase().replace(' ', '.')}@email.com</span>
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ color: '#888' }}>
              <Phone className="w-3.5 h-3.5 flex-shrink-0" />
              <span>+54 11 {Math.floor(Math.random() * 9000 + 1000)}-{Math.floor(Math.random() * 9000 + 1000)}</span>
            </div>
            <div className="flex items-center gap-2 text-xs" style={{ color: '#888' }}>
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Buenos Aires, Argentina</span>
            </div>
          </div>
        </div>

        {/* Preferred event */}
        <div className="rounded-2xl p-4 mb-4"
          style={{ background: 'rgba(201,148,31,0.05)', border: '1px solid rgba(201,148,31,0.15)' }}>
          <h4 className="text-xs font-semibold mb-3" style={{ color: '#775a19' }}>Preferred event</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: '#666' }}>Type</span>
              <span className="font-semibold" style={{ color: '#1a1a1a' }}>{selected.event}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: '#666' }}>Guests</span>
              <span className="font-semibold" style={{ color: '#1a1a1a' }}>~120</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: '#666' }}>Budget</span>
              <span className="font-semibold" style={{ color: '#1a1a1a' }}>$150-200k</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span style={{ color: '#666' }}>Date</span>
              <span className="font-semibold" style={{ color: '#1a1a1a' }}>Flexible</span>
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="rounded-2xl p-4"
          style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4" style={{ color: '#c9941f' }} />
            <h4 className="text-xs font-semibold" style={{ color: '#1a1a1a' }}>AI Summary</h4>
          </div>
          <p className="text-xs leading-relaxed mb-3" style={{ color: '#666' }}>
            {selected.name} is planning a {selected.event.toLowerCase()} for ~120 guests in April. Budget is in the $150-200k range. They found us through a referral.
          </p>
          <div className="flex flex-wrap gap-1">
            {['🔥 Hot lead', '📅 Flexible date', '💰 Good budget'].map(t => (
              <span key={t} className="px-2 py-1 rounded-full text-xs"
                style={{ background: 'rgba(119,90,25,0.08)', color: '#775a19' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
