"use client";

import { Button } from "@/components/ui/button";
import { signInWithInstagram, signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { Instagram, LogOut } from "lucide-react";

export function AuthButton({ user }: { user: any }) {
  const router = useRouter();

  const handleSignIn = async () => {
    await signInWithInstagram();
  };

  const handleSignOut = async () => {
    await signOut();
    router.refresh();
  };

  return user ? (
    <Button variant="outline" onClick={handleSignOut}>
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  ) : (
    <Button onClick={handleSignIn}>
      <Instagram className="mr-2 h-4 w-4" />
      Sign in with Instagram
    </Button>
  );
}