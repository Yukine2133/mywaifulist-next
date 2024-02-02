"use server";

import { Waifu } from "@/models/waifu.model";
import { connectDb } from "../lib/connectDb";
import { redirect } from "next/navigation";

export const addWaifu = async (FormData: FormData) => {
  const name = FormData.get("name");
  const desc = FormData.get("desc");
  const userId = "222";
  const image = FormData.get("image");

  if (!name || !desc || !userId || !image) return;

  try {
    await connectDb();
    await Waifu.create({ name, desc, userId, image });
  } catch (error) {
    console.error(error);
  }
  redirect("/");
};
