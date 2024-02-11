"use client";
import { addWaifu } from "@/actions/waifu.actions";
import * as z from "zod";

import { WaifuValidation } from "@/lib/validations/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import WaifuForm from "@/components/WaifuForm";
import { toast } from "react-toastify";

const AddWaifu = () => {
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
    const res = await addWaifu({
      name: values.name,
      image: values.image,
      desc: values.desc,
      appearsIn: values.appearsIn,
    });
    if (res?.message) {
      toast(res.message);
    }
  }
  return <WaifuForm form={form} onSubmit={onSubmit} label="Add Waifu" />;
};

export default AddWaifu;
