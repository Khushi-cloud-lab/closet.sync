"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, firebaseConfigured, googleProvider } from "@/lib/firebase";
import { isDemoMode } from "@/lib/config";
import { defaultState, emptyState, loadState, saveState, type AppState } from "@/lib/storage";
import { loadRemoteState, saveRemoteState } from "@/lib/firestore";
import { db } from "@/lib/firebase";

const AuthContext = createContext<{ loading: boolean; user: { uid: string; email: string|null; displayName: string|null }|null; login:(email:string,password:string)=>Promise<void>; signup:(email:string,password:string,name:string)=>Promise<void>; google:()=>Promise<void>; logout:()=>Promise<void>; } | null>(null);
const StateContext = createContext<{ state: AppState; setState: React.Dispatch<React.SetStateAction<AppState>> } | null>(null);

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [loading,setLoading] = useState(true);
  const [authUser,setAuthUser] = useState<{uid:string; email:string|null; displayName:string|null}|null>(null);
  const [state,setState] = useState<AppState>(defaultState);
  const [hydrated,setHydrated] = useState(isDemoMode);

  useEffect(() => {
    if (isDemoMode) {
      const loaded = loadState();
      setState(loaded);
      setAuthUser({uid: loaded.user.userId, email: loaded.user.email, displayName: loaded.user.fullName});
      setLoading(false);
      return;
    }
    if (!auth || !firebaseConfigured) { setLoading(false); return; }
    return onAuthStateChanged(auth, async u => {
      if (u) {
        setAuthUser({uid:u.uid,email:u.email,displayName:u.displayName});
        if (db) {
          try {
            const remote = await loadRemoteState(db,u.uid,emptyState);
            remote.user={...remote.user,userId:u.uid,email:u.email||remote.user.email,fullName:u.displayName||remote.user.fullName||"ClosetSync User"};
            setState(remote);
          } catch {
            setState(s=>({...s,user:{...emptyState.user,userId:u.uid,email:u.email||"",fullName:u.displayName||"ClosetSync User"}}));
          }
        }
      } else { setAuthUser(null); setState(emptyState); }
      setHydrated(true);
      setLoading(false);
    });
  }, []);

  useEffect(() => { if (isDemoMode) saveState(state); }, [state]);
  useEffect(() => { if (!isDemoMode && hydrated && authUser && db) { saveRemoteState(db,state).catch(()=>{}); } }, [state,hydrated,authUser]);

  const value = useMemo(() => ({
    loading,
    user: authUser,
    async login(email:string,password:string){
      if (isDemoMode) { const current = loadState(); setState(s=>({...s,user:{...s.user,email,fullName:s.user.fullName||email.split("@")[0],userId:"demo-user"}})); setAuthUser({uid:"demo-user",email,displayName:current.user.fullName||email.split("@")[0]}); return; }
      if (!auth) throw new Error("Firebase is not configured.");
      await signInWithEmailAndPassword(auth,email,password);
    },
    async signup(email:string,password:string,name:string){
      if (isDemoMode) { const user={...emptyState.user,userId:"demo-user",email,fullName:name,onboardingCompleted:false}; const fresh={...emptyState,user,notifications:[],wardrobe:[],outfits:[],calendar:[],history:[],feedback:[]}; setState(fresh); saveState(fresh); setAuthUser({uid:"demo-user",email,displayName:name}); return; }
      if (!auth) throw new Error("Firebase is not configured.");
      const credential = await createUserWithEmailAndPassword(auth,email,password);
      if (credential.user) await updateProfile(credential.user, { displayName: name });
    },
    async google(){
      if (isDemoMode) { setAuthUser({uid:"demo-user",email:"demo@closetsync.app",displayName:state.user.fullName}); return; }
      if (!auth) throw new Error("Firebase is not configured.");
      await signInWithPopup(auth, googleProvider);
    },
    async logout(){
      if (isDemoMode) { setAuthUser(null); return; }
      if (auth) await signOut(auth);
    }
  }), [loading,authUser,state.user.fullName]);

  return <AuthContext.Provider value={value}><StateContext.Provider value={{state,setState}}>{children}</StateContext.Provider></AuthContext.Provider>;
}

export function useAuth(){ const ctx=useContext(AuthContext); if(!ctx) throw new Error("useAuth must be used inside AppProviders"); return ctx; }
export function useAppState(){ const ctx=useContext(StateContext); if(!ctx) throw new Error("useAppState must be used inside AppProviders"); return ctx; }
