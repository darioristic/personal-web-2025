import { NextResponse } from "next/server";
import redis from "@/app/redis";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Dynamically import getTweet to avoid CSS module issues
  const { getTweet } = await import("react-tweet/api");

  // we first prioritize getting a fresh tweet
  try {
    const tweet = await getTweet(id);

    // @ts-ignore
    if (tweet && !tweet.tombstone) {
      // we populate the cache if we have a fresh tweet
      await redis.set(`tweet:${id}`, tweet);
      return NextResponse.json(tweet);
    }
  } catch (error) {
    console.error("tweet fetch error", error);
  }

  const cachedTweet = await redis.get(`tweet:${id}`);

  // @ts-ignore
  if (!cachedTweet || cachedTweet.tombstone) {
    return NextResponse.json(null, { status: 404 });
  }

  return NextResponse.json(cachedTweet);
}

