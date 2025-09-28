import Guards from "@/components/auth/Guards";
import { LayoutProps } from "@/types";
import {SidebarProvider} from '@workspace/ui/components/sidebar'
import {cookies as getCookies} from 'next/headers';
import DashboardSidebar from "../DashboardSidebar";
import { SIDEBAR_COOKIE_NAME } from "@/constants";
import {Provider as JotaiProvider} from 'jotai'
import {Toaster} from '@workspace/ui/components/sonner'
const DashboardLayout = async({ 
  children }: LayoutProps) => {
    const cookieStore = await getCookies();
    const defaultOpen =
      cookieStore.get(SIDEBAR_COOKIE_NAME)?.value === "true";

  return (
    <Guards>
      <JotaiProvider>
        <SidebarProvider defaultOpen={defaultOpen}>
          <DashboardSidebar />
          <main className="flex flex-1 flex-col">{children}</main>
        </SidebarProvider>
        <Toaster/>
      </JotaiProvider>
    </Guards>
  );
};
export default DashboardLayout;
