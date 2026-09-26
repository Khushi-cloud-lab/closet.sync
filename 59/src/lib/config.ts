export const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
export const isFirebaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
);

export const appConfig = {
  name: "ClosetSync",
  tagline: "Your Smart AI Wardrobe Companion",
  maxFreeChatMessagesPerDay: 5
};
