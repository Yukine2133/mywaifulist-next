import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { SubmitButton } from "./SubmitButton";
import * as z from "zod";

import { WaifuValidation } from "@/lib/validations/user.validation";

interface WaifuProps {
  onSubmit: (values: z.infer<typeof WaifuValidation>) => void;
  form: any;
  label: string;
}

const WaifuForm = ({ form, onSubmit, label }: WaifuProps) => {
  return (
    <div className="bg-black-2 p-4 flex-col justify-center max-w-[1200px] mx-auto items-center flex mt-8 text-[#9ca3af] ">
      <h2 className="text-gray-300">{label}</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col w-96 space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Name</FormLabel>
                <FormControl className="border-0 ">
                  <Input
                    type="text"
                    className="bg-[#27272a]  outline-none px-3 py-2 mb-4 rounded-md focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="appearsIn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appears In</FormLabel>
                <FormControl className="border-0 ">
                  <Input
                    type="text"
                    className="bg-[#27272a]  outline-none px-3 py-2 mb-4 rounded-md focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl className="border-0 ">
                  <Textarea
                    rows={8}
                    className="bg-[#27272a]  outline-none px-3 py-2 mb-4 rounded-md focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="outline-none">
                <FormLabel>Image</FormLabel>
                <FormControl className="border-0 ">
                  <Input
                    type="text"
                    className="bg-[#27272a]  outline-none px-3 py-2 mb-4 rounded-md focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <hr className="opacity-50" />
          <SubmitButton />
        </form>
      </Form>
    </div>
  );
};

export default WaifuForm;