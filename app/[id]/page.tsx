import { fetchWaifu } from "@/actions/waifu.actions";
import { connectDb } from "@/lib/connectDb";
import Image from "next/image";
import { WaifuProps } from "../page";
import { AiFillHeart } from "react-icons/ai";

const AboutWaifu = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const waifu: WaifuProps = await fetchWaifu(id);
  const hasAdded = 400;
  return (
    <article className="px-3 mt-10  ">
      <section className="bg-black-2  md:w-2/3 lg:w-3/4 mx-auto  ">
        <div className="flex gap-4 justify-between">
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={waifu.image}
              alt={waifu.name}
              width={300}
              height={300}
            />
            <h4 className="text-xl pt-4">{waifu.name}</h4>
            <div className="grid">{waifu.desc}</div>
          </div>
          <h4 className="pt-4 text-x">
            Appears in: <span>{waifu.appearsIn}</span>
          </h4>
          <div className="flex h-12 w-32 cursor-default items-center justify-center bg-pink-500 text-center text-lg text-white">
            <AiFillHeart className="mr-2 h-6 w-6 fill-current" />
            <span>{hasAdded}</span>
          </div>
        </div>
      </section>
    </article>
  );
};

export default AboutWaifu;
