"use client";
import { configurationItems } from "@/constants";
import { SidebarGroupsProps } from "@/types";
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import Link from "next/link";


const CustomizationGroup = ({pathname,isActive}:SidebarGroupsProps) => {

  return (
    <>
      <SidebarGroupLabel>Configuration</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {configurationItems.map((item) => (
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
export default CustomizationGroup
