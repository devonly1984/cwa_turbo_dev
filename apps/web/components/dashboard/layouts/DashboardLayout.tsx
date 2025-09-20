import Guards from "@/components/auth/Guards";
import { LayoutProps } from "@/types";
import {SidebarProvider} from '@workspace/ui/components/sidebar'
import {cookies as getCookies} from 'next/headers';
import DashboardSidebar from "../DashboardSidebar";
const DashboardLayout = async({ 
  children }: LayoutProps) => {
    const cookieStore = await getCookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <Guards>
      <SidebarProvider defaultOpen={defaultOpen}>
        <DashboardSidebar />
        <main className="flex flex-1 flex-col">{children}</main>
      </SidebarProvider>
    </Guards>
  );
};
export default DashboardLayout;
