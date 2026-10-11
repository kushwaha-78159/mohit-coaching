import { NextResponse } from "next/server";
import { readStore,writeStore,newId } from "@/lib/store";
export async function GET(){
 const s=await readStore();
 return NextResponse.json({about:s.about,contact:s.contact,gallery:s.gallery});
}
export async function POST(req:Request){
 try{
  const body=await req.json();const s=await readStore();const d=body.data||{};
  if(body.kind==="registration"){
   if(!String(d.studentName||"").trim()||!String(d.parentName||"").trim()||!String(d.phone||"").trim()||!String(d.className||"").trim())return NextResponse.json({error:"Please complete all required fields."},{status:400});
   s.registrations.unshift({id:newId(),kind:"registration",status:"NEW",createdAt:new Date().toISOString(),...d});
  }else if(body.kind==="contact"){
   if(!String(d.name||"").trim()||!String(d.message||"").trim())return NextResponse.json({error:"Please enter your name and message."},{status:400});
   s.messages.unshift({id:newId(),kind:"contact",status:"NEW",createdAt:new Date().toISOString(),...d});
  }else return NextResponse.json({error:"Invalid form."},{status:400});
  await writeStore(s);return NextResponse.json({ok:true});
 }catch{return NextResponse.json({error:"Unable to save your submission. Please try again."},{status:500});}
}
