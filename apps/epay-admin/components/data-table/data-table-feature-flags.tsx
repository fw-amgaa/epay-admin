"use client";

import { useQueryState } from "nuqs";
import * as React from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type DataTableConfig, dataTableConfig } from "@/config/data-table";

type FeatureFlagValue = DataTableConfig["featureFlags"][number]["value"];

interface FeatureFlagsContextProps {
  featureFlags: FeatureFlagValue[];
  setFeatureFlags: (value: FeatureFlagValue[]) => void;
}

const FeatureFlagsContext = React.createContext<FeatureFlagsContextProps>({
  featureFlags: [],
  setFeatureFlags: () => { },
});

export function useFeatureFlags() {
  const context = React.useContext(FeatureFlagsContext);
  if (!context) {
    throw new Error("useFeatureFlags must be used within a FeatureFlagsProvider");
  }
  return context;
}

export function FeatureFlagsProvider({ children }: React.PropsWithChildren) {
  const [featureFlags, setFeatureFlags] = useQueryState<FeatureFlagValue[]>(
    "featureFlags",
    {
      defaultValue: [],
      parse: (value) => value.split(",") as FeatureFlagValue[],
      serialize: (value) => value.join(","),
      eq: (a, b) =>
        a.length === b.length && a.every((value, index) => value === b[index]),
      clearOnDefault: true,
    },
  );

  return (
    <FeatureFlagsContext.Provider
      value={{
        featureFlags,
        setFeatureFlags: (value) => void setFeatureFlags(value),
      }}
    >
      {children}
    </FeatureFlagsContext.Provider>
  );
}

export function FeatureFlags() {
  const { featureFlags, setFeatureFlags } = useFeatureFlags();

  return <ToggleGroup
    type="multiple"
    variant="outline"
    size="sm"
    value={featureFlags}
    onValueChange={(value: FeatureFlagValue[]) => setFeatureFlags(value)}
    className="w-fit"
  >
    {dataTableConfig.featureFlags.map((flag) => (
      <Tooltip key={flag.value}>
        <ToggleGroupItem
          value={flag.value}
          className="whitespace-nowrap px-3 text-xs"
          asChild
        >
          <TooltipTrigger>
            <flag.icon
              className="size-3.5 shrink-0"
              aria-hidden="true"
            />
            {/* {flag.label} */}
          </TooltipTrigger>
        </ToggleGroupItem>
        <TooltipContent
          align="start"
          side="bottom"
          sideOffset={6}
          className="flex max-w-60 flex-col space-y-1.5 border bg-background py-2 font-semibold text-foreground"
        >
          <div>{flag.tooltipTitle}</div>
          <div className="text-muted-foreground text-xs">
            {flag.tooltipDescription}
          </div>
        </TooltipContent>
      </Tooltip>
    ))}
  </ToggleGroup>
}