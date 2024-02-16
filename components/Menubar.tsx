"use client";

import { IUser } from "@/actions/user.actions";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { BiMenu } from "react-icons/bi";

interface MenuUser {
  user: IUser;
}

const Menubar = ({ user }: MenuUser) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="lg:hidden relative">
      <BiMenu onClick={() => setIsOpen((prev) => !prev)} className="text-2xl" />

      {isOpen && (
        <div className="absolute bg-gray-950 top-8 right-[-10px] w-[150px] p-2 shadow-lg rounded-sm text-center ">
          {user ? (
            <div className="flex flex-col">
              <Link
                href="/add-waifu"
                className="font-medium hover:text-gray-200"
                onClick={closeMenu}
              >
                Add Waifu
              </Link>
              <Link
                href="/rules"
                className="font-medium hover:text-gray-200"
                onClick={closeMenu}
              >
                Rules
              </Link>
            </div>
          ) : null}
          {user ? <hr className="opacity-50 my-2" /> : null}
          {user ? (
            <div className="flex flex-col items-center gap-2 ">
              <Link
                className="flex flex-col items-center gap-1"
                href={`/profile/${user.id}`}
                onClick={closeMenu}
              >
                <Image
                  src={user.picture!}
                  alt={user.given_name!}
                  width={42}
                  height={42}
                  className="rounded-full"
                />
                <h1 className="text-gray-300">{user.given_name}</h1>
              </Link>
              <LogoutLink className="hover:text-gray-200 transition-colors duration-300">
                Logout
              </LogoutLink>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 ">
              <LoginLink className="hover:text-gray-200 transition-colors duration-300">
                Sign in
              </LoginLink>
              <RegisterLink className="hover:text-gray-200 transition-colors duration-300">
                Sign up
              </RegisterLink>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Menubar;
