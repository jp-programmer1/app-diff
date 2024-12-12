"use client";

import React, { useCallback, useState } from "react";
import { Header } from "../header";
import { Cursors } from "../cursor";
import {
  useMutation,
  useMyPresence,
  useStorage,
} from "@liveblocks/react/suspense";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { KeepForm } from "./keep-form";
import './style.css';
import { Keep } from "@/types/keep.type";

const Page = () => {
  const updateMyPresence = useMyPresence()[1];

  const { keeps } = useStorage((s) => ({
    keeps: s.keeps,
  }));

  const updateKeeps = useMutation(
    ({ storage }, value) => {
      const newKeeps = [...keeps, value];
      storage.set("keeps", newKeeps);
    },
    [keeps]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } });
    },
    [updateMyPresence]
  );

  const onAddNote = useCallback(() => {
    const id = crypto.randomUUID();
    updateKeeps({
      id: id,
      title: "New Note",
      content: "New Note Content",
    });
  }, [updateKeeps]);

  const [openKeep, setOpenKeep] = useState<Keep | null>();

  return (
    <div className="h-screen w-full relative" onPointerMove={onPointerMove}>
      <div className="absolute">
        <Cursors />
      </div>
      <section className="flex flex-col gap-5">
        <Header appName="Keep" />
        <div className="p-2">
          <Button onClick={onAddNote}>
            {" "}
            <Plus /> Nueva Nota
          </Button>
          <div className="mt-5 grid md:grid-cols-7 sm:grid-cols-2 gap-2">
            {keeps.map((keep, i) => (
              <div
                key={i}
                onClick={() => {
                  setOpenKeep(keep);
                }}
                className="p-2 flex justify-center items-center border cursor-pointer rounded-md hover:bg-gray-100 transition-all"
              >
                <p className="font-bold">{keep.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {openKeep && (
        <KeepForm
          open={!!openKeep}
          onClose={() => setOpenKeep(null)}
          data={openKeep}
        />
      )}
    </div>
  );
};

export default Page;
