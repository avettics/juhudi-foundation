"use client";

import { useSyncExternalStore } from "react";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";

type RevealProps = Omit<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "whileInView" | "viewport" | "transition"
> & {
  delay?: number;
  distance?: number;
};

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 24,
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const hydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const animate = hydrated && shouldReduceMotion === false;

  return (
    <motion.div
      {...props}
      className={cn("min-w-0", className)}
      initial={false}
      animate={animate ? { opacity: 0, y: distance } : { opacity: 1, y: 0 }}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{
        once: true,
        amount: "some",
      }}
      transition={
        !animate
          ? { duration: 0 }
          : {
              duration: 0.6,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }
      }
    >
      {children}
    </motion.div>
  );
}
