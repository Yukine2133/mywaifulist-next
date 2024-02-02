import Link from "next/link";
import { BiSearch, BiMenu } from "react-icons/bi";

const Navbar = () => {
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
      <div className=" items-center gap-4 lg:flex hidden">
        <button>Login</button>
        <button>Sign Up</button>
      </div>
      <div className="lg:hidden">
        <BiMenu className="text-2xl" />
      </div>
    </nav>
  );
};

export default Navbar;
