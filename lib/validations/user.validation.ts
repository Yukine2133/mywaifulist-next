import * as z from "zod";

export const WaifuValidation = z.object({
  image: z.string().url().min(1),
  name: z.string().min(3).max(35),
  appearsIn: z.string().min(3).max(50),
  desc: z.string().min(3).max(2000),
});
