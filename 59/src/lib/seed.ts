import type { ClothingItem, Outfit, CalendarEvent, HistoryEntry, NotificationItem, UserProfile, Feedback } from "@/types";

const now = new Date();
const daysAgo = (n: number) => new Date(now.getTime() - n * 86400000).toISOString();

export const seedUser: UserProfile = {
  userId: "demo-user",
  fullName: "Khushi",
  email: "demo@closetsync.app",
  profilePhoto: "",
  plan: "Free",
  createdAt: daysAgo(40),
  onboardingCompleted: true,
  notificationSettings: {
    outfitReminders: true,
    calendarReminders: true,
    weatherUpdates: true,
    aiRecommendations: true,
    shoppingSuggestions: true
  },
  favouriteColours: ["black", "blue", "white", "green"],
  preferredStyles: ["minimal", "casual", "smart casual"],
  preferredOccasions: ["College", "Casual outing", "Party"]
};

export const seedWardrobe: ClothingItem[] = [
  { id: "c1", userId: "demo-user", imageUrl: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80", name: "Black Oversized Tee", category: "Tops", subCategory: "T-Shirt", colour: "black", pattern: "solid", material: "cotton", season: "all", occasion: "College, Casual outing", availability: "Available", favourite: true, dateAdded: daysAgo(31), lastWorn: daysAgo(5), wearCount: 8 },
  { id: "c2", userId: "demo-user", imageUrl: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80", name: "White Shirt", category: "Tops", subCategory: "Shirt", colour: "white", pattern: "solid", material: "cotton", season: "all", occasion: "Office, College, Interview", availability: "Available", favourite: true, dateAdded: daysAgo(28), lastWorn: daysAgo(14), wearCount: 4 },
  { id: "c3", userId: "demo-user", imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80", name: "Blue Straight Jeans", category: "Bottoms", subCategory: "Jeans", colour: "blue", pattern: "solid", material: "denim", season: "all", occasion: "College, Casual outing, Party", availability: "Available", favourite: false, dateAdded: daysAgo(25), lastWorn: daysAgo(3), wearCount: 11 },
  { id: "c4", userId: "demo-user", imageUrl: "https://images.unsplash.com/photo-1506629905607-d9abec9d2bf6?auto=format&fit=crop&w=600&q=80", name: "Olive Cargo Pants", category: "Bottoms", subCategory: "Cargo", colour: "green", pattern: "solid", material: "cotton", season: "all", occasion: "College, Casual outing", availability: "Available", favourite: false, dateAdded: daysAgo(12), lastWorn: daysAgo(18), wearCount: 2 },
  { id: "c5", userId: "demo-user", imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80", name: "Denim Jacket", category: "Layers", subCategory: "Jacket", colour: "blue", pattern: "solid", material: "denim", season: "winter, all", occasion: "College, Casual outing, Party", availability: "Available", favourite: false, dateAdded: daysAgo(19), wearCount: 1 },
  { id: "c6", userId: "demo-user", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80", name: "White Sneakers", category: "Footwear", subCategory: "Sneakers", colour: "white", pattern: "solid", material: "synthetic", season: "all", occasion: "College, Casual outing, Party", availability: "Available", favourite: true, dateAdded: daysAgo(20), lastWorn: daysAgo(2), wearCount: 15 },
  { id: "c7", userId: "demo-user", imageUrl: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80", name: "Black Blazer", category: "Layers", subCategory: "Blazer", colour: "black", pattern: "solid", material: "poly blend", season: "all", occasion: "Interview, Office, Party", availability: "Laundry", favourite: false, dateAdded: daysAgo(35), lastWorn: daysAgo(8), wearCount: 3 },
  { id: "c8", userId: "demo-user", imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80", name: "Sage Knit Top", category: "Tops", subCategory: "Knit Top", colour: "green", pattern: "solid", material: "knit", season: "winter, all", occasion: "College, Party, Casual outing", availability: "Available", favourite: true, dateAdded: daysAgo(10), wearCount: 0 },
  { id: "c9", userId: "demo-user", imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80", name: "Beige Overshirt", category: "Layers", subCategory: "Overshirt", colour: "beige", pattern: "solid", material: "cotton", season: "all", occasion: "College, Casual outing", availability: "Available", favourite: false, dateAdded: daysAgo(7), wearCount: 0 },
  { id: "c10", userId: "demo-user", imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80", name: "Black Trousers", category: "Bottoms", subCategory: "Trousers", colour: "black", pattern: "solid", material: "poly blend", season: "all", occasion: "Office, Interview, Party", availability: "Available", favourite: false, dateAdded: daysAgo(22), lastWorn: daysAgo(12), wearCount: 4 }
];

export const seedOutfits: Outfit[] = [
  { id: "o1", userId: "demo-user", name: "Campus Minimal", clothingIds: ["c1", "c3", "c6"], confidenceScore: 92, weather: "24°C • Clear", occasion: "College", favourite: true, createdAt: daysAgo(0) },
  { id: "o2", userId: "demo-user", name: "Clean Smart Casual", clothingIds: ["c2", "c10", "c6"], confidenceScore: 88, weather: "24°C • Clear", occasion: "Office", favourite: false, createdAt: daysAgo(0) },
  { id: "o3", userId: "demo-user", name: "Olive Layered", clothingIds: ["c8", "c4", "c6"], confidenceScore: 86, weather: "22°C • Mild", occasion: "Casual outing", favourite: true, createdAt: daysAgo(1) }
];

export const seedCalendar: CalendarEvent[] = [
  { id: "e1", userId: "demo-user", date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2).toISOString().slice(0,10), outfitId: "o1", eventType: "College", notes: "Project presentation" },
  { id: "e2", userId: "demo-user", date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7).toISOString().slice(0,10), outfitId: "o2", eventType: "Interview", notes: "Internship interview" }
];

export const seedHistory: HistoryEntry[] = [
  { id: "h1", userId: "demo-user", outfitId: "o1", date: daysAgo(1), rating: 5 },
  { id: "h2", userId: "demo-user", outfitId: "o2", date: daysAgo(8), rating: 4 },
  { id: "h3", userId: "demo-user", outfitId: "o3", date: daysAgo(15), rating: 5 }
];

export const seedNotifications: NotificationItem[] = [
  { id: "n1", userId: "demo-user", title: "Outfit reminder", message: "Your Campus Minimal outfit is planned for Friday.", type: "calendar", read: false, createdAt: daysAgo(0) },
  { id: "n2", userId: "demo-user", title: "Wardrobe insight", message: "Your Sage Knit Top has not been worn yet — try it this week.", type: "ai", read: false, createdAt: daysAgo(1) },
  { id: "n3", userId: "demo-user", title: "Weather update", message: "Mild weather tomorrow. Your lighter layers are ready.", type: "weather", read: true, createdAt: daysAgo(1) }
];

export const seedFeedback: Feedback[] = [];
