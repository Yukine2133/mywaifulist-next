"use client";
import { IUser } from "@/actions/user.actions";
import { likeWaifu } from "@/actions/waifu.actions";
import { FaHeartCircleMinus, FaHeartCirclePlus } from "react-icons/fa6";
import { toast } from "react-toastify";

interface LikeButtonProps {
  id: string;
  user: IUser;
  likes: string;
}

const LikeButton = ({ id, user, likes }: LikeButtonProps) => {
  const isLiked = likes?.includes(user?.id!);

  const handleLike = async () => {
    const res = await likeWaifu(id);
    if (res?.message) {
      toast.error(res.message);
    }
  };

  return (
    <button
      onClick={handleLike}
      className="w-[98%] gap-2 text-lg flex items-center justify-center rounded-full bg-pink-500  m-2 text-white py-2 mx-2 font-medium cursor-pointer  active:scale-105"
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
