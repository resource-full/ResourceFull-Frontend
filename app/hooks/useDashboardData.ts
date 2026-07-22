import { useState, useEffect } from 'react';
import { resourceAPI } from '@/app/lib/api/resource';
import { pathwayAPI } from '@/app/lib/api/pathway';
import { hubAPI } from '@/app/lib/api/hub';
import { Resource } from '@/app/lib/types/resource';
import { Pathway } from '@/app/lib/types/pathway';
import { Hub } from '@/app/lib/types/hub';
import { ResourceCardVariant } from '@/app/components/ui/ResourceCard';

// Dummy data from the original dashboard page
export const MOCK_RESOURCES = Array(8).fill(null).map((_, i) => ({
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

export const MOCK_PATHWAYS = Array(8).fill(null).map((_, i) => ({
    id: i,
    variant: (i % 3 === 1 ? "orange" : "purple") as "orange" | "purple",
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

export const MOCK_HUBS = Array(8).fill(null).map((_, i) => {
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

export function formatPrice(isFree: boolean, price: number | string, currency: string) {
  if (isFree || !price || price === "0" || price === 0) return "Free";

  let symbol = currency || "$";
  if (symbol.toUpperCase() === "USD") symbol = "$";
  else if (symbol.toUpperCase() === "NGN") symbol = "₦";

  return `${symbol}${price}`;
}

export function useDashboardData() {
  const [fetchedResources, setFetchedResources] = useState<Resource[]>([]);
  const [fetchedPathways, setFetchedPathways] = useState<Pathway[]>([]);
  const [fetchedHubs, setFetchedHubs] = useState<Hub[]>([]);
  const [isLoadingResources, setIsLoadingResources] = useState(true);
  const [isLoadingPathways, setIsLoadingPathways] = useState(true);
  const [isLoadingHubs, setIsLoadingHubs] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
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

    const fetchPathways = async () => {
      try {
        const res = await pathwayAPI.getAllPathways();
        if (res.success && res.data.pathways) {
          setFetchedPathways(res.data.pathways);
        }
      } catch (error) {
        console.error("Failed to fetch pathways:", error);
      } finally {
        setIsLoadingPathways(false);
      }
    };

    const fetchHubs = async () => {
      try {
        const res = await hubAPI.getAllHubs();
        if (res.success && res.data?.hubs) {
          setFetchedHubs(res.data.hubs);
        }
      } catch (error) {
        console.error("Failed to fetch hubs:", error);
      } finally {
        setIsLoadingHubs(false);
      }
    };

    fetchResources();
    fetchPathways();
    fetchHubs();
  }, []);

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

  const displayResources = [
    MOCK_RESOURCES[0],
    ...apiResourcesMapped
  ];

  const apiPathwaysMapped = fetchedPathways.map((pw, index) => ({
    id: pw._id || pw.id,
    variant: (index % 3 === 1 ? "orange" : "purple") as "orange" | "purple",
    authorName: pw.author?.name || "Author",
    authorAvatarUrl: pw.author?.avatar || "https://i.pravatar.cc/150",
    title: pw.name,
    price: formatPrice(pw.isFree, pw.price, pw.currency),
    description: pw.description,
    tags: pw.tags || [],
    resourceCount: pw.resourceCount || pw.blockCount || 0,
    viewCount: pw.viewCount?.toString() || "0",
    commentCount: 0,
  }));

  const displayPathways = [
    MOCK_PATHWAYS[0],
    ...apiPathwaysMapped
  ];

  const apiHubsMapped = fetchedHubs.map((hub, index) => {
    const isOrange = [1, 4, 7].includes(index);
    return {
      id: hub._id,
      variant: (isOrange ? "orange" : "purple") as "orange" | "purple",
      authorName: hub.author?.email || "Author",
      authorAvatarUrl: "https://i.pravatar.cc/150",
      previewImageUrl: "/assets/pdf1.png",
      title: hub.name,
      price: "Free", // Hubs don't have price in schema based on provided payload
      description: hub.description,
      tags: [hub.industry].filter(Boolean),
      resourceCount: hub.resources?.length || 0,
      pathwayCount: hub.pathways?.length || 0,
      viewCount: "0",
      commentCount: "0",
    };
  });

  const displayHubs = [
    MOCK_HUBS[0],
    ...apiHubsMapped
  ];

  return {
    displayResources,
    displayPathways,
    displayHubs,
    isLoadingResources,
    isLoadingPathways,
    isLoadingHubs,
  };
}
