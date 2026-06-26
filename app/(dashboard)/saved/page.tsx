"use client";

import { useState } from "react";
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
    commentCount: "79%",
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
        commentCount: "79%",
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
    commentCount: "79%",
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

export default function SavedPage() {
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

        return "My Saves";
    };

    return (
        <div className={styles.pageContainer}>
            <DashboardHeader filters={filters} onFiltersChange={setFilters} />

            <div className={styles.exploreHeader}>
                <h1 className={styles.exploreTitle}>{getDynamicTitle()}</h1>
                <p className={styles.exploreDesc}>10 items saved across resources, pathways, and hubs</p>
            </div>

            <DashboardTopNav activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "resources" && (
                <div className={styles.resourceGrid}>
                    {MOCK_RESOURCES.map((resource) => (
                        <ResourceCard key={resource.id} {...resource} href={`/resources/${resource.id}`} isSaved={true} />
                    ))}
                </div>
            )}

            {activeTab === "pathways" && (
                <div className={styles.resourceGrid}>
                    {MOCK_PATHWAYS.map((pathway) => (
                        <PathwayCard key={pathway.id} {...pathway} href={`/pathways/${pathway.id}`} isSaved={true} />
                    ))}
                </div>
            )}

            {activeTab === "hubs" && (
                <div className={styles.hubGrid}>
                    {MOCK_HUBS.map((hub) => (
                        <HubCard key={hub.id} {...hub} href={`/hubs/${hub.id}`} isSaved={true} />
                    ))}
                </div>
            )}
        </div>
    );
}
