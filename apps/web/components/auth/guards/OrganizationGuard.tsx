"use client";
import { useOrganization } from "@clerk/nextjs";
import AuthLayout from "../layouts/AuthLayout";
import { ReactNode } from "react";
import OrganizationSelectView from "../views/OrganizationSelectView";
const OrganizationGuard = ({ children }: { children: ReactNode }) => {
    const {organization} = useOrganization()
    if (!organization) {
      return (
        <AuthLayout>
          <OrganizationSelectView />
        </AuthLayout>
      );
    }
  return <>{children}</>;
};
export default OrganizationGuard;
