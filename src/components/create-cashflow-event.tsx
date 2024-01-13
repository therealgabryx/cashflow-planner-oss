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
      setCreateCashflowEventFormData(initialFormData);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // createPost.mutate({ name });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={createCashflowEventFormData.name}
        onChange={(e) =>
          setCreateCashflowEventFormData((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
        className="w-full rounded-md border border-slate-200 px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="rounded-lg bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={createCashflowEvent.isLoading}
      >
        {createCashflowEvent.isLoading ? "Creating event..." : "Create event"}
      </button>
    </form>
  );
}
