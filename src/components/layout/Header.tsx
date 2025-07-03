
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { AuthButton } from "@/components/auth/AuthButton";
import { Logo } from "@/components/shared/Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden" />
          <div className="md:hidden">
            <Logo />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <AuthButton />
        </div>
      </div>
    </header>
  );
}

