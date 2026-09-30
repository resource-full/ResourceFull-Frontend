"use client";

import { useState, useMemo } from "react";
import ResourceCard from "@/app/components/ui/ResourceCard";
import DashboardTopNav from "../_components/DashboardTopNav";
import DashboardHeader, { DashboardFilters } from "../_components/DashboardHeader";
import HubCard from "@/app/components/ui/HubCard";
import PathwayCard from "@/app/components/ui/PathwayCard";
import styles from "./page.module.css";

import { useDashboardData, DisplayFilters } from "@/app/hooks/useDashboardData";

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

export default function PurchasedPage() {
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
        isLoadingHubs
    } = useDashboardData(displayFilters);

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

    return (
        <div className={styles.pageContainer}>
            <DashboardHeader filters={filters} onFiltersChange={setFilters} />

            <div className={styles.exploreHeader}>
                <h1 className={styles.exploreTitle}>{getDynamicTitle()}</h1>
                <p className={styles.exploreDesc}>10 items purchased across resources, pathways, and hubs</p>
            </div>

            <DashboardTopNav activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "resources" && (
                <div className={styles.resourceGrid}>
                    {isLoadingResources ? (
                        <div className="col-span-full text-center py-8 text-gray-500">Loading...</div>
                    ) : displayResources.length > 0 ? (
                        displayResources.map((resource) => (
                            <ResourceCard key={resource.id} {...resource} href={`/resources/${resource.id}`} isPurchased={true} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8 text-gray-500">No purchased resources yet. Explore the marketplace to find resources to buy.</div>
                    )}
                </div>
            )}

            {activeTab === "pathways" && (
                <div className={styles.pathwayGrid}>
                    {isLoadingPathways ? (
                        <div className="col-span-full text-center py-8 text-gray-500">Loading...</div>
                    ) : displayPathways.length > 0 ? (
                        displayPathways.map((pathway) => (
                            <PathwayCard key={pathway.id} {...pathway} href={`/pathways/${pathway.id}`} isPurchased={true} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8 text-gray-500">No purchased pathways yet. Explore the marketplace to find pathways to buy.</div>
                    )}
                </div>
            )}

            {activeTab === "hubs" && (
                <div className={styles.hubGrid}>
                    {isLoadingHubs ? (
                        <div className="col-span-full text-center py-8 text-gray-500">Loading hubs...</div>
                    ) : displayHubs.length > 0 ? (
                        displayHubs.map((hub) => (
                            <HubCard key={hub.id} {...hub} href={`/hubs/${hub.id}`} isPurchased={true} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8 text-gray-500">No purchased hubs yet. Explore the marketplace to find hubs to join.</div>
                    )}
                </div>
            )}
        </div>
    );
}
