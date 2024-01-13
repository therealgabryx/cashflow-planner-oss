import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// type definition
export const cashflowEventSchema = z.object({
  id: z.string(),
  date: z.string().datetime(),
  name: z.string(),
  amount: z.number(),
  type: z.union([z.literal("income"), z.literal("expense")]),
  description: z.string().optional(),
});
export type CashflowEvent = z.infer<typeof cashflowEventSchema>;

// mocked DB
const cashflowEvents: Array<CashflowEvent> = [
  {
    id: "1",
    date: "2021-01-01T00:00:00.000Z",
    name: "Salary",
    amount: 1000,
    type: "income",
    description: "Monthly salary",
  },
  {
    id: "2",
    date: "2021-01-02T00:00:00.000Z",
    name: "Rent",
    amount: 500,
    type: "expense",
    description: "Monthly rent",
  },
  {
    id: "3",
    date: "2021-01-03T00:00:00.000Z",
    name: "Groceries",
    amount: 100,
    type: "expense",
    description: "Monthly groceries",
  },
  // create more mocked data events here
  {
    id: "4",
    date: "2021-01-04T00:00:00.000Z",
    name: "Salary",
    amount: 1000,
    type: "income",
    description: "Monthly salary",
  },
  {
    id: "5",
    date: "2021-01-05T00:00:00.000Z",
    name: "Salary",
    amount: 1000,
    type: "income",
    description: "Monthly salary",
  },
  {
    id: "6",
    date: "2021-01-06T00:00:00.000Z",
    name: "Salary",
    amount: 1000,
    type: "income",
    description: "Monthly salary",
  },
];

// router
export const cashflowRouter = createTRPCRouter({
  get_events: publicProcedure.query(() => {
    return { events: cashflowEvents };
  }),

  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        date: z.string().datetime(),
        name: z.string().min(1),
        amount: z.number().min(0),
        type: z.union([z.literal("income"), z.literal("expense")]),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const event = {
        id: Math.random().toString(36).substring(7),
        ...input,
      } satisfies CashflowEvent;

      cashflowEvents.push(event);

      return cashflowEvents;
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const eventIndex = cashflowEvents.findIndex(
        (event) => event.id === input.id,
      );

      if (eventIndex === -1) {
        throw new Error("Event not found");
      }

      cashflowEvents.splice(eventIndex, 1);

      return cashflowEvents;
    }),
});
