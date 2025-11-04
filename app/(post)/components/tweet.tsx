"use client";

import { type ReactNode, Suspense } from "react";
import { TweetClient } from "./tweet-client";
import { Caption } from "./caption";
import { TweetSkeleton } from "react-tweet";

interface TweetArgs {
  id: string;
  caption: ReactNode;
}

export function Tweet({ id, caption }: TweetArgs) {
  return (
    <div className="tweet my-6">
      <div className={`flex justify-center`}>
        <Suspense fallback={<TweetSkeleton />}>
          <TweetClient id={id} />
        </Suspense>
      </div>
      {caption && <Caption>{caption}</Caption>}
    </div>
  );
}
