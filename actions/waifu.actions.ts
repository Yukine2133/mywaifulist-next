"use server";

import { Waifu } from "@/models/waifu.model";
import { connectDb } from "../lib/connectDb";
import { redirect } from "next/navigation";
import { WaifuProps } from "@/app/page";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const addWaifu = async (FormData: FormData) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const name = FormData.get("name");
  const desc = FormData.get("desc");
  const userId = user?.id;
  const image = FormData.get("image");
  const appearsIn = FormData.get("appearsIn");

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
