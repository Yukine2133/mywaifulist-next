import { connectDb } from "@/lib/connectDb";
import { Waifu } from "@/models/waifu.model";
import Image from "next/image";

export interface WaifuProps {
  image: string;
  name: string;
  userId: string;
  desc: string;
}

export default async function Home() {
  const fetchWaifus = async () => {
    try {
      await connectDb();
      const waifus: WaifuProps[] = await Waifu.find();
      console.log(waifus);
      return waifus;
    } catch (error) {
      console.error(error);
    }
  };

  const waifus = await fetchWaifus();

  return (
    <main>
      {waifus?.map((waifu) => (
        <div key={waifu.name}>
          <Image src={waifu.image} alt={waifu.name} width={350} height={450} />
          <h2>{waifu.name}</h2>
          <p>{waifu.desc}</p>
        </div>
      ))}
    </main>
  );
}
