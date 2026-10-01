"use client";

import { useState, useMemo } from "react";
import DashboardHeader, { DashboardFilters } from "../_components/DashboardHeader";
import ResourceCard from "@/app/components/ui/ResourceCard";
import PathwayCard from "@/app/components/ui/PathwayCard";
import HubCard from "@/app/components/ui/HubCard";
import { useDashboardData, DisplayFilters } from "@/app/hooks/useDashboardData";
import styles from "./page.module.css";

export default function ExplorePage() {
  const [filters, setFilters] = useState<DashboardFilters>({
    searchQuery: "",
    worldwide: [],
    industry: [],
    experience: [],
  });

  const displayFilters: DisplayFilters = useMemo(() => ({
    searchQuery: filters.searchQuery,
    worldwide: filters.worldwide,
    industry: filters.industry,
    experience: filters.experience,
  }), [filters]);

  const {
    displayResources,
    displayPathways,
    displayHubs,
    isLoadingResources,
    isLoadingPathways,
    isLoadingHubs,
  } = useDashboardData(displayFilters);

  const hasFilters = filters.searchQuery || filters.worldwide.length > 0 || filters.industry.length > 0 || filters.experience.length > 0;
  const totalResults = displayResources.length + displayPathways.length + displayHubs.length;

  const allLoaded = !isLoadingResources && !isLoadingPathways && !isLoadingHubs;
  const allEmpty = displayResources.length === 0 && displayPathways.length === 0 && displayHubs.length === 0;
  const showErrorState = allLoaded && allEmpty && !hasFilters;

  return (
    <>
      <DashboardHeader filters={filters} onFiltersChange={setFilters} />
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.headerTitle}>Explore</h1>
          <p className={styles.headerSubtitle}>
            {hasFilters
              ? `${totalResults} results found`
              : "Discover new resources, pathways, hubs, and creators"}
          </p>
        </div>

        {showErrorState && (
          <div className={styles.errorBanner}>
            Unable to load explore content right now. Please check your connection and try again.
          </div>
        )}

        {/* Resources Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Trending Resources</h2>
          {isLoadingResources ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              Loading resources...
            </div>
          ) : displayResources.length > 0 ? (
            <div className={styles.grid}>
              {displayResources.slice(0, 8).map((resource) => (
                <ResourceCard key={resource.id} {...resource} href={`/resources/${resource.id}`} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              {hasFilters
                ? "No resources found. Try adjusting your filters."
                : "No resources available yet."}
            </div>
          )}
        </section>

        {/* Pathways Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Popular Pathways</h2>
          {isLoadingPathways ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              Loading pathways...
            </div>
          ) : displayPathways.length > 0 ? (
            <div className={styles.pathwayGrid}>
              {displayPathways.slice(0, 4).map((pathway) => (
                <PathwayCard key={pathway.id} {...pathway} href={`/pathways/${pathway.id}`} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              {hasFilters
                ? "No pathways found. Try adjusting your filters."
                : "No pathways available yet."}
            </div>
          )}
        </section>

        {/* Hubs Section */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Active Hubs</h2>
          {isLoadingHubs ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              Loading hubs...
            </div>
          ) : displayHubs.length > 0 ? (
            <div className={styles.hubGrid}>
              {displayHubs.slice(0, 4).map((hub) => (
                <HubCard key={hub.id} {...hub} href={`/hubs/${hub.id}`} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              {hasFilters
                ? "No hubs found. Try adjusting your filters."
                : "No hubs available yet."}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
