"use client";

import { useEffect, useState } from "react";
import DashboardHeader, { DashboardFilters } from "../_components/DashboardHeader";
import styles from "./page.module.css";
import { analyticsAPI } from "@/app/lib/api/analytics";
import { AnalyticsStats, PerformanceChartData, ProductPerformance } from "@/app/lib/types/analytics";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Icons
const WalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
    <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const BookmarkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const TargetIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const ResourceTypeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.typeIcon}>
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const PathwayTypeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${styles.typeIcon} ${styles.pathway}`}>
    <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);



export default function AnalyticsPage() {
  const [activeDate, setActiveDate] = useState("30d");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<DashboardFilters>({
    searchQuery: "",
    worldwide: [],
    industry: [],
    experience: [],
  });

  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [chartData, setChartData] = useState<PerformanceChartData[]>([]);
  const [products, setProducts] = useState<ProductPerformance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [statsRes, perfRes, prodRes] = await Promise.all([
          analyticsAPI.getStats(),
          analyticsAPI.getPerformance(),
          analyticsAPI.getProducts()
        ]);
        if (statsRes.success) setStats(statsRes.data);
        if (perfRes.success) setChartData(perfRes.data);
        if (prodRes.success) setProducts(prodRes.data.products);
      } catch (err) {
        console.error("Failed to load analytics data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeDate]);

  if (loading) {
    return (
      <>
        <DashboardHeader filters={filters} onFiltersChange={setFilters} />
        <div className={styles.pageContainer}>
          <div style={{ padding: "40px", textAlign: "center" }}>Loading analytics...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <DashboardHeader filters={filters} onFiltersChange={setFilters} />
      <div className={styles.pageContainer}>

        {/* Page Header */}
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.headerTitle}>Analytics</h1>
            <p className={styles.headerSubtitle}>Tracking performance across all your resources and pathways</p>
          </div>

          <div className={styles.headerControls}>
            <div className={styles.segmentedControl}>
              {["7d", "30d", "90d", "All time"].map((range) => (
                <button
                  key={range}
                  className={`${styles.segmentBtn} ${activeDate === range ? styles.active : ""}`}
                  onClick={() => setActiveDate(range)}
                >
                  {range}
                </button>
              ))}
            </div>
            <button className={styles.exportBtn}>Export</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={`${styles.statIconWrapper} ${styles.iconGreen}`}>
              <WalletIcon />
            </div>
            <div className={styles.statTitle1}>Earnings</div>
            <div className={styles.statValue}>₦{stats?.earnings?.value?.toLocaleString() || 0}</div>
            <div className={`${styles.statTrend} ${stats?.earnings?.isUp ? styles.trendUp : styles.trendDown}`}>
              {stats?.earnings?.isUp ? <ArrowUpIcon /> : <ArrowDownIcon />} {stats?.earnings?.trend || 0}% vs last period
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIconWrapper} ${styles.iconPurple}`}>
              <DownloadIcon />
            </div>
            <div className={styles.statTitle2}>Downloads</div>
            <div className={styles.statValue}>{stats?.downloads?.value?.toLocaleString() || 0}</div>
            <div className={`${styles.statTrend} ${stats?.downloads?.isUp ? styles.trendUp : styles.trendDown}`}>
              {stats?.downloads?.isUp ? <ArrowUpIcon /> : <ArrowDownIcon />} {stats?.downloads?.trend || 0}% vs last period
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIconWrapper} ${styles.iconBlue}`}>
              <BookmarkIcon />
            </div>
            <div className={styles.statTitle3}>Saved</div>
            <div className={styles.statValue}>{stats?.saved?.value?.toLocaleString() || 0}</div>
            <div className={`${styles.statTrend} ${stats?.saved?.isUp ? styles.trendUp : styles.trendDown}`}>
              {stats?.saved?.isUp ? <ArrowUpIcon /> : <ArrowDownIcon />} {stats?.saved?.trend || 0}% vs last period
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIconWrapper} ${styles.iconOrange}`}>
              <TargetIcon />
            </div>
            <div className={styles.statTitle4}>AVG Confidence</div>
            <div className={styles.statValue}>~{stats?.confidence?.value || 0}%</div>
            <div className={`${styles.statTrend} ${stats?.confidence?.isUp ? styles.trendUp : styles.trendDown}`}>
              {stats?.confidence?.isUp ? <ArrowUpIcon /> : <ArrowDownIcon />} {stats?.confidence?.trend || 0}% vs last period
            </div>
          </div>
        </div>

        {/* Overall Performance Chart */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Overall Performance</h2>
            <div className={styles.chartLegend}>
              <span><span className={styles.legendDot} style={{ backgroundColor: '#10b981' }}></span>Earnings</span>
              <span><span className={styles.legendDot} style={{ backgroundColor: '#8b5cf6' }}></span>Downloads</span>
              <span><span className={styles.legendDot} style={{ backgroundColor: '#0ea5e9' }}></span>Saved</span>
            </div>
          </div>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={Array.isArray(chartData) ? chartData : []} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dx={-10} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Line type="linear" dataKey="earnings" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="linear" dataKey="downloads" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                <Line type="linear" dataKey="saved" stroke="#0ea5e9" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Item Performance Table */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Item Performance</h2>
            <div className={styles.tableControls}>
              <div className={styles.searchWrapper}>
                <span className={styles.searchIcon}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search resources"
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className={styles.sortWrapper}>
                <span>Sort by</span>
                <select className={styles.sortSelect} defaultValue="Highest Downloads">
                  <option value="Highest Downloads">Highest Downloads</option>
                  <option value="Highest Earnings">Highest Earnings</option>
                  <option value="Most Recent">Most Recent</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.performanceTable}>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Earnings</th>
                  <th>Downloads</th>
                  <th>Saves</th>
                  <th>Views</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {(!Array.isArray(products) || products.length === 0) ? (
                  <tr><td colSpan={8} style={{ textAlign: 'center', padding: '20px' }}>No performance data available</td></tr>
                ) : products.map((row) => (
                  <tr key={row.id}>
                    <td>
                      {row.type === 'resource' ? <ResourceTypeIcon /> : <PathwayTypeIcon />}
                    </td>
                    <td>
                      <div className={styles.nameCell}>
                        <span className={styles.nameTitle}>{row.name}</span>
                        {row.price && <span className={styles.namePrice}>{row.price}</span>}
                      </div>
                    </td>
                    <td><div className={styles.descText}>{row.description}</div></td>
                    <td>{row.earnings}</td>
                    <td>{row.downloads}</td>
                    <td>{row.saves}</td>
                    <td>{row.views}</td>
                    <td>
                      <span className={row.isUp ? styles.confUp : styles.confDown}>
                        {row.isUp ? <ArrowUpIcon /> : <ArrowDownIcon />}
                        {row.confidence}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}