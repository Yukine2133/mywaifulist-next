import React from "react";
import { fetchWaifu } from "@/actions/waifu.actions";
import Image from "next/image";
import { AiFillHeart } from "react-icons/ai";
import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import LikeButton from "@/components/LikeButton";
import CommentSection from "@/components/CommentSection";

const AboutWaifu = async ({ params }: { params: { id: string } }) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const { id } = params;

  const waifu = await fetchWaifu(id);

  const isCreator = waifu?.userId === user?.id;

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
          <LikeButton id={id} user={user!} likes={waifu.likes} />

          {isCreator && (
            <>
              <DeleteButton id={id} />
              <EditButton id={id} />
            </>
          )}
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
                <span>{waifu?.likes.length}</span>
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
      <CommentSection id={id} />
    </article>
  );
};

export default AboutWaifu;
