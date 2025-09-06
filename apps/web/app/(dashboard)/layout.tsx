import AuthGuard from "@/components/auth/guards/AuthGuard";
import { LayoutProps } from "../types";
import OrganizationGuard from "@/components/auth/guards/OrganizationGuard";

const Layout = ({children}:LayoutProps) => {
  return (
    <AuthGuard>
      <OrganizationGuard>{children}</OrganizationGuard>
    </AuthGuard>
  );
};
export default Layout;
