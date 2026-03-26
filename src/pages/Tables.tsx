import { useState } from 'react'
import { 
  Sparkles, Users, RotateCcw, AlertTriangle
} from 'lucide-react'
import Layout from '../components/Layout'

interface Guest {
  id: string
  name: string
  table: number | null
  seat: number | null
  dietary: string[]
  notes: string
}

interface Table {
  id: number
  guests: Guest[]
}

const initialGuests: Guest[] = [
  { id: '1', name: 'María García', table: null, seat: null, dietary: [], notes: '' },
  { id: '2', name: 'Carlos Rodríguez', table: null, seat: null, dietary: [], notes: '' },
  { id: '3', name: 'Ana Martínez', table: null, seat: null, dietary: ['vegetariano'], notes: '' },
  { id: '4', name: 'Pedro Sánchez', table: null, seat: null, dietary: [], notes: '' },
  { id: '5', name: 'Laura López', table: null, seat: null, dietary: ['sin tacc'], notes: 'CELIAQUÍA' },
  { id: '6', name: 'Jorge Ruiz', table: null, seat: null, dietary: ['vegano'], notes: '' },
  { id: '7', name: 'Sofia Hernandez', table: null, seat: null, dietary: [], notes: '' },
  { id: '8', name: 'Diego Fernandez', table: null, seat: null, dietary: ['sin gluten'], notes: '' },
  { id: '9', name: 'Carmen Flores', table: null, seat: null, dietary: [], notes: '' },
  { id: '10', name: 'Roberto Díaz', table: null, seat: null, dietary: [], notes: '' },
  { id: '11', name: 'Isabel Morales', table: null, seat: null, dietary: ['vegetariano'], notes: '' },
  { id: '12', name: 'Antonio Ortiz', table: null, seat: null, dietary: [], notes: '' },
  { id: '13', name: 'Lucía Castro', table: null, seat: null, dietary: [], notes: '' },
  { id: '14', name: 'Francisco Rivera', table: null, seat: null, dietary: [], notes: '' },
  { id: '15', name: 'Patricia Peña', table: null, seat: null, dietary: ['sin lactosa'], notes: '' },
  { id: '16', name: 'Manuel Lopez', table: null, seat: null, dietary: [], notes: '' },
  { id: '17', name: 'Claudia Herrera', table: null, seat: null, dietary: [], notes: '' },
  { id: '18', name: 'Rafael Medina', table: null, seat: null, dietary: ['diabético'], notes: 'Sin azúcar' },
  { id: '19', name: 'Elena Vargas', table: null, seat: null, dietary: [], notes: '' },
  { id: '20', name: 'David Jiménez', table: null, seat: null, dietary: [], notes: '' },
  { id: '21', name: 'Sandra Delgado', table: null, seat: null, dietary: [], notes: '' },
  { id: '22', name: 'Alberto Navarro', table: null, seat: null, dietary: ['vegetariano'], notes: '' },
  { id: '23', name: 'Carmen Romero', table: null, seat: null, dietary: [], notes: '' },
  { id: '24', name: 'Pablo Iglesias', table: null, seat: null, dietary: [], notes: '' },
]

const dietaryInfo: Record<string, { color: string; label: string }> = {
  vegetariano: { color: '#22c55e', label: 'Vegetariano' },
  vegano: { color: '#16a34a', label: 'Vegano' },
  'sin tacc': { color: '#f59e0b', label: 'Sin TACC' },
  'sin gluten': { color: '#f59e0b', label: 'Sin Gluten' },
  'sin lactosa': { color: '#3b82f6', label: 'Sin Lactosa' },
  diabético: { color: '#ef4444', label: 'Diabético' },
}

