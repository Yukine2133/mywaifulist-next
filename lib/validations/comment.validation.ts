import * as z from "zod";

export const CommentValidation = z.object({
  content: z.string().min(2),
});
