import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from "@tremor/react";
import { api } from "~/trpc/server";

export default async function Events() {
  const { events } = await api.cashflow.get_events.query();

  const tabledata = events
    .map((event) => {
      return {
        id: event.id,
        date: event.date,
        name: event.name,
        type: event.type,
        amount: event.amount,
      };
    })
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <Card>
      <Table className="">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Actions</TableHeaderCell>
            <TableHeaderCell>Date</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tabledata.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Button
                  size="xs"
                  variant="light"
                  className="text-red-500 hover:text-red-500 hover:underline"
                >
                  Delete
                </Button>
              </TableCell>
              <TableCell>
                {new Date(item.date).toLocaleDateString()}{" "}
                {new Date(item.date).toLocaleTimeString()}
              </TableCell>
              <TableCell>
                <Text>{item.name}</Text>
              </TableCell>
              <TableCell>
                <Text>{item.type}</Text>
              </TableCell>
              <TableCell>
                <Text>
                  {item.type === "income" ? "+" : null}
                  {item.type === "expense" ? "-" : null}
                  {item.amount}
                </Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
