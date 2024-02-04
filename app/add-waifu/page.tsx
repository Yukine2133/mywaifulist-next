"use client";
import { addWaifu } from "@/actions/waifu.actions";
import * as z from "zod";

import { WaifuValidation } from "@/lib/validations/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import WaifuForm from "@/components/WaifuForm";

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
    await addWaifu({
      name: values.name,
      image: values.image,
      desc: values.desc,
      appearsIn: values.appearsIn,
    });
  }
  return <WaifuForm form={form} onSubmit={onSubmit} label="Add Waifu" />;
};

export default AddWaifu;

{
  /* <form className="flex flex-col w-96 " action={addWaifu}>
        <label>Name</label>
        <input
          className="bg-[#27272a]  outline-none px-3 py-2 mb-4 rounded-md"
          type="text"
          name="name"
        />
        <label>Appears In</label>
        <input
          className="bg-[#27272a]  outline-none px-3 py-2 mb-4 rounded-md"
          type="text"
          name="appearsIn"
        />
        <label>Description</label>

        <textarea
          className="bg-[#27272a]  h-[150px] outline-none px-3 py-2 mb-4 rounded-md"
          name="desc"
        />
        <label>Image</label>

        <input
          className="bg-[#27272a] outline-none px-3 py-2 rounded-md"
          type="text"
          name="image"
        />
        <hr className="opacity-20" />
        <SubmitButton />
      </form> */
}
