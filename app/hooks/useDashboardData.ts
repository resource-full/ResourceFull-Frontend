import { useState, useEffect, useMemo } from 'react';
import { resourceAPI } from '@/app/lib/api/resource';
import { pathwayAPI } from '@/app/lib/api/pathway';
import { hubAPI } from '@/app/lib/api/hub';
import { interactionAPI } from '@/app/lib/api/interaction';
import { paymentAPI } from '@/app/lib/api/payment';
import { analyticsAPI } from '@/app/lib/api/analytics';
import { walletAPI } from '@/app/lib/api/wallet';
import { Resource } from '@/app/lib/types/resource';
import { Pathway } from '@/app/lib/types/pathway';
import { Hub } from '@/app/lib/types/hub';
import { ResourceCardVariant } from '@/app/components/ui/ResourceCard';
import { COUNTRIES, SKILLS_OPTIONS, EXPERIENCE_OPTIONS } from '@/app/lib/constants/onboarding';

export function useCommentCounts(ids: string[]) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const idsToFetch = ids.filter(id => id && !(id in counts));
    if (idsToFetch.length === 0) return;
    let cancelled = false;

    Promise.all(
      idsToFetch.map(async (id) => {
        try {
          const res = await interactionAPI.getInteractionStats(id);
          return [id, res.success && res.data ? res.data.comments : 0] as const;
        } catch {
          return [id, 0] as const;
        }
      })
    ).then((results) => {
      if (cancelled) return;
      setCounts(prev => {
        const next = { ...prev };
        results.forEach(([id, count]) => { next[id] = count; });
        return next;
      });
    });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join(',')]);

  return counts;
}

export interface DisplayFilters {
  searchQuery: string;
  worldwide: string[];
  industry: string[];
  experience: string[];
}

export function formatPrice(isFree: boolean, price: number | string, currency: string) {
  if (isFree || !price || price === "0" || price === 0) return "Free";
  let symbol = currency || "$";
  if (symbol.toUpperCase() === "USD") symbol = "$";
  else if (symbol.toUpperCase() === "NGN") symbol = "₦";
  return `${symbol}${price}`;
}

const VARIANTS: ResourceCardVariant[] = ["orange", "purple", "pink", "green"];

function getVariant(index: number): ResourceCardVariant {
  return VARIANTS[index % VARIANTS.length];
}

export interface MappedResource {
  id: string;
  variant: ResourceCardVariant;
  authorName: string;
  authorAvatarUrl: string;
  previewImageUrl: string;
  title: string;
  price: string;
  description: string;
  fileType: string;
  tags: string[];
  viewCount: string;
  commentCount: number | string;
  isFree: boolean;
  industry: string;
  experience: string;
  applicableLocation: string;
}

export interface MappedPathway {
  id: string;
  variant: ResourceCardVariant;
  authorName: string;
  authorAvatarUrl: string;
  title: string;
  price: string;
  description: string;
  tags: string[];
  resourceCount: number;
  viewCount: string;
  commentCount: number | string;
  isFree: boolean;
  industry: string;
  experience: string;
  applicableLocation: string;
}

export interface MappedHub {
  id: string;
  variant: ResourceCardVariant;
  authorName: string;
  authorAvatarUrl: string;
  previewImageUrl: string;
  title: string;
  price: string;
  description: string;
  tags: string[];
  resourceCount: number;
  pathwayCount: number;
  viewCount: string;
  commentCount: number | string;
  isFree: boolean;
  industry: string;
  experience: string;
  applicableLocation: string;
}

function labelFromOptions(value: string, options: { value: string; label: string }[]): string {
  return options.find(o => o.value === value)?.label || value;
}

function locationLabel(value: string): string {
  return labelFromOptions(value, COUNTRIES);
}

function industryLabel(value: string): string {
  return labelFromOptions(value, SKILLS_OPTIONS);
}

function experienceLabel(value: string): string {
  return labelFromOptions(value, EXPERIENCE_OPTIONS);
}

