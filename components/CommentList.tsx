import { fetchUser } from "@/actions/user.actions";
import { fetchWaifuComments } from "@/actions/waifu.actions";
import Image from "next/image";
import React from "react";

interface CommentProps {
  user: string;
  content: string;
  timestamp: Date;
  _id: string;
}

const CommentList = async ({ id }: { id: string }) => {
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

        return (
          <div
            className="my-6 ml-[3%] sm:ml-[12%] lg:ml-[15%] xl:ml-[18%]  2xl:ml-[28%]"
            key={comment._id}
          >
            <div className="flex items-center gap-2">
              <Image
                src={users[index]?.picture}
                alt={users[index]?.given_name}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <p>{users[index]?.given_name}</p>
                <p className="text-gray-400 text-sm">
                  {formattedDate}, {formattedTime}
                </p>
              </div>
            </div>
            <p className="mt-4 bg-black-2 p-3 text-gray-200 max-w-[850px] 2xl:max-w-[830px] whitespace-pre-line break-all rounded-md">
              {comment.content}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
