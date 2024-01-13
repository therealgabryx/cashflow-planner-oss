import {
  Button,
  DatePicker,
  Select,
  SelectItem,
  TextInput,
} from "@tremor/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type CashflowEvent } from "~/server/api/routers/cashflow";

import { api_client } from "~/trpc/react";

const initialFormData = {
  name: "",
  amount: 0,
  date: "",
  type: "income",
} satisfies Omit<CashflowEvent, "id">;

export function CreateCashflowEvent() {
  const router = useRouter();
  const [createCashflowEventFormData, setCreateCashflowEventFormData] =
    useState(initialFormData);

  const createCashflowEvent = api_client.cashflow.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setCreateCashflowEventFormData({ ...initialFormData });
    },
  });

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCashflowEvent.mutate({ ...createCashflowEventFormData });
        }}
        className="flex w-full max-w-xs flex-col gap-2"
      >
        {/* date */}
        <DatePicker
          value={
            !!createCashflowEventFormData.date
              ? new Date(createCashflowEventFormData.date)
              : undefined
          }
          onValueChange={(e) => {
            // console.log("## date", typeof e);
            setCreateCashflowEventFormData((prev) => ({
              ...prev,
              date: e?.toISOString() ?? "",
            }));
          }}
          disabled={createCashflowEvent.isLoading}
        />
        {/* name */}
        <TextInput
          placeholder="Name"
          onChange={(e) =>
            setCreateCashflowEventFormData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
          disabled={createCashflowEvent.isLoading}
        />
        {/* amount */}
        <TextInput
          placeholder="Amount"
          onChange={(e) =>
            setCreateCashflowEventFormData((prev) => ({
              ...prev,
              amount: parseInt(e.target.value),
            }))
          }
          disabled={createCashflowEvent.isLoading}
        />
        {/* type */}
        <Select
          value={createCashflowEventFormData.type}
          onValueChange={(new_type) => {
            // @ts-expect-error will add schema validation later for type
            setCreateCashflowEventFormData((prev) => ({
              ...prev,
              type: new_type,
            }));
          }}
          disabled={createCashflowEvent.isLoading}
        >
          <SelectItem value="income">income</SelectItem>
          <SelectItem value="expense">expense</SelectItem>
        </Select>

        <Button
          type="submit"
          size="sm"
          disabled={createCashflowEvent.isLoading}
        >
          {createCashflowEvent.isLoading ? "Creating event..." : "Create event"}
        </Button>
      </form>
    </div>
  );
}
