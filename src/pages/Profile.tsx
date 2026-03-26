import { useState } from 'react'
import { MapPin, Users, Star, ArrowLeft, Sparkles } from 'lucide-react'

const salon = {
  name: 'Salón de Cristal',
  location: 'Buenos Aires',
  priceMin: '$55,000',
  priceMax: '$80,000',
  priceUnit: 'COP/hour',
  rating: 4.9,
  reviews: 127,
  description: 'A stunning crystal venue with AR projection capabilities, perfect for weddings and corporate events. Features include a 3D AR projection system, climate control, and in-house catering.',
}

const stats = [
  { label: 'Eventos', value: '23' },
  { label: 'Consultas', value: '4' },
  { label: 'Conversaciones', value: '12' },
]

const tabs = ['Overview', 'Capacity', 'Services', 'Location', 'Reviews'] as const

export default function Profile() {
  const [activeTab, setActiveTab] = useState<string>('Overview')

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#f5f4f0' }}>
      {/* Left panel */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 flex items-center gap-3"
          style={{ background: '#fff', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
          <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ color: '#666' }}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #775a19, #c9941f)' }}>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold" style={{ color: '#1a1a1a' }}>Avril</h1>
            <p className="text-xs" style={{ color: '#888' }}>Venue Management</p>
          </div>
        </div>

        {/* Venue info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-2xl font-bold font-display" style={{ color: '#1a1a1a' }}>{salon.name}</h2>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" style={{ color: '#775a19' }} />
                <span className="text-sm" style={{ color: '#666' }}>{salon.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-[#c9941f] text-[#c9941f]" />
              <span className="text-sm font-bold" style={{ color: '#1a1a1a' }}>{salon.rating}</span>
              <span className="text-xs" style={{ color: '#999' }}>({salon.reviews})</span>
            </div>
          </div>

          {/* Price range */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm font-bold" style={{ color: '#775a19' }}>
              {salon.priceMin} — {salon.priceMax}
            </span>
            <span className="text-xs" style={{ color: '#999' }}>{salon.priceUnit}</span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {stats.map(s => (
              <div key={s.label} className="rounded-2xl p-3 text-center"
                style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="text-xl font-bold" style={{ color: '#1a1a1a' }}>{s.value}</div>
                <div className="text-xs" style={{ color: '#888' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-2xl mb-6"
            style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all capitalize"
                style={
                  activeTab === tab
                    ? { background: 'linear-gradient(135deg, #775a19, #c9941f)', color: '#fff' }
                    : { color: '#888' }
                }
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'Overview' && (
            <div className="space-y-4">
              <p className="text-sm leading-relaxed" style={{ color: '#666' }}>{salon.description}</p>
              <div className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="h-40 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #775a19 0%, #c9941f 50%, #f8cf83 100%)' }}>
                  <div className="text-center text-white">
                    <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-80" />
                    <p className="text-xs uppercase tracking-widest opacity-70">Proyección AR</p>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-sm font-medium" style={{ color: '#1a1a1a' }}>{salon.name}</p>
                  <p className="text-xs" style={{ color: '#888' }}>{salon.location}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Capacity' && (
            <div className="space-y-4">
              {[
                { type: 'Cocktail', capacity: 350 },
                { type: 'Banquet', capacity: 220 },
                { type: 'Classroom', capacity: 180 },
                { type: 'Theater', capacity: 300 },
              ].map(item => (
                <div key={item.type} className="flex items-center justify-between p-4 rounded-2xl"
                  style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <span className="text-sm font-medium" style={{ color: '#1a1a1a' }}>{item.type}</span>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" style={{ color: '#775a19' }} />
                    <span className="text-sm font-bold" style={{ color: '#775a19' }}>{item.capacity}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Services' && (
            <div className="space-y-3">
              {['3D AR Projection', 'In-house Catering', 'Climate Control', 'DJ Booth', 'Parking', 'Wi-Fi', 'Accessibility'].map(s => (
                <div key={s} className="flex items-center gap-3 p-4 rounded-2xl"
                  style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: '#22c55e' }} />
                  <span className="text-sm" style={{ color: '#1a1a1a' }}>{s}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Location' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" style={{ color: '#775a19' }} />
                  <span className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>{salon.location}</span>
                </div>
                <p className="text-xs" style={{ color: '#888' }}>Full address available upon booking confirmation</p>
              </div>
            </div>
          )}

          {activeTab === 'Reviews' && (
            <div className="space-y-3">
              {[5, 4, 5].map((stars, i) => (
                <div key={i} className="p-4 rounded-2xl" style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold" style={{ color: '#1a1a1a' }}>Client {i + 1}</span>
                    <div className="flex gap-0.5">
                      {Array(stars).fill(0).map((_, j) => (
                        <Star key={j} className="w-3 h-3 fill-[#c9941f] text-[#c9941f]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs" style={{ color: '#666' }}>
                    {['Increíble lugar para bodas', 'Perfecto para eventos corporativos', 'La proyección AR es impresionante'][i]}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right panel: AR projection view */}
      <div className="w-80 flex-shrink-0 flex flex-col"
        style={{ background: 'linear-gradient(135deg, #1a1209 0%, #2d1f0e 50%, #3d2914 100%)' }}>
        {/* Header */}
        <div className="px-5 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-white font-display font-bold text-sm">AVRIL</h3>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Proyección en vivo</p>
          </div>
          <div className="text-xs px-2 py-1 rounded-full"
            style={{ background: 'rgba(201,148,31,0.3)', color: '#c9941f' }}>
            Proyección AR
          </div>
        </div>

        {/* AR scene */}
        <div className="flex-1 flex items-center justify-center px-5">
          <div className="text-center">
            {/* Crystal ballroom illustration */}
            <div className="relative mb-6">
              {/* Ambient glow */}
              <div className="absolute inset-0 rounded-full blur-3xl opacity-30"
                style={{ background: '#c9941f', transform: 'scale(1.5)' }} />
              {/* Crystal structure */}
              <div className="relative z-10">
                <div className="text-7xl mb-4">✨</div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: 'rgba(201,148,31,0.2)', border: '1px solid rgba(201,148,31,0.3)' }}>
                  <Sparkles className="w-4 h-4" style={{ color: '#c9941f' }} />
                  <span className="text-sm font-semibold" style={{ color: '#f8cf83' }}>AR Active</span>
                </div>
              </div>
            </div>
            <h4 className="text-white font-display text-xl font-bold mb-2">{salon.name}</h4>
            <p className="text-sm mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{salon.location}</p>
            <div className="flex items-center justify-center gap-1 mb-6">
              <Star className="w-4 h-4 fill-[#c9941f] text-[#c9941f]" />
              <span className="text-sm font-bold text-white">{salon.rating}</span>
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>({salon.reviews} reviews)</span>
            </div>
            <button className="w-full py-3 rounded-2xl text-sm font-bold text-white transition-all active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #775a19, #c9941f)', boxShadow: '0 4px 20px rgba(119,90,25,0.4)' }}>
              Book venue
            </button>
          </div>
        </div>

        {/* Bottom info */}
        <div className="px-5 py-4">
          <div className="flex items-center justify-between text-xs">
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>Price range</span>
            <span className="font-bold" style={{ color: '#f8cf83' }}>{salon.priceMin} — {salon.priceMax} {salon.priceUnit}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
