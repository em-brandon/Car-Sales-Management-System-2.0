"use client"

import { Toaster as Sonner } from "sonner"

export function Toaster() {
  return (
    <Sonner
      position="top-right"    // Top-right corner of the screen
      richColors              // Enables nicer success/error/info colors
      closeButton             // Adds a close (X) button on each toast
      expand                  // Allows multiple toasts to stack naturally
      visibleToasts={3}       // Maximum number of visible toasts
      toastOptions={{
        duration: 4000,       // Each toast disappears after 4 seconds
      }}
    />
  )
}
