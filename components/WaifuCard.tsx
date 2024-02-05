import { WaifuProps } from "@/app/page";
import Image from "next/image";
import Link from "next/link";

const WaifuCard = ({ waifu }: { waifu: WaifuProps }) => {
  return (
    <Link href={`/${waifu._id}`}>
      <div className="bg-black-2 w-[340px] rounded-md overflow-hidden pb-1">
        <div className="w-full h-[300px]">
          <Image
            src={waifu.image}
            alt={waifu.name}
            width={350}
            height={350}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center mt-1 space-y-2">
          <h3>{waifu.name}</h3>
          <hr className="opacity-20 w-9/12 mx-auto" />
          <h3>{waifu.appearsIn}</h3>
        </div>
      </div>
    </Link>
  );
};

export default WaifuCard;
