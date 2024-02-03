import { connectDb } from "@/lib/connectDb";
import { User } from "@/models/user.model";

interface UserDataProps {
  picture: string | null;
  given_name: string | null;
  email: string | null;
  id: string | null;
}

export const addUser = async (userData: UserDataProps) => {
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
