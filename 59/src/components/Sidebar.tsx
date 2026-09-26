"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, ChartNoAxesCombined, House, Layers3, MessageCircle, Settings, ShoppingBag, Sparkles, Star, Bell, LogOut, Menu, X, Shirt } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/components/Providers";

const items = [
  ["Dashboard","/dashboard",House], ["Wardrobe","/wardrobe",Layers3], ["Outfits","/outfits",Sparkles], ["Calendar","/calendar",CalendarDays], ["History","/history",Star], ["Analytics","/analytics",ChartNoAxesCombined], ["Shopping","/shopping",ShoppingBag], ["AI Chat","/chat",MessageCircle]
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const path=usePathname(); const [open,setOpen]=useState(false); const {logout}=useAuth();
  return <div className="min-h-screen bg-slate-50 text-slate-900">
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white p-4 transition-transform duration-200 lg:translate-x-0 ${open?"translate-x-0":"-translate-x-full"}`}>
      <div className="flex items-center justify-between px-2 py-2 lg:mb-6"><Link href="/dashboard" className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-white"><Shirt size={19}/></span><div><div className="text-sm font-extrabold tracking-tight">ClosetSync</div><div className="text-[10px] uppercase tracking-widest text-slate-400">Smart wardrobe</div></div></Link><button className="lg:hidden" onClick={()=>setOpen(false)} aria-label="Close menu"><X size={20}/></button></div>
      <nav className="space-y-1">{items.map(([label,href,Icon])=> <Link key={href} href={href} onClick={()=>setOpen(false)} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${path===href||path.startsWith(href+"/")?"bg-slate-950 text-white":"text-slate-600 hover:bg-slate-100"}`}><Icon size={18}/><span>{label}</span></Link>)}</nav>
      <div className="mt-6 border-t border-slate-100 pt-4"><Link href="/dress-checker" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"><Sparkles size={18}/>Dress Code Checker</Link><Link href="/notifications" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"><Bell size={18}/>Notifications</Link><Link href="/premium" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"><Star size={18}/>Premium</Link><Link href="/settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"><Settings size={18}/>Settings</Link></div>
      <button onClick={()=>logout()} className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100"><LogOut size={18}/>Log out</button>
    </aside>
    <div className="lg:pl-64"><header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6"><button className="rounded-xl p-2 hover:bg-slate-100 lg:hidden" onClick={()=>setOpen(true)} aria-label="Open menu"><Menu size={22}/></button><div className="hidden text-sm font-semibold text-slate-400 sm:block">{path.replace("/","").replaceAll("/"," • ")||"Dashboard"}</div><div className="flex items-center gap-3"><Link href="/notifications" className="relative rounded-xl p-2 hover:bg-slate-100"><Bell size={19}/><span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-sky-500"/></Link><Link href="/settings" className="flex items-center gap-2"><div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky-100 to-slate-100 text-sm font-bold">K</div><span className="hidden text-sm font-semibold sm:block">Khushi</span></Link></div></header><main className="p-4 sm:p-6">{children}</main></div>
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-slate-200 bg-white/95 p-2 backdrop-blur lg:hidden">{items.slice(0,5).map(([label,href,Icon])=> <Link key={href} href={href} className={`flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-semibold ${path===href?"text-sky-600":"text-slate-400"}`}><Icon size={19}/>{label}</Link>)}</nav>
  </div>
}
