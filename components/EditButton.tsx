"use client";

import { useRouter } from "next/navigation";
import React from "react";

const EditButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleEdit = (id: string) => {
    router.push(`/update-waifu?id=${id}`);
  };
  return (
    <button
      className="w-full gap-2 text-lg flex items-center justify-center rounded-full bg-gray-200/80  m-2 text-black py-2 mx-2 font-medium cursor-pointer  active:scale-105"
      onClick={() => handleEdit(id)}
    >
      Edit
    </button>
  );
};

export default EditButton;
