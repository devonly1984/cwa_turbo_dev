"use client"
import { OrganizationSwitcher,UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  
  SidebarFooter,
  
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import CustomerSupportGroup from "./sidebarGroups/CustomerSupportGroup";
import CustomizationGroup from "./sidebarGroups/CustomizationGroup";
import AccountGroup from "./sidebarGroups/AccountGroup";
const DashboardSidebar = () => {
  return (
    <Sidebar className="group" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <OrganizationSwitcher
                hidePersonal
                skipInvitationScreen
                appearance={{}}
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <CustomerSupportGroup />
        <CustomizationGroup />
        <AccountGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton showName />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
export default DashboardSidebar