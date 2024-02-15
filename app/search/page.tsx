import WaifuCard from "@/components/WaifuCard";
import { searchWaifu } from "@/actions/waifu.actions";
import { toast } from "react-toastify";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: { q: string | null };
}) => {
  const query = searchParams.q;

  return {
    title: query,
  };
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { q: string | null };
}) => {
  const query = searchParams.q;

  const waifus = await searchWaifu(query);

  return (
    <div>
      <h6 className=" mt-4 flex justify-center gap-1">
        Searched results for <span className="font-bold"> {query}</span>
      </h6>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mx-auto gap-8 w-fit mt-10 mb-4">
        {waifus?.map((waifu) => (
          <WaifuCard waifu={waifu} key={waifu._id} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
