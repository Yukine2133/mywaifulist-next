"use client";

import { deleteWaifu } from "@/actions/waifu.actions";
import React from "react";
import { AiFillDelete } from "react-icons/ai";

const DeleteButton = ({ id }: { id: string }) => {
  return (
    <button
      onClick={() => deleteWaifu(id)}
      className="w-full gap-2 text-lg flex items-center justify-center rounded-full bg-gray-600  m-2 text-gray-300 py-2 mx-2 font-medium cursor-pointer  active:scale-105"
    >
      <AiFillDelete /> Delete
    </button>
  );
};

export default DeleteButton;
