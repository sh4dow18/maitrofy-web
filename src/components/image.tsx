// Set this component as a client component
"use client";
// Image Requirements
import { useState } from "react";
import { default as NextImage } from "next/image";
// Image Props
interface Props {
  src: string;
  alt: string;
  skeleton: "cover" | "background" | "profile";
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
}
// Image Main Function
function Image({
  src,
  alt,
  skeleton,
  width,
  height,
  className,
  fill,
  priority,
}: Props) {
  // Image Hooks
  const [loaded, SetLoaded] = useState(false);
  // Return Image Component
  return (
    <>
      {/* If the image has not loaded, place the skeleton image. */}
      {loaded === false && (
        <NextImage
          src={`/skeletons/${skeleton}.webp`}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          sizes={
            fill && skeleton === "background"
              ? "(min-width: 816px) 816px, (min-width: 600px) 520px"
              : undefined
          }
          className={`${className} animate-pulse`}
        />
      )}
      <NextImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        loading="eager"
        onLoad={() => SetLoaded(true)}
        sizes={
          fill && skeleton === "background"
            ? "(min-width: 816px) 816px, (min-width: 600px) 520px"
            : undefined
        }
        className={`${className} ${loaded === false ? "hidden" : ""}`}
      />
    </>
  );
}

export default Image;
