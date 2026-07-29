# ClosetSync — Phase 1

Foundation: project setup, folder structure, Firebase config, landing page, and authentication (email/password + Google).

## What's included in Phase 1

- Next.js 14 + TypeScript + Tailwind CSS project structure
- Firebase client setup (Auth, Firestore, Storage) — reads config from env vars only
- Auth context (`AuthContext`) providing `user`, `profile`, `loading` app-wide
- Auth actions layer (`src/lib/auth/actions.ts`) separated from UI
- Reusable UI components: `Button`, `Input`, `Card`
- Landing page, Login page, Signup page
- Protected route wrapper + placeholder Dashboard page
- Firestore security rules (`firestore.rules`) — users can only access their own data
- `.env.local.example` and `.gitignore` so secrets are never committed

## Setup (from your phone, no laptop needed)

### 1. Create a Firebase project
- Go to console.firebase.google.com (mobile browser works fine)
- Create a new project
- Add a "Web app" inside it — Firebase will show you config values
- Enable **Authentication** → Sign-in methods → turn on **Email/Password** and **Google**
- Enable **Firestore Database** (start in production mode)
- Enable **Storage**

### 2. Upload this code to GitHub
- Create a new repository on github.com
- Use "Add file" → "Upload files" to upload this project's files/folders
- Keep the folder structure exactly as given

### 3. Add your Firebase secrets to Vercel (not GitHub)
- Go to vercel.com → New Project → Import your GitHub repo
- Before deploying, add Environment Variables using the names in `.env.local.example`,
  with the real values from your Firebase project
- Deploy

### 4. Deploy Firestore rules
- In Firebase Console → Firestore → Rules tab, paste the contents of `firestore.rules` and publish

## Next
Once you confirm Phase 1 looks good, Phase 2 will add the Dashboard, Wardrobe pages, Upload flow, and Clothing management.
