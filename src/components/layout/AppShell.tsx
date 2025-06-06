
import type { ReactNode } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Header } from "./Header";
import { SidebarNav } from "./SidebarNav";
import { Logo } from "@/components/shared/Logo";
import { Footer } from "./Footer"; // Import the Footer component

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen flex-col bg-background">
        <Sidebar side="left" variant="sidebar" collapsible="icon">
          <SidebarHeader className="p-4 hidden md:flex justify-center">
             <Logo />
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="flex flex-1 flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-8">
            {children}
          </main>
          <Footer /> 
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
