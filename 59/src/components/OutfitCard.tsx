"use client";
import Link from "next/link";
import { Heart, Pencil, ThumbsDown, ThumbsUp, Sparkles } from "lucide-react";
import type { ClothingItem, Outfit } from "@/types";
import { Badge, Button, Card } from "@/components/ui";

export function OutfitCard({ outfit, wardrobe, onLike, onDislike, onFavourite, compact=false }:{ outfit:Outfit; wardrobe:ClothingItem[]; onLike?:()=>void; onDislike?:()=>void; onFavourite?:()=>void; compact?:boolean }){
  const clothes=outfit.clothingIds.map(id=>wardrobe.find(w=>w.id===id)).filter(Boolean) as ClothingItem[];
  return <Card className={compact?"p-3":""}><div className="mb-3 flex items-start justify-between"><div><div className="flex items-center gap-2"><h3 className="font-bold text-slate-900">{outfit.name}</h3><Badge tone="blue">{outfit.confidenceScore}%</Badge></div><p className="mt-1 text-xs text-slate-500">{outfit.occasion} · {outfit.weather}</p></div><button onClick={onFavourite} className={`rounded-lg p-2 ${outfit.favourite?"text-rose-500":"text-slate-300 hover:text-slate-500"}`}><Heart size={18} fill={outfit.favourite?"currentColor":"none"}/></button></div>
    <div className={`grid ${clothes.length>=4?"grid-cols-4":"grid-cols-3"} gap-2`}>{clothes.slice(0,4).map(c=> <div key={c.id} className="aspect-square overflow-hidden rounded-xl bg-slate-100"><img src={c.imageUrl} alt={c.name} className="h-full w-full object-cover"/></div>)}</div>
    {!compact && <div className="mt-4 flex flex-wrap gap-2"><Button variant="ghost" onClick={onLike}><ThumbsUp size={15}/>Like</Button><Button variant="ghost" onClick={onDislike}><ThumbsDown size={15}/>Dislike</Button><Link href={`/outfits/${outfit.id}`} className="ml-auto"><Button variant="secondary"><Pencil size={15}/>Edit</Button></Link></div>}
  </Card>
}
