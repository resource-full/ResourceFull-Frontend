"use client";

import { useState } from "react";
import ResourceCard, { ResourceCardVariant } from "@/app/components/ui/ResourceCard";
import DashboardTopNav from "../_components/DashboardTopNav";
import DashboardHeader, { DashboardFilters } from "../_components/DashboardHeader";
import HubCard from "@/app/components/ui/HubCard";
import PathwayCard from "@/app/components/ui/PathwayCard";
import styles from "./page.module.css";

import { useDashboardData } from "@/app/hooks/useDashboardData";

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

    const {
        displayResources,
        displayPathways,
        displayHubs,
        isLoadingResources,
        isLoadingPathways,
        isLoadingHubs
    } = useDashboardData();

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
                    ) : (
                        displayResources.map((resource) => (
                            <ResourceCard key={resource.id} {...resource} href={`/resources/${resource.id}`} isPurchased={true} />
                        ))
                    )}
                </div>
            )}

            {activeTab === "pathways" && (
                <div className={styles.pathwayGrid}>
                    {isLoadingPathways ? (
                        <div className="col-span-full text-center py-8 text-gray-500">Loading...</div>
                    ) : (
                        displayPathways.map((pathway) => (
                            <PathwayCard key={pathway.id} {...pathway} href={`/pathways/${pathway.id}`} isPurchased={true} />
                        ))
                    )}
                </div>
            )}

            {activeTab === "hubs" && (
                <div className={styles.hubGrid}>
                    {isLoadingHubs ? (
                        <div className="col-span-full text-center py-8 text-gray-500">Loading hubs...</div>
                    ) : (
                        displayHubs.map((hub) => (
                            <HubCard key={hub.id} {...hub} href={`/hubs/${hub.id}`} isPurchased={true} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
