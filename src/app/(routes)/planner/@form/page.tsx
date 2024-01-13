import { Card } from "@tremor/react";
import { CreateCashflowEvent } from "~/components/create-cashflow-event";

export default async function Planner() {
  return (
    <Card>
      <CreateCashflowEvent />
    </Card>
  );
}
