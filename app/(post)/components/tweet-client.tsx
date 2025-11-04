"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Tweet as TweetType } from "react-tweet/api";
import {
  EmbeddedTweet,
  TweetNotFound,
  type TweetProps,
} from "react-tweet";
import "./tweet.css";

interface TweetClientProps {
  id: string;
  components?: TweetProps["components"];
  fallback?: ReactNode;
}

export function TweetClient({ id, components, fallback }: TweetClientProps) {
  const [tweet, setTweet] = useState<TweetType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTweet() {
      try {
        const response = await fetch(`/api/tweet/${id}`);
        if (response.ok) {
          const data = await response.json();
          setTweet(data);
        } else {
          setTweet(null);
        }
      } catch (error) {
        console.error("Failed to fetch tweet:", error);
        setTweet(null);
      } finally {
        setLoading(false);
      }
    }

    fetchTweet();
  }, [id]);

  if (loading) {
    return <>{fallback}</>;
  }

  if (!tweet) {
    return <TweetNotFound />;
  }

  return <EmbeddedTweet tweet={tweet} components={components} />;
}
