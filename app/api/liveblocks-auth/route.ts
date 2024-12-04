import { Liveblocks } from "@liveblocks/node";
import { NextResponse } from "next/server";
import { USER_INFO } from "../dummy-users";

/**
 * Authenticating your Liveblocks application
 * https://liveblocks.io/docs/authentication
 */

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!
});

export async function POST() {
  console.log(" process.env.LIVEBLOCKS_SECRET_KEY",  process.env.LIVEBLOCKS_SECRET_KEY);
  
  console.log("ola");
  
  if (!process.env.LIVEBLOCKS_SECRET_KEY) {
    return new NextResponse("Missing LIVEBLOCKS_SECRET_KEY", { status: 403 });
  }

  // Get the current user's unique id from your database
  const userIndex = Math.floor(Math.random() * USER_INFO.length);
  console.log('userIndex', userIndex)

  // Create a session for the current user (access token auth)
  const session = liveblocks.prepareSession(`user-${userIndex}`, {
    userInfo: USER_INFO[userIndex],
  });

  console.log("session", session);
  

  // Use a naming pattern to allow access to rooms with a wildcard
  session.allow(`my-room`, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { status, body } = await session.authorize();

  return new NextResponse(body, { status });
}
