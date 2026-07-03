"use client";

import { useState } from "react";
import DashboardHeader, { DashboardFilters } from "../_components/DashboardHeader";
import styles from "./page.module.css";
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

// Mock Data for different ranges
const MOCK_DATA_RANGES = {
  "7d": {
    stats: {
      earnings: { value: "₦4,500", trend: 12, isUp: true },
      downloads: { value: "120", trend: 5, isUp: true },
      saved: { value: "850", trend: 20, isUp: false },
      confidence: { value: "~92%", trend: 2, isUp: true },
    },
    chart: [
      { name: 'Mon', earnings: 2, downloads: 1, saved: 2 },
      { name: 'Tue', earnings: 4, downloads: 2, saved: 3 },
      { name: 'Wed', earnings: 3, downloads: 4, saved: 2 },
      { name: 'Thu', earnings: 6, downloads: 3, saved: 4 },
      { name: 'Fri', earnings: 5, downloads: 5, saved: 5 },
      { name: 'Sat', earnings: 8, downloads: 6, saved: 6 },
      { name: 'Sun', earnings: 9, downloads: 8, saved: 7 },
    ]
  },
  "30d": {
    stats: {
      earnings: { value: "₦18,200", trend: 18, isUp: true },
      downloads: { value: "400", trend: 18, isUp: true },
      saved: { value: "3200", trend: 81, isUp: false },
      confidence: { value: "~94%", trend: 18, isUp: true },
    },
    chart: [
      { name: 'Jan', earnings: 9, downloads: 3, saved: 5 },
      { name: 'Feb', earnings: 9, downloads: 3, saved: 5 },
      { name: 'Mar', earnings: 7, downloads: 2, saved: 3 },
      { name: 'Apr', earnings: 7, downloads: 2, saved: 3 },
      { name: 'May', earnings: 5, downloads: 5, saved: 2 },
      { name: 'Jun', earnings: 5, downloads: 5, saved: 2 },
      { name: 'Jul', earnings: 8, downloads: 7, saved: 2 },
      { name: 'Aug', earnings: 8, downloads: 5, saved: 4 },
      { name: 'Sep', earnings: 8, downloads: 5, saved: 4 },
      { name: 'Oct', earnings: 9, downloads: 3, saved: 5 },
      { name: 'Nov', earnings: 7, downloads: 3, saved: 5 },
      { name: 'Dec', earnings: 7, downloads: 5, saved: 4 },
    ]
  },
  "90d": {
    stats: {
      earnings: { value: "₦54,100", trend: 32, isUp: true },
      downloads: { value: "1,250", trend: 24, isUp: true },
      saved: { value: "9,800", trend: 15, isUp: false },
      confidence: { value: "~96%", trend: 5, isUp: true },
    },
    chart: [
      { name: 'Week 1', earnings: 15, downloads: 8, saved: 12 },
      { name: 'Week 4', earnings: 18, downloads: 12, saved: 15 },
      { name: 'Week 8', earnings: 22, downloads: 18, saved: 20 },
      { name: 'Week 12', earnings: 26, downloads: 22, saved: 25 },
    ]
  },
  "All time": {
    stats: {
      earnings: { value: "₦240,500", trend: 140, isUp: true },
      downloads: { value: "8,400", trend: 120, isUp: true },
      saved: { value: "45,200", trend: 60, isUp: true },
      confidence: { value: "~98%", trend: 10, isUp: true },
    },
    chart: [
      { name: '2023', earnings: 40, downloads: 20, saved: 30 },
      { name: '2024', earnings: 60, downloads: 45, saved: 50 },
      { name: '2025', earnings: 85, downloads: 70, saved: 80 },
      { name: '2026', earnings: 110, downloads: 90, saved: 100 },
    ]
  }
};

// Mock Table Data
const TABLE_DATA = [
  { id: 1, type: "resource", name: "Graphic Design CV", price: "Free", desc: "Our Graphic Design...", earnings: "$200", downloads: "24", saves: "24", views: "24", confidence: 96, isUp: true },
  { id: 2, type: "pathway", name: "Leading text", price: "$250", desc: "Leading text", earnings: "$200", downloads: "300", saves: "300", views: "300", confidence: 96, isUp: false },
  { id: 3, type: "resource", name: "Leading text", price: "", desc: "Leading text", earnings: "$200", downloads: "700,000", saves: "700,000", views: "700,000", confidence: 96, isUp: true },
  { id: 4, type: "pathway", name: "Leading text", price: "", desc: "Leading text", earnings: "$200", downloads: "2M", saves: "2M", views: "2M", confidence: 96, isUp: false },
  { id: 5, type: "resource", name: "Leading text", price: "", desc: "Leading text", earnings: "$200", downloads: "1", saves: "1", views: "1", confidence: 96, isUp: true },
  { id: 6, type: "pathway", name: "Leading text", price: "", desc: "Leading text", earnings: "$200", downloads: "3", saves: "3", views: "3", confidence: 96, isUp: false },
];

export default function AnalyticsPage() {
  const [activeDate, setActiveDate] = useState("30d");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<DashboardFilters>({
    searchQuery: "",
    worldwide: [],
    industry: [],
    experience: [],
  });

  const currentData = MOCK_DATA_RANGES[activeDate as keyof typeof MOCK_DATA_RANGES];

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
            <div className={styles.statValue}>{currentData.stats.earnings.value}</div>
            <div className={`${styles.statTrend} ${currentData.stats.earnings.isUp ? styles.trendUp : styles.trendDown}`}>
              {currentData.stats.earnings.isUp ? <ArrowUpIcon /> : <ArrowDownIcon />} {currentData.stats.earnings.trend}% vs last period
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIconWrapper} ${styles.iconPurple}`}>
              <DownloadIcon />
            </div>
            <div className={styles.statTitle2}>Downloads</div>
            <div className={styles.statValue}>{currentData.stats.downloads.value}</div>
            <div className={`${styles.statTrend} ${currentData.stats.downloads.isUp ? styles.trendUp : styles.trendDown}`}>
              {currentData.stats.downloads.isUp ? <ArrowUpIcon /> : <ArrowDownIcon />} {currentData.stats.downloads.trend}% vs last period
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIconWrapper} ${styles.iconBlue}`}>
              <BookmarkIcon />
            </div>
            <div className={styles.statTitle3}>Saved</div>
            <div className={styles.statValue}>{currentData.stats.saved.value}</div>
            <div className={`${styles.statTrend} ${currentData.stats.saved.isUp ? styles.trendUp : styles.trendDown}`}>
              {currentData.stats.saved.isUp ? <ArrowUpIcon /> : <ArrowDownIcon />} {currentData.stats.saved.trend}% vs last period
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={`${styles.statIconWrapper} ${styles.iconOrange}`}>
              <TargetIcon />
            </div>
            <div className={styles.statTitle4}>AVG Confidence</div>
            <div className={styles.statValue}>{currentData.stats.confidence.value}</div>
            <div className={`${styles.statTrend} ${currentData.stats.confidence.isUp ? styles.trendUp : styles.trendDown}`}>
              {currentData.stats.confidence.isUp ? <ArrowUpIcon /> : <ArrowDownIcon />} {currentData.stats.confidence.trend}% vs last period
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
              <LineChart data={currentData.chart} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
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
                {TABLE_DATA.map((row) => (
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
                    <td><div className={styles.descText}>{row.desc}</div></td>
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