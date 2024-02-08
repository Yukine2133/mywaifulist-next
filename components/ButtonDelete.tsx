"use client";

import { deleteWaifuComment } from "@/actions/waifu.actions";

const ButtonDelete = ({ id, waifuId }: { id: string; waifuId: string }) => {
  return (
    <div onClick={() => deleteWaifuComment(waifuId, id)}>ButtonDelete</div>
  );
};

export default ButtonDelete;
