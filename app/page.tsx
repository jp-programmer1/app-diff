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
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const searchParams = new URLSearchParams(
          userIds.map((userId) => ["userIds", userId])
        );
        const response = await fetch(`/api/users?${searchParams}`);
        console.log('response', response)

        if (!response.ok) {
          throw new Error("Problem resolving users");
        }

        const users = await response.json();
        return users;
      }}
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
