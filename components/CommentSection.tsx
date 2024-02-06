"use client";

import { CommentValidation } from "@/lib/validations/comment.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CommentForm from "./CommentForm";
import { addCommentToWaifu } from "@/actions/waifu.actions";

const CommentSection = ({ id }: { id: string }) => {
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      content: "",
    },
  });
  const { reset } = form;

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    await addCommentToWaifu({
      content: values.content,
      waifuId: id,
    });
    reset();
  }
  return (
    <section className="">
      <CommentForm form={form} onSubmit={onSubmit} />
    </section>
  );
};

export default CommentSection;
