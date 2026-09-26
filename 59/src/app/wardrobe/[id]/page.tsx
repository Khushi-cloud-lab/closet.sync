import { Protected } from "@/components/Protected"; import { ClothingDetailsPage } from "@/components/ProductPages";
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;return <Protected><ClothingDetailsPage id={id}/></Protected>}
