import { useState } from 'react'
import { 
  Sparkles, FileText, Download, Send, Copy, Check, Plus, Trash2, Edit3,
  Calendar, Users, Clock, Image, Table
} from 'lucide-react'
import Layout from '../components/Layout'

interface QuoteItem {
  id: string
  category: string
  name: string
  unitPrice: number
  quantity: number
  total: number
}

interface Quote {
  id: string
  clientName: string
  clientEmail: string
  eventDate: string
  eventType: string
  guests: number
  validUntil: string
  subtotal: number
  iva: number
  total: number
  status: 'draft' | 'sent' | 'approved' | 'rejected'
  items: QuoteItem[]
  notes: string
}

const quoteItems: QuoteItem[] = [
  { id: '1', category: 'Salón', name: 'Salón Principal (hasta 250 personas)', unitPrice: 25000, quantity: 1, total: 25000 },
  { id: '2', category: 'Salón', name: 'Terraza Adicional', unitPrice: 8000, quantity: 1, total: 8000 },
  { id: '3', category: 'Catering', name: 'Menú Premium por persona', unitPrice: 2800, quantity: 180, total: 504000 },
  { id: '4', category: 'Catering', name: 'Barra libre (5 horas)', unitPrice: 4500, quantity: 180, total: 810000 },
  { id: '5', category: 'Decoración', name: 'Arreglo floral central', unitPrice: 3500, quantity: 12, total: 42000 },
  { id: '6', category: 'Audio', name: 'Equipo de sonido + DJ (6 horas)', unitPrice: 18000, quantity: 1, total: 18000 },
  { id: '7', category: 'Foto/Video', name: 'Fotografía profesional', unitPrice: 15000, quantity: 1, total: 15000 },
  { id: '8', category: 'Extras', name: 'Servicios de limpieza', unitPrice: 5000, quantity: 1, total: 5000 },
]

const quote: Quote = {
  id: 'Q-001',
  clientName: 'Micaela Gutiérrez',
  clientEmail: 'micaela.g@mail.com',
  eventDate: '15 Nov 2026',
  eventType: 'Casamiento',
  guests: 180,
  validUntil: '26 Abr 2026',
  subtotal: 1507000,
  iva: 316470,
  total: 1823470,
  status: 'draft',
  items: quoteItems,
  notes: 'Incluye mesa de dulces y mesa de frutas. No incluye barra abierta.',
}

const categories = ['Salón', 'Catering', 'Decoración', 'Audio', 'Foto/Video', 'Extras']

const categoryIcons: Record<string, string> = {
  'Salón': '🏛️',
  'Catering': '🍽️',
  'Decoración': '💐',
  'Audio': '🔊',
  'Foto/Video': '📸',
  'Extras': '✨',
}

const statusBadge: Record<string, { text: string; class: string }> = {
  draft: { text: 'Borrador', class: 'badge-pending' },
  sent: { text: 'Enviado', class: 'badge-warning' },
  approved: { text: 'Aprobado', class: 'badge-success' },
  rejected: { text: 'Rechazado', class: 'bg-red-100 text-red-700' },
}

