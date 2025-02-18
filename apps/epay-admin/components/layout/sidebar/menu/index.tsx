"use client";

import { ITreeMenu, useMenu } from "@refinedev/core";
import { ChevronRight } from "lucide-react";
import React, { cloneElement } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../ui/collapsible";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "../../../ui/sidebar";

interface Props {
  label: string;
  menuItems: ITreeMenu[]
}

export const Menu = ({ label, menuItems }: Props) => {
  const { selectedKey } = useMenu();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {menuItems.map(({ key, children, list, meta }) => {
          const isSelected = key === selectedKey;
          const Icon: React.ReactElement = meta?.icon ? cloneElement(meta?.icon as any, { color: isSelected ? "#e04e61" : "" }) : <></>

          if (!list) {
            return <Collapsible
              key={meta?.label}
              asChild
              defaultOpen={false}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton isActive={isSelected} tooltip={meta?.label}>
                    {Icon}
                    <span>{meta?.label}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {children?.map((child) => {
                      const isSelected = child.key === selectedKey;
                      return (
                        <SidebarMenuSubItem key={child.meta?.label}>
                          <SidebarMenuSubButton isActive={isSelected} asChild>
                            <a href={child.list as string}>
                              <span>{child.meta?.label}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          }

          return <SidebarMenuItem key={meta?.label}>
            <SidebarMenuButton isActive={isSelected} asChild>
              <a href={list as string}>
                {Icon}
                <span className={isSelected ? "text-[#e04e61]" : ''}>{meta?.label}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};
