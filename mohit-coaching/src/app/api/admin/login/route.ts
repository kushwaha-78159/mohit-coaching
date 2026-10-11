import { NextResponse } from "next/server";
import { tokenFor } from "@/lib/store";
export async function POST(req:Request){
 const {email,password}=await req.json();
 if(!process.env.ADMIN_EMAIL||!process.env.ADMIN_PASSWORD||!process.env.AUTH_SECRET)return NextResponse.json({error:"Set ADMIN_EMAIL, ADMIN_PASSWORD and AUTH_SECRET in .env.local first."},{status:500});
 if(email!==process.env.ADMIN_EMAIL||password!==process.env.ADMIN_PASSWORD)return NextResponse.json({error:"Incorrect email or password."},{status:401});
 const res=NextResponse.json({ok:true});
 res.cookies.set("mcc_admin",tokenFor(process.env.ADMIN_PASSWORD),{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"strict",path:"/",maxAge:60*60*8});
 return res;
}
