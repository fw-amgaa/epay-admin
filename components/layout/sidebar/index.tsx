"use client";

import * as React from "react";

import { TeamSwitcher } from "@/components/layout/sidebar/team-switcher";
import { User } from "@/components/layout/sidebar/user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useMenu } from "@refinedev/core";
import EpayLogo from "./epay-logo";
import { Menu } from "./menu";

const data = {
  teams: [
    {
      name: "E-Pay",
      logo: EpayLogo,
      plan: "qPay dashboard",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { menuItems } = useMenu();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <Menu
          label="Систем"
          menuItems={menuItems.filter((item) => item.meta?.group === "system")}
        />
        {/* <Menu label="Хэрэглэгч" menuItems={menuItems.filter(item => item.meta?.group === "user")} /> */}
      </SidebarContent>
      <SidebarFooter>
        <User />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
