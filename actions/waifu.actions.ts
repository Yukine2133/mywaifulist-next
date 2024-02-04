"use server";

import { Waifu } from "@/models/waifu.model";
import { connectDb } from "../lib/connectDb";
import { redirect } from "next/navigation";
import { WaifuProps } from "@/app/page";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";

export const addWaifu = async ({ name, desc, image, appearsIn }: any) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // const name = FormData.get("name");
  // const desc = FormData.get("desc");
  const userId = user?.id;
  // const image = FormData.get("image");
  // const appearsIn = FormData.get("appearsIn");

  if (!name || !desc || !userId || !image || !appearsIn) return;

  try {
    await connectDb();
    await Waifu.create({ name, desc, userId, image, appearsIn });
  } catch (error) {
    console.error(error);
  }
  redirect("/");
};

export const fetchWaifus = async () => {
  try {
    await connectDb();
    const waifus: WaifuProps[] = await Waifu.find();
    return waifus;
  } catch (error) {
    console.error(error);
  }
  revalidatePath("/");
};

export const fetchWaifu = async (id: string) => {
  try {
    await connectDb();
    const waifu = await Waifu.findById(id);
    return waifu;
  } catch (error) {
    console.error(error);
  }
};

export const deleteWaifu = async (id: string) => {
  try {
    await connectDb();
    if (!id) return { message: "Something went wrong when deleting the error" };
    await Waifu.findByIdAndDelete(id);
  } catch (error) {
    console.error(error);
  }
  redirect("/");
};
export const updateWaifu = async ({
  name,
  desc,
  image,
  appearsIn,
  id,
}: any) => {
  try {
    await connectDb();

    const existingWaifu = await Waifu.findById(id);

    if (!existingWaifu) return { message: "Waifu not found" };

    existingWaifu.name = name;
    existingWaifu.desc = desc;
    existingWaifu.image = image;
    existingWaifu.appearsIn = appearsIn;

    await existingWaifu.save();
    revalidatePath(`/${id}`);
    revalidatePath(`/`);
    return existingWaifu;
  } catch (error) {
    console.error(error);
  }
};
