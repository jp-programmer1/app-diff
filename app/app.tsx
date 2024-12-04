import React, { useCallback } from "react";
import { Header } from "./header";
import { Editor } from "./editor";
import { Cursors } from "./cursor";
import { useMyPresence } from "@liveblocks/react/suspense";

export const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [myPresence, updateMyPresence] = useMyPresence();

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } });
    },
    [updateMyPresence]
  );

  return (
    <div className="h-screen w-full relative" onPointerMove={onPointerMove}>
      <div className="absolute">
        <Cursors />
      </div>
      <section className="flex flex-col gap-5">
        <Header />
        <Editor />
      </section>
    </div>
  );
};
