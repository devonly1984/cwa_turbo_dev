"use client";
import { accountItems  } from "@/constants";
import { SidebarGroupsProps } from "@/types";
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";


const AccountGroup = ({  isActive }: SidebarGroupsProps) => {
  return (
    <>
      <SidebarGroupLabel>Account</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {accountItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={cn(
                  isActive(item.url) &&
                    "bg-gradient-to-b from-sidebar-primary to-[#0b63f3]! text-sidebar-primary-foreground! hover:to-[#0b63f3]/90!"
                )}
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
export default AccountGroup
