import Image from "next/image";
import Link from "next/link";

import { FiMap, FiStar } from "react-icons/fi";

import { formatPrice } from "@/lib/constants";

import type { CamperListItem } from "@/types/camper";

import FeatureBadges from "./FeatureBadges";

import styles from "./CamperCard.module.css";

interface CamperCardProps {
  camper: CamperListItem;
}

export default function CamperCard({ camper }: CamperCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={camper.coverImage}
          alt={`${camper.name} camper`}
          fill
          sizes="220px"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.heading}>
          <h2>{camper.name}</h2>

          <strong>{formatPrice(camper.price)}</strong>
        </div>

        <div className={styles.meta}>
          <span className={styles.rating}>
            <FiStar aria-hidden="true" />
            {camper.rating} ({camper.totalReviews} Reviews)
          </span>

          <span>
            <FiMap aria-hidden="true" />
            {camper.location}
          </span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <FeatureBadges
          transmission={camper.transmission}
          engine={camper.engine}
          form={camper.form}
          showAmenities={false}
        />

        <Link
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Show more
        </Link>
      </div>
    </article>
  );
}
