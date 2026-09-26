import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/Providers";

export const metadata: Metadata = {
  title: "ClosetSync — Your Smart AI Wardrobe Companion",
  description: "Organise your wardrobe, plan outfits and make smarter fashion decisions.",
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body><AppProviders>{children}</AppProviders></body></html>;
}
