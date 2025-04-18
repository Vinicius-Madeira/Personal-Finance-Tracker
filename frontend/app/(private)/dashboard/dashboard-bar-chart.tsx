"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Item } from "../types";
import { useMemo } from "react";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 p-4 rounded shadow border border-purple-200">
        <p className="font-mono text-sm text-green-500">{`R$${payload[0].value.toLocaleString(
          "pt-BR"
        )}`}</p>
        <p className="text-xs text-gray-200">{`${payload[0].payload.count} renda(s)`}</p>
      </div>
    );
  }
  return null;
};

interface MonthlyData {
  name: string;
  year: number;
  timestamp: number;
  value: number;
  count: number;
  month: string; // For display on the x-axis
}

type MonthlyMap = {
  [monthYear: string]: MonthlyData;
};

interface CustomBarChartProps {
  title: string;
  description: string;
  items: Item[];
  monthLimit?: number;
}

export default function CustomBarChart({
  title,
  description,
  items,
  monthLimit = 6,
}: CustomBarChartProps) {
  // Process data to aggregate by month
  const aggregatedData = useMemo(() => {
    // Create a map to store monthly totals and entry counts
    const monthlyMap: MonthlyMap = {};

    // Process each income entry
    items.forEach((entry) => {
      const date = new Date(entry.data);
      const monthYear = date.toLocaleString("pt-BR", {
        month: "long",
        year: "numeric",
      });

      if (!monthlyMap[monthYear]) {
        monthlyMap[monthYear] = {
          name: date.toLocaleString("pt-BR", { month: "long" }),
          month: date.toLocaleString("pt-BT", { month: "short" }),
          year: date.getFullYear(),
          timestamp: date.getTime(), // For sorting
          value: 0,
          count: 0,
        };
      }

      monthlyMap[monthYear].value += entry.valor;
      monthlyMap[monthYear].count += 1;
    });

    // Convert map to array and sort by date (newest first)
    const result = Object.values(monthlyMap);
    result.sort((a, b) => b.timestamp - a.timestamp);

    // Limit to the specified number of months
    return result.slice(-monthLimit);
  }, [items, monthLimit]);

  // Format value for Y-axis
  const formatYAxis = (value: number) => {
    if (value >= 1000) {
      return `R$${value / 1000}k`;
    }
    return `R$${value}`;
  };

  // Handle single entry case - add empty entries if needed
  const enhancedData = useMemo(() => {
    if (aggregatedData.length <= 1) {
      // If there's only one entry, create placeholder entries to improve visual appearance
      const singleEntry = aggregatedData[0];

      if (!singleEntry) {
        // No data case
        return [
          {
            name: "No Data",
            month: "N/A",
            year: new Date().getFullYear(),
            value: 0,
            count: 0,
            timestamp: Date.now(),
          },
        ];
      }

      // Create date objects for the placeholder entries
      const entryDate = new Date(singleEntry.timestamp);

      // Create two additional empty months (one before, one after)
      const prevMonth = new Date(entryDate);
      prevMonth.setMonth(prevMonth.getMonth() - 1);

      const nextMonth = new Date(entryDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      return [
        {
          name: prevMonth.toLocaleString("pt-BR", {
            month: "long",
            year: "numeric",
          }),
          month: prevMonth.toLocaleString("pt-BR", { month: "short" }),
          year: prevMonth.getFullYear(),
          timestamp: prevMonth.getTime(),
          value: 0, // Empty value
          count: 0,
        },
        singleEntry,
        {
          name: nextMonth.toLocaleString("pt-BR", {
            month: "long",
            year: "numeric",
          }),
          month: nextMonth.toLocaleString("pt-BR", { month: "short" }),
          year: nextMonth.getFullYear(),
          timestamp: nextMonth.getTime(),
          value: 0, // Empty value
          count: 0,
        },
      ];
    }

    if (aggregatedData.length === 2) {
      // If there are only two entries, add one more placeholder
      const latestEntry = aggregatedData[1];
      const latestDate = new Date(latestEntry.timestamp);

      const nextMonth = new Date(latestDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      return [
        ...aggregatedData,
        {
          name: nextMonth.toLocaleString("default", {
            month: "long",
            year: "numeric",
          }),
          month: nextMonth.toLocaleString("default", { month: "short" }),
          year: nextMonth.getFullYear(),
          timestamp: nextMonth.getTime(),
          value: 0, // Empty value
          count: 0,
        },
      ];
    }

    return aggregatedData;
  }, [aggregatedData]);

  // Generate colors - highlight the actual data
  const getBarColors = () => {
    if (aggregatedData.length <= 1) {
      return ["#e5e7eb", "#4f46e5", "#e5e7eb"]; // Grey, Blue, Grey
    } else if (aggregatedData.length === 2) {
      return [...Array(aggregatedData.length).fill("#4f46e5"), "#e5e7eb"]; // Blues + Grey
    } else {
      return Array(enhancedData.length).fill("#4f46e5"); // All blue
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl">{title} Mensal</CardTitle>
        <CardDescription className="text-center">
          {(aggregatedData.length === 0 &&
            `Nenhuma ${description} cadastrada`) ||
            (aggregatedData.length === 1 && "Exibindo um mês") ||
            `Exibindo ${aggregatedData.length} meses`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}}>
          <BarChart accessibilityLayer data={enhancedData}>
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(_, index) => {
                if (!enhancedData[index]) return "";
                const item = enhancedData[index];
                return `${item.month} ${String(item.year).slice(-2)}`;
              }}
            />
            <YAxis tickFormatter={formatYAxis} />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Bar dataKey="value" fill="var(--chart-2)" radius={8}>
              {enhancedData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={getBarColors()[index]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
