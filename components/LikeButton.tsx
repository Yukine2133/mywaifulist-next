"use client";
import { IUser } from "@/actions/user.actions";
import { likeWaifu } from "@/actions/waifu.actions";
import { AiFillHeart } from "react-icons/ai";
import { FaHeartCircleMinus, FaHeartCirclePlus } from "react-icons/fa6";

interface LikeButtonProps {
  id: string;
  user: IUser;
  likes: string;
}

const LikeButton = ({ id, user, likes }: LikeButtonProps) => {
  const isLiked = likes?.includes(user.id!);

  return (
    <button
      onClick={() => likeWaifu(id)}
      className="w-full gap-2 text-lg flex items-center justify-center rounded-full bg-pink-500  m-2 text-white py-2 mx-2 font-medium cursor-pointer  active:scale-105"
    >
      {isLiked ? (
        <FaHeartCircleMinus className=" h-5 w-5 fill-current" />
      ) : (
        <FaHeartCirclePlus className=" h-5 w-5 fill-current" />
      )}
      {isLiked ? "Unlike" : "Like"}
    </button>
  );
};

export default LikeButton;
