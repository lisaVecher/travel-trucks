"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  const homeIsActive = pathname === "/";
  const catalogIsActive = pathname.startsWith("/catalog");

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="TravelTrucks home">
          <Image
            src="/icons/traveltrucks-logo.svg"
            alt="TravelTrucks"
            width={136}
            height={15}
            priority
            className={styles.logoImage}
          />
        </Link>

        <nav aria-label="Main navigation">
          <ul className={styles.navigation}>
            <li>
              <Link
                href="/"
                className={`${styles.link} ${
                  homeIsActive ? styles.active : ""
                }`}
                aria-current={homeIsActive ? "page" : undefined}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/catalog"
                className={`${styles.link} ${
                  catalogIsActive ? styles.active : ""
                }`}
                aria-current={catalogIsActive ? "page" : undefined}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
