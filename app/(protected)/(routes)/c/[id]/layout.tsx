import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { HeaderNav } from "@/components/header-nav";

export const metadata: Metadata = {
  title: "Avoca AI",
  description:
    "Avoca AI is a cutting-edge technology company specializing in artificial intelligence solutions to drive innovation and efficiency.",
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "350px",
            } as React.CSSProperties
          }
        >
          <div className="flex h-screen overflow-hidden">
            <HeaderNav />
            <AppSidebar />
            <div className="flex-1 overflow-hidden">{children}</div>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
