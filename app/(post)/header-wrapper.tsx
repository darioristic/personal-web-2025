"use client";

import dynamic from "next/dynamic";
import type { Post } from "@/app/get-posts";

// Load Header only on client to avoid hydration issues with useSelectedLayoutSegments
const Header = dynamic(() => import("./header").then(mod => ({ default: mod.Header })), {
  ssr: false,
  loading: () => <div className="h-20" suppressHydrationWarning />,
});

export function HeaderWrapper({ posts }: { posts: Post[] }) {
  return <Header posts={posts} />;
}

