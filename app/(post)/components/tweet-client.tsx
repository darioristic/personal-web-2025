"use client";

import { useEffect, useState, type ReactNode } from "react";
import "./tweet.css";

interface TweetClientProps {
  id: string;
  fallback?: ReactNode;
}

export function TweetClient({ id, fallback }: TweetClientProps) {
  const [tweet, setTweet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [EmbeddedTweet, setEmbeddedTweet] = useState<any>(null);
  const [TweetNotFound, setTweetNotFound] = useState<any>(null);

  useEffect(() => {
    // Dynamically import react-tweet components only on client side
    Promise.all([
      import("react-tweet").then((mod) => mod.EmbeddedTweet),
      import("react-tweet").then((mod) => mod.TweetNotFound),
    ]).then(([Embedded, NotFound]) => {
      setEmbeddedTweet(() => Embedded);
      setTweetNotFound(() => NotFound);
    });
  }, []);

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

  if (loading || !EmbeddedTweet || !TweetNotFound) {
    return <>{fallback}</>;
  }

  if (!tweet) {
    return <TweetNotFound />;
  }

  return <EmbeddedTweet tweet={tweet} />;
}
