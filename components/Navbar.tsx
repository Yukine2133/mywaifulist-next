import Link from "next/link";
import { BiSearch, BiMenu } from "react-icons/bi";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { addUser } from "@/actions/user.actions";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (user) {
    await addUser(user);
  }
  return (
    <nav className="bg-black py-3 px-3 md:px-10 flex items-center justify-between lg:justify-evenly text-[#9ca3af]">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="text-xl md:text-[22px] lg:text-2xl text-white"
        >
          My<span className="text-pink-500 font-bold">Waifu</span>List
        </Link>
        <div className="lg:flex hidden gap-6">
          <h2 className="font-medium ">Random</h2>
          <h2 className="font-medium ">Browse</h2>
          <Link href="add-waifu" className="font-medium">
            Add Waifu
          </Link>
        </div>
      </div>
      <div className="items-center flex justify-start px-2 rounded-lg bg-[#27272a]">
        <input
          type="text"
          placeholder="Search"
          className="p-2 bg-transparent outline-none w-fit text-sm lg:text-base"
        />
        <BiSearch className="text-lg lg:text-xl" />
      </div>
      {user ? (
        <div className=" items-center gap-4 lg:flex hidden">
          <Image
            src={user.picture!}
            alt={user.given_name!}
            width={42}
            height={42}
            className="rounded-full"
          />
          <LogoutLink>Logout</LogoutLink>
        </div>
      ) : (
        <div className=" items-center gap-4 lg:flex hidden">
          <LoginLink>Sign in</LoginLink>
          <RegisterLink>Sign up</RegisterLink>
        </div>
      )}
      <div className="lg:hidden">
        <BiMenu className="text-2xl" />
      </div>
    </nav>
  );
};

export default Navbar;
