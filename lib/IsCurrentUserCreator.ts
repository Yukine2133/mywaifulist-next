import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
const IsCurrentUserCreator = async () => {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  const isCurrentUserCreator = (userId: string) => {
    const isCreator = userId === user?.id;
    return isCreator;
  };

  return isCurrentUserCreator;
};

export default IsCurrentUserCreator;
