"use client";

import { Card } from "@tremor/react";
import { CreateCashflowEvent } from "~/components/create-cashflow-event";

export default function Planner() {
  return (
    <Card>
      <CreateCashflowEvent />
    </Card>
  );
}
