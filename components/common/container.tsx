import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = ComponentPropsWithoutRef<"div">;

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto min-w-0 w-full max-w-7xl wrap-anywhere px-4 sm:px-6 lg:px-8 xl:px-10",
        className,
      )}
      {...props}
    />
  );
}
