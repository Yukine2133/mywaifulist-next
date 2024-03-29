import { fetchUser } from "@/actions/user.actions";
import { fetchWaifuComments } from "@/actions/waifu.actions";
import Image from "next/image";
import React from "react";
import ButtonDelete from "./ButtonDelete";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import EditModal from "./EditModal";
import Link from "next/link";

interface CommentProps {
  user: string;
  content: string;
  timestamp: Date;
  _id: string;
}

const CommentList = async ({ id }: { id: string }) => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();
  const comments = await fetchWaifuComments(id);
  const users = await Promise.all(
    comments.map(async (comment: CommentProps) => await fetchUser(comment.user))
  );

  return (
    <div>
      {comments.map((comment: CommentProps, index: number) => {
        // Format date
        const formattedDate = new Date(comment.timestamp).toLocaleDateString(
          undefined,
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        );
        const formattedTime = new Date(comment.timestamp).toLocaleTimeString(
          undefined,
          {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }
        );
        const isCreator = comment.user === user?.id;
        return (
          <div
            className="my-6 ml-[3%] sm:ml-[12%] lg:ml-[15%] xl:ml-[18%]  2xl:ml-[28%]"
            key={comment._id}
          >
            <div className="flex items-center gap-2">
              <Link href={`/profile/${users[index]?.id}`}>
                <Image
                  src={users[index]?.picture}
                  alt={users[index]?.given_name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              </Link>
              <div>
                <Link href={`/profile/${users[index]?.id}`}>
                  <p>{users[index]?.given_name}</p>
                </Link>
                <p className="text-gray-400 text-sm">
                  {formattedDate}, {formattedTime}
                </p>
              </div>
            </div>
            <div className="mt-3 bg-black-2 p-3 text-gray-200 max-w-[850px] 2xl:max-w-[830px] whitespace-pre-line break-all rounded-md flex justify-between relative">
              <p className="mt-2">{comment.content}</p>
              <div className="flex gap-3 items-center absolute top-1 right-0 ">
                {isCreator && (
                  <>
                    <ButtonDelete waifuId={id} id={comment._id.toString()} />
                    <EditModal waifuId={id} id={comment._id.toString()} />
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
