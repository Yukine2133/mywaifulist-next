"use client";

import { deleteWaifuComment } from "@/actions/waifu.actions";
import { AiFillDelete } from "react-icons/ai";

const ButtonDelete = ({ id, waifuId }: { id: string; waifuId: string }) => {
  return (
    <div onClick={() => deleteWaifuComment(waifuId, id)}>
      <AiFillDelete className="text-red-500" />
    </div>
  );
};

export default ButtonDelete;
