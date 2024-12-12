'use client';
import React, { useCallback } from "react";
import { Header } from "../header";
import { Editor } from "./editor";
import { Cursors } from "../cursor";
import { useMyPresence } from "@liveblocks/react/suspense";
const Page = () => {
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
        <Header appName="JSON Diff" />
        <Editor />
      </section>
    </div>
  )
}

export default Page;
