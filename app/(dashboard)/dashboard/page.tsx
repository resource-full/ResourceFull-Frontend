"use client";

import { useState, useMemo } from "react";
import { useDashboardData, DisplayFilters } from "@/app/hooks/useDashboardData";
import ResourceCard from "@/app/components/ui/ResourceCard";
import DashboardTopNav from "../_components/DashboardTopNav";
import DashboardHeader, { DashboardFilters } from "../_components/DashboardHeader";
import HubCard from "@/app/components/ui/HubCard";
import PathwayCard from "@/app/components/ui/PathwayCard";
import FilterByDropdown from "@/app/components/ui/FilterByDropdown";
import styles from "./page.module.css";

const TAGS = [
  "All",
  "Templates",
  "Prompts",
  "Courses",
  "Videos",
];

const FILTER_OPTIONS = [
  { value: "free", label: "Free" },
  { value: "paid", label: "Paid" },
  { value: "best_match", label: "Best match" },
  { value: "most_saved", label: "Most saved" },
  { value: "newest", label: "Newest" },
  { value: "highest_rating", label: "Highest rating" },
];

const EmptyStateIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="15" y2="18" />
  </svg>
);

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("resources");
  const [activeTag, setActiveTag] = useState("All");
  const [priceFilters, setPriceFilters] = useState<string[]>([]);
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

  const filteredResources = useMemo(() => {
    let result = displayResources;
    if (activeTag !== "All") {
      result = result.filter(r => r.tags?.some(t => t.toLowerCase().includes(activeTag.toLowerCase().replace(" ", ""))));
    }
    if (priceFilters.includes("free") && !priceFilters.includes("paid")) {
      result = result.filter(r => r.isFree);
    }
    if (priceFilters.includes("paid") && !priceFilters.includes("free")) {
      result = result.filter(r => !r.isFree);
    }
    return result;
  }, [displayResources, activeTag, priceFilters]);

  const filteredPathways = useMemo(() => {
    let result = displayPathways;
    if (activeTag !== "All") {
      result = result.filter(p => p.tags?.some(t => t.toLowerCase().includes(activeTag.toLowerCase().replace(" ", ""))));
    }
    if (priceFilters.includes("free") && !priceFilters.includes("paid")) {
      result = result.filter(p => p.isFree);
    }
    if (priceFilters.includes("paid") && !priceFilters.includes("free")) {
      result = result.filter(p => !p.isFree);
    }
    return result;
  }, [displayPathways, activeTag, priceFilters]);

  const filteredHubs = useMemo(() => {
    let result = displayHubs;
    if (activeTag !== "All") {
      result = result.filter(h => h.tags?.some(t => t.toLowerCase().includes(activeTag.toLowerCase().replace(" ", ""))));
    }
    return result;
  }, [displayHubs, activeTag]);

  const getDynamicTitle = () => {
    if (filters.searchQuery) {
      return `Results for "${filters.searchQuery}"`;
    }

    const hasFilters = filters.worldwide.length > 0 || filters.industry.length > 0 || filters.experience.length > 0;
    if (hasFilters) {
      const count = activeTab === "resources" ? filteredResources.length
        : activeTab === "pathways" ? filteredPathways.length
          : filteredHubs.length;
      const parts: string[] = [];
      if (filters.worldwide.length) parts.push(`in ${filters.worldwide.join(" & ")}`);
      if (filters.industry.length) parts.push(`for ${filters.industry.join(" & ")}`);
      if (filters.experience.length) parts.push(`(${filters.experience.join(" & ")})`);
      return `${count} Results ${parts.join(", ")}`;
    }

    return "Trending resources";
  };



  return (
    <div className={styles.pageContainer}>
      <DashboardHeader filters={filters} onFiltersChange={setFilters} />

      <div className={styles.exploreHeader}>
        <h1 className={styles.exploreTitle}>{getDynamicTitle()}</h1>

        <div className={styles.filterRow}>
          <div className={styles.tagsContainer}>
            {TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`${styles.exploreTag} ${activeTag === tag ? styles.exploreTagActive : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
          <FilterByDropdown
            options={FILTER_OPTIONS}
            selectedValues={priceFilters}
            onChange={setPriceFilters}
          />
        </div>
      </div>

      <DashboardTopNav activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "resources" && (
        <div className={styles.resourceGrid}>
          {isLoadingResources ? (
            <div className={styles.loadingState}>Loading resources...</div>
          ) : filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <ResourceCard key={resource.id} {...resource} href={`/resources/${resource.id}`} />
            ))
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}><EmptyStateIcon /></span>
              <div>
                <p className={styles.emptyTitle}>No resources available</p>
                <p className={styles.emptySubtitle}>Seems we don&apos;t have that right now. Try again later</p>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "pathways" && (
        <div className={styles.pathwayGrid}>
          {isLoadingPathways ? (
            <div className={styles.loadingState}>Loading pathways...</div>
          ) : filteredPathways.length > 0 ? (
            filteredPathways.map((pathway) => (
              <PathwayCard key={pathway.id} {...pathway} href={`/pathways/${pathway.id}`} />
            ))
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}><EmptyStateIcon /></span>
              <div>
                <p className={styles.emptyTitle}>No pathways available</p>
                <p className={styles.emptySubtitle}>Seems we don&apos;t have that right now. Try again later</p>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "hubs" && (
        <div className={styles.hubGrid}>
          {isLoadingHubs ? (
            <div className={styles.loadingState}>Loading hubs...</div>
          ) : filteredHubs.length > 0 ? (
            filteredHubs.map((hub) => (
              <HubCard key={hub.id} {...hub} href={`/hubs/${hub.id}`} />
            ))
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}><EmptyStateIcon /></span>
              <div>
                <p className={styles.emptyTitle}>No hubs available</p>
                <p className={styles.emptySubtitle}>Seems we don&apos;t have that right now. Try again later</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
