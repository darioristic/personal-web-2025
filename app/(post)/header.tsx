"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

import { useSelectedLayoutSegments } from "next/navigation";
import useSWR from "swr";
import { ago } from "time-ago";

import type { Post } from "@/app/get-posts";

const fetcher = (url: string) => fetch(url).then(res => res.json());

function ViewsComponent({ 
  id, 
  mutate, 
  defaultValue 
}: { 
  id: string; 
  mutate: (data?: unknown) => void; 
  defaultValue: string | null; 
}) {
  const [views, setViews] = useState<string | null>(defaultValue);
  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    // Increment view when component mounts
    if (!hasIncrementedRef.current) {
      const url = "/api/view?incr=1&id=" + encodeURIComponent(id);
      fetch(url)
        .then(res => res.json())
        .then(obj => {
          setViews(obj.viewsFormatted);
          mutate(obj);
        })
        .catch(console.error);
      hasIncrementedRef.current = true;
    }
  }, [id, mutate]);

  return <span>{views != null ? `${views} views` : ''}</span>;
}

// Load Views component only on client to avoid hydration issues
const Views = dynamic(() => Promise.resolve(ViewsComponent), { ssr: false });

export function Header({ posts }: { posts: Post[] }) {
  const segments = useSelectedLayoutSegments();
  const [isClient, setIsClient] = useState(false);
  
  // segments can be:
  // date/post
  // lang/date/post
  const initialPost = posts.find(
    post => post.id === segments[segments.length - 1]
  );
  const { data: post, mutate } = useSWR(
    `/api/view?id=${initialPost?.id ?? ""}`,
    fetcher,
    {
      fallbackData: initialPost,
      refreshInterval: 5000,
    }
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (initialPost == null) return <></>;

  return (
    <>
      <h1 className="text-2xl font-bold mb-1 text-neutral-900 dark:text-gray-100">
        {post.title}
      </h1>

      <p className="font-mono flex text-xs text-neutral-700 dark:text-neutral-300">
        <span className="flex-grow">
          <span className="hidden md:inline">
            <span>
              <a
                href="https://twitter.com/dario_ristic"
                className="hover:text-neutral-800 dark:hover:text-neutral-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                @dario_ristic
              </a>
            </span>

            <span className="mx-2">|</span>
          </span>

          <span suppressHydrationWarning={true}>
            {post.date} {isClient ? `(${ago(post.date, true)} ago)` : ''}
          </span>
        </span>

        <span className="pr-1.5">
          <Views
            id={post.id}
            mutate={mutate}
            defaultValue={initialPost.viewsFormatted ?? post.viewsFormatted}
          />
        </span>
      </p>
    </>
  );
}
