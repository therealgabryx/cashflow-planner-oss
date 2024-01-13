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
const cashflowEvents: Array<CashflowEvent> = [];

// router
export const cashflowRouter = createTRPCRouter({
  get_events: publicProcedure.query(() => {
    return cashflowEvents;
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
