"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/Providers";
import { AppShell } from "@/components/Sidebar";
import { isDemoMode } from "@/lib/config";

export function Protected({ children }:{children:React.ReactNode}){
  const {loading,user}=useAuth(); const router=useRouter(); const path=usePathname();
  useEffect(()=>{ if(!loading && !user) router.replace(`/login?next=${encodeURIComponent(path)}`); },[loading,user,router,path]);
  if(loading) return <div className="grid min-h-screen place-items-center bg-slate-50"><div className="rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-slate-600 shadow-sm">Loading ClosetSync…</div></div>;
  if(!user && !isDemoMode) return null;
  return <AppShell>{children}</AppShell>;
}
