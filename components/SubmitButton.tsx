"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="mt-4 bg-[#4b5562] w-32 mx-auto text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-300"
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
