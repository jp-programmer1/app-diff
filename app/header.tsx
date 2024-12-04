import React from "react";
import { useOthers } from "@liveblocks/react/suspense";

export const Header = () => {
  const others = useOthers();

  // console.log("userCount", userCount);

  return (
    <div className="p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Diff JSON</h1>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-semibold">Usuarios conectados: {others.length + 1}</span>
        </div>
      </div>
    </div>
  );
};
