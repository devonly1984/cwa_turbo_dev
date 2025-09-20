import DashboardLayout from "@/components/dashboard/layouts/DashboardLayout";

import { LayoutProps } from "@/types";

const Layout = ({ children }: LayoutProps) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};
export default Layout;
