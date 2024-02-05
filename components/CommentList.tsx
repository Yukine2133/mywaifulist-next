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
        return (
          <div key={comment._id}>
            <Image
              src={users[index]?.picture}
              alt={users[index]?.given_name}
              width={64}
              height={64}
            />
            <p>{users[index]?.given_name}</p>
            <p>{comment.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