export default function Quotes() {
  const [activeTab, setActiveTab] = useState<'items' | 'preview' | 'canva'>('items')
  const [copied, setCopied] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(JSON.stringify(quote, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleGenerateWithAI = () => {
    if (!aiPrompt.trim()) return
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setAiPrompt('')
    }, 2500)
  }

  const groupedItems = categories.reduce((acc, cat) => {
    acc[cat] = quote.items.filter(item => item.category === cat)
    return acc
  }, {} as Record<string, QuoteItem[]>)

  return (
    <Layout title="Generador de Presupuestos" subtitle="Creá propuestas profesionales">
      <div className="container-main py-8 pb-24 md:pb-8">
        {/* Quote Selector Card */}
        <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-in">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl gradient-champagne flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="headline-md">{quote.id}</h2>
                  <span className={`badge ${statusBadge[quote.status].class}`}>
                    {statusBadge[quote.status].text}
                  </span>
                </div>
                <p className="label-sm">{quote.clientName} · {quote.eventType} · {quote.guests} invitados</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button className="btn-secondary py-2.5 px-4 flex items-center gap-2 text-sm">
                <Table className="w-4 h-4" />
                <span className="hidden sm:inline">Excel</span>
              </button>
              <button className="btn-secondary py-2.5 px-4 flex items-center gap-2 text-sm">
                <Image className="w-4 h-4" />
                <span className="hidden sm:inline">Canva</span>
              </button>
              <button onClick={handleCopyQuote} className="btn-secondary py-2.5 px-4 flex items-center gap-2 text-sm">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado!' : 'Duplicar'}
              </button>
              <button className="btn-secondary py-2.5 px-4 flex items-center gap-2 text-sm">
                <Download className="w-4 h-4" />
                PDF
              </button>
              <button className="btn-primary py-2.5 px-4 flex items-center gap-2 text-sm">
                <Send className="w-4 h-4" />
                Enviar
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Assistant */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-champagne flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="body-md font-medium">Asistente IA</h3>
                  <p className="label-sm text-[var(--color-on-surface-variant)]">Describí lo que necesitás y genero el presupuesto</p>
                </div>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Ej: Presupuesto para casamiento de 150 personas con menú italiano..."
                  className="flex-1 glass-input rounded-full py-3.5 px-5 body-md"
                />
                <button 
                  onClick={handleGenerateWithAI}
                  disabled={!aiPrompt.trim() || isGenerating}
                  className="btn-primary py-3.5 px-6 flex items-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generar
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="glass-card rounded-2xl overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex border-b border-[var(--color-outline-variant)]">
                {[
                  { id: 'items', label: 'Items' },
                  { id: 'preview', label: 'Vista Previa' },
                  { id: 'canva', label: 'Canva' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex-1 py-4 body-md font-medium transition-colors ${
                      activeTab === tab.id 
                        ? 'text-[var(--color-primary)] border-b-2 border-[var(--color-primary)] bg-[var(--color-primary-container)] bg-opacity-30' 
                        : 'text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'items' && (
                  <div className="space-y-8">
                    {categories.map((category) => {
                      const items = groupedItems[category]
                      if (items.length === 0) return null
                      return (
                        <div key={category}>
                          <h4 className="headline-md mb-4 flex items-center gap-2">
                            <span className="text-xl">{categoryIcons[category]}</span>
                            {category}
                          </h4>
                          <div className="space-y-2">
                            {items.map((item) => (
                              <div 
                                key={item.id}
                                className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface-container-low)] hover:bg-[var(--color-surface-container-high)] transition-colors"
                              >
                                <div className="flex-1">
                                  <p className="body-md font-medium">{item.name}</p>
                                  <p className="label-sm text-[var(--color-on-surface-variant)]">
                                    {formatCurrency(item.unitPrice)} x {item.quantity}
                                  </p>
                                </div>
                                <div className="text-right flex items-center gap-4">
                                  <p className="body-md font-medium">{formatCurrency(item.total)}</p>
                                  <button className="p-1.5 text-[var(--color-on-surface-variant)] hover:text-[var(--color-error)] transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                    
                    <button className="w-full py-4 border-2 border-dashed border-[var(--color-outline-variant)] rounded-xl text-[var(--color-on-surface-variant)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors flex items-center justify-center gap-2">
                      <Plus className="w-5 h-5" />
                      Agregar Item
                    </button>
                  </div>
                )}

                {activeTab === 'preview' && (
                  <div className="space-y-6">
                    <div className="text-center border-b border-[var(--color-outline-variant)] pb-6">
                      <h2 className="font-display text-3xl font-bold text-[var(--color-primary)] mb-2">Avril</h2>
                      <p className="label-sm">Presupuesto para evento especial</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="label-sm mb-1">Cliente</p>
                        <p className="body-md font-medium">{quote.clientName}</p>
                        <p className="label-sm text-[var(--color-on-surface-variant)]">{quote.clientEmail}</p>
                      </div>
                      <div className="text-right">
                        <p className="label-sm mb-1">Fecha del evento</p>
                        <p className="body-md font-medium">{quote.eventDate}</p>
                        <p className="label-sm text-[var(--color-on-surface-variant)]">{quote.guests} invitados</p>
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden border border-[var(--color-outline-variant)]">
                      <table className="w-full">
                        <thead className="bg-[var(--color-surface-container-low)]">
                          <tr>
                            <th className="text-left p-4 body-md font-medium">Servicio</th>
                            <th className="text-right p-4 body-md font-medium">Precio Unit.</th>
                            <th className="text-right p-4 body-md font-medium">Cant.</th>
                            <th className="text-right p-4 body-md font-medium">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--color-outline-variant)]">
                          {quote.items.map((item) => (
                            <tr key={item.id} className="hover:bg-[var(--color-surface-container-low)]">
                              <td className="p-4 body-md">{item.name}</td>
                              <td className="p-4 body-md text-right">{formatCurrency(item.unitPrice)}</td>
                              <td className="p-4 body-md text-right">{item.quantity}</td>
                              <td className="p-4 body-md text-right font-medium">{formatCurrency(item.total)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end">
                      <div className="w-72 space-y-2">
                        <div className="flex justify-between body-md">
                          <span className="text-[var(--color-on-surface-variant)]">Subtotal</span>
                          <span>{formatCurrency(quote.subtotal)}</span>
                        </div>
                        <div className="flex justify-between body-md">
                          <span className="text-[var(--color-on-surface-variant)]">IVA (21%)</span>
                          <span>{formatCurrency(quote.iva)}</span>
                        </div>
                        <div className="flex justify-between headline-md pt-2 border-t border-[var(--color-outline-variant)]">
                          <span>Total</span>
                          <span className="text-[var(--color-primary)]">{formatCurrency(quote.total)}</span>
                        </div>
                      </div>
                    </div>

                    {quote.notes && (
                      <div className="bg-[var(--color-primary-container)] rounded-xl p-4">
                        <p className="label-sm font-medium text-[var(--color-on-primary-container)] mb-1">Notas</p>
                        <p className="body-md text-[var(--color-on-primary-container)]">{quote.notes}</p>
                      </div>
                    )}

                    <div className="text-center pt-6 border-t border-[var(--color-outline-variant)]">
                      <p className="label-sm text-[var(--color-on-surface-variant)]">
                        Válido hasta {quote.validUntil}
                      </p>
                      <p className="label-sm text-[var(--color-on-surface-variant)]">
                        Este presupuesto es una estimación y puede variar según los servicios finales contratados.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'canva' && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7D2AE8] to-[#00D4AA] flex items-center justify-center mx-auto mb-4">
                      <Image className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="headline-md mb-2">Conectar Canva</h3>
                    <p className="body-md text-[var(--color-on-surface-variant)] mb-6 max-w-md mx-auto">
                      Vincular tu cuenta de Canva para usar las plantillas de propuesta visual profesional
                    </p>
                    <button className="btn-primary py-3.5 px-6 inline-flex items-center gap-2">
                      <Image className="w-5 h-5" />
                      Conectar Canva
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 animate-fade-in">
              <h3 className="headline-md mb-6">Resumen</h3>
              <div className="space-y-4">
                <div className="flex justify-between body-md">
                  <span className="text-[var(--color-on-surface-variant)]">Subtotal</span>
                  <span>{formatCurrency(quote.subtotal)}</span>
                </div>
                <div className="flex justify-between body-md">
                  <span className="text-[var(--color-on-surface-variant)]">IVA (21%)</span>
                  <span>{formatCurrency(quote.iva)}</span>
                </div>
                <div className="pt-4 border-t border-[var(--color-outline-variant)]">
                  <div className="flex justify-between">
                    <span className="headline-md">Total</span>
                    <span className="headline-md text-[var(--color-primary)]">{formatCurrency(quote.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.05s' }}>
              <h3 className="headline-md mb-4">Datos del Evento</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
                  <div>
                    <p className="label-sm">Fecha</p>
                    <p className="body-md font-medium">{quote.eventDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[var(--color-primary)]" />
                  <div>
                    <p className="label-sm">Invitados</p>
                    <p className="body-md font-medium">{quote.guests} personas</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[var(--color-primary)]" />
                  <div>
                    <p className="label-sm">Válido hasta</p>
                    <p className="body-md font-medium">{quote.validUntil}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h3 className="headline-md mb-4">Fuente de Precios</h3>
              <div className="p-4 rounded-xl bg-[var(--color-surface-container-low)] flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
                <div>
                  <p className="body-md font-medium">precios_eventos_2026.xlsx</p>
                  <p className="label-sm text-[var(--color-success)]">● Conectado</p>
                </div>
              </div>
              <button className="btn-secondary w-full justify-center">
                <Edit3 className="w-4 h-4" />
                Actualizar precios
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
