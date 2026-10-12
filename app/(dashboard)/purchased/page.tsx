"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import ResourceCard from "@/app/components/ui/ResourceCard";
import DashboardTopNav from "../_components/DashboardTopNav";
import DashboardHeader, { DashboardFilters } from "../_components/DashboardHeader";
import HubCard from "@/app/components/ui/HubCard";
import PathwayCard from "@/app/components/ui/PathwayCard";
import { resourceAPI } from "@/app/lib/api/resource";
import { pathwayAPI } from "@/app/lib/api/pathway";
import { hubAPI } from "@/app/lib/api/hub";
import { paymentAPI } from "@/app/lib/api/payment";
import { Resource } from "@/app/lib/types/resource";
import { Pathway } from "@/app/lib/types/pathway";
import { Hub } from "@/app/lib/types/hub";
import { ResourceCardVariant } from "@/app/components/ui/ResourceCard";
import { formatPrice } from "@/app/hooks/useDashboardData";
import styles from "./page.module.css";

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

export default function PurchasedPage() {
    const [activeTab, setActiveTab] = useState("resources");
    const [filters, setFilters] = useState<DashboardFilters>({
        searchQuery: "",
        worldwide: [],
        industry: [],
        experience: [],
    });

    const [purchasedResources, setPurchasedResources] = useState<Resource[]>([]);
    const [purchasedPathways, setPurchasedPathways] = useState<Pathway[]>([]);
    const [purchasedHubs, setPurchasedHubs] = useState<Hub[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPurchased = useCallback(async () => {
        try {
            // Fetch all resources, then filter to those the user has purchased
            const [allResourcesRes, allPathwaysRes, allHubsRes] = await Promise.all([
                resourceAPI.getAllResources(),
                pathwayAPI.getAllPathways(),
                hubAPI.getAllHubs(),
            ]);

            const allResources = allResourcesRes.success ? allResourcesRes.data.resources : [];
            const allPathways = allPathwaysRes.success ? allPathwaysRes.data.pathways : [];
            const allHubs = allHubsRes.success && allHubsRes.data ? allHubsRes.data.hubs : [];

            // Check purchase status for each resource
            const purchasedRes: Resource[] = [];
            for (const res of allResources) {
                const resId = res._id || res.id;
                if (!resId) continue;
                try {
                    const status = await paymentAPI.checkPurchaseStatus("Resource", resId);
                    if (status.success && status.data?.hasPurchased) {
                        purchasedRes.push(res);
                    }
                } catch { /* skip individual failures */ }
            }

            // Check purchase status for each pathway
            const purchasedPw: Pathway[] = [];
            for (const pw of allPathways) {
                const pwId = pw._id || pw.id;
                if (!pwId) continue;
                try {
                    const status = await paymentAPI.checkPurchaseStatus("Pathway", pwId);
                    if (status.success && status.data?.hasPurchased) {
                        purchasedPw.push(pw);
                    }
                } catch { /* skip */ }
            }

            // Hubs don't have a purchase status endpoint, so we show all hubs
            // (hubs are free to join per existing API design)
            setPurchasedResources(purchasedRes);
            setPurchasedPathways(purchasedPw);
            setPurchasedHubs(allHubs);
        } catch (err) {
            console.error("Failed to fetch purchased items:", err);
            setError("Failed to load your purchased items. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void fetchPurchased();
    }, [fetchPurchased]);

    // Map raw API data to display shapes
    const displayResources = useMemo(() => {
        const mapped = purchasedResources.map((res, index) => ({
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
    }, [purchasedResources, filters.searchQuery]);

    const displayPathways = useMemo(() => {
        const mapped = purchasedPathways.map((pw, index) => ({
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
    }, [purchasedPathways, filters.searchQuery]);

    const displayHubs = useMemo(() => {
        const mapped = purchasedHubs.map((hub, index) => ({
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
    }, [purchasedHubs, filters.searchQuery]);

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

        return "My Purchases";
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
            return <div className={styles.loadingState}>Loading your purchased {tab}...</div>;
        }
        if (error) {
            return <div className={styles.errorState}>{error}</div>;
        }

        if (tab === "resources") {
            if (displayResources.length > 0) {
                return (
                    <div className={styles.resourceGrid}>
                        {displayResources.map((resource) => (
                            <ResourceCard key={resource.id} {...resource} href={`/resources/${resource.id}/view`} isPurchased={true} />
                        ))}
                    </div>
                );
            }
            return emptyState("No purchased resources yet");
        }

        if (tab === "pathways") {
            if (displayPathways.length > 0) {
                return (
                    <div className={styles.pathwayGrid}>
                        {displayPathways.map((pathway) => (
                            <PathwayCard key={pathway.id} {...pathway} href={`/pathways/${pathway.id}/view`} isPurchased={true} />
                        ))}
                    </div>
                );
            }
            return emptyState("No purchased pathways yet");
        }

        if (tab === "hubs") {
            if (displayHubs.length > 0) {
                return (
                    <div className={styles.hubGrid}>
                        {displayHubs.map((hub) => (
                            <HubCard key={hub.id} {...hub} href={`/hubs/${hub.id}`} isPurchased={true} />
                        ))}
                    </div>
                );
            }
            return emptyState("No purchased hubs yet");
        }

        return null;
    };

    return (
        <div className={styles.pageContainer}>
            <DashboardHeader filters={filters} onFiltersChange={setFilters} />

            <div className={styles.exploreHeader}>
                <h1 className={styles.exploreTitle}>{getDynamicTitle()}</h1>
                <p className={styles.exploreDesc}>
                    {isLoading ? "Loading..." : error ? "Could not load purchased items." : `${totalCount} item${totalCount !== 1 ? "s" : ""} purchased across resources, pathways, and hubs`}
                </p>
            </div>

            <DashboardTopNav activeTab={activeTab} onTabChange={setActiveTab} />

            {renderTab(activeTab)}
        </div>
    );
}
