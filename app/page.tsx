import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <section className="flex flex-col justify-center items-center h-[90vh] gap-4">
      <Link href={'/json-diff'} className="p-5 border w-[200px] flex items-center justify-center border-gray-500 cursor-pointer transition-colors hover:bg-gray-500 hover:text-white">
        JSON DIFF
      </Link>
      <Link href={'/keep'} className="p-5 border w-[200px] flex items-center justify-center border-gray-500 cursor-pointer transition-colors hover:bg-gray-500 hover:text-white">
        NOTAS
      </Link>
    </section>
  );
};

export default Page;
