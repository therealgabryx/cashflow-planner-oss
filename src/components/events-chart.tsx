"use client";

import { AreaChart, Card, Title } from "@tremor/react";
import { useMemo } from "react";
import { api_client } from "~/trpc/react";

const valueFormatter = function (number: number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

export function EventsChart() {
  const { data, ...getEventsQuery } = api_client.cashflow.get_events.useQuery();

  const chartdata = useMemo(() => {
    if (!data?.events) {
      return [];
    } else {
      const evts = data.events.map((event) => {
        return {
          date: event.date,
          income: event.type === "income" ? event.amount : undefined,
          expenses: event.type === "expense" ? event.amount : undefined,
        };
      });
      return evts;
    }
  }, [data?.events]);

  if (getEventsQuery.status === "error") {
    return (
      <Card className="min-h-[380px]">
        <div>Error: {getEventsQuery.error.message}</div>
      </Card>
    );
  }

  if (getEventsQuery.status === "loading") {
    return (
      <Card className="min-h-[380px]">
        <div>Loading...</div>
      </Card>
    );
  }

  return (
    <Card className="min-h-[380px]">
      <Title>Cashflow events</Title>
      <AreaChart
        className="mt-4 h-72"
        data={chartdata ?? []}
        index="date"
        yAxisWidth={65}
        categories={["income", "expenses"]}
        colors={["green", "red"]}
        valueFormatter={valueFormatter}
        connectNulls={true}
        showAnimation={true}
      />
    </Card>
  );
}
