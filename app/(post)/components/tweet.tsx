"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Caption } from "./caption";

interface TweetProps {
  id: string;
  caption?: ReactNode;
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        createTweet: (id: string, element: HTMLElement, options?: any) => Promise<any>;
      };
    };
  }
}

export function Tweet({ id, caption }: TweetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Load Twitter's embed script
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";

    const loadWidget = () => {
      if (window.twttr?.widgets) {
        window.twttr.widgets.createTweet(id, containerRef.current!, {
          theme: "auto",
        }).catch(() => {
          // Tweet not found or error
          if (containerRef.current) {
            containerRef.current.innerHTML = `
              <div class="text-center p-8 text-neutral-500 dark:text-neutral-400">
                <p>Tweet not available</p>
              </div>
            `;
          }
        });
      }
    };

    if (window.twttr) {
      loadWidget();
    } else {
      script.onload = loadWidget;
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [id]);

  return (
    <div className="tweet my-6">
      <div className="flex justify-center">
        <div ref={containerRef} className="w-full max-w-[550px]" />
      </div>
      {caption && <Caption>{caption}</Caption>}
    </div>
  );
}
