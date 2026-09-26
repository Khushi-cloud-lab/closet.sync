"use client";
import Link from "next/link";
import { Heart, MoreHorizontal } from "lucide-react";
import type { ClothingItem } from "@/types";
import { Badge, Card } from "@/components/ui";

export function WardrobeCard({item,onFavourite}:{item:ClothingItem;onFavourite?:()=>void}){
  const tone=item.availability==="Available"?"green":item.availability==="Laundry"?"orange":"red";
  return <Card className="overflow-hidden p-0"><Link href={`/wardrobe/${item.id}`}><div className="aspect-[4/4.3] bg-slate-100"><img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover transition duration-300 hover:scale-[1.03]"/></div></Link><div className="p-4"><div className="flex items-start justify-between gap-2"><div><h3 className="font-bold text-slate-900">{item.name}</h3><p className="mt-1 text-xs text-slate-500">{item.category} · {item.colour}</p></div><button onClick={onFavourite} className="rounded-lg p-2 text-slate-300 hover:text-rose-500"><Heart size={17} fill={item.favourite?"currentColor":"none"}/></button></div><div className="mt-3 flex items-center justify-between"><Badge tone={tone}>{item.availability}</Badge><span className="text-xs text-slate-400">Worn {item.wearCount}×</span></div></div></Card>
}
