"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { AiFillEdit } from "react-icons/ai";

const EditButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleEdit = (id: string) => {
    router.push(`/update-waifu?id=${id}`);
  };
  return (
    <button
      className="w-[98%] gap-2 text-lg flex items-center justify-center rounded-full bg-gray-200/80  m-2 text-black py-2 mx-2 font-medium cursor-pointer  active:scale-105"
      onClick={() => handleEdit(id)}
    >
      <AiFillEdit /> Edit
    </button>
  );
};

export default EditButton;
