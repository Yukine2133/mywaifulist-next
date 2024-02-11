"use client";

import { CommentValidation } from "@/lib/validations/comment.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CommentForm from "./CommentForm";
import { addCommentToWaifu } from "@/actions/waifu.actions";
import { toast } from "react-toastify";

const CommentSection = ({ id }: { id: string }) => {
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      content: "",
    },
  });
  const { reset } = form;

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    const res = await addCommentToWaifu({
      content: values.content,
      waifuId: id,
    });
    if (res?.message) {
      toast.error(res.message);
    }
    reset();
  }
  return (
    <section className="">
      <CommentForm form={form} onSubmit={onSubmit} />
    </section>
  );
};

export default CommentSection;
