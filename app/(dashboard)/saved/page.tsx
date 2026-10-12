"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import ResourceCard from "@/app/components/ui/ResourceCard";
import DashboardTopNav from "../_components/DashboardTopNav";
import DashboardHeader, { DashboardFilters } from "../_components/DashboardHeader";
import HubCard from "@/app/components/ui/HubCard";
import PathwayCard from "@/app/components/ui/PathwayCard";
import { interactionAPI } from "@/app/lib/api/interaction";
import { resourceAPI } from "@/app/lib/api/resource";
import { pathwayAPI } from "@/app/lib/api/pathway";
import { hubAPI } from "@/app/lib/api/hub";
import { Resource } from "@/app/lib/types/resource";
import { Pathway } from "@/app/lib/types/pathway";
import { Hub } from "@/app/lib/types/hub";
import { ResourceCardVariant } from "@/app/components/ui/ResourceCard";
import { formatPrice } from "@/app/hooks/useDashboardData";
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

const EmptyStateIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="15" y2="18" />
  </svg>
);

const VARIANTS: ResourceCardVariant[] = ["orange", "purple", "pink", "green"];
function getVariant(index: number): ResourceCardVariant {
  return VARIANTS[index % VARIANTS.length];
}

export default function SavedPage() {
    const [activeTab, setActiveTab] = useState("resources");
    const [filters, setFilters] = useState<DashboardFilters>({
        searchQuery: "",
        worldwide: [],
        industry: [],
        experience: [],
    });

    const [savedResources, setSavedResources] = useState<Resource[]>([]);
    const [savedPathways, setSavedPathways] = useState<Pathway[]>([]);
    const [savedHubs, setSavedHubs] = useState<Hub[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTag, setActiveTag] = useState("All");
    const [priceFilters, setPriceFilters] = useState<string[]>([]);
    const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

    const fetchSaved = useCallback(async () => {
        try {
            const interactionsRes = await interactionAPI.getUserInteractions("save");
            if (!interactionsRes.success || !interactionsRes.data) {
                setSavedResources([]);
                setSavedPathways([]);
                setSavedHubs([]);
                return;
            }

            const interactions: any[] = interactionsRes.data;
            // Extract resourceIds, pathwayIds, hubIds from interaction data.
            // The shape may vary; we try common field names.
            const resourceIds: string[] = [];
            const pathwayIds: string[] = [];
            const hubIds: string[] = [];

            interactions.forEach((item: any) => {
                const id = item.resourceId || item.resource?._id || item.resource?.id || item.targetId || item.target?.id;
                const type = item.type || item.interactionType || item.targetType;
                if (type && type.toLowerCase().includes("pathway")) {
                    if (id) pathwayIds.push(id);
                } else if (type && type.toLowerCase().includes("hub")) {
                    if (id) hubIds.push(id);
                } else {
                    if (id) resourceIds.push(id);
                }
            });

            // Fetch full details for each saved resource
            const resources: Resource[] = [];
            for (const rid of resourceIds) {
                try {
                    const res = await resourceAPI.getSingleResource(rid);
                    if (res.success && res.data) resources.push(res.data);
                } catch { /* skip individual failures */ }
            }

            // Fetch full details for each saved pathway
            const pathways: Pathway[] = [];
            for (const pid of pathwayIds) {
                try {
                    const res = await pathwayAPI.getSinglePathway(pid);
                    if (res.success && res.data) pathways.push(res.data);
                } catch { /* skip */ }
            }

            // Fetch full details for each saved hub
            const hubs: Hub[] = [];
            for (const hid of hubIds) {
                try {
                    const res = await hubAPI.getSingleHub(hid);
                    if (res.success && res.data) hubs.push(res.data);
                } catch { /* skip */ }
            }

            // If the interactions payload doesn't include type info, fall back to
            // fetching all saved items as resources (the most common case).
            if (resourceIds.length === 0 && pathwayIds.length === 0 && hubIds.length === 0 && interactions.length > 0) {
                const allIds: string[] = interactions
                    .map((item: any) => item.resourceId || item.resource?._id || item.resource?.id || item.targetId || item.target?.id || item._id)
                    .filter(Boolean) as string[];
                for (const rid of allIds) {
                    try {
                        const res = await resourceAPI.getSingleResource(rid);
                        if (res.success && res.data) resources.push(res.data);
                    } catch { /* skip */ }
                }
            }

            setSavedResources(resources);
            setSavedPathways(pathways);
            setSavedHubs(hubs);
        } catch (err) {
            console.error("Failed to fetch saved items:", err);
            setError("Failed to load your saved items. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchSaved();
    }, [fetchSaved]);

    // Map raw API data to display shapes
    const displayResources = useMemo(() => {
        const mapped = savedResources.map((res, index) => ({
            id: res._id || res.id,
            variant: getVariant(index),
            authorName: res.owner?.name || "Author",
            authorAvatarUrl: res.owner?.avatar || "https://i.pravatar.cc/150",
            previewImageUrl: res.coverPhoto || "/assets/pdf1.png",
            title: res.name,
            price: formatPrice(res.isFree, res.price, res.currency),
            description: res.description,
            fileType: res.resourceFile?.format ? `.${res.resourceFile.format}` : ".pdf",
            tags: res.tags || [],
            viewCount: res.viewCount?.toString() || "0",
            commentCount: 0,
            isFree: res.isFree,
        }));
        if (!filters.searchQuery.trim()) return mapped;
        const q = filters.searchQuery.toLowerCase();
        return mapped.filter(r => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q));
    }, [savedResources, filters.searchQuery]);

    const displayPathways = useMemo(() => {
        const mapped = savedPathways.map((pw, index) => ({
            id: pw._id || pw.id,
            variant: getVariant(index),
            authorName: pw.author?.name || "Author",
            authorAvatarUrl: pw.author?.avatar || "https://i.pravatar.cc/150",
            title: pw.name,
            price: formatPrice(pw.isFree, pw.price, pw.currency),
            description: pw.description,
            tags: pw.tags || [],
            resourceCount: pw.resourceCount || pw.blockCount || 0,
            viewCount: pw.viewCount?.toString() || "0",
            commentCount: 0,
            isFree: pw.isFree,
        }));
        if (!filters.searchQuery.trim()) return mapped;
        const q = filters.searchQuery.toLowerCase();
        return mapped.filter(p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }, [savedPathways, filters.searchQuery]);

    const displayHubs = useMemo(() => {
        const mapped = savedHubs.map((hub, index) => ({
            id: hub._id,
            variant: getVariant(index),
            authorName: hub.author?.email || "Author",
            authorAvatarUrl: "https://i.pravatar.cc/150",
            previewImageUrl: "/assets/pdf1.png",
            title: hub.name,
            price: "Free",
            description: hub.description,
            tags: [hub.industry].filter(Boolean),
            resourceCount: hub.resources?.length || 0,
            pathwayCount: hub.pathways?.length || 0,
            viewCount: "0",
            commentCount: "0",
            isFree: true,
        }));
        if (!filters.searchQuery.trim()) return mapped;
        const q = filters.searchQuery.toLowerCase();
        return mapped.filter(h => h.title.toLowerCase().includes(q) || h.description.toLowerCase().includes(q));
    }, [savedHubs, filters.searchQuery]);

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

    const togglePriceFilter = (filter: string) => {
        setPriceFilters(prev =>
            prev.includes(filter) ? prev.filter(v => v !== filter) : [...prev, filter]
        );
    };

    const totalCount = displayResources.length + displayPathways.length + displayHubs.length;

    // Dynamic Title Logic
    const getDynamicTitle = () => {
        if (filters.searchQuery) {
            return `Results for "${filters.searchQuery}"`;
        }

        const hasFilters = filters.worldwide.length > 0 || filters.industry.length > 0 || filters.experience.length > 0;
        if (hasFilters) {
            const count = activeTab === "resources" ? displayResources.length
                : activeTab === "pathways" ? displayPathways.length
                : displayHubs.length;
            const parts: string[] = [];
            if (filters.worldwide.length) parts.push(`in ${filters.worldwide.join(" & ")}`);
            if (filters.industry.length) parts.push(`for ${filters.industry.join(" & ")}`);
            if (filters.experience.length) parts.push(`(${filters.experience.join(" & ")})`);
            return `${count} Results ${parts.join(", ")}`;
        }

        return "My Saves";
    };

    const emptyState = (title: string) => (
        <div className={styles.emptyState}>
            <span className={styles.emptyIcon}><EmptyStateIcon /></span>
            <div>
                <p className={styles.emptyTitle}>{title}</p>
                <p className={styles.emptySubtitle}>Seems we don&apos;t have that right now. Try again later</p>
            </div>
        </div>
    );

    const renderTab = (tab: string) => {
        if (isLoading) {
            return <div className={styles.loadingState}>Loading your saved {tab}...</div>;
        }
        if (error) {
            return <div className={styles.errorState}>{error}</div>;
        }

        if (tab === "resources") {
            if (filteredResources.length > 0) {
                return (
                    <div className={styles.resourceGrid}>
                        {filteredResources.map((resource) => (
                            <ResourceCard key={resource.id} {...resource} href={`/resources/${resource.id}`} isSaved={true} />
                        ))}
                    </div>
                );
            }
            return emptyState("No saved resources yet");
        }

        if (tab === "pathways") {
            if (filteredPathways.length > 0) {
                return (
                    <div className={styles.pathwayGrid}>
                        {filteredPathways.map((pathway) => (
                            <PathwayCard key={pathway.id} {...pathway} href={`/pathways/${pathway.id}`} isSaved={true} />
                        ))}
                    </div>
                );
            }
            return emptyState("No saved pathways yet");
        }

        if (tab === "hubs") {
            if (filteredHubs.length > 0) {
                return (
                    <div className={styles.hubGrid}>
                        {filteredHubs.map((hub) => (
                            <HubCard key={hub.id} {...hub} href={`/hubs/${hub.id}`} isSaved={true} />
                        ))}
                    </div>
                );
            }
            return emptyState("No saved hubs yet");
        }

        return null;
    };

    return (
        <div className={styles.pageContainer}>
            <DashboardHeader filters={filters} onFiltersChange={setFilters} />

            <div className={styles.exploreHeader}>
                <h1 className={styles.exploreTitle}>{getDynamicTitle()}</h1>
                <p className={styles.exploreDesc}>
                    {isLoading ? "Loading..." : error ? "Could not load saved items." : `${totalCount} item${totalCount !== 1 ? "s" : ""} saved across resources, pathways, and hubs`}
                </p>
            </div>

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
                        <span>Filter by:</span>
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

            <DashboardTopNav activeTab={activeTab} onTabChange={setActiveTab} />

            {renderTab(activeTab)}
        </div>
    );
}
