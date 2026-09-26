import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import type { AppState } from "@/lib/storage";
import type { CalendarEvent, ClothingItem, Feedback, HistoryEntry, NotificationItem, Outfit, UserProfile } from "@/types";

const collections = ["wardrobe","outfits","calendar","history","notifications","chatHistory","feedback","shoppingAnalysis"] as const;

export async function loadRemoteState(db:any, uid:string, fallback:AppState):Promise<AppState>{
  const base:AppState={...fallback,user:{...fallback.user,userId:uid}};
  for (const name of collections){
    const snap=await getDocs(query(collection(db,name),where("userId","==",uid)));
    const docs=snap.docs.map((d:any)=>d.data());
    if(name==="wardrobe") base.wardrobe=docs as ClothingItem[];
    if(name==="outfits") base.outfits=docs as Outfit[];
    if(name==="calendar") base.calendar=docs as CalendarEvent[];
    if(name==="history") base.history=docs as HistoryEntry[];
    if(name==="notifications") base.notifications=docs as NotificationItem[];
    if(name==="feedback") base.feedback=docs as Feedback[];
  }
  const userSnap=await getDocs(query(collection(db,"users"),where("userId","==",uid)));
  if(!userSnap.empty) base.user=userSnap.docs[0].data() as UserProfile;
  else base.user={...base.user,userId:uid};
  return base;
}

export async function saveRemoteState(db:any, state:AppState){
  await setDoc(doc(db,"users",state.user.userId),state.user,{merge:true});
  const entries:[string,Array<Record<string,unknown>>][]=[
    ["wardrobe",state.wardrobe as any], ["outfits",state.outfits as any], ["calendar",state.calendar as any],
    ["history",state.history as any], ["notifications",state.notifications as any], ["feedback",state.feedback as any]
  ];
  for(const [name,items] of entries){
    for(const item of items){ const id=String((item as any).id||crypto.randomUUID()); await setDoc(doc(db,name,id),item,{merge:true}); }
  }
}
