export function YouTube({ videoId, title }: { videoId: string; title?: string }) {
  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?modestbranding=1`;
  
  const videoData = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title || 'YouTube Video',
    description: title || 'YouTube Video',
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: embedUrl,
  };

  return (
    <div className="my-5" suppressHydrationWarning>
      <script
        id={`youtube-structured-data-${videoId}`}
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoData) }}
      />
      <div className="relative w-full aspect-video" suppressHydrationWarning>
        <iframe
          src={embedUrl}
          title={title || 'YouTube video player'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
          style={{ border: 0 }}
          suppressHydrationWarning
        />
      </div>
    </div>
  );
}
