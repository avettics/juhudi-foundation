"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";

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
        className="group inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 xl:hidden"
        aria-label="Open navigation menu"
      >
        <MenuIcon
          className="size-4 transition-transform duration-200 group-hover:scale-105"
          aria-hidden="true"
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
          className="flex flex-1 flex-col px-3 pb-4 pt-14 sm:px-4"
        >
          <div className="flex flex-col gap-1">
            {mainNavigation.map((item) => (
              <SheetClose
                key={item.href}
                nativeButton={false}
                render={
                  <Link
                    href={item.href}
                    className="flex min-h-11 items-center rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                }
              >
                {item.label}
              </SheetClose>
            ))}
          </div>

          <div className="mt-5 border-t pt-5">
            <SheetClose
              nativeButton={false}
              render={
                <Link
                  href="/contribute"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "min-h-11 w-full",
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
