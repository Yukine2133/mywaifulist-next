"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchWaifus } from "@/actions/waifu.actions";

const RandomPage = () => {
  const router = useRouter();

  useEffect(() => {
    const getRandomWaifu = async () => {
      const waifus = await fetchWaifus();
      if (waifus) {
        const randomIndex = Math.floor(Math.random() * waifus.length);
        const randomWaifu = waifus[randomIndex];
        router.push(`/${randomWaifu._id}`);
      }
    };

    getRandomWaifu();
  }, []);

  return null;
};

export default RandomPage;
