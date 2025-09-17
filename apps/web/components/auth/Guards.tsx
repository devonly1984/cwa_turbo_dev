import { AuthGuard, OrganizationGuard } from "../auth/guards/";
import { LayoutProps } from "@/types";
const Guards = ({ children }: LayoutProps) => {
  return (
    <AuthGuard>
      <OrganizationGuard>{children}</OrganizationGuard>
    </AuthGuard>
  );
};
export default Guards;
