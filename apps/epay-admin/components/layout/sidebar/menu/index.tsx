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
          const isSelected = key === selectedKey || !!children.find((child) => child.key === selectedKey);
          const Icon: React.ReactElement = meta?.icon ? cloneElement(meta?.icon as React.DetailedReactHTMLElement<{
            color: string;
          }, HTMLElement>, { color: isSelected ? "#e04e61" : "#3F3F46" }) : <></>

          if (!list) {
            return <Collapsible
              key={meta?.label}
              asChild
              defaultOpen={isSelected}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton isActive={isSelected} tooltip={meta?.label}>
                    {Icon}
                    <span className={isSelected ? "text-primary" : ''}>{meta?.label}</span>
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
                              <span className={isSelected ? "text-primary" : ''}>{child.meta?.label}</span>
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
            <SidebarMenuButton tooltip={meta?.label} isActive={isSelected} asChild>
              <a href={list as string}>
                {Icon}
                <span className={isSelected ? "text-primary" : ''}>{meta?.label}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};
