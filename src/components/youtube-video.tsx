// Set this component as a client component
"use client";
// Youtube Video Stylesheets
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
// Youtube Video Requirements
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { useEffect, useState } from "react";
// Youtube Video Props
interface Props {
  id: string;
  title: string;
  fallbackImage: string;
}
// Youtube Video Main Function
function YoutubeVideo({ id, title, fallbackImage }: Props) {
  // Youtube Video Hooks
  const [thumbnail, SetThumbnail] = useState(
    `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
  );
  // Execute this use effect when page is loading
  useEffect(() => {
    const YOUTUBE_IMAGE = new Image();
    YOUTUBE_IMAGE.src = thumbnail;
    YOUTUBE_IMAGE.onload = () => {
      if (
        (YOUTUBE_IMAGE.naturalWidth === 120 &&
          YOUTUBE_IMAGE.naturalHeight === 90) ||
        (YOUTUBE_IMAGE.naturalWidth === 0 && YOUTUBE_IMAGE.naturalHeight === 0)
      ) {
        SetThumbnail(fallbackImage);
      }
    };
  }, [fallbackImage, thumbnail]);
  // Returns Youtube Video Component
  return (
    // Youtube Video Main Function
    <div className="rounded-md overflow-hidden">
      <LiteYouTubeEmbed
        id={id}
        title={title}
        poster="maxresdefault"
        thumbnail={thumbnail}
      />
    </div>
  );
}

export default YoutubeVideo;
