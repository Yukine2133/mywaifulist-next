import * as z from "zod";
import { CommentValidation } from "@/lib/validations/comment.validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";

import SubmitButton from "./SubmitButton";

interface WaifuProps {
  onSubmit: (values: z.infer<typeof CommentValidation>) => void;
  form: any;
  loading: boolean;
}
const CommentForm = ({ form, onSubmit, loading }: WaifuProps) => {
  return (
    <div className="p-4 flex-col justify-center xl:w-full  mx-auto items-center flex mt-8  ">
      <label className="font-medium text-zinc-200 mb-4">Comments</label>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-[500px] md:w-[690px] lg:w-[900px] mt-4 "
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Leave a comment
                </FormLabel>
                <FormControl className="border-0">
                  <Textarea
                    rows={4}
                    placeholder="Type your comment in here"
                    className="bg-black-2  outline-none px-3 py-3 rounded-md focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-[#9ca3af] placeholder:text-base text-[#9ca3af] text-base  "
                    {...field}
                  />
                </FormControl>
                <div className=" flex justify-end">
                  {/* <button
                    type="submit"
                    className=" bg-[#4b5562] w-28   text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-300"
                  >
                    Comment
                  </button> */}
                  <SubmitButton loading={loading} />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default CommentForm;
