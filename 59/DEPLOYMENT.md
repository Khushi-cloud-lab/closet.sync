# ClosetSync — production deployment

This repository is a Next.js app designed to be deployed on Vercel with Firebase Authentication, Firestore, and Storage.

## 1. Create Firebase project

1. Create a Firebase project.
2. Register a Web App.
3. Enable Authentication → Email/Password and Google.
4. Create Firestore Database.
5. If you want wardrobe photo storage, enable Cloud Storage and use the Blaze plan. Firebase currently requires Blaze for Cloud Storage; no-cost usage is still available within the applicable quotas.
6. Deploy the rules from `firebase/firestore.rules` and `firebase/storage.rules`.

## 2. Configure Vercel environment variables

Add these variables in Vercel → Project → Settings → Environment Variables:

```text
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

Never commit `.env.local`.

## 3. Deploy

Push this folder to GitHub, import the repository into Vercel, and deploy. Vercel auto-detects Next.js.

## 4. Firebase authorized domains

After Vercel gives you a production URL, add that domain in Firebase Authentication → Settings → Authorized domains.

## 5. Custom domain

If you own a domain such as `closet.sync`, add it under Vercel Project → Settings → Domains and follow the DNS instructions.

## 6. Free-first limits

ClosetSync's core recommendation engine is local and does not require a paid AI API. Keep an application-level wardrobe/image limit to control storage use. Cloud Storage itself is a Blaze-plan service, even though qualifying no-cost usage is available.
