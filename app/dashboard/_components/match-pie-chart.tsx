"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { bankOptions } from "@/lib/bank-codes";
import { DashboardApiResponse } from "../_lib/types";

const chartConfig = {
  bank: {
    label: "Banks",
  },
} satisfies ChartConfig;

interface Props {
  data: DashboardApiResponse["byClients"];
}

export function MatchPieChart({ data }: Props) {
  const chartData = data.rows.map((row) => {
    const bank = bankOptions.find((bank) => bank.value === row.debitor_code);
    return {
      bank: bank?.label || row.debitor_code,
      matched: parseInt(row.approved_count),
      fill: bank?.color,
    };
  });

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Баталгаажсан банкнууд</CardTitle>
        <CardDescription>2024 оны 12-р сар</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="matched"
              nameKey="bank"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {data.rows.length}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Банкнууд
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Сүүлийн 1 сарын гүйлгээнүүдийг харуулав
        </div>
      </CardFooter>
    </Card>
  );
}
