"use client";

import {
  EmbeddedTweet,
  TweetNotFound,
  type TweetProps,
} from "react-tweet";
import "./tweet.css";

interface TweetClientProps {
  tweet: any;
  components?: TweetProps["components"];
}

// Client component that renders the tweet with CSS modules
export function TweetClient({ tweet, components }: TweetClientProps) {
  if (!tweet) {
    return <TweetNotFound />;
  }

  return <EmbeddedTweet tweet={tweet} components={components} />;
}

