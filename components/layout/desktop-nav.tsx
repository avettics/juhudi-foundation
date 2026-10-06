import Link from "next/link";

import { mainNavigation } from "./navigation";

export function DesktopNav() {
  return (
    <nav
      aria-label="Primary navigation"
      className="hidden xl:flex xl:items-center xl:gap-0.5"
    >
      {mainNavigation.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
