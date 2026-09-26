import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyBwDmeN15M6SJYuU9C4Jt90l5JATgdAaXQ",
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "done-19bde.firebaseapp.com",
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: "done-19bde",
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "done-19bde.firebasestorage.app",
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "68810226414",
    NEXT_PUBLIC_FIREBASE_APP_ID: "1:68810226414:web:2b59a600ec65d2732851ff",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" }
    ]
  }
};

export default nextConfig;
