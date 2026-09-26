import type { ClothingItem, Outfit, UserProfile } from "@/types";

const occasionKeywords: Record<string,string[]> = {
  college: ["College", "Casual outing", "Party"],
  casual: ["Casual outing", "College", "Party"],
  office: ["Office", "Interview"],
  interview: ["Interview", "Office"],
  party: ["Party", "Casual outing"],
  wedding: ["Party", "Office"],
  fresher: ["College", "Casual outing", "Party"],
  freshers: ["College", "Casual outing", "Party"],
  orientation: ["College", "Casual outing", "Party"]
};

const colourPartners: Record<string,string[]> = {
  black: ["white", "blue", "green", "beige"],
  white: ["black", "blue", "green", "beige"],
  blue: ["white", "black", "beige", "green"],
  green: ["white", "black", "beige", "blue"],
  beige: ["black", "white", "blue", "green"]
};

function normalize(value: string) { return value.toLowerCase(); }

export function scoreItem(item: ClothingItem, profile: UserProfile, occasion: string, weather: string) {
  if (item.availability !== "Available") return -999;
  let score = 20;
  const wantedOccasions = occasionKeywords[normalize(occasion)] ?? [occasion];
  if (wantedOccasions.some(o => item.occasion.toLowerCase().includes(o.toLowerCase()))) score += 25;
  if (profile.favouriteColours.includes(item.colour.toLowerCase())) score += 15;
  if (profile.preferredStyles.some(s => `${item.category} ${item.subCategory}`.toLowerCase().includes(s.toLowerCase()))) score += 6;
  if (item.wearCount === 0) score += 8;
  else if ((item.wearCount ?? 0) <= 2) score += 5;
  if (weather.toLowerCase().includes("hot") && /cotton|linen/i.test(item.material)) score += 6;
  if (weather.toLowerCase().includes("cold") && /jacket|blazer|overshirt|knit/i.test(`${item.name} ${item.subCategory}`)) score += 8;
  if (weather.toLowerCase().includes("rain") && /sneaker|canvas/i.test(item.subCategory)) score -= 6;
  return score;
}

function chooseByCategory(items: ClothingItem[], category: string, profile: UserProfile, occasion: string, weather: string) {
  return items.filter(i => i.category === category).sort((a,b) => scoreItem(b,profile,occasion,weather) - scoreItem(a,profile,occasion,weather))[0];
}

export function generateRecommendations(items: ClothingItem[], profile: UserProfile, occasion = "College", weather = "Mild • 24°C"): Outfit[] {
  const available = items.filter(i => i.availability === "Available");
  const combinations: Outfit[] = [];
  const tops = available.filter(i => i.category === "Tops").sort((a,b) => scoreItem(b,profile,occasion,weather)-scoreItem(a,profile,occasion,weather));
  const bottoms = available.filter(i => i.category === "Bottoms").sort((a,b) => scoreItem(b,profile,occasion,weather)-scoreItem(a,profile,occasion,weather));
  const footwear = available.filter(i => i.category === "Footwear").sort((a,b) => scoreItem(b,profile,occasion,weather)-scoreItem(a,profile,occasion,weather));
  const layers = available.filter(i => i.category === "Layers").sort((a,b) => scoreItem(b,profile,occasion,weather)-scoreItem(a,profile,occasion,weather));

  const combos = [
    [tops[0], bottoms[0], footwear[0]],
    [tops[1] ?? tops[0], bottoms[1] ?? bottoms[0], footwear[0]],
    [tops[0], bottoms[0], footwear[1] ?? footwear[0]],
    [tops[2] ?? tops[0], bottoms[1] ?? bottoms[0], footwear[0], layers[0]],
    [tops[1] ?? tops[0], bottoms[0], footwear[0], layers[0]],
    [tops[2] ?? tops[0], bottoms[2] ?? bottoms[0], footwear[1] ?? footwear[0]]
  ];

  combos.forEach((combo, idx) => {
    const ids = combo.filter(Boolean).map(i => i!.id);
    if (!ids.length) return;
    const colourScore = colourHarmony(combo.filter(Boolean) as ClothingItem[]);
    const occasionScore = combo.filter(Boolean).reduce((s,i) => s + Math.max(scoreItem(i!,profile,occasion,weather),0),0);
    const confidence = Math.max(60, Math.min(97, Math.round(55 + colourScore * 0.25 + occasionScore * 0.2)));
    combinations.push({ id: `gen-${idx}`, userId: profile.userId, name: `${occasion} Look ${idx + 1}`, clothingIds: ids, confidenceScore: confidence, weather, occasion, favourite: false, createdAt: new Date().toISOString() });
  });
  return combinations.slice(0,6);
}

export function queryToOccasion(query: string) {
  const q = normalize(query);
  if (/freshers?|orientation|college|campus|university/.test(q)) return "College";
  if (/wedding|shaadi|marriage/.test(q)) return "Wedding";
  if (/interview/.test(q)) return "Interview";
  if (/office|work|meeting/.test(q)) return "Office";
  if (/party|club|birthday|fest/.test(q)) return "Party";
  if (/casual|outing|hangout|date/.test(q)) return "Casual outing";
  return "College";
}

export function generateQueryRecommendations(items: ClothingItem[], profile: UserProfile, query: string, weather = "24°C • Clear") {
  const occasion = queryToOccasion(query);
  return generateRecommendations(items, profile, occasion, weather).slice(0, 3);
}

function colourHarmony(items: ClothingItem[]) {
  if (items.length < 2) return 60;
  let score = 0;
  for (let i=0;i<items.length;i++) for (let j=i+1;j<items.length;j++) {
    if (items[i].colour === items[j].colour) score += 55;
    else if (colourPartners[items[i].colour]?.includes(items[j].colour)) score += 90;
    else score += 45;
  }
  return score / ((items.length*(items.length-1))/2);
}

export function findCompatibleReplacement(item: ClothingItem, items: ClothingItem[], profile: UserProfile, occasion: string, weather: string) {
  const sameCategory = items.filter(i => i.availability === "Available" && i.category === item.category && i.id !== item.id);
  return sameCategory.sort((a,b) => {
    const aScore = scoreItem(a,profile,occasion,weather) + (colourPartners[item.colour]?.includes(a.colour) ? 8 : 0);
    const bScore = scoreItem(b,profile,occasion,weather) + (colourPartners[item.colour]?.includes(b.colour) ? 8 : 0);
    return bScore - aScore;
  })[0];
}
