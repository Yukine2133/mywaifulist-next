import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { addUser } from "@/actions/user.actions";
import SearchInput from "./SearchInput";
import Menubar from "./Menubar";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (user) {
    await addUser(user);
  }
  return (
    <nav className="bg-black py-3 px-3 md:px-10 flex items-center justify-around lg:justify-evenly text-[#9ca3af] sticky top-0 ">
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="text-xl md:text-[22px] lg:text-2xl text-white "
        >
          My<span className="text-pink-500 font-bold">Waifu</span>List
        </Link>
        {user ? (
          <div className="lg:flex hidden ">
            <Link
              href="/add-waifu"
              className="font-medium hover:text-gray-200 transition-colors duration-300"
            >
              Add Waifu
            </Link>
          </div>
        ) : null}
      </div>
      <SearchInput />
      {user ? (
        <div className=" items-center gap-4 lg:flex hidden">
          <Link href={`/profile/${user.id}`}>
            <Image
              src={user.picture!}
              alt={user.given_name!}
              width={42}
              height={42}
              className="rounded-full"
            />
          </Link>
          <LogoutLink className="hover:text-gray-200 transition-colors duration-300">
            Logout
          </LogoutLink>
        </div>
      ) : (
        <div className=" items-center gap-4 lg:flex hidden">
          <LoginLink className="hover:text-gray-200 transition-colors duration-300">
            Sign in
          </LoginLink>
          <RegisterLink className="hover:text-gray-200 transition-colors duration-300">
            Sign up
          </RegisterLink>
        </div>
      )}
      <Menubar user={user!} />
    </nav>
  );
};

export default Navbar;
