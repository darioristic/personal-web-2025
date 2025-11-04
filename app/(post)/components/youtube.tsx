"use client";
import { useState, useEffect } from "react";
import YT from "react-youtube";
import Script from 'next/script'

export function YouTube({ videoId, title, ...props }: any) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const videoData = videoId ? {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title || 'YouTube Video',
    description: title || 'YouTube Video',
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
  } : null;

  return (
    <div className="my-5">
      {videoData && isClient && (
        <Script
          id={`youtube-structured-data-${videoId}`}
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoData) }}
        />
      )}
      <div className="relative w-full aspect-video">
        {isClient ? (
          <YT 
            videoId={videoId}
            className="absolute top-0 left-0 w-full h-full"
            iframeClassName="w-full h-full"
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                modestbranding: 1,
              },
            }}
            {...props} 
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <div className="text-gray-500">Loading video...</div>
          </div>
        )}
      </div>
    </div>
  );
}
