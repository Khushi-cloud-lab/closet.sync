export type Plan = "Free" | "Premium";
export type Availability = "Available" | "Laundry" | "Travelling" | "Unavailable";
export type Theme = "light" | "dark";

export type ClothingItem = {
  id: string;
  userId: string;
  imageUrl: string;
  name: string;
  category: string;
  subCategory: string;
  colour: string;
  pattern: string;
  material: string;
  season: string;
  occasion: string;
  brand?: string;
  availability: Availability;
  favourite: boolean;
  dateAdded: string;
  lastWorn?: string;
  wearCount: number;
};

export type Outfit = {
  id: string;
  userId: string;
  name: string;
  clothingIds: string[];
  confidenceScore: number;
  weather: string;
  occasion: string;
  favourite: boolean;
  createdAt: string;
};

export type CalendarEvent = {
  id: string;
  userId: string;
  date: string;
  outfitId?: string;
  eventType: string;
  notes?: string;
};

export type HistoryEntry = {
  id: string;
  userId: string;
  outfitId: string;
  date: string;
  rating: number;
};

export type NotificationItem = {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
};

export type UserProfile = {
  userId: string;
  fullName: string;
  email: string;
  profilePhoto?: string;
  plan: Plan;
  createdAt: string;
  onboardingCompleted: boolean;
  notificationSettings: Record<string, boolean>;
  favouriteColours: string[];
  preferredStyles: string[];
  preferredOccasions: string[];
};

export type Feedback = {
  id: string;
  userId: string;
  outfitId: string;
  like: boolean;
  favourite: boolean;
  dislikeReason?: string;
  customFeedback?: string;
};
