"use client";

import { updateWaifuComment } from "@/actions/waifu.actions";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CommentValidation } from "@/lib/validations/comment.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";

const EditModal = ({ id, waifuId }: { id: string; waifuId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    try {
      const res = await updateWaifuComment(waifuId, id, values.content);
      if (res?.message) {
        toast.error(res.message);
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)} modal>
      <DialogTrigger asChild>
        <button>
          <AiFillEdit className="text-blue-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black-2 outline-none border-0">
        <DialogHeader>
          <DialogTitle className="text-gray-200">Edit Comment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="">
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
            <button
              className="bg-white text-black rounded-md px-2 py-1 mx-auto flex hover:bg-slate-950 hover:text-white transition-colors duration-300"
              type="submit"
            >
              Save
            </button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
