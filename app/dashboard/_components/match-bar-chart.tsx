'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { bankOptions } from '@/lib/bank-codes';

const chartData = bankOptions.map((opt) => {
    return {
        bank: opt.label,
        all: Math.floor(Math.random() * 300),
        matched: Math.floor(Math.random() * 200),
    };
});

const chartConfig = {
    all: {
        label: 'All',
        color: 'hsl(var(--chart-1))',
    },
    matched: {
        label: 'Matched',
        color: 'hsl(var(--chart-2))',
    },
} satisfies ChartConfig;

export function MatchBarChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Банкнуудын жагсаалт</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
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
                        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                        <Bar dataKey="all" fill="var(--color-all)" radius={4} />
                        <Bar dataKey="matched" fill="var(--color-matched)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">Сүүлийн 1 сарын гүйлгээнүүдийг харуулав</div>
            </CardFooter>
        </Card>
    );
}
