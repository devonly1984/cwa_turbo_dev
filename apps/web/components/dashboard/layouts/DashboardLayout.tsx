import { AuthGuard, OrganizationGuard } from "@/components/auth/guards";
import { LayoutProps } from "@/types";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import {cookies as getCookies} from 'next/headers'
import DashboardSidebar from "./DashboardSidebar";
import { SIDEBAR_COOKIE_NAME } from "@/constants";
import {Provider as JotaiProvider} from 'jotai'
const DashboardLayout = async({ children }: LayoutProps) => {
    const cookieStore = await getCookies();
    const defaultOpen =
      cookieStore.get(SIDEBAR_COOKIE_NAME)?.value === "true";

  return (
    <AuthGuard>
      <OrganizationGuard>
        <JotaiProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <DashboardSidebar />
          <main className="flex flex-1 flex-col">{children}</main>
        </SidebarProvider>
        </JotaiProvider>
      </OrganizationGuard>
    </AuthGuard>
  );
};
export default DashboardLayout;
