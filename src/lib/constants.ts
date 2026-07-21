import type { FiltersResponse } from "@/types/camper";

export const API_BASE_URL = "https://campers-api.goit.study";

export const CAMPERS_PER_PAGE = 4;

export const DEFAULT_FILTER_OPTIONS: FiltersResponse = {
  forms: ["alcove", "panel_van", "integrated", "semi_integrated"],
  transmissions: ["automatic", "manual"],
  engines: ["diesel", "petrol", "hybrid", "electric"],
};

const labels: Record<string, string> = {
  alcove: "Alcove",
  panel_van: "Panel Van",
  integrated: "Integrated",
  semi_integrated: "Semi Integrated",
  automatic: "Automatic",
  manual: "Manual",
  diesel: "Diesel",
  petrol: "Petrol",
  hybrid: "Hybrid",
  electric: "Electric",
  ac: "AC",
  bathroom: "Bathroom",
  kitchen: "Kitchen",
  tv: "TV",
  radio: "Radio",
  refrigerator: "Refrigerator",
  microwave: "Microwave",
  gas: "Gas",
  water: "Water",
};

export function formatLabel(value: string): string {
  return (
    labels[value] ??
    value
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase())
  );
}

export function formatPrice(price: number): string {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    useGrouping: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);

  return `€${formattedPrice}`;
}
