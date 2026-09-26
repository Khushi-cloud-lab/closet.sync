# ClosetSync

Your Smart AI Wardrobe Companion — a free-first, production-oriented Next.js + Firebase wardrobe SaaS starter built from the seven-part ClosetSync blueprint.

## What is included

- Landing page, sign-in, sign-up and onboarding flows
- Responsive desktop sidebar + mobile bottom navigation
- Dashboard, wardrobe, clothing details, outfit recommendations, outfit editor
- Outfit calendar, history, analytics
- Shopping suggestions + free local shopping assistant
- Dress-code checker and limited local fashion chat
- Notifications, premium page and settings
- Firebase service layer, Firestore model and Firebase Storage rules
- Local rule-based recommendation engine (no paid AI API required)
- Weather-aware recommendations using Open-Meteo (no API key)
- Free demo mode using localStorage for UI testing before Firebase is configured
- Accessible loading states, error states, responsive UI and keyboard-friendly controls

## Free-first design decisions

The blueprint reserves premium AI features such as virtual try-on, photo outfit analysis, packing assistant and body analysis. They are represented as locked premium UI and architecture hooks, but they do not require a paid AI service in this version.

The core recommendation engine is deterministic and runs locally. It never invents clothing: it scores only items in the user's wardrobe marked Available.

## Run locally

1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local`.
3. For an immediate UI preview, set `NEXT_PUBLIC_DEMO_MODE=true`.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open http://localhost:3000.

## Connect Firebase

Create a Firebase project and register a web app. Enable Email/Password and Google authentication, create Firestore, and enable Storage. Then put the web-app config values in `.env.local` and set `NEXT_PUBLIC_DEMO_MODE=false`.

Use `firebase/firestore.rules` and `firebase/storage.rules` as the starting security rules.

## Deploy

Recommended: deploy the Next.js app to Vercel and keep Firebase as the auth/database/storage backend.

## Important limitation

A completely free website can be built without paid AI, but real third-party product catalog search, advanced image understanding, virtual try-on, and commercial-grade AI chat require external services. ClosetSync keeps those capabilities modular and uses free/local fallbacks so the core product remains usable without paid AI.
