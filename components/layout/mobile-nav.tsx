"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { mainNavigation } from "./navigation";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="Open navigation menu"
        className="group inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 xl:hidden"
      >
        <MenuIcon
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover:scale-105"
        />
        <span>Menu</span>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[min(100%,24rem)] gap-0 overflow-y-auto"
      >
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>

        <SheetDescription className="sr-only">
          Navigate the Juhudi Foundation website.
        </SheetDescription>

        <nav
          aria-label="Mobile navigation"
          className="flex flex-1 flex-col px-4 pb-5 pt-14"
        >
          <div className="flex flex-col">
            {mainNavigation.map((item) => (
              <SheetClose
                key={item.href}
                nativeButton={false}
                render={
                  <Link
                    href={item.href}
                    className="flex min-h-12 items-center border-b border-border/70 px-2 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                }
              >
                {item.label}
              </SheetClose>
            ))}
          </div>

          <div className="mt-6">
            <SheetClose
              nativeButton={false}
              render={
                <Link
                  href="/contribute"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "min-h-12 w-full font-semibold",
                  )}
                />
              }
            >
              Contribute
            </SheetClose>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
