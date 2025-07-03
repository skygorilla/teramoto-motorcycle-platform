"use client";

import { LogIn, LogOut, UserCircle, UserPlus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { auth } from "@/lib/firebase/config";
import { signOut } from "firebase/auth";
import { Link, useRouter } from "@/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AuthButton() {
  const tNav = useTranslations("Navigation");
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      if (auth) {
        await signOut(auth);
        router.push("/"); // Redirect to home after sign out
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return <Button variant="ghost" size="sm" disabled>{tNav("Navigation.signin")}</Button>;
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || user.email || "User"} />
              <AvatarFallback>{user.email?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {user.displayName || user.email}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{tNav("signout")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" asChild>
        <Link href="/signin">
          <LogIn className="mr-2 h-4 w-4" />
          {tNav("signin")}
        </Link>
      </Button>
      <Button variant="default" size="sm" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
        <Link href="/signup">
          <UserPlus className="mr-2 h-4 w-4" />
          {tNav("signup")}
        </Link>
      </Button>
    </div>
  );
}
