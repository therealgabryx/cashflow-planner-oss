import { Text, Title } from "@tremor/react";
import { type ReactNode } from "react";

export default function ToolLayout(props: {
  form: ReactNode;
  chart: ReactNode;
  events: ReactNode;
}) {
  return (
    <main className="p-6">
      <Title>Cashflow Planner</Title>
      <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

      {/* Main section */}
      <div className="py-6">
        <main className="grid grid-cols-2 gap-6">
          {props.form}
          {props.chart}
          <div className="col-span-2">{props.events}</div>
        </main>
      </div>
    </main>
  );
}
