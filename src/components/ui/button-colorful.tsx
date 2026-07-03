"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";

export interface ButtonColorfulProps extends ButtonProps {
  icon?: React.ReactNode;
}

const ButtonColorful = React.forwardRef<HTMLButtonElement, ButtonColorfulProps>(
  ({ className, variant = "default", icon, children, asChild, ...props }, ref) => {
    return (
      <Magnetic className={cn("group relative inline-block", className)}>
        <div
          className={cn(
            "pointer-events-none absolute -inset-2 rounded-full bg-gold opacity-40 blur-lg transition-opacity duration-500 group-hover:opacity-80"
          )}
        />

        <Button
          ref={ref}
          variant={variant}
          asChild={asChild}
          className="relative z-10 h-full w-full"
          {...props}
        >
          {asChild ? (
            children
          ) : (
            <span className="inline-flex items-center gap-2">
              {children}
              {icon}
            </span>
          )}
        </Button>
      </Magnetic>
    );
  }
);
ButtonColorful.displayName = "ButtonColorful";

export { ButtonColorful };
