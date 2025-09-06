
import { LayoutProps } from "../../types";
import AuthGuard from "@/components/auth/guards/AuthGuard";

const Layout = ({ children }: LayoutProps) => {
  return <AuthGuard>{children}</AuthGuard>;
};
export default Layout;
