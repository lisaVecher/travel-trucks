"use client";

import { useState, type ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            color: "#101828",
            background: "#fff",
            border: "1px solid #dadde1",
            fontFamily: "var(--font-family)",
          },
          success: {
            iconTheme: {
              primary: "#829b91",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#e44848",
              secondary: "#fff",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}
