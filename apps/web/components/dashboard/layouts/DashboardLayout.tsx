import { AuthGuard, OrganizationGuard } from "@/components/auth/guards";
import { ReactNode } from "react";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { cookies as getCookies } from "next/headers";
import DashboardSidebar from "./DashboardSidebar";
import {Provider as JotaiProvider} from 'jotai'
const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const cookieStore = await getCookies();
  const defaultOpen = cookieStore.get("sidebar_status")?.value === "true";

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
