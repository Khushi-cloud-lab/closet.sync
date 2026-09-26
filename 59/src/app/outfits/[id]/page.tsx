import { Protected } from "@/components/Protected"; import { OutfitEditorPage } from "@/components/ProductPages";
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;return <Protected><OutfitEditorPage id={id}/></Protected>}
