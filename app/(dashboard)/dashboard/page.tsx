"use client";

import { useState, useEffect } from "react";
import { resourceAPI } from "@/app/lib/api/resource";
import { Resource } from "@/app/lib/types/resource";
import ResourceCard, { ResourceCardVariant } from "@/app/components/ui/ResourceCard";
import DashboardTopNav from "../_components/DashboardTopNav";
import DashboardHeader, { DashboardFilters } from "../_components/DashboardHeader";
import HubCard from "@/app/components/ui/HubCard";
import PathwayCard from "@/app/components/ui/PathwayCard";
import styles from "./page.module.css";

// Mock data matching the Figma design
const MOCK_RESOURCES = Array(8).fill(null).map((_, i) => ({
  id: i,
  variant: (i % 2 === 0 ? "orange" : "purple") as ResourceCardVariant,
  authorName: "Stella Della",
  authorAvatarUrl: "https://i.pravatar.cc/150?u=stella",
  previewImageUrl: "/assets/pdf1.png",
  title: "Graphic Designer 80% wining rate CV",
  price: i % 2 === 0 ? "Free" : "$120",
  description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio exampl..",
  fileType: ".pdf",
  tags: ["Design", "CV"],
  viewCount: "2.5k",
  commentCount: 2,
}));

const MOCK_HUBS = Array(8).fill(null).map((_, i) => {
  const isOrange = [1, 4, 7].includes(i);
  return {
    id: i,
    variant: (isOrange ? "orange" : "purple") as "orange" | "purple",
    authorName: "Stella Della",
    authorAvatarUrl: "https://i.pravatar.cc/150?u=stella",
    previewImageUrl: "/assets/pdf1.png",
    title: "Become a Full Stack Developer in 3 Months",
    price: i % 2 === 0 ? "$120" : "Free",
    description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume...",
    tags: ["Design", "CV"],
    resourceCount: 20,
    pathwayCount: 16,
    viewCount: "2.5k",
    commentCount: 2,
  };
});

const MOCK_PATHWAYS = Array(8).fill(null).map((_, i) => ({
  id: i,
  variant: (i % 3 === 1 ? "orange" : "purple") as "orange" | "purple", // Pattern matching screenshot
  authorName: "Stella Della",
  authorAvatarUrl: "https://i.pravatar.cc/150?u=stella",
  title: "Become a Full Stack Developer in 3 Months",
  price: i % 2 === 0 ? "$120" : "Free",
  description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume...",
  tags: ["Design", "CV"],
  resourceCount: 20,
  viewCount: "2.5k",
  commentCount: 2,
}));

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

  const [fetchedResources, setFetchedResources] = useState<Resource[]>([]);
  const [isLoadingResources, setIsLoadingResources] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoadingResources(true);
      try {
        const res = await resourceAPI.getAllResources();
        if (res.success && res.data.resources) {
          setFetchedResources(res.data.resources);
        }
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      } finally {
        setIsLoadingResources(false);
      }
    };
    
    fetchResources();
  }, []);

  const formatPrice = (isFree: boolean, price: number | string, currency: string) => {
    if (isFree || !price || price === "0" || price === 0) return "Free";
    
    let symbol = currency || "$";
    if (symbol.toUpperCase() === "USD") symbol = "$";
    else if (symbol.toUpperCase() === "NGN") symbol = "₦";
    
    return `${symbol}${price}`;
  };

  // Map API resources to the format expected by ResourceCard
  const apiResourcesMapped = fetchedResources.map((res, index) => ({
    id: res._id || res.id,
    variant: (index % 2 === 0 ? "orange" : "purple") as ResourceCardVariant,
    authorName: "Author", // Placeholder until backend includes populated author info
    authorAvatarUrl: "https://i.pravatar.cc/150", 
    previewImageUrl: res.coverPhoto || "/assets/pdf1.png",
    title: res.name,
    price: formatPrice(res.isFree, res.price, res.currency),
    description: res.description,
    fileType: res.resourceFile?.format ? `.${res.resourceFile.format}` : ".pdf",
    tags: res.tags || [],
    viewCount: res.viewCount?.toString() || "0",
    commentCount: 0,
  }));

  // Combine one mock resource with the API resources as requested
  const displayResources = [
    MOCK_RESOURCES[0],
    ...apiResourcesMapped
  ];

  // Dynamic Title Logic
  const getDynamicTitle = () => {
    if (filters.searchQuery) {
      return `Results for "${filters.searchQuery}"`;
    }

    const hasFilters = filters.worldwide.length > 0 || filters.industry.length > 0 || filters.experience.length > 0;
    if (hasFilters) {
      const parts = [];
      if (filters.worldwide.length) parts.push(`in ${filters.worldwide.join(" & ")}`);
      if (filters.industry.length) parts.push(`for ${filters.industry.join(" & ")}`);
      if (filters.experience.length) parts.push(`(${filters.experience.join(" & ")})`);

      // Let's use a mock number since we aren't actually filtering the mock array
      return `267 Results ${parts.join(", ")}`;
    }

    return "Explore 3000+ resources";
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
                    onChange={(e) => {
                      if (e.target.checked) setPriceFilters([...priceFilters, 'free']);
                      else setPriceFilters(priceFilters.filter(v => v !== 'free'));
                    }}
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
                    onChange={(e) => {
                      if (e.target.checked) setPriceFilters([...priceFilters, 'paid']);
                      else setPriceFilters(priceFilters.filter(v => v !== 'paid'));
                    }}
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
          ) : displayResources.length > 0 ? (
            displayResources.map((resource) => (
              <ResourceCard key={resource.id} {...resource} href={`/resources/${resource.id}`} />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">No resources found.</div>
          )}
        </div>
      )}

      {activeTab === "pathways" && (
        <div className={styles.resourceGrid}>
          {MOCK_PATHWAYS.map((pathway) => (
            <PathwayCard key={pathway.id} {...pathway} href={`/pathways/${pathway.id}`} />
          ))}
        </div>
      )}

      {activeTab === "hubs" && (
        <div className={styles.hubGrid}>
          {MOCK_HUBS.map((hub) => (
            <HubCard key={hub.id} {...hub} href={`/hubs/${hub.id}`} />
          ))}
        </div>
      )}
    </div>
  );
}
