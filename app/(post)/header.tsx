"use client";

import { useEffect, useRef, useState } from "react";

import { useSelectedLayoutSegments } from "next/navigation";
import useSWR from "swr";
import { ago } from "time-ago";

import type { Post } from "@/app/get-posts";

const fetcher = (url: string) => fetch(url).then(res => res.json());

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
            defaultValue={post.viewsFormatted}
          />
        </span>
      </p>
    </>
  );
}

function Views({ 
  id, 
  mutate, 
  defaultValue 
}: { 
  id: string; 
  mutate: (data?: unknown) => void; 
  defaultValue: string | null; 
}) {
  const [views, setViews] = useState<string | null>(null);
  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    // Set initial value from server
    setViews(defaultValue);
    
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
  }, [id, mutate, defaultValue]);

  // Server renders empty, client renders after hydration
  return <span suppressHydrationWarning>{views != null ? `${views} views` : (defaultValue != null ? `${defaultValue} views` : '')}</span>;
}
