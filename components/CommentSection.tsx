"use client";

import { CommentValidation } from "@/lib/validations/comment.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import CommentForm from "./CommentForm";
import { addCommentToWaifu } from "@/actions/waifu.actions";
import { toast } from "react-toastify";
import { useState } from "react";

const CommentSection = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      content: "",
    },
  });
  const { reset } = form;

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    try {
      setLoading(true);
      const res = await addCommentToWaifu({
        content: values.content,
        waifuId: id,
      });
      if (res?.message) {
        toast.error(res.message);
      }
      reset();
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className="">
      <CommentForm form={form} onSubmit={onSubmit} loading={loading} />
    </section>
  );
};

export default CommentSection;
