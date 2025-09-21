"use client"

import { ConvexProvider, ConvexReactClient } from "convex/react";
import {ReactNode} from "react"
import {Provider as JotaiProvider} from 'jotai'

export function Providers({ children }: { children: ReactNode }) {
  const client = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
  return (
    <ConvexProvider client={client}>
      <JotaiProvider>{children}</JotaiProvider>
    </ConvexProvider>
  );
}
