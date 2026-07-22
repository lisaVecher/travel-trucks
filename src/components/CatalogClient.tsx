"use client";

import { useState } from "react";

import Image from "next/image";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { FiX } from "react-icons/fi";

import { getAvailableFilters, getCampers } from "@/lib/api";
import { DEFAULT_FILTER_OPTIONS } from "@/lib/constants";

import type { CamperFilters } from "@/types/camper";

import CamperCard from "./CamperCard";
import FilterLoadingModal from "./FilterLoadingModal";
import FilterSidebar from "./FilterSidebar";
import Loader from "./Loader";

import styles from "./CatalogClient.module.css";

const EMPTY_FILTERS: CamperFilters = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
};

export default function CatalogClient() {
  const [draftFilters, setDraftFilters] = useState<CamperFilters>({
    ...EMPTY_FILTERS,
  });

  const [activeFilters, setActiveFilters] = useState<CamperFilters>({
    ...EMPTY_FILTERS,
  });

  const [searchVersion, setSearchVersion] = useState(0);

  const [hasSubmittedFilters, setHasSubmittedFilters] = useState(false);

  const filtersQuery = useQuery({
    queryKey: ["camper-filter-options"],
    queryFn: getAvailableFilters,
  });

  const campersQuery = useInfiniteQuery({
    queryKey: ["campers", activeFilters, searchVersion],

    queryFn: ({ pageParam }) => getCampers(pageParam, activeFilters),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });

  const filterOptions = filtersQuery.data ?? DEFAULT_FILTER_OPTIONS;

  const campers =
    campersQuery.data?.pages.flatMap((page) => page.campers) ?? [];

  const showFilterLoadingModal = hasSubmittedFilters && campersQuery.isPending;

  const showInitialLoader = !hasSubmittedFilters && campersQuery.isPending;

  function startFilteredSearch(filters: CamperFilters) {
    setHasSubmittedFilters(true);
    setActiveFilters(filters);
    setSearchVersion((previousVersion) => previousVersion + 1);
  }

  function applyFilters() {
    startFilteredSearch({
      ...draftFilters,
      location: draftFilters.location.trim(),
    });
  }

  function resetAndLoadAllCampers() {
    const emptyFilters: CamperFilters = {
      ...EMPTY_FILTERS,
    };

    setDraftFilters(emptyFilters);
    startFilteredSearch(emptyFilters);
  }

  return (
    <>
      <main className={`container ${styles.catalog}`}>
        <FilterSidebar
          values={draftFilters}
          options={filterOptions}
          optionsError={filtersQuery.isError}
          onChange={setDraftFilters}
          onApply={applyFilters}
          onClear={resetAndLoadAllCampers}
        />

        <section
          className={styles.results}
          aria-label="Available campers"
          aria-busy={campersQuery.isPending || campersQuery.isFetchingNextPage}
        >
          {showInitialLoader && <Loader message="Loading campers..." />}

          {campersQuery.isError && (
            <div className={styles.errorState}>
              <h1>Unable to load campers</h1>

              <p>
                {campersQuery.error instanceof Error
                  ? campersQuery.error.message
                  : "An unexpected error occurred."}
              </p>

              <button
                type="button"
                className={styles.retryButton}
                onClick={() => void campersQuery.refetch()}
              >
                Try again
              </button>
            </div>
          )}

          {campersQuery.isSuccess && campers.length === 0 && (
            <div className={styles.noResults}>
              <Image
                src="/icons/no-trucks.svg"
                alt="Camper in front of mountains"
                width={488}
                height={463}
                className={styles.noResultsImage}
                unoptimized
              />

              <div className={styles.noResultsContent}>
                <div className={styles.noResultsText}>
                  <h1>No campers found</h1>

                  <p>
                    We couldn&apos;t find any campers that match your filters.
                    <br />
                    Try adjusting your search or clearing some filters.
                  </p>
                </div>

                <div className={styles.noResultsActions}>
                  <button
                    type="button"
                    className={styles.clearResultsButton}
                    onClick={resetAndLoadAllCampers}
                  >
                    <FiX aria-hidden="true" />
                    Clear filters
                  </button>

                  <button
                    type="button"
                    className={styles.viewAllButton}
                    onClick={resetAndLoadAllCampers}
                  >
                    View all campers
                  </button>
                </div>
              </div>
            </div>
          )}

          {campers.length > 0 && (
            <>
              <div className={styles.list}>
                {campers.map((camper) => (
                  <CamperCard key={camper.id} camper={camper} />
                ))}
              </div>

              {campersQuery.hasNextPage && (
                <button
                  type="button"
                  className={styles.loadMore}
                  disabled={campersQuery.isFetchingNextPage}
                  onClick={() => void campersQuery.fetchNextPage()}
                >
                  {campersQuery.isFetchingNextPage ? "Loading..." : "Load more"}
                </button>
              )}
            </>
          )}
        </section>
      </main>

      {showFilterLoadingModal && <FilterLoadingModal />}
    </>
  );
}
