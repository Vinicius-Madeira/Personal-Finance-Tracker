"use client";

import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { currencyNoCents } from "@/utils/format";

interface Income {
  title: string;
  date: Date;
  value: number;
}

interface CustomPieChartProps {
  incomes: Income[];
}

export default function CustomPieChart({ incomes }: CustomPieChartProps) {
  let chartData;
  if (incomes.length === 0) {
    chartData = [{ value: 0.1, fill: "var(--chart-1)" }];
  } else {
    const limit = incomes.length >= 5 ? 5 : incomes.length;
    const chartIncomes = incomes.slice(incomes.length - limit, incomes.length);
    chartData = chartIncomes.map((income, index) => {
      return {
        value: income.value,
        fill: `var(--chart-${index + 1})`,
      };
    });
  }

  const chartConfig = {
    value: {
      label: "R$",
    },
    1: {
      label: "R$",
    },
    2: {
      label: "R$",
    },
    3: {
      label: "R$",
    },
    4: {
      label: "R$",
    },
  };

  const totalValue = useMemo(() => {
    return incomes.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center text-2xl">Renda Total</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="date"
              outerRadius={140}
              innerRadius={120}
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
                          {currencyNoCents.format(totalValue)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
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
          {incomes.length === 0
            ? "Nenhuma renda registrada no momento"
            : `Exibindo últimas ${incomes.length} renda(s)`}
        </div>
      </CardFooter>
    </Card>
  );
}
