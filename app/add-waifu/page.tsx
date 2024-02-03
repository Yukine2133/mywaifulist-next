import { addWaifu } from "@/actions/waifu.actions";
import { SubmitButton } from "@/components/SubmitButton";

const AddWaifu = async () => {
  return (
    <div className="bg-black-2 p-4 justify-center max-w-[1200px] mx-auto items-center flex mt-8 text-[#9ca3af] ">
      <form className="flex flex-col w-96 " action={addWaifu}>
        <label>Name</label>
        <input
          className="bg-[#27272a]  outline-none px-3 py-2 mb-4 rounded-md"
          type="text"
          name="name"
        />
        <label>Appears In</label>
        <input
          className="bg-[#27272a]  outline-none px-3 py-2 mb-4 rounded-md"
          type="text"
          name="appearsIn"
        />
        <label>Description</label>

        <textarea
          className="bg-[#27272a]  h-[150px] outline-none px-3 py-2 mb-4 rounded-md"
          name="desc"
        />
        <label>Image</label>

        <input
          className="bg-[#27272a] outline-none px-3 py-2 rounded-md"
          type="text"
          name="image"
        />
        <hr className="opacity-20" />
        <SubmitButton />
      </form>
    </div>
  );
};

export default AddWaifu;
