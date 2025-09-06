"use client"



import { ConvexProvider, ConvexReactClient } from "convex/react"
import { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  const convex = new ConvexReactClient(
    process.env.NEXT_PUBLIC_CONVEX_URL!
  );
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
