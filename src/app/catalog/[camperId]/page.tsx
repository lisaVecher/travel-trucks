import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FiMap, FiStar } from "react-icons/fi";
import { ApiError, getCamper, getCamperReviews } from "@/lib/api";
import { formatLabel, formatPrice } from "@/lib/constants";

import BookingForm from "@/components/BookingForm";
import FeatureBadges from "@/components/FeatureBadges";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";

import styles from "@/components/Details.module.css";

interface CamperDetailsPageProps {
  params: Promise<{
    camperId: string;
  }>;
}

export async function generateMetadata({
  params,
}: CamperDetailsPageProps): Promise<Metadata> {
  const { camperId } = await params;

  try {
    const camper = await getCamper(camperId);

    return {
      title: camper.name,
      description: camper.description,
    };
  } catch {
    return {
      title: "Camper not found",
      description: "The requested camper could not be found.",
    };
  }
}

async function getCamperDetailsData(camperId: string) {
  try {
    return await Promise.all([getCamper(camperId), getCamperReviews(camperId)]);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}

export default async function CamperDetailsPage({
  params,
}: CamperDetailsPageProps) {
  const { camperId } = await params;

  const [camper, reviews] = await getCamperDetailsData(camperId);

  return (
    <main className={`container ${styles.page}`}>
      <section className={styles.topGrid}>
        <Gallery images={camper.gallery} camperName={camper.name} />

        <div className={styles.rightColumn}>
          <section className={styles.summary}>
            <h1>{camper.name}</h1>

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

            <strong className={styles.price}>
              {formatPrice(camper.price)}
            </strong>

            <p className={styles.description}>{camper.description}</p>
          </section>

          <section className={styles.vehicleDetails}>
            <h2>Vehicle details</h2>

            <FeatureBadges
              transmission={camper.transmission}
              engine={camper.engine}
              form={camper.form}
              amenities={camper.amenities}
            />

            <dl className={styles.specifications}>
              <div>
                <dt>Form</dt>
                <dd>{formatLabel(camper.form)}</dd>
              </div>

              <div>
                <dt>Length</dt>
                <dd>{camper.length}</dd>
              </div>

              <div>
                <dt>Width</dt>
                <dd>{camper.width}</dd>
              </div>

              <div>
                <dt>Height</dt>
                <dd>{camper.height}</dd>
              </div>

              <div>
                <dt>Tank</dt>
                <dd>{camper.tank}</dd>
              </div>

              <div>
                <dt>Consumption</dt>
                <dd>{camper.consumption}</dd>
              </div>
            </dl>
          </section>
        </div>
      </section>

      <section
        className={styles.reviewsSection}
        aria-labelledby="reviews-title"
      >
        <h2 id="reviews-title" className={styles.reviewsTitle}>
          Reviews
        </h2>

        <div className={styles.bottomGrid}>
          <Reviews reviews={reviews} />

          <BookingForm camperId={camper.id} />
        </div>
      </section>
    </main>
  );
}
