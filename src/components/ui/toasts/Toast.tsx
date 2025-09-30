"use client";

import * as react from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import {cva, type VariantProps} from "class-variance-authority";
import{ cn } from "@/utils/cn";


const toastVariants = cva (
 "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-4 pr-6 shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200",
        destructive: "bg-red-600 text-white border-red-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ToastProps
    extends react.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof toastVariants> {}


const Toast = react.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, ...props }, ref) => (
    <div ref={ref} className={cn(toastVariants({ variant }), className)} {...props} />
  )
);
Toast.displayName = "Toast";

export default Toast;