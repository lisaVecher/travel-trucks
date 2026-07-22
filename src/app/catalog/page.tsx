import type { Metadata } from "next";

import CatalogClient from "@/components/CatalogClient";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Browse and filter available campers for your next journey.",
};

export default function CatalogPage() {
  return <CatalogClient />;
}
