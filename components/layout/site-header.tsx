import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/common/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <Container>
        <div className="flex h-16 min-w-0 items-center justify-between gap-4 xl:grid xl:grid-cols-[1fr_auto_1fr]">
          <Link
            href="/"
            aria-label="Juhudi Foundation home"
            className="shrink-0 rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 xl:justify-self-start"
          >
            <Image
              src="/brand/juhudi-logo-header.svg"
              alt="Juhudi Foundation"
              width={2993}
              height={1415}
              loading="eager"
              className="h-10 w-auto sm:h-11"
            />
          </Link>

          <DesktopNav />

          <div className="flex shrink-0 items-center xl:justify-self-end">
            <Link
              href="/contribute"
              className={cn(
                buttonVariants({ size: "lg" }),
                "hidden min-h-11 px-5 font-semibold xl:inline-flex",
              )}
            >
              Contribute
            </Link>

            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
