"use client";

import { fetchWaifus } from "@/actions/waifu.actions";
import WaifuCard from "@/components/WaifuCard";
import { useEffect, useState } from "react";

export interface WaifuProps {
  image: string;
  name: string;
  userId?: string;
  desc: string;
  _id?: string;
  appearsIn: string;
}

export default function Home() {
  const [waifus, setWaifus] = useState<WaifuProps[] | null>(null);
  useEffect(() => {
    const fetchWaifu = async () => {
      const waifus = await fetchWaifus();

      setWaifus(waifus!);
    };
    fetchWaifu();
  }, []);

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mx-auto gap-8 w-fit mt-10 mb-4">
      {waifus?.map((waifu) => (
        <WaifuCard waifu={waifu} key={waifu._id} />
      ))}
    </main>
  );
}
