"use client";

import { deleteWaifuComment } from "@/actions/waifu.actions";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const ButtonDelete = ({ id, waifuId }: { id: string; waifuId: string }) => {
  const handleDelete = async () => {
    const res = await deleteWaifuComment(waifuId, id);
    if (res?.message) {
      toast.error(res.message);
    }
  };
  return (
    <div onClick={handleDelete}>
      <AiFillDelete className="text-red-500" />
    </div>
  );
};

export default ButtonDelete;
