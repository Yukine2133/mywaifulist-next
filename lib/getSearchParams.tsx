"use client";

import { useSearchParams } from "next/navigation";

export const GetSearchParams = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams ? searchParams.get("q") : null;

  return searchQuery;
};