export function matchesFilters(item: {
  title: string;
  name?: string;
  description: string;
  industry: string;
  experience: string;
  applicableLocation: string;
  tags: string[];
  isFree: boolean;
  price?: string;
}, filters: DisplayFilters): boolean {
  const { searchQuery, worldwide, industry, experience } = filters;

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    const title = (item.title || item.name || "").toLowerCase();
    const desc = (item.description || "").toLowerCase();
    const tags = (item.tags || []).join(" ").toLowerCase();
    if (!title.includes(q) && !desc.includes(q) && !tags.includes(q)) return false;
  }

  if (worldwide.length > 0) {
    const itemLoc = item.applicableLocation?.toLowerCase() || "";
    const matches = worldwide.some(w => {
      const locLabel = locationLabel(w).toLowerCase();
      return itemLoc === w.toLowerCase() || itemLoc === locLabel || itemLoc.includes(locLabel) || locLabel.includes(itemLoc);
    });
    if (!matches) return false;
  }

  if (industry.length > 0) {
    const itemInd = item.industry?.toLowerCase() || "";
    const matches = industry.some(ind => {
      const indLabel = industryLabel(ind).toLowerCase();
      return itemInd === ind.toLowerCase() || itemInd === indLabel || itemInd.includes(indLabel) || indLabel.includes(itemInd);
    });
    if (!matches) return false;
  }

  if (experience.length > 0) {
    const itemExp = item.experience?.toLowerCase() || "";
    const matches = experience.some(exp => {
      const expLabel = experienceLabel(exp).toLowerCase();
      return itemExp === exp.toLowerCase() || itemExp === expLabel || itemExp.includes(expLabel) || expLabel.includes(itemExp);
    });
    if (!matches) return false;
  }

  return true;
}

export function useDashboardData(filters?: DisplayFilters) {
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

  const resourceIds = useMemo(() => fetchedResources.map(r => r._id || r.id), [fetchedResources]);
  const pathwayIds = useMemo(() => fetchedPathways.map(p => p._id || p.id), [fetchedPathways]);
  const resourceCommentCounts = useCommentCounts(resourceIds);
  const pathwayCommentCounts = useCommentCounts(pathwayIds);

  const allResources: MappedResource[] = useMemo(() => {
    return fetchedResources.map((res, index) => {
      const id = res._id || res.id;
      return {
        id,
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
        commentCount: resourceCommentCounts[id] ?? 0,
        isFree: res.isFree,
        industry: res.industry,
        experience: res.experience,
        applicableLocation: res.applicableLocation,
      };
    });
  }, [fetchedResources, resourceCommentCounts]);

  const allPathways: MappedPathway[] = useMemo(() => {
    return fetchedPathways.map((pw, index) => {
      const id = pw._id || pw.id;
      return {
        id,
        variant: getVariant(index),
        authorName: pw.author?.name || "Author",
        authorAvatarUrl: pw.author?.avatar || "https://i.pravatar.cc/150",
        title: pw.name,
        price: formatPrice(pw.isFree, pw.price, pw.currency),
        description: pw.description,
        tags: pw.tags || [],
        resourceCount: pw.resourceCount || pw.blockCount || 0,
        viewCount: pw.viewCount?.toString() || "0",
        commentCount: pathwayCommentCounts[id] ?? 0,
        isFree: pw.isFree,
        industry: pw.industry,
        experience: pw.experience,
        applicableLocation: pw.applicableLocation,
      };
    });
  }, [fetchedPathways, pathwayCommentCounts]);

  const allHubs: MappedHub[] = useMemo(() => {
    return fetchedHubs.map((hub, index) => ({
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
      industry: hub.industry,
      experience: hub.experience,
      applicableLocation: hub.applicableLocation,
    }));
  }, [fetchedHubs]);

  const displayResources = useMemo(() => {
    if (!filters) return allResources;
    return allResources.filter(r => matchesFilters(r, filters));
  }, [allResources, filters]);

  const displayPathways = useMemo(() => {
    if (!filters) return allPathways;
    return allPathways.filter(p => matchesFilters(p, filters));
  }, [allPathways, filters]);

  const displayHubs = useMemo(() => {
    if (!filters) return allHubs;
    return allHubs.filter(h => matchesFilters(h, filters));
  }, [allHubs, filters]);

  return {
    displayResources,
    displayPathways,
    displayHubs,
    isLoadingResources,
    isLoadingPathways,
    isLoadingHubs,
  };
}

