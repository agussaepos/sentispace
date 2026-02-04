import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        // Severity variants
        critical:
          "border-transparent bg-severity-critical-bg text-severity-critical hover:bg-severity-critical-bg/80 border border-severity-critical/20",
        high: "border-transparent bg-severity-high-bg text-severity-high hover:bg-severity-high-bg/80 border border-severity-high/20",
        medium:
          "border-transparent bg-severity-medium-bg text-severity-medium hover:bg-severity-medium-bg/80 border border-severity-medium/20",
        low: "border-transparent bg-severity-low-bg text-severity-low hover:bg-severity-low-bg/80 border border-severity-low/20",
        info: "border-transparent bg-severity-info-bg text-severity-info hover:bg-severity-info-bg/80 border border-severity-info/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
