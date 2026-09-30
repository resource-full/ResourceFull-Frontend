"use client";

import { useState, useMemo } from "react";
import { useDashboardData, DisplayFilters } from "@/app/hooks/useDashboardData";
import ResourceCard from "@/app/components/ui/ResourceCard";
import DashboardTopNav from "../_components/DashboardTopNav";
import DashboardHeader, { DashboardFilters } from "../_components/DashboardHeader";
import HubCard from "@/app/components/ui/HubCard";
import PathwayCard from "@/app/components/ui/PathwayCard";
import styles from "./page.module.css";

const TAGS = [
  "All",
  "CV Templates",
  "Templates",
  "Fellowships",
  "Prompts",
  "Career Advice"
];

const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("resources");
  const [activeTag, setActiveTag] = useState("All");
  const [priceFilters, setPriceFilters] = useState<string[]>([]);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
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

    return "Explore 3000+ resources";
  };

  const togglePriceFilter = (filter: string) => {
    setPriceFilters(prev =>
      prev.includes(filter) ? prev.filter(v => v !== filter) : [...prev, filter]
    );
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
          <div className={styles.filterWrapper}>
            <button
              className={styles.filterBtn}
              aria-label="Filter"
              onClick={() => setIsPriceDropdownOpen(!isPriceDropdownOpen)}
            >
              <FilterIcon />
            </button>

            {isPriceDropdownOpen && (
              <div className={styles.filterDropdown}>
                <label className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-50 rounded-lg">
                  <div className={`w-5 h-5 border-[1.5px] rounded flex items-center justify-center transition-colors ${priceFilters.includes('free') ? 'bg-[#024A94] border-[#024A94]' : 'border-gray-300 bg-white'}`}>
                    {priceFilters.includes('free') && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={priceFilters.includes('free')}
                    onChange={() => togglePriceFilter('free')}
                  />
                  <span className="text-gray-800 font-medium">Free</span>
                </label>

                <label className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-50 rounded-lg">
                  <div className={`w-5 h-5 border-[1.5px] rounded flex items-center justify-center transition-colors ${priceFilters.includes('paid') ? 'bg-[#024A94] border-[#024A94]' : 'border-gray-300 bg-white'}`}>
                    {priceFilters.includes('paid') && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={priceFilters.includes('paid')}
                    onChange={() => togglePriceFilter('paid')}
                  />
                  <span className="text-gray-800 font-medium">Paid</span>
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      <DashboardTopNav activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "resources" && (
        <div className={styles.resourceGrid}>
          {isLoadingResources ? (
            <div className="col-span-full text-center py-8 text-gray-500">Loading resources...</div>
          ) : filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <ResourceCard key={resource.id} {...resource} href={`/resources/${resource.id}`} />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">No resources found. Try adjusting your filters.</div>
          )}
        </div>
      )}

      {activeTab === "pathways" && (
        <div className={styles.pathwayGrid}>
          {isLoadingPathways ? (
            <div className="col-span-full text-center py-8 text-gray-500">Loading pathways...</div>
          ) : filteredPathways.length > 0 ? (
            filteredPathways.map((pathway) => (
              <PathwayCard key={pathway.id} {...pathway} href={`/pathways/${pathway.id}`} />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">No pathways found. Try adjusting your filters.</div>
          )}
        </div>
      )}

      {activeTab === "hubs" && (
        <div className={styles.hubGrid}>
          {isLoadingHubs ? (
            <div className="col-span-full text-center py-8 text-gray-500">Loading hubs...</div>
          ) : filteredHubs.length > 0 ? (
            filteredHubs.map((hub) => (
              <HubCard key={hub.id} {...hub} href={`/hubs/${hub.id}`} />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">No hubs found. Try adjusting your filters.</div>
          )}
        </div>
      )}
    </div>
  );
}
