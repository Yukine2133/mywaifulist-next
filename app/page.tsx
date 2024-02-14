import { fetchWaifus } from "@/actions/waifu.actions";
import WaifuCard from "@/components/WaifuCard";
import { toast } from "react-toastify";

export interface WaifuProps {
  image: string;
  name: string;
  userId?: string;
  desc: string;
  _id?: string;
  appearsIn: string;
  message?: string;
}

export default async function Home() {
  const waifus = await fetchWaifus();

  if ("message" in waifus) {
    toast(waifus.message);
    return null;
  }

  if (!waifus) {
    return (
      <div className="flex justify-center mt-10 ">
        <h1 className="text-2xl">
          Something went wrong. Please try refreshing the page.
        </h1>
      </div>
    );
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 mx-auto gap-8 w-fit mt-10 mb-4">
      {waifus?.map((waifu: WaifuProps) => (
        <WaifuCard waifu={waifu} key={waifu._id} />
      ))}
    </main>
  );
}
