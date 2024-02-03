import React from "react";
import { fetchWaifu } from "@/actions/waifu.actions";
import Image from "next/image";
import { WaifuProps } from "../page";
import { AiFillHeart } from "react-icons/ai";

const AboutWaifu = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const waifu: WaifuProps = await fetchWaifu(id);
  const hasAdded = 400;

  return (
    <article className="mt-10">
      <section className="bg-black-2 md:w-2/3 lg:w-3/4 mx-auto flex gap-8 max-w-full">
        <div className="">
          <Image
            src={waifu.image}
            alt={waifu.name}
            width={300}
            height={300}
            className="w-full"
          />
        </div>
        <div className="w-full flex flex-1 flex-col ">
          <div className="flex justify-between">
            <h4 className="text-xl pt-4">{waifu.name}</h4>
            <h4 className="text-xl pt-4">
              Appears in: <span className="text-base">{waifu.appearsIn}</span>
            </h4>
            <div className="flex justify-between items-center ">
              <div className="flex h-12 w-32 cursor-default items-center justify-center bg-pink-500 text-center text-lg text-white">
                <AiFillHeart className="mr-2 h-6 w-6 fill-current" />
                <span>{hasAdded}</span>
              </div>
            </div>
          </div>
          <hr className="opacity-20 mt-4" />
          <div className="mt-6 mb-2">
            <h4 className="text-xl">Description</h4>
            <p className="text-gray-400 w-full">{waifu.desc}</p>
          </div>
        </div>
      </section>
    </article>
  );
};

export default AboutWaifu;
