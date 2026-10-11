import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={
 title:"Mohit Coaching Centre | Faridabad",
 description:"Academic coaching for Classes 6th to 12th in Faridabad, Haryana."
};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="en"><body>{children}</body></html>;
}
