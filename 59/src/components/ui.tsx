"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Button({ children, variant = "primary", className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary"|"secondary"|"ghost"|"danger" }) {
  const styles = { primary: "bg-slate-950 text-white hover:bg-slate-800", secondary: "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50", ghost: "text-slate-600 hover:bg-slate-100", danger: "bg-red-600 text-white hover:bg-red-700" };
  return <button className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`} {...props}>{children}</button>;
}

export function Card({ children, className = "", animate = true }: { children: ReactNode; className?: string; animate?: boolean }) {
  const content = <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.05)] ${className}`}>{children}</div>;
  if (!animate) return content;
  return <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }}>{content}</motion.div>;
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div><p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-sky-600">{eyebrow ?? "ClosetSync"}</p><h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{title}</h1>{description && <p className="mt-2 max-w-2xl text-sm text-slate-500">{description}</p>}</div>
    {action}
  </div>;
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral"|"green"|"orange"|"red"|"blue" }) {
  const cls = { neutral:"bg-slate-100 text-slate-600", green:"bg-emerald-50 text-emerald-700", orange:"bg-orange-50 text-orange-700", red:"bg-red-50 text-red-700", blue:"bg-sky-50 text-sky-700" };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${cls[tone]}`}>{children}</span>;
}

export function Skeleton({ className="h-4 w-full" }: { className?: string }) { return <div className={`animate-pulse rounded-lg bg-slate-100 ${className}`} />; }

export function EmptyState({ icon, title, description, action }: { icon?: ReactNode; title: string; description: string; action?: ReactNode }) {
  return <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">{icon && <div className="mb-4 rounded-2xl bg-white p-4 text-sky-600 shadow-sm">{icon}</div>}<h3 className="text-base font-bold text-slate-900">{title}</h3><p className="mt-2 max-w-md text-sm text-slate-500">{description}</p>{action && <div className="mt-5">{action}</div>}</div>;
}

export function Progress({ value }: { value: number }) { return <div className="h-2 overflow-hidden rounded-full bg-slate-100"><motion.div initial={{ width: 0 }} animate={{ width: `${Math.max(0,Math.min(value,100))}%` }} className="h-full rounded-full bg-sky-500" /></div>; }
