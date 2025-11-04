"use client";

import { Tweet as TweetType } from "react-tweet/api";
import {
  EmbeddedTweet,
  TweetNotFound,
  type TweetProps,
} from "react-tweet";
import "./tweet.css";

interface TweetClientProps {
  tweet?: TweetType;
  components?: TweetProps["components"];
}

export function TweetClient({ tweet, components }: TweetClientProps) {
  if (!tweet) {
    return <TweetNotFound />;
  }

  return <EmbeddedTweet tweet={tweet} components={components} />;
}

