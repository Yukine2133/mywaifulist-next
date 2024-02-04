"use client";

import { fetchWaifu, updateWaifu } from "@/actions/waifu.actions";
import WaifuForm from "@/components/WaifuForm";
import { WaifuValidation } from "@/lib/validations/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const UpdateWaifu = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const waifuId = searchParams.get("id");

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
    await updateWaifu({
      name: values.name,
      image: values.image,
      desc: values.desc,
      appearsIn: values.appearsIn,
      id: waifuId,
    });

    router.push(`/${waifuId}`);
  }

  return <WaifuForm form={form} onSubmit={onSubmit} label="Edit Waifu" />;
};

export default UpdateWaifu;
