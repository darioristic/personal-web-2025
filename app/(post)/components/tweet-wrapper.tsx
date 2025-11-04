"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";

interface TweetWrapperProps {
  id: string;
  caption?: ReactNode;
}

// This wrapper is needed because MDX components can't be Client Components directly
// We use dynamic import to completely disable SSR
const Tweet = dynamic(() => import("./tweet").then((mod) => mod.Tweet), {
  ssr: false,
});

export function TweetWrapper({ id, caption }: TweetWrapperProps) {
  return <Tweet id={id} caption={caption} />;
}

