# Avril CRM - Sistema Operativo de Eventos

## Tech Stack

- **Build Tool**: Vite 8 + TypeScript
- **Framework**: React 19 (App Router patterns with React Router v6)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **PWA**: vite-plugin-pwa + Workbox (declarative, production-ready)
- **Database**: PostgreSQL via Prisma ORM (Supabase ready)
- **Auth**: Ready for NextAuth.js integration
- **AI**: OpenRouter API (any model configurable)
- **State**: React hooks (useState, useEffect) - no external state manager needed for MVP

## Project Structure

```
avril-crm/
├── prisma/
│   └── schema.prisma          # DB models for Supabase
├── public/                    # Static assets + PWA icons
├── src/
│   ├── components/
│   │   └── Layout.tsx        # Shared layout with header + mobile nav
│   ├── pages/
│   │   ├── Login.tsx          # Login page
│   │   ├── Dashboard.tsx      # Main dashboard
│   │   ├── CRM.tsx            # Chatbot CRM + lead management
│   │   ├── Quotes.tsx         # Quote generator
│   │   ├── Tables.tsx         # AI table setup
│   │   └── Portal.tsx         # Client portal with FAQ AI
│   ├── App.tsx                # Routing
│   ├── main.tsx               # Entry + PWA registration
│   └── index.css              # Design system (Tailwind + custom)
├── vite.config.ts             # Vite + PWA + Workbox config
├── index.html                  # PWA meta tags
└── package.json
```

## Design System

Based on "The Ethereal Socialite" spec:
- **Colors**: Champagne gold (#775a19), cream backgrounds
- **Typography**: Plus Jakarta Sans (headlines), Inter (body)
- **Glassmorphism**: Blur effects, soft shadows, no hard borders
- **Mobile-first**: Responsive with bottom nav on mobile

## Development

```bash
cd avril-crm
npm install
npm run dev      # Development
npm run build    # Production build with PWA
npm run preview  # Preview production build
```

## PWA Features

- Service worker via Workbox (vite-plugin-pwa)
- Offline support
- Installable on mobile (Add to Home Screen)
- Cache-first for fonts, lazy-load for API calls

## TODO

- [ ] Connect Supabase (set DATABASE_URL in .env)
- [ ] Set up NextAuth or Supabase Auth
- [ ] Connect OpenRouter for real AI responses
- [ ] WhatsApp/IG/FB webhook integration
- [ ] Google Calendar API
- [ ] Canva API for proposal templates
- [ ] DocuSign or HelloSign for contracts
- [ ] Excel/Google Sheets price connector
- [ ] Voice commands (Web Speech API)
- [ ] Upload .zip files support
