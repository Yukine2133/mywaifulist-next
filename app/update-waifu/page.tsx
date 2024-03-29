"use client";

import { fetchWaifu, updateWaifu } from "@/actions/waifu.actions";
import WaifuForm from "@/components/WaifuForm";
import { WaifuValidation } from "@/lib/validations/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

const UpdateWaifu = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const waifuId = searchParams.get("id");

  if (!waifuId) {
    router.push("/");
  }

  const form = useForm({
    resolver: zodResolver(WaifuValidation),
  });

  useEffect(() => {
    const getGirlDetails = async () => {
      const fetchedWaifu = await fetchWaifu(waifuId!);
      // Reset the form with new default values when waifu state changes
      form.reset({
        name: fetchedWaifu.name || "",
        desc: fetchedWaifu.desc || "",
        image: fetchedWaifu.image || "",
        appearsIn: fetchedWaifu.appearsIn || "",
      });
    };

    if (waifuId) getGirlDetails();
  }, [waifuId, form]);

  async function onSubmit(values: z.infer<typeof WaifuValidation>) {
    setLoading(true);
    const res = await updateWaifu({
      name: values.name,
      image: values.image,
      desc: values.desc,
      appearsIn: values.appearsIn,
      id: waifuId || "",
    });

    setLoading(false);

    if (res?.message) {
      toast.error(res.message);
    }

    router.push(`/${waifuId}`);
  }

  return (
    <WaifuForm
      loading={loading}
      form={form}
      onSubmit={onSubmit}
      label="Edit Waifu"
    />
  );
};

export default UpdateWaifu;
