
import { LayoutProps } from "../../types";
import { AuthGuard, OrganizationGuard } from "@/components/auth/guards";
const Layout = ({ children }: LayoutProps) => {
  return (
    <AuthGuard>
      <OrganizationGuard>{children}</OrganizationGuard>
    </AuthGuard>
  );
};
export default Layout;
