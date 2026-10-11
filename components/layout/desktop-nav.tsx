import Link from "next/link";

import { mainNavigation } from "./navigation";

export function DesktopNav() {
  return (
    <nav
      aria-label="Primary navigation"
      className="hidden xl:flex xl:items-center xl:gap-1"
    >
      {mainNavigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
