"use client";
import { useOrganization } from "@clerk/nextjs";
import AuthLayout from "../layouts/AuthLayout";
import { LayoutProps } from "@/types";
import OrgSelectView from "../views/OrgSelectView";
const OrganizationGuard = ({ children }: LayoutProps) => {
  const { organization } = useOrganization();
if (!organization) {
  return (
    <AuthLayout>
      <OrgSelectView />
    </AuthLayout>
  );
}
  return <>{children}</>;
};
export default OrganizationGuard;