export interface SidebarCounts {
  saved: number | null;
  purchased: number | null;
  analytics: number | null;
  wallet: number | null;
}

/**
 * Counts for the sidebar nav badges. Mirrors the "actual content" each tab
 * shows (saved items, purchased items, tracked products, transactions) —
 * null while still loading so the badge can be hidden instead of showing 0.
 */
export function useSidebarCounts(): SidebarCounts {
  const [counts, setCounts] = useState<SidebarCounts>({
    saved: null,
    purchased: null,
    analytics: null,
    wallet: null,
  });

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await interactionAPI.getUserInteractions("save");
        if (!cancelled && res.success) {
          setCounts(prev => ({ ...prev, saved: Array.isArray(res.data) ? res.data.length : 0 }));
        }
      } catch {
        if (!cancelled) setCounts(prev => ({ ...prev, saved: 0 }));
      }
    })();

    (async () => {
      try {
        const res = await analyticsAPI.getProducts();
        if (!cancelled && res.success) {
          const total = res.data?.pagination?.total ?? res.data?.data?.length ?? 0;
          setCounts(prev => ({ ...prev, analytics: total }));
        }
      } catch {
        if (!cancelled) setCounts(prev => ({ ...prev, analytics: 0 }));
      }
    })();

    (async () => {
      try {
        const res = await walletAPI.getTransactions({ limit: 1 });
        if (!cancelled && res.success) {
          const total = res.data?.pagination?.total ?? res.data?.transactions?.length ?? 0;
          setCounts(prev => ({ ...prev, wallet: total }));
        }
      } catch {
        if (!cancelled) setCounts(prev => ({ ...prev, wallet: 0 }));
      }
    })();

    (async () => {
      try {
        const [resourcesRes, pathwaysRes, hubsRes] = await Promise.all([
          resourceAPI.getAllResources(),
          pathwayAPI.getAllPathways(),
          hubAPI.getAllHubs(),
        ]);
        const resources = resourcesRes.success ? resourcesRes.data.resources : [];
        const pathways = pathwaysRes.success ? pathwaysRes.data.pathways : [];
        const hubCount = hubsRes.success && hubsRes.data ? hubsRes.data.hubs.length : 0;

        const purchasedResourceChecks = await Promise.all(
          resources.map(async (res) => {
            const id = res._id || res.id;
            if (!id) return false;
            try {
              const status = await paymentAPI.checkPurchaseStatus("Resource", id);
              return status.success && !!status.data?.hasPurchased;
            } catch {
              return false;
            }
          })
        );
        const purchasedPathwayChecks = await Promise.all(
          pathways.map(async (pw) => {
            const id = pw._id || pw.id;
            if (!id) return false;
            try {
              const status = await paymentAPI.checkPurchaseStatus("Pathway", id);
              return status.success && !!status.data?.hasPurchased;
            } catch {
              return false;
            }
          })
        );

        if (!cancelled) {
          const purchasedCount =
            purchasedResourceChecks.filter(Boolean).length +
            purchasedPathwayChecks.filter(Boolean).length +
            hubCount;
          setCounts(prev => ({ ...prev, purchased: purchasedCount }));
        }
      } catch {
        if (!cancelled) setCounts(prev => ({ ...prev, purchased: 0 }));
      }
    })();

    return () => { cancelled = true; };
  }, []);

  return counts;
}
