import type { IconType } from "react-icons";

import {
  FiBox,
  FiCheckCircle,
  FiCoffee,
  FiDroplet,
  FiRadio,
  FiSettings,
  FiTool,
  FiTruck,
  FiTv,
  FiWind,
  FiZap,
} from "react-icons/fi";

import { formatLabel } from "@/lib/constants";

import type { Amenity, CamperForm, Engine, Transmission } from "@/types/camper";

import styles from "./FeatureBadges.module.css";

const icons: Record<string, IconType> = {
  automatic: FiSettings,
  manual: FiSettings,

  diesel: FiTool,
  petrol: FiTool,
  hybrid: FiZap,
  electric: FiZap,

  alcove: FiTruck,
  panel_van: FiTruck,
  integrated: FiTruck,
  semi_integrated: FiTruck,

  ac: FiWind,
  bathroom: FiDroplet,
  kitchen: FiCoffee,
  tv: FiTv,
  radio: FiRadio,
  refrigerator: FiBox,
  microwave: FiBox,
  gas: FiZap,
  water: FiDroplet,
};

type FeatureValue = Transmission | Engine | CamperForm | Amenity;

interface FeatureBadgesProps {
  transmission: Transmission;
  engine: Engine;
  form: CamperForm;
  amenities?: Amenity[];
  showAmenities?: boolean;
}

export default function FeatureBadges({
  transmission,
  engine,
  form,
  amenities = [],
  showAmenities = true,
}: FeatureBadgesProps) {
  const acAmenities: Amenity[] = amenities.includes("ac") ? ["ac"] : [];

  const otherAmenities = amenities.filter((amenity) => amenity !== "ac");

  const values: FeatureValue[] = showAmenities
    ? [transmission, ...acAmenities, engine, ...otherAmenities, form]
    : [engine, transmission, form];

  return (
    <ul className={styles.list} aria-label="Camper features">
      {values.map((value) => {
        const Icon = icons[value] ?? FiCheckCircle;

        return (
          <li key={value} className={styles.item}>
            <Icon aria-hidden="true" />
            <span>{formatLabel(value)}</span>
          </li>
        );
      })}
    </ul>
  );
}
