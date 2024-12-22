"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user/user-nav";

export function NavigationMenu() {
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-8 md:px-12 container mx-auto">
        {/* Logo */}
        <Link href="/" className="mr-12">
          <h1 className="text-2xl font-bold">InfyCo</h1>
        </Link>

        {/* Center Navigation */}
        <div className="flex-1 flex justify-center items-center space-x-8">
          <Link href="/mentors" className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/mentors" ? "text-primary" : "text-muted-foreground"
          )}>
            Find Mentors
          </Link>
          <Link href="/peers" className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/peers" ? "text-primary" : "text-muted-foreground"
          )}>
            Peers
          </Link>
          <Link href="/events" className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/events" ? "text-primary" : "text-muted-foreground"
          )}>
            Events
          </Link>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center space-x-4">
          <UserNav />
          <Button className="bg-primary hover:bg-primary/90" asChild>
            <Link href="/signup">
              <span className="text-white">Sign up</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}