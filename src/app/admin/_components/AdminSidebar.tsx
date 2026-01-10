"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Users, Menu, LogOut, Settings } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { authClient } from "~/server/better-auth/client";
import Image from "next/image";

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  const navItems = [
    {
      label: "Jobs Management",
      icon: LayoutDashboard,
      href: "/admin/jobs",
    },
    {
      label: "Applicants",
      icon: Users,
      href: "/admin/applicants",
    },
    {
      label: "Application Configs",
      icon: Settings,
      href: "/admin/configs",
    },
  ];

  const SidebarContent = () => (
    <nav className="flex-1 space-y-2 py-4">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className="mb-1 w-full justify-start"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* MOBILE HEADER */}
      <header className="z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white p-4 md:hidden">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden">
            <Image
              src="/assets/dharvista-logo.jpg"
              alt="Logo"
              width={48}
              height={48}
              className="h-full w-full object-cover mix-blend-multiply"
            />
          </div>
          <span className="text-primary text-xl font-black tracking-[1.5px] uppercase">
            DHARVISTA
          </span>
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="text-primary h-8 w-8" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex w-64 flex-col p-0">
            <div className="text-primary border-b p-6 text-lg font-bold uppercase">
              Menu
            </div>
            <div className="flex-1 p-4">
              <SidebarContent />
            </div>
            <div className="border-t p-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* DESKTOP SIDEBAR */}
      <aside className="z-10 hidden h-full w-72 flex-col border-r border-gray-200 bg-white md:flex">
        <div className="flex flex-col items-center gap-2 border-b border-gray-100 p-6 text-center">
          <div className="relative h-20 w-20 overflow-hidden transition-transform hover:scale-105">
            <Image
              src="/assets/dharvista-logo.jpg"
              alt="Logo"
              width={80}
              height={80}
              className="h-full w-full object-cover mix-blend-multiply"
            />
          </div>
          <div>
            <h2 className="text-primary text-2xl leading-none font-black tracking-[1.5px] uppercase">
              DHARVISTA
            </h2>
            <p className="mt-1 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
              Admin Portal
            </p>
          </div>
        </div>

        <div className="flex-1 p-4">
          <SidebarContent />
        </div>

        <div className="border-t border-gray-100 p-4">
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
