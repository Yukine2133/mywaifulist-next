"use server";

import { Waifu } from "@/models/waifu.model";
import { connectDb } from "../lib/connectDb";
import { redirect } from "next/navigation";
import { WaifuProps } from "@/app/page";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

// CRUD Waifus

export const addWaifu = async ({
  name,
  desc,
  image,
  appearsIn,
}: WaifuProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const userId = user?.id;

  if (!name || !desc || !userId || !image || !appearsIn) return;

  try {
    await connectDb();
    await Waifu.create({ name, desc, userId, image, appearsIn });
  } catch (error) {
    return {
      message: "Failed to add the waifu. Please try again.",
      error,
    };
  }
  redirect("/");
};

export const fetchWaifus = async () => {
  try {
    await connectDb();
    const waifus: WaifuProps[] = await Waifu.find();
    return waifus;
  } catch (error) {
    return {
      message: "Failed to fetch the waifus. Please try to refresh the page.",
    };
  }
};

export const fetchWaifu = async (id: string) => {
  try {
    await connectDb();
    const waifu = await Waifu.findById(id);
    return waifu;
  } catch (error) {
    return {
      message: "Failed to fetch the waifu. Please try to refresh the page.",
    };
  }
};

export const deleteWaifu = async (id: string) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    await connectDb();
    if (!id) return { message: "Something went wrong when deleting the waifu" };
    if (!user) {
      return;
    }
    const waifu = await Waifu.findByIdAndDelete(id);
    if (waifu.userId != user?.id) {
      return { message: "This is not your waifu. You can't delete." };
    }
  } catch (error) {
    console.error(error);
  }
  redirect("/");
};

interface UpdateWaifuProps extends WaifuProps {
  id: string;
}
export const updateWaifu = async ({
  name,
  desc,
  image,
  appearsIn,
  id,
}: UpdateWaifuProps) => {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    await connectDb();

    const existingWaifu = await Waifu.findById(id);

    if (existingWaifu.userId != user?.id) {
      return { message: "This is not your waifu. You can't update :)" };
    }

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
    return { message: "Failed to update the waifu", error };
  }
};

// Like

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
    return { message: "Failed to like the waifu", error };
  }
};

// Comments

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

    if (!user) {
      return { message: "You need to be authenticated to comment." };
    }

    existingWaifu.comments = existingWaifu.comments || [];
    existingWaifu.comments.push({
      user: user?.id,
      content: content,
      timestamp: formattedDate,
    });

    await existingWaifu.save();
    revalidatePath(`/${waifuId}`);
  } catch (error) {
    return { message: "Error adding comment to waifu" };
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
    return { message: "Error fetching comments for waifu" };
  }
};

export const deleteWaifuComment = async (
  waifuId: string,
  commentId: string
) => {
  try {
    await connectDb();

    const existingWaifu = await Waifu.findById(waifuId);

    if (!existingWaifu) {
      return { message: "Waifu not found" };
    }

    // Filter out the comment with the given ID
    existingWaifu.comments = existingWaifu.comments.filter(
      (comment: any) => comment._id.toString() !== commentId
    );

    await existingWaifu.save();
    revalidatePath(`/${waifuId}`);
  } catch (error) {
    return { message: "Failed to delete the comment:", error };
  }
};

export const updateWaifuComment = async (
  waifuId: string,
  commentId: string,
  updatedContent: string
) => {
  try {
    await connectDb();

    const existingWaifu = await Waifu.findById(waifuId);

    if (!existingWaifu) {
      return { message: "Waifu not found" };
    }

    // Find the comment within the waifu's comments array
    const commentToUpdate = existingWaifu.comments.find(
      (comment: any) => comment._id.toString() === commentId
    );

    if (!commentToUpdate) {
      return { message: "Comment not found" };
    }

    // Update the content of the comment
    commentToUpdate.content = updatedContent;

    // Save the updated waifu
    await existingWaifu.save();
    revalidatePath(`/${waifuId}`);
  } catch (error) {
    return { message: "Failed to update the comment:", error };
  }
};

// Search

export const searchWaifu = async (q: string | null) => {
  await connectDb();
  try {
    const waifus: WaifuProps[] = await Waifu.find({
      name: { $regex: new RegExp(q || "", "i") },
    });

    return waifus;
  } catch (error) {
    return { message: "Failed to search waifus", error };
  }
};
