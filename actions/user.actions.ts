"use server";

import { connectDb } from "@/lib/connectDb";
import { User } from "@/models/user.model";
import { Waifu } from "@/models/waifu.model";

export interface IUser {
  picture: string | null;
  given_name: string | null;
  email: string | null;
  id: string | null;
}

export const addUser = async (userData: IUser) => {
  try {
    await connectDb();
    const existingUser = await User.findOne({ id: userData.id });

    if (existingUser) {
      return;
    }

    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("Error adding user to the database:", error);
    throw error;
  }
};

export const fetchUser = async (userId: string) => {
  try {
    await connectDb();
    const user = await User.findOne({ id: userId });

    return user;
  } catch (error) {
    console.error(error);
    return { message: "Something went wrong when fetching user." };
  }
};

export const fetchUserWaifus = async (userId: string) => {
  try {
    await connectDb();

    const waifusList = await Waifu.find({ userId });

    return waifusList;
  } catch (error) {
    console.error(error);
    return { message: "Something went wrong when fetching user waifus." };
  }
};
