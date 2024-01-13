import { createTRPCRouter } from "~/server/api/trpc";
import { cashflowRouter } from "./routers/cashflow";
import { postRouter } from "./routers/post";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  cashflow: cashflowRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
