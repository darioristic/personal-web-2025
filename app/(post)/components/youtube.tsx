"use client";
import YT from "react-youtube";
import Script from 'next/script'

export function YouTube({ videoId, title, ...props }: any) {
  const videoData = videoId ? {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title || 'YouTube Video',
    description: title || 'YouTube Video',
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    uploadDate: new Date().toISOString(),
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
  } : null;

  return (
    <div className="my-5">
      {videoData && (
        <Script
          id={`youtube-structured-data-${videoId}`}
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoData) }}
        />
      )}
      <div className="relative w-full aspect-video">
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
      </div>
    </div>
  );
}
