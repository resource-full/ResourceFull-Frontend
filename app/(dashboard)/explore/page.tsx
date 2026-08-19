"use client";

import { useEffect, useState } from "react";
import DashboardHeader, { DashboardFilters } from "../_components/DashboardHeader";
import styles from "./page.module.css";
import { exploreAPI } from "@/app/lib/api/explore";
import { ExploreData } from "@/app/lib/types/explore";

export default function ExplorePage() {
  const [filters, setFilters] = useState<DashboardFilters>({
    searchQuery: "",
    worldwide: [],
    industry: [],
    experience: [],
  });

  const [exploreData, setExploreData] = useState<ExploreData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExplore = async () => {
      try {
        const res = await exploreAPI.getExploreData();
        if (res.success) {
          setExploreData(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch explore data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchExplore();
  }, []);

  return (
    <>
      <DashboardHeader filters={filters} onFiltersChange={setFilters} />
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.headerTitle}>Explore</h1>
          <p className={styles.headerSubtitle}>Discover new resources, pathways, hubs, and creators</p>
        </div>

        {loading ? (
          <div style={{ padding: "40px", textAlign: "center" }}>Loading explore content...</div>
        ) : (
          <>
            {/* Resources Section */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Trending Resources</h2>
              {exploreData?.resources && exploreData.resources.length > 0 ? (
                <div className={styles.grid}>
                  {exploreData.resources.map((resource) => (
                    <div key={resource._id} className={styles.card}>
                      <div className={styles.cardImage}>
                        {resource.coverPhoto ? (
                          <img src={resource.coverPhoto} alt={resource.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                        ) : (
                          "Resource Image"
                        )}
                      </div>
                      <h3 className={styles.cardTitle}>{resource.name}</h3>
                      <p className={styles.cardDescription}>{resource.description}</p>
                      <div className={styles.cardFooter}>
                        <div className={styles.cardMeta}>
                          <span>{resource.price > 0 ? `$${resource.price}` : "Free"}</span>
                        </div>
                        <button className={styles.cardAction}>View</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>No resources found.</div>
              )}
            </section>

            {/* Pathways Section */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Popular Pathways</h2>
              {exploreData?.pathways && exploreData.pathways.length > 0 ? (
                <div className={styles.grid}>
                  {exploreData.pathways.map((pathway) => (
                    <div key={pathway._id} className={styles.card}>
                      <div className={styles.cardImage}>
                        {"Pathway Image"}
                      </div>
                      <h3 className={styles.cardTitle}>{pathway.name}</h3>
                      <p className={styles.cardDescription}>{pathway.description}</p>
                      <div className={styles.cardFooter}>
                        <div className={styles.cardMeta}>
                          <span>{pathway.price > 0 ? `$${pathway.price}` : "Free"}</span>
                        </div>
                        <button className={styles.cardAction}>View</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>No pathways found.</div>
              )}
            </section>

            {/* Hubs Section */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Active Hubs</h2>
              {exploreData?.hubs && exploreData.hubs.length > 0 ? (
                <div className={styles.grid}>
                  {exploreData.hubs.map((hub) => (
                    <div key={hub._id} className={styles.card}>
                      <div className={styles.cardImage}>
                        {"Hub Image"}
                      </div>
                      <h3 className={styles.cardTitle}>{hub.name}</h3>
                      <p className={styles.cardDescription}>{hub.description}</p>
                      <div className={styles.cardFooter}>
                        <div className={styles.cardMeta}>
                          <span>{(hub.resources?.length || 0) + (hub.pathways?.length || 0)} Items</span>
                        </div>
                        <button className={styles.cardAction}>Join</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>No hubs found.</div>
              )}
            </section>
          </>
        )}
      </div>
    </>
  );
}
