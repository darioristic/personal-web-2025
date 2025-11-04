"use client";

import { type ReactNode } from "react";
import { TweetClient } from "./tweet-client";
import { Caption } from "./caption";

interface TweetArgs {
  id: string;
  caption: ReactNode;
}

function TweetSkeleton() {
  return (
    <div className="tweet-skeleton animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-lg p-4 w-full max-w-[550px] h-[200px]" />
  );
}

export function Tweet({ id, caption }: TweetArgs) {
  return (
    <div className="tweet my-6">
      <div className={`flex justify-center`}>
        <TweetClient id={id} fallback={<TweetSkeleton />} />
      </div>
      {caption && <Caption>{caption}</Caption>}
    </div>
  );
}
