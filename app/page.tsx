"use client";

import React from "react";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { App } from "./app";


const Page = () => {
  return (
    <LiveblocksProvider
      publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCK || ""}
    >
      <RoomProvider
        initialPresence={{ cursor: null }}
        id="my-room"
        initialStorage={{ newPipeline: "", currentPipeline: "" }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <App />
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default Page;
