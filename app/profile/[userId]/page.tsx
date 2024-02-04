import { IUser, fetchUser, fetchUserWaifus } from "@/actions/user.actions";
import WaifuCard from "@/components/WaifuCard";
import Image from "next/image";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Profile = async ({ params }: { params: { userId: string } }) => {
  const { getUser } = getKindeServerSession();
  const currentUser = await getUser();
  const user: IUser = await fetchUser(params.userId);

  const waifus = await fetchUserWaifus(params.userId);

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
        <h6 className="mt-4">The waifus that user have created</h6>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mx-auto gap-8 w-fit mt-10 mb-4">
        {waifusArray.map((waifu) => (
          <WaifuCard key={waifu._id} waifu={waifu} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
