import { useEffect, useState } from "react";

import WaifuCard from "@/components/WaifuCard";
import { searchWaifu } from "@/actions/waifu.actions";
import { WaifuProps } from "../page";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string | null };
}) => {
  const query = searchParams.q;

  const waifus = await searchWaifu(query);

  return (
    <div>
      {waifus?.map((waifu) => (
        <WaifuCard waifu={waifu} key={waifu._id} />
      ))}
    </div>
  );
};

export default SearchPage;
