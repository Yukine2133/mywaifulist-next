"use client";

import React, { useEffect, useState } from "react";
import { fetchWaifu } from "@/actions/waifu.actions";
import Image from "next/image";
import { WaifuProps } from "../page";
import { AiFillHeart } from "react-icons/ai";
import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import IsCurrentUserCreator from "@/lib/IsCurrentUserCreator";

const AboutWaifu = ({ params }: { params: { id: string } }) => {
  const [waifu, setWaifu] = useState<WaifuProps | null>(null);
  // const [isCurrentUserCreator, setIsCurrentUserCreator] =
  //   useState<boolean>(false);

  const { id } = params;

  const hasAdded = 400;

  useEffect(() => {
    const _fetchWaifu = async (id: string) => {
      const waifu = await fetchWaifu(id);
      setWaifu(waifu);
    };

    _fetchWaifu(id);
  }, [id]);

  // useEffect(() => {
  //   const checkCurrentUserCreator = async () => {
  //     const isCreatorFunction = await IsCurrentUserCreator();

  //     const currentUserIsCreator = isCreatorFunction(waifu?.userId!);
  //     setIsCurrentUserCreator(currentUserIsCreator);
  //   };

  //   checkCurrentUserCreator();
  // }, [waifu?.userId]);

  return (
    <article className="mt-10 px-4">
      <section className="bg-black-2 md:w-2/3 lg:w-3/4 mx-auto flex-col lg:flex-row flex gap-8 max-w-full">
        <div className="">
          <Image
            src={waifu?.image!}
            alt={waifu?.name!}
            width={300}
            height={300}
            className="w-1/2 mx-auto lg:w-full lg:mx-0"
          />
          <button className="w-full gap-2 text-lg flex items-center justify-center rounded-full bg-pink-500  m-2 text-white py-2 mx-2 font-medium cursor-pointer  active:scale-105">
            <AiFillHeart className=" h-5 w-5 fill-current" /> Like
          </button>
          {/* {isCurrentUserCreator && (
            <>
              <DeleteButton id={id} />
              <EditButton id={id} />
            </>
          )} */}
          <DeleteButton id={id} />
          <EditButton id={id} />
        </div>
        <div className="w-full flex  flex-col ">
          <div className="flex justify-between">
            <h4 className="text-xl pl-4 lg:pl-0 pt-4">{waifu?.name!}</h4>
            <h4 className="text-xl pt-4">
              Appears in: <span className="text-base">{waifu?.appearsIn!}</span>
            </h4>
            <div className="flex justify-between items-center ">
              <div className="flex h-12 w-32 cursor-default items-center justify-center bg-pink-500 text-center text-lg text-white">
                <AiFillHeart className="mr-2 h-6 w-6 fill-current" />
                <span>{hasAdded}</span>
              </div>
            </div>
          </div>
          <hr className="opacity-20 mt-4 w-[90%] mx-auto" />
          <div className="mt-6 mb-2 px-4 lg:px-0">
            <h4 className="text-xl">Description</h4>
            <p className="text-gray-400 w-full">{waifu?.desc!}</p>
          </div>
        </div>
      </section>
    </article>
  );
};

export default AboutWaifu;
