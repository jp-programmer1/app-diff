"use client";

import localFont from "next/font/local";
import "./globals.css";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LiveblocksProvider
          authEndpoint="/api/liveblocks-auth"
          resolveUsers={async ({ userIds }) => {
            const searchParams = new URLSearchParams(
              userIds.map((userId) => ["userIds", userId])
            );
            const response = await fetch(`/api/users?${searchParams}`);
            console.log("response", response);

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
            initialStorage={{ newPipeline: "", currentPipeline: "", keeps: [{ id: "129os", title: "Primer nota", content: "", color: "" }] }}
          >
            <ClientSideSuspense fallback={<div>Loading…</div>}>
              {children}
            </ClientSideSuspense>
          </RoomProvider>
        </LiveblocksProvider>
      </body>
    </html>
  );
}
