"use server";

import { Waifu } from "@/models/waifu.model";
import { connectDb } from "../lib/connectDb";
import { redirect } from "next/navigation";
import { WaifuProps } from "@/app/page";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

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

export const likeWaifu = async (id: string) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { message: "You need to be logged in to like the waifu." };
    }

    await connectDb();

    const existingWaifu = await Waifu.findById(id);

    if (!existingWaifu) {
      return { message: "Waifu not found" };
    }

    const userIndex = existingWaifu.likes.indexOf(user.id);

    if (userIndex !== -1) {
      // If the user has already liked the waifu, remove their like
      existingWaifu.likes.splice(userIndex, 1);
    } else {
      // If the user has not liked the waifu, add their like
      existingWaifu.likes.push(user.id);
    }

    await existingWaifu.save();
    revalidatePath(`/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const addCommentToWaifu = async ({
  waifuId,
  content,
}: {
  waifuId: string;
  content: string;
}) => {
  const currentDate = new Date();

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  } as const;

  const formattedDate = currentDate.toLocaleString("en-US", options);

  try {
    const { getUser } = getKindeServerSession();
    await connectDb();
    const user = await getUser();

    const existingWaifu = await Waifu.findById(waifuId);

    if (!existingWaifu) {
      return { message: "Waifu not found" };
    }

    existingWaifu.comments = existingWaifu.comments || [];
    existingWaifu.comments.push({
      user: user?.id,
      content: content,
      timestamp: formattedDate,
    });

    await existingWaifu.save(); // Await the save operation
    revalidatePath(`/${waifuId}`);
  } catch (error) {
    console.error(error);
    throw new Error("Error adding comment to waifu");
  }
};
export const fetchWaifuComments = async (waifuId: string) => {
  try {
    await connectDb();

    const existingWaifu = await Waifu.findById(waifuId);

    if (!existingWaifu) {
      return { message: "Waifu not found" };
    }

    const comments = existingWaifu.comments;

    return comments;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching comments for waifu");
  }
};

export const deleteWaifuComment = async (
  waifuId: string,
  commentId: string
) => {
  try {
    await connectDb();

    // Find the waifu by its ID
    const existingWaifu = await Waifu.findById(waifuId);

    if (!existingWaifu) {
      console.log("Waifu not found");
      return;
    }

    // Filter out the comment with the given ID
    existingWaifu.comments = existingWaifu.comments.filter(
      (comment: any) => comment._id.toString() !== commentId
    );

    await existingWaifu.save();
    revalidatePath(`/${waifuId}`);
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};

export const updateWaifuComment = async (
  waifuId: string,
  commentId: string,
  updatedContent: string
) => {
  try {
    await connectDb();

    // Find the waifu by its ID
    const existingWaifu = await Waifu.findById(waifuId);

    if (!existingWaifu) {
      console.log("Waifu not found");
      return;
    }

    // Find the comment within the waifu's comments array
    const commentToUpdate = existingWaifu.comments.find(
      (comment: any) => comment._id.toString() === commentId
    );

    if (!commentToUpdate) {
      console.log("Comment not found");
      return;
    }

    // Update the content of the comment
    commentToUpdate.content = updatedContent;

    // Save the updated waifu
    await existingWaifu.save();
    revalidatePath(`/${waifuId}`);
  } catch (error) {
    console.error("Error updating comment:", error);
  }
};

export const searchWaifu = async (q: string | null) => {
  await connectDb();
  try {
    const waifus: WaifuProps[] = await Waifu.find({
      name: q,
    });
    console.log(waifus);
    return waifus;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to search waifus");
  }
};
