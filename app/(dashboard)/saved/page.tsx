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

const VARIANTS: ResourceCardVariant[] = ["orange", "purple"];
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

    const renderTab = (tab: string) => {
        if (isLoading) {
            return <div className={styles.stateMessage}>Loading your saved {tab}...</div>;
        }
        if (error) {
            return <div className={styles.errorState}>{error}</div>;
        }

        if (tab === "resources") {
            if (displayResources.length > 0) {
                return (
                    <div className={styles.resourceGrid}>
                        {displayResources.map((resource) => (
                            <ResourceCard key={resource.id} {...resource} href={`/resources/${resource.id}`} isSaved={true} />
                        ))}
                    </div>
                );
            }
            return <div className={styles.stateMessage}>No saved resources yet. Browse and bookmark resources to find them here.</div>;
        }

        if (tab === "pathways") {
            if (displayPathways.length > 0) {
                return (
                    <div className={styles.pathwayGrid}>
                        {displayPathways.map((pathway) => (
                            <PathwayCard key={pathway.id} {...pathway} href={`/pathways/${pathway.id}`} isSaved={true} />
                        ))}
                    </div>
                );
            }
            return <div className={styles.stateMessage}>No saved pathways yet. Browse and bookmark pathways to find them here.</div>;
        }

        if (tab === "hubs") {
            if (displayHubs.length > 0) {
                return (
                    <div className={styles.hubGrid}>
                        {displayHubs.map((hub) => (
                            <HubCard key={hub.id} {...hub} href={`/hubs/${hub.id}`} isSaved={true} />
                        ))}
                    </div>
                );
            }
            return <div className={styles.stateMessage}>No saved hubs yet. Browse and bookmark hubs to find them here.</div>;
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

            <DashboardTopNav activeTab={activeTab} onTabChange={setActiveTab} />

            {renderTab(activeTab)}
        </div>
    );
}
