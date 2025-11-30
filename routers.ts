import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  visa: router({
    types: publicProcedure.query(async () => {
      const { getVisaTypes } = await import("./db");
      return getVisaTypes();
    }),
    applications: protectedProcedure.query(async ({ ctx }) => {
      const { getVisaApplicationsByUserId } = await import("./db");
      return getVisaApplicationsByUserId(ctx.user.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
