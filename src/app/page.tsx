import type { Metadata } from "next";
import Link from "next/link";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "Home",
  description: "Find and rent the camper of your dreams with TravelTrucks.",
};

export default function HomePage() {
  return (
    <main className={css.hero}>
      <div className={`container ${css.content}`}>
        <h1>Campers of your dreams</h1>

        <p>You can find everything you want in our catalog</p>

        <Link href="/catalog" className={css.button}>
          View Now
        </Link>
      </div>
    </main>
  );
}