export default function Tables() {
  const [guests, setGuests] = useState<Guest[]>(initialGuests)
  const [tables, setTables] = useState<Table[]>([])
  const [guestsPerTable, setGuestsPerTable] = useState(12)
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const unassignedGuests = guests.filter(g => g.table === null)

  const handleGenerateWithAI = () => {
    if (!aiPrompt.trim() || guests.length === 0) return
    setIsGenerating(true)

    setTimeout(() => {
      const numTables = Math.ceil(guests.length / guestsPerTable)
      const newTables: Table[] = []
      
      let guestIndex = 0
      for (let t = 0; t < numTables; t++) {
        const tableGuests: Guest[] = []
        for (let s = 0; s < guestsPerTable && guestIndex < guests.length; s++) {
          const guest = { ...guests[guestIndex], table: t + 1, seat: s + 1 }
          tableGuests.push(guest)
          guests[guestIndex] = guest
          guestIndex++
        }
        newTables.push({ id: t + 1, guests: tableGuests })
      }
      
      setTables(newTables)
      setGuests([...guests])
      setIsGenerating(false)
      setAiPrompt('')
    }, 2500)
  }

  const handleReset = () => {
    setGuests(guests.map(g => ({ ...g, table: null, seat: null })))
    setTables([])
  }

  const handleQuickSetup = (numTables: number) => {
    const perTable = Math.ceil(guests.length / numTables)
    setGuestsPerTable(perTable)
    
    const newTables: Table[] = []
    let guestIndex = 0
    
    for (let t = 0; t < numTables; t++) {
      const tableGuests: Guest[] = []
      for (let s = 0; s < perTable && guestIndex < guests.length; s++) {
        const guest = { ...guests[guestIndex], table: t + 1, seat: s + 1 }
        tableGuests.push(guest)
        guests[guestIndex] = guest
        guestIndex++
      }
      newTables.push({ id: t + 1, guests: tableGuests })
    }
    
    setTables(newTables)
    setGuests([...guests])
  }

  const getGuestsByTable = (tableId: number) => {
    return guests.filter(g => g.table === tableId)
  }

  return (
    <Layout title="Armado de Mesas" subtitle="Organizá la disposición de invitados con IA">
      <div className="container-main py-8 pb-24 md:pb-8">
        {/* AI Assistant */}
        <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-champagne flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="body-md font-medium">Asistente IA para Armado de Mesas</h3>
              <p className="label-sm text-[var(--color-on-surface-variant)]">Describí la composición del grupo y la IA optimiza automáticamente</p>
            </div>
          </div>
          
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Ej: 2 niños, 3 vegetarianos, mesa de novios separada, familias juntas..."
              className="flex-1 glass-input rounded-full py-3.5 px-5 body-md"
            />
            <button 
              onClick={handleGenerateWithAI}
              disabled={!aiPrompt.trim() || isGenerating || unassignedGuests.length === 0}
              className="btn-primary py-3.5 px-6 flex items-center gap-2 disabled:opacity-50"
            >
              {isGenerating ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generar con IA
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-4 gap-4 p-4 bg-[var(--color-surface-container-low)] rounded-xl">
            <div className="text-center">
              <p className="headline-lg text-[var(--color-primary)]">{guests.length}</p>
              <p className="label-sm">Total invitados</p>
            </div>
            <div className="text-center">
              <p className="headline-lg text-[var(--color-warning)]">{unassignedGuests.length}</p>
              <p className="label-sm">Sin asignar</p>
            </div>
            <div className="text-center">
              <p className="headline-lg text-[var(--color-success)]">{tables.length}</p>
              <p className="label-sm">Mesas creadas</p>
            </div>
            <div className="text-center">
              <p className="headline-lg">{guestsPerTable}</p>
              <p className="label-sm">Por mesa</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Floor Plan */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6 mb-6 animate-fade-in">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <h3 className="headline-md">Plano del Salón</h3>
                <div className="flex items-center gap-2">
                  <button onClick={handleReset} className="btn-secondary py-2 px-3 text-sm flex items-center gap-1">
                    <RotateCcw className="w-4 h-4" />
                    Reiniciar
                  </button>
                  <button onClick={() => handleQuickSetup(2)} className="btn-secondary py-2 px-3 text-sm">2 mesas</button>
                  <button onClick={() => handleQuickSetup(3)} className="btn-secondary py-2 px-3 text-sm">3 mesas</button>
                  <button onClick={() => handleQuickSetup(4)} className="btn-secondary py-2 px-3 text-sm">4 mesas</button>
                </div>
              </div>

              <div className="bg-[var(--color-surface-container-low)] rounded-2xl p-8 min-h-[400px] relative">
                {tables.length === 0 ? (
                  <div className="flex items-center justify-center h-full min-h-[400px]">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-2xl bg-[var(--color-surface-container-high)] flex items-center justify-center mx-auto mb-4">
                        <Users className="w-10 h-10 text-[var(--color-on-surface-variant)]" />
                      </div>
                      <p className="headline-md mb-2">Sin mesas todavía</p>
                      <p className="body-md text-[var(--color-on-surface-variant)]">
                        Usá el asistente IA o los botones rápidos para generar las mesas
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-8 justify-items-center">
                    {tables.map((table) => (
                      <div key={table.id} className="flex flex-col items-center">
                        <div 
                          className="w-44 h-44 rounded-full border-4 border-[var(--color-primary-fixed-dim)] bg-[var(--color-primary-container)] flex items-center justify-center mb-4"
                          style={{ boxShadow: '0 8px 32px rgba(119, 90, 25, 0.2)' }}
                        >
                          <div className="text-center">
                            <p className="font-display font-bold text-2xl text-[var(--color-primary)]">Mesa {table.id}</p>
                            <p className="label-sm text-[var(--color-on-surface-variant)]">
                              {table.guests.length}/{guestsPerTable}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-2 max-w-[200px]">
                          {Array.from({ length: guestsPerTable }).map((_, seatIdx) => {
                            const guest = table.guests.find(g => g.seat === seatIdx + 1)
                            return (
                              <div 
                                key={seatIdx}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                                  guest 
                                    ? 'bg-[var(--color-primary)] text-white' 
                                    : 'bg-[var(--color-surface-container-high)] text-[var(--color-on-surface-variant)] border-2 border-dashed border-[var(--color-outline-variant)]'
                                }`}
                                title={guest ? guest.name : 'Libre'}
                              >
                                {guest ? seatIdx + 1 : ''}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Guests List */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in">
              <h3 className="headline-md mb-4">Lista de Invitados</h3>
              
              {unassignedGuests.length > 0 && (
                <div className="bg-[rgba(125,87,0,0.1)] rounded-xl p-3 mb-4 flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-[var(--color-warning)] flex-shrink-0 mt-0.5" />
                  <p className="label-sm text-[var(--color-warning)]">
                    {unassignedGuests.length} invitados sin asignar a mesa
                  </p>
                </div>
              )}

              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {guests.map((guest) => (
                  <div 
                    key={guest.id}
                    className={`p-3 rounded-xl transition-colors ${
                      guest.table !== null 
                        ? 'bg-[var(--color-surface-container-low)]' 
                        : 'bg-[var(--color-primary-container)] bg-opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="body-md font-medium truncate">{guest.name}</p>
                      {guest.table && (
                        <span className="badge badge-success text-xs py-1 px-2">Mesa {guest.table}</span>
                      )}
                    </div>
                    {guest.dietary.length > 0 && (
                      <div className="flex items-center gap-1 flex-wrap">
                        {guest.dietary.map((d) => {
                          const info = dietaryInfo[d]
                          return (
                            <span 
                              key={d}
                              className="inline-flex items-center gap-1 text-xs py-0.5 px-2 rounded-full"
                              style={{ 
                                backgroundColor: `${info.color}20`, 
                                color: info.color 
                              }}
                            >
                              {d}
                            </span>
                          )
                        })}
                      </div>
                    )}
                    {guest.notes && (
                      <p className="label-sm text-[var(--color-warning)] mt-1 truncate">{guest.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Table Details */}
            {tables.length > 0 && (
              <div className="glass-card rounded-2xl p-6 animate-fade-in">
                <h3 className="headline-md mb-4">Detalle de Mesas</h3>
                <div className="space-y-4">
                  {tables.map((table) => {
                    const tableGuests = getGuestsByTable(table.id)
                    const hasRestrictions = tableGuests.some(g => g.dietary.length > 0)
                    
                    return (
                      <div key={table.id} className="p-4 bg-[var(--color-surface-container-low)] rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="body-md font-medium">Mesa {table.id}</h4>
                          <span className="label-sm">{tableGuests.length}/{guestsPerTable} personas</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {tableGuests.map((guest) => (
                            <span 
                              key={guest.id}
                              className="badge py-1 px-2 text-xs"
                              style={{ backgroundColor: 'var(--color-surface-container-high)' }}
                            >
                              {guest.name.split(' ')[0]}
                              {guest.dietary.length > 0 && ' *'}
                            </span>
                          ))}
                        </div>
                        {hasRestrictions && (
                          <div className="mt-3 pt-3 border-t border-[var(--color-outline-variant)]">
                            <p className="label-sm text-[var(--color-warning)]">
                              ⚠️ Tiene restricciones alimentarias
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Dietary Summary */}
            <div className="glass-card rounded-2xl p-6 animate-fade-in">
              <h3 className="headline-md mb-4">Restricciones Alimentarias</h3>
              <div className="space-y-3">
                {Object.entries(dietaryInfo).map(([key, info]) => {
                  const count = guests.filter(g => g.dietary.includes(key)).length
                  if (count === 0) return null
                  return (
                    <div key={key} className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${info.color}20` }}
                      >
                        <span className="text-sm" style={{ color: info.color }}>●</span>
                      </div>
                      <div className="flex-1">
                        <p className="body-md">{info.label}</p>
                      </div>
                      <span 
                        className="badge py-1 px-2 text-xs"
                        style={{ backgroundColor: `${info.color}20`, color: info.color }}
                      >
                        {count}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
