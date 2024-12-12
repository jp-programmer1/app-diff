import React from "react";
import { useOthers } from "@liveblocks/react/suspense";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { connectionIdToColor } from "@/lib/utils";
import { Home } from "lucide-react";
import Link from "next/link";

const lethers = ["a", "b", "c", "f", "g", "xs", "lo", "pe"];

export const Header = ({ appName }: { appName: string }) => {
  const others = useOthers();

  return (
    <div className="p-2 border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={'/'}><Home/></Link>
          <h1 className="text-2xl font-bold">{appName}</h1>
        </div>
        <div className="flex items-center gap-1">
          {others.map((_, i) => (
            <Avatar key={i}>
              <AvatarFallback color={connectionIdToColor(_.connectionId)}>{lethers[i].toLocaleUpperCase() || 'po'}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
    </div>
  );
};
