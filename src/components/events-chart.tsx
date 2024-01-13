"use client";

import { AreaChart, Card, Title } from "@tremor/react";
import { useMemo } from "react";
import { api_client } from "~/trpc/react";

const chartdata = [
  {
    date: "Jan 22",
    SemiAnalysis: 2890,
    "The Pragmatic Engineer": 2338,
  },
  {
    date: "Feb 22",
    SemiAnalysis: 2756,
    "The Pragmatic Engineer": 2103,
  },
  {
    date: "Mar 22",
    SemiAnalysis: 3322,
    "The Pragmatic Engineer": 2194,
  },
  {
    date: "Apr 22",
    SemiAnalysis: 3470,
    "The Pragmatic Engineer": 2108,
  },
  {
    date: "May 22",
    SemiAnalysis: 3475,
    "The Pragmatic Engineer": 1812,
  },
  {
    date: "Jun 22",
    SemiAnalysis: 3129,
    "The Pragmatic Engineer": 1726,
  },
];

const valueFormatter = function (number: number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

export function EventsChart() {
  const { data } = api_client.cashflow.get_events.useQuery();

  const chartdata = useMemo(() => {
    if (!data?.events) {
      return [];
    } else {
      const evts = data.events.map((event) => {
        return {
          date: event.date,
          income: event.amount,
          expenses: event.amount,
        };
      });
      return evts;
    }
  }, [data?.events]);

  return (
    <Card>
      <Title>Cashflow events</Title>
      <AreaChart
        className="mt-4 h-72"
        data={chartdata ?? []}
        index="date"
        yAxisWidth={65}
        categories={["income", "expenses"]}
        colors={["green", "red"]}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
}
