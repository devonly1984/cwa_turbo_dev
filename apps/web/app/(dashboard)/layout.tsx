import AuthGuard from "@/components/auth/guards/AuthGuard"
import OrganizationGuard from "@/components/auth/guards/OrganizationGuard";
import DashboardLayout from "@/components/dashboard/layouts/DashboardLayout";
import { ReactNode } from "react"

const Layout = ({children}:{children:ReactNode}) => {
  return <DashboardLayout>{children}</DashboardLayout>;
}
export default Layout