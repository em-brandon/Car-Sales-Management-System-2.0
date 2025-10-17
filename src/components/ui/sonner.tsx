"use client";

// Import the Toaster component from the Sonner library.
// This will be used to display toast notifications in the app.
import { Toaster as Sonner } from "sonner";

/**
 * Toaster component
 * -----------------
 * This component renders the Sonner toast notification system.
 * It should be included once in your Next.js app (usually in layout.tsx)
 * to enable toasts globally.
 */
export function Toaster() {
  return (
    <Sonner
      // Position of the toast notifications (e.g., top-right, bottom-left)
      position="top-right"

      // Use system theme preference (auto-switches between dark/light mode)
      theme="system"

      // Enables vibrant toast colors for success, error, etc.
      richColors

      // Adds a close (×) button to each toast
      closeButton

      // Expands multiple toasts vertically instead of stacking tightly
      expand

      // Default duration for toast visibility (in milliseconds)
      duration={4000}

      // Custom styling for all toasts
      toastOptions={{
        style: {
          // Rounded corners for a modern look
          borderRadius: "0.5rem",

          // Uses Tailwind CSS variables for background and text colors
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",

          // Adds subtle border and shadow for visual depth
          border: "1px solid hsl(var(--border))",
          boxShadow:
            "0 4px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)",
        },
      }}
    />
  );
}
