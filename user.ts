/**
 * Represents a ClosetSync user profile stored in Firestore under /users/{uid}.
 * This is separate from the Firebase Auth user object, which only holds
 * auth-related fields (uid, email, etc).
 */
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  plan: "free" | "premium";
  createdAt: number; // epoch millis
  preferences: UserPreferences;
}

export interface UserPreferences {
  favoriteColors: string[];
  favoriteStyles: string[];
  dislikedItems: string[];
  sizeInfo: Record<string, string>;
}

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  favoriteColors: [],
  favoriteStyles: [],
  dislikedItems: [],
  sizeInfo: {},
};
