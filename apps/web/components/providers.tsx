"use client"



import { ReactNode } from "react";
import { ConvexProvider,ConvexReactClient } from "convex/react";

interface ProvidersProps {
  children: ReactNode;
}
export function Providers({ children }: ProvidersProps) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
