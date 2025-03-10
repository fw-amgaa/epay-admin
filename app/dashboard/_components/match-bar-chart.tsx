"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  all: {
    label: "All",
    color: "hsl(var(--chart-1))",
  },
  matched: {
    label: "Matched",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface Props {
  data: DashboardApiResponse["byClients"];
}

export function MatchBarChart({ data }: Props) {
  const chartData = data.rows
    .map((row) => {
      return {
        bank:
          bankOptions.find((bank) => bank.value === row.debitor_code)?.label ||
          row.debitor_code,
        all: parseInt(row.total_count),
        matched: parseInt(row.approved_count),
      };
    })
    .sort((a, b) => b.all - a.all);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Банкнуудын жагсаалт</CardTitle>
        <CardDescription>2024 оны 12-р сар</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="bank"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="all" fill="var(--color-all)" radius={4} />
            <Bar dataKey="matched" fill="var(--color-matched)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Сүүлийн 1 сарын гүйлгээнүүдийг харуулав
        </div>
      </CardFooter>
    </Card>
  );
}
