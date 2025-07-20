// Set this component as a client component
"use client";
// Slider Stylesheets
import "keen-slider/keen-slider.min.css";
// Slider Requirements
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import Image from "./image";
// Slider Props
interface Props {
  title: string;
  contentList: { cover: string; slug: string }[];
}
// Slider Main Function
function Slider({ title, contentList }: Props) {
  // Slider Hooks
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 5.2, spacing: 7 },
    breakpoints: {
      "(max-width: 600px)": { slides: { perView: 4.2, spacing: 7 } },
      "(max-width: 400px)": { slides: { perView: 3.2, spacing: 7 } },
    },
  });
  // Returs Slider Component
  return (
    // Slider Main Section
    <section className="flex flex-col gap-3">
      {/* Slider Title */}
      <h2 className="font-semibold text-xl text-gray-300 md:text-2xl">
        {title}
      </h2>
      {/* Slider Images Container */}
      <div className="flex items-center gap-2 relative">
        {/* Slider Left Button */}
        <button
          onClick={() => instanceRef.current?.prev()}
          className="hidden cursor-pointer md:block md:absolute md:top-0 md:left-0 md:z-10 md:shadow-xs md:bg-gray-900/70 md:h-full"
        >
          <ChevronLeftIcon className="w-10 h-10 fill-gray-300/70" />
        </button>
        {/* Slider Images */}
        <div ref={sliderRef} className="keen-slider">
          {contentList.map((content, index) => (
            // Slider Card
            <Link
              key={index}
              href={`/games/${content.slug}`}
              className="keen-slider__slide rounded-md"
            >
              <Image
                src={content.cover}
                alt={`${content.slug} Cover`}
                skeleton="cover"
                width={300}
                height={450}
                priority
                className="rounded-md w-44 h-28 mx-auto transition-all ease-in-out hover:scale-110 min-[376px]:h-32 min-[481px]:h-36 min-[580px]:h-40 min-[800px]:h-44 min-[850px]:h-52"
              />
            </Link>
          ))}
        </div>
        {/* Slider Right Button */}
        <button
          onClick={() => instanceRef.current?.next()}
          className="hidden cursor-pointer md:block md:absolute md:top-0 md:right-0 md:z-10 md:shadow-xs md:bg-gray-900/70 md:h-full"
        >
          <ChevronRightIcon className="w-10 h-10" />
        </button>
      </div>
    </section>
  );
}

export default Slider;
