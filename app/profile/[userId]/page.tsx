import {
  IUser,
  fetchUser,
  fetchUserLikedWaifus,
  fetchUserWaifus,
} from "@/actions/user.actions";
import WaifuCard from "@/components/WaifuCard";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { toast } from "react-toastify";

export const generateMetadata = async ({
  params,
}: {
  params: { userId: string };
}) => {
  const user: IUser = await fetchUser(params.userId);
  return {
    title: user.given_name,
  };
};

const Profile = async ({ params }: { params: { userId: string } }) => {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();
  const user: IUser = await fetchUser(params.userId);

  const waifus = await fetchUserWaifus(params.userId);
  const likedWaifus = await fetchUserLikedWaifus(params.userId);

  const waifusArray = Array.isArray(waifus) ? waifus : [];

  const profileBelongsToCurrentUser = currentUser?.id === params.userId;

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="">
        <Image
          src={user.picture!}
          alt={user.given_name!}
          width={150}
          height={150}
          className="rounded-full"
        />
        <h2 className="text-center text-xl my-4">{user.given_name}</h2>
      </div>
      {profileBelongsToCurrentUser ? (
        <h6 className="mt-4">The waifus that you have created</h6>
      ) : (
        <h6 className="mt-4 text-gray-400">
          The waifus that
          <span className="text-gray-200"> {user.given_name}</span> has created
        </h6>
      )}
      {waifusArray.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mx-auto gap-8 w-fit mt-10 mb-4">
          {waifusArray.map((waifu) => (
            <WaifuCard key={waifu._id} waifu={waifu} />
          ))}
        </div>
      ) : (
        <h6 className="mt-6 text-sm mb-4">
          {profileBelongsToCurrentUser
            ? "You haven't created any waifus yet"
            : `${user.given_name} hasn't created any waifus yet`}
        </h6>
      )}

      {profileBelongsToCurrentUser ? (
        <h6 className="mt-4">The waifus that you have liked </h6>
      ) : (
        <h6 className="mt-4">
          The waifus that{" "}
          <span className="text-gray-200">{user.given_name}</span> has liked
        </h6>
      )}
      {likedWaifus && likedWaifus.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mx-auto gap-8 w-fit mt-10 mb-4">
          {likedWaifus.map((likedWaifu) => (
            <WaifuCard key={likedWaifu._id} waifu={likedWaifu} />
          ))}
        </div>
      ) : (
        <h6 className="mt-6 text-sm">
          {profileBelongsToCurrentUser
            ? "You haven't liked any waifus yet"
            : `${user.given_name} hasn't liked any waifus yet`}
        </h6>
      )}
    </div>
  );
};

export default Profile;
