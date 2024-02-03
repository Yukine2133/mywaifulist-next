import { fetchWaifus } from "@/actions/waifu.actions";
import WaifuCard from "@/components/WaifuCard";

export interface WaifuProps {
  image: string;
  name: string;
  userId: string;
  desc: string;
  _id: string;
  appearsIn: string;
}

export default async function Home() {
  const waifus = await fetchWaifus();

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto gap-8 w-fit mt-10 mb-4">
      {waifus?.map((waifu) => (
        <WaifuCard waifu={waifu} key={waifu._id} />
      ))}
    </main>
  );
}
