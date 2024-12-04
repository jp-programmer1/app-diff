import { connectionIdToColor } from "@/lib/utils";
import { useOther, useOthersConnectionIds } from "@liveblocks/react/suspense";
import { MousePointer2 } from "lucide-react";
import React from "react";

export const Cursor = ({ connectionId }: { connectionId: number }) => {
  const cursor = useOther(connectionId, (user) => user.presence.cursor);

  if (!cursor) return null;

  const { x, y } = cursor;

  return (
    <div
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
        height: 50,
        width: 12 * 10 + 24,
        zIndex: 100,
      }}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        className="h-5 w-5"
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
      />
      <div
        className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
        style={{
          backgroundColor: connectionIdToColor(connectionId),
        }}
      >
        ke
      </div>
    </div>
  );
};

export const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((id) => (
        <Cursor key={id} connectionId={id} />
      ))}
    </>
  );
};
