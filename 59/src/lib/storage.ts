import type { CalendarEvent, ClothingItem, Feedback, HistoryEntry, NotificationItem, Outfit, UserProfile } from "@/types";
import { seedCalendar, seedFeedback, seedHistory, seedNotifications, seedOutfits, seedUser, seedWardrobe } from "@/lib/seed";

const KEY = "closetsync-state-v1";
export type AppState = { user: UserProfile; wardrobe: ClothingItem[]; outfits: Outfit[]; calendar: CalendarEvent[]; history: HistoryEntry[]; notifications: NotificationItem[]; feedback: Feedback[] };

export const defaultState: AppState = { user: seedUser, wardrobe: seedWardrobe, outfits: seedOutfits, calendar: seedCalendar, history: seedHistory, notifications: seedNotifications, feedback: seedFeedback };
export const emptyState: AppState = { user: {...seedUser, userId:"", fullName:"", email:"", onboardingCompleted:false, favouriteColours:[], preferredStyles:[], preferredOccasions:[]}, wardrobe: [], outfits: [], calendar: [], history: [], notifications: [], feedback: [] };

export function loadState(): AppState { if (typeof window === "undefined") return defaultState; try { const raw=window.localStorage.getItem(KEY); if(!raw)return defaultState; return JSON.parse(raw) as AppState; } catch { return defaultState; } }
export function saveState(state:AppState){ if(typeof window!=="undefined") window.localStorage.setItem(KEY,JSON.stringify(state)); }
export function resetState(){ if(typeof window!=="undefined") window.localStorage.removeItem(KEY); }
