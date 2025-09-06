"use client";
import { configurationItems } from "@/constants";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ConfigurationGroup = () => {
      const pathname = usePathname();
      const isActive = (url: string) => {
        if (url === "/") {
          return pathname === "/";
        }
        return pathname.startsWith(url);
      };
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Configuration</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {configurationItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.url)}
                className={cn(
                  isActive(item.url) &&
                    "bg-gradient-to-b from-sidebar-primary to-[#0b63f3]! text-sidebar-primary-foreground! hover:to-[#0b63f3]/90!"
                )}
                tooltip={item.title}
              >
                <Link href={item.url}>
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
export default ConfigurationGroup;
