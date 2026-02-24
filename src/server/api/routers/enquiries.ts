import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { sendEnquiryEmail } from "~/server/email";

export const enquiriesRouter = createTRPCRouter({
  send: publicProcedure
    .input(
      z.object({
        name: z.string().optional(),
        email: z.string().email("Invalid email address"),
        phone: z.string().optional(),
        subject: z.string().optional(),
        message: z.string().min(1, "Message is required"),
      }),
    )
    .mutation(async ({ input }) => {
      await sendEnquiryEmail({
        name: input.name,
        email: input.email,
        phone: input.phone,
        subject: input.subject,
        message: input.message,
      });

      return { success: true };
    }),
});
