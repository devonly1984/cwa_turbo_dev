"use client";
import { customerSupportItems } from "@/constants";
import { SidebarGroupsProps } from "@/types";
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import Link from "next/link";


const CustomerSupportGroup = ({isActive}:SidebarGroupsProps) => {

  return (
    <>
      <SidebarGroupLabel>Customer Support</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {customerSupportItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={isActive(item.url)}
              >
                <Link href={item.url}>
                  <item.icon className="size-4 " />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </>
  );
};
export default CustomerSupportGroup;
