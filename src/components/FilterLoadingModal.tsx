"use client";

import { useEffect, useRef } from "react";

import styles from "./FilterLoadingModal.module.css";

export default function FilterLoadingModal() {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;

      previouslyFocusedElement?.focus();
    };
  }, []);

  return (
    <div className={styles.overlay}>
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-loading-title"
        aria-describedby="filter-loading-description"
        tabIndex={-1}
      >
        <span className={styles.spinner} aria-hidden="true" />

        <h2 id="filter-loading-title">Loading tracks...</h2>

        <p id="filter-loading-description">
          Please wait while we fetch the best
          <br />
          travel trucks for you
        </p>
      </div>
    </div>
  );
}
