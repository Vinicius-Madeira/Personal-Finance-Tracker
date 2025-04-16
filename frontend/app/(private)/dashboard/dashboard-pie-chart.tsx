"use client";

import { useMemo } from "react";
import { Cell, Legend, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { currency } from "@/utils/format";
import { Item } from "../types";

interface CategoryData {
  name: string;
  value: number;
  count: number;
}

type CategoryMap = {
  [category: string]: CategoryData;
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#a4de6c",
  "#d0ed57",
  "#ffc658",
  "#ff7300",
  "#4d79ff",
  "#ff4d4d",
  "#9933ff",
  "#2eb8b8",
  "#ff99cc",
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

// Custom tooltip formatter
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 p-4 rounded shadow border border-purple-200 text-center">
        <p className="font-bold">
          {`${payload[0].name}: `}

          <span className="font-mono font-medium text-green-500 text-sm">{`R$${payload[0].value.toLocaleString(
            "pt-BR"
          )}`}</span>
        </p>
        <p className="text-xs text-gray-200">{`${payload[0].payload.count} renda(s)`}</p>
      </div>
    );
  }
  return null;
};

interface CustomPieChartProps {
  title: string;
  description: string;
  items: Item[];
  categoryLimit?: number;
}

export default function CustomPieChart({
  title,
  description,
  items,
  categoryLimit = 10,
}: CustomPieChartProps) {
  // Process data to aggregate by category
  const aggregatedData = useMemo(() => {
    // Create a map to store category totals and entry counts
    const categoryMap: CategoryMap = {};

    // Process each category entry
    items.forEach((entry) => {
      if (!categoryMap[entry.categoria]) {
        categoryMap[entry.categoria] = {
          name: entry.categoria,
          value: 0,
          count: 0,
        };
      }

      categoryMap[entry.categoria].value += entry.valor;
      categoryMap[entry.categoria].count += 1;
    });

    // Convert map to array and sort by value (highest first)
    let result = Object.values(categoryMap);
    result.sort((a, b) => b.value - a.value);

    // Limit to the specified number of categories
    if (result.length > categoryLimit) {
      const topCategories = result.slice(0, categoryLimit - 1);
      const otherCategories = result.slice(categoryLimit - 1);

      // Combine smaller categories into "Other"
      const otherCategory = {
        name: "Other",
        value: otherCategories.reduce((sum, cat) => sum + cat.value, 0),
        count: otherCategories.reduce((sum, cat) => sum + cat.count, 0),
      };

      return [...topCategories, otherCategory];
    }

    return result;
  }, [items, categoryLimit]);

  const totalValue = aggregatedData.reduce((sum, item) => sum + item.value, 0);
  const totalEntries = aggregatedData.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center text-2xl">{title} Total</CardTitle>
        <CardDescription className="text-center">
          {items.length === 0
            ? ""
            : `Exibindo soma de ${totalEntries} ${description}`}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{}}
          className="aspect-square max-h-[380] w-[100%]"
        >
          <span className="font-mono font-bold text-2xl text-green-500 block w-fit mx-auto">
            {currency.format(totalValue)}
          </span>
          <PieChart>
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Pie
              data={aggregatedData}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
              outerRadius={100}
              fill="#8884d8"
            >
              {aggregatedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className=""></CardFooter>
    </Card>
  );
}
