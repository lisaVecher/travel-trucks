"use client";

import { useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { CamperImage } from "@/types/camper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./Gallery.module.css";

interface GalleryProps {
  images: CamperImage[];
  camperName: string;
}

export default function Gallery({ images, camperName }: GalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const sortedImages = [...images].sort(
    (firstImage, secondImage) => firstImage.order - secondImage.order,
  );

  if (sortedImages.length === 0) {
    return <div className={styles.empty}>No camper images are available.</div>;
  }

  return (
    <section
      className={styles.gallery}
      aria-label={`${camperName} image gallery`}
    >
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        spaceBetween={16}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className={styles.mainSwiper}
      >
        {sortedImages.map((image, index) => (
          <SwiperSlide key={image.id}>
            <div className={styles.mainImage}>
              <Image
                src={image.original}
                alt={`${camperName}, image ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(max-width: 900px) 100vw, 640px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        modules={[FreeMode, Thumbs]}
        onSwiper={setThumbsSwiper}
        freeMode
        watchSlidesProgress
        slidesPerView={4}
        spaceBetween={24}
        className={styles.thumbsSwiper}
      >
        {sortedImages.map((image, index) => (
          <SwiperSlide key={image.id}>
            <div className={styles.thumbImage}>
              <Image
                src={image.thumb}
                alt={`${camperName} thumbnail ${index + 1}`}
                fill
                sizes="142px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
