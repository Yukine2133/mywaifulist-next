"use client";
import { addWaifu } from "@/actions/waifu.actions";
import * as z from "zod";

import { WaifuValidation } from "@/lib/validations/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import WaifuForm from "@/components/WaifuForm";
import { toast } from "react-toastify";
import { useState } from "react";

const AddWaifu = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(WaifuValidation),
    defaultValues: {
      name: "",
      desc: "",
      image: "",
      appearsIn: "",
    },
  });

  async function onSubmit(values: z.infer<typeof WaifuValidation>) {
    setLoading(true);

    const res = await addWaifu({
      name: values.name,
      image: values.image,
      desc: values.desc,
      appearsIn: values.appearsIn,
    });
    setLoading(false);
    if (res?.message) {
      toast(res.message);
    }
  }

  return (
    <WaifuForm
      loading={loading}
      form={form}
      onSubmit={onSubmit}
      label="Add Waifu"
    />
  );
};

export default AddWaifu;
