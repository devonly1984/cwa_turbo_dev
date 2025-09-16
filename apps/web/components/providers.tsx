"use client"

import { LayoutProps } from "@/types";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {useAuth} from '@clerk/nextjs'


export const Providers = ({ children }: LayoutProps) => {
  const client = new ConvexReactClient(
    process.env.NEXT_PUBLIC_CONVEX_URL!
  );
  return (
    <ConvexProviderWithClerk client={client} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
};
