import React from "react";

const Rules = () => {
  return (
    <article className="mt-10 px-3">
      <section className="bg-black-2 md:w-2/3 lg:w-3/4 mx-auto flex-col lg:flex-row flex gap-7 max-w-full p-3">
        <div className="text-white">
          <h2 className="text-2xl font-semibold mb-4">Rules</h2>
          <ul className="list-disc pl-6">
            <li className="mb-2">You cannot post NSFW content (18+).</li>
            <li className="mb-2">You can only post images of anime girls.</li>
            <li className="mb-2">
              Comments containing hateful, racist, or vulgar language are
              strictly prohibited.
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
};

export default Rules;
