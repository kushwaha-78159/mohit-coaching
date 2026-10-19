import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const file = path.join(process.cwd(),"data","site-data.json");
export type RecordItem = {id:string;kind:string;status:string;createdAt:string;[key:string]:unknown};
export type Store = {about:string;contact:{address:string;phone:string;phone2:string;email:string};gallery:string[];registrations:RecordItem[];messages:RecordItem[]};
const initial:Store = {
 about:"Mohit Coaching Centre, located in Faridabad, Haryana, is dedicated to helping students from Class 6th to 12th achieve academic excellence. We offer Science, Mathematics, Commerce and Accounting coaching with a focus on personal attention and strong fundamentals.",
 contact:{address:"Faridabad, Haryana, India",phone:"9873566144",phone2:"9319422132",email:"mohitcoachingcentre126@gmail.com"},
 gallery:["sir1.png","sir2.jpg","sir3.jpg","sir4.jpg","sir5.jpg","sir6.jpg","sir7.jpg","sir8.jpg"],
 registrations:[],messages:[]
};
export async function readStore():Promise<Store>{
 await fs.mkdir(path.dirname(file),{recursive:true});
 try{return {...initial,...JSON.parse(await fs.readFile(file,"utf8"))};}
 catch {await fs.writeFile(file,JSON.stringify(initial,null,2));return initial;}
}
export async function writeStore(data:Store){await fs.mkdir(path.dirname(file),{recursive:true});await fs.writeFile(file,JSON.stringify(data,null,2));}
export function tokenFor(password:string){return crypto.createHmac("sha256",process.env.AUTH_SECRET||"replace-this-secret").update(password).digest("hex");}
export function isAdmin(cookie:string|undefined){if(!cookie)return false;const expected=tokenFor(process.env.ADMIN_PASSWORD||"");return cookie.length===expected.length&&crypto.timingSafeEqual(Buffer.from(cookie),Buffer.from(expected));}
export function newId(){return crypto.randomUUID();}
