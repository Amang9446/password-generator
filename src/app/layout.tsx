import { Bricolage_Grotesque } from "next/font/google";
import { Space_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from 'sonner';
import "./globals.css";
import { ReactNode } from "react";

const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: "400",
});
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn("antialiased", fontHeading.variable, fontBody.variable)}
      >
        {children}
        <Toaster
         toastOptions={{
          style: {
            background: '#001F3D',
            fontSize: '15px',
            color: 'white'
          },
          className: 'class',
        }}
        position="top-center" />
      </body>
    </html>
  );
}
