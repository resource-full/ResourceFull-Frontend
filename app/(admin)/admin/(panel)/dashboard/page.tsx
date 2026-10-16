"use client";

import { useState } from "react";
import DashboardHeader, { DashboardFilters } from "@/app/(dashboard)/_components/DashboardHeader";
import styles from "./page.module.css";

const ArrowUpIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

const UsersIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const NewspaperIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
    <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
  </svg>
);

const BoltIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M13 2 3 14h7l-1 8 11-14h-7l1-6z" />
  </svg>
);

const KeyIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="m21 2-9.6 9.6" /><path d="m15.5 7.5 3 3L22 7l-3-3" />
  </svg>
);

const DesktopIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const DocListIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const PathwayIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

const ArrowDownCircleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
  </svg>
);

const RANGE_TABS = ["7d", "30d", "90d", "All time"];

const TOP_STATS = [
  { label: "TOTAL USERS", value: "18,200", delta: "18%", up: true, color: "#16d91f", icon: <UsersIcon /> },
  { label: "NEW TODAY", value: "84", delta: "18%", up: true, color: "#d95316", icon: <NewspaperIcon /> },
  { label: "ACTIVE(100+)", value: "20,789", delta: "18%", up: false, color: "#d9b216", icon: <BoltIcon /> },
  { label: "LOGINS TODAY", value: "124,777", delta: "18%", up: true, color: "#d916d2", icon: <KeyIcon /> },
  { label: "SITE VISIT", value: "₦8,200", delta: "18%", up: true, color: "#d91f16", icon: <DesktopIcon /> },
  { label: "RESOURCES", value: "20M+", delta: "18%", up: true, color: "#024a94", icon: <DocListIcon /> },
  { label: "PATHWAYS", value: "20M+", delta: "18%", up: true, color: "#169ad8", icon: <PathwayIcon /> },
  { label: "DOWNLOADS", value: "28,200", delta: "18%", up: true, color: "#4316d9", icon: <ArrowDownCircleIcon /> },
];

const USERS_METRICS = [
  { label: "Total Users", value: "22M", delta: "18%", up: true, color: "#0d5010" },
  { label: "New", value: "400", delta: "18%", up: true, color: "#300d50" },
  { label: "Active", value: "3200", delta: "81%", up: false, color: "#0d504f" },
  { label: "Logins", value: "~94%", delta: "18%", up: true, color: "#502b0d" },
  { label: "Site Visits", value: "~94%", delta: "18%", up: true, color: "#502b0d" },
];

const MARKETPLACE_METRICS = [
  { label: "Total Purchases", value: "₦18,200", delta: "18%", up: true, color: "#0d5010" },
  { label: "Gross Revenue", value: "₦18M+", delta: "18%", up: true, color: "#300d50" },
  { label: "AVG. Creator Revenue", value: "₦180,000", delta: "18%", up: true, color: "#502b0d" },
];

const CONTENT_METRICS = [
  { label: "Total Resources", value: "₦18,200", delta: "18%", up: true, color: "#0d5010" },
  { label: "Total Pathways", value: "400", delta: "18%", up: true, color: "#300d50" },
  { label: "Public Hubs", value: "3200", delta: "81%", up: false, color: "#0d504f" },
  { label: "Downloads", value: "~94%", delta: "18%", up: true, color: "#502b0d" },
  { label: "Total Saves", value: "~94%", delta: "18%", up: true, color: "#502b0d" },
];

const CHART_LABELS = ["Apr 01", "Apr 02", "Apr 03", "Apr 04", "Apr 05", "Apr 06", "Apr 07", "Apr 08", "Apr 09", "Apr 10", "Apr 11", "Apr 12"];
const CHART_HEIGHTS = [86, 71, 56, 71, 56, 86, 71, 100, 86, 42, 27, 3];

const INDUSTRY_LEGEND = [
  { label: "Tech", value: "48%", color: "#71e300" },
  { label: "Finance", value: "48%", color: "#e33d00" },
  { label: "Consulting", value: "48%", color: "#e49800" },
  { label: "Other", value: "48%", color: "#000fe4" },
  { label: "Other", value: "48%", color: "#e400ab" },
];

const PIE_GRADIENT = `conic-gradient(${INDUSTRY_LEGEND[1].color} 0deg 130deg, ${INDUSTRY_LEGEND[0].color} 130deg 180deg, ${INDUSTRY_LEGEND[4].color} 180deg 230deg, ${INDUSTRY_LEGEND[3].color} 230deg 300deg, ${INDUSTRY_LEGEND[2].color} 300deg 360deg)`;

function Delta({ delta, up }: { delta: string; up: boolean }) {
  return (
    <span className={styles.statDelta} style={{ color: up ? "#1cab22" : "#ab1c3a" }}>
      {up ? <ArrowUpIcon /> : <ArrowDownIcon />} {delta} vs last period
    </span>
  );
}

export default function AdminHomePage() {
  const [filters, setFilters] = useState<DashboardFilters>({
    searchQuery: "",
    worldwide: [],
    industry: [],
    experience: [],
  });
  const [activeRange, setActiveRange] = useState("7d");

  return (
    <div className={styles.pageContainer}>
      <DashboardHeader filters={filters} onFiltersChange={setFilters} />

      <div className={styles.statsStrip}>
        {TOP_STATS.map((stat) => (
          <div key={stat.label} className={styles.statBox}>
            <span className={styles.statIcon} style={{ backgroundColor: stat.color }}>{stat.icon}</span>
            <span className={styles.statLabel}>{stat.label}</span>
            <span className={styles.statValue}>{stat.value}</span>
            <Delta delta={stat.delta} up={stat.up} />
          </div>
        ))}
      </div>

      <div className={styles.titleRow}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Platform overview — last updated just now</p>
        </div>
        <div className={styles.titleActions}>
          <div className={styles.rangeTabs}>
            {RANGE_TABS.map((range) => (
              <button
                key={range}
                className={`${styles.rangeTab} ${activeRange === range ? styles.rangeTabActive : ""}`}
                onClick={() => setActiveRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
          <button className={styles.exportBtn}>Export</button>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.column}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Users</h2>
            <div className={styles.metricGrid}>
              {USERS_METRICS.map((m) => (
                <div key={m.label} className={styles.metricBox}>
                  <span className={styles.metricLabel} style={{ color: m.color }}>{m.label}</span>
                  <span className={styles.metricValue}>{m.value}</span>
                  <Delta delta={m.delta} up={m.up} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Marketplace</h2>
            <div className={styles.metricGrid}>
              {MARKETPLACE_METRICS.map((m) => (
                <div key={m.label} className={styles.metricBox}>
                  <span className={styles.metricLabel} style={{ color: m.color }}>{m.label}</span>
                  <span className={styles.metricValue}>{m.value}</span>
                  <Delta delta={m.delta} up={m.up} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Content</h2>
            <div className={styles.metricGrid}>
              {CONTENT_METRICS.map((m) => (
                <div key={m.label} className={styles.metricBox}>
                  <span className={styles.metricLabel} style={{ color: m.color }}>{m.label}</span>
                  <span className={styles.metricValue}>{m.value}</span>
                  <Delta delta={m.delta} up={m.up} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Monthly User Growth</h2>
            <div className={styles.barChart}>
              {CHART_HEIGHTS.map((h, i) => (
                <div key={CHART_LABELS[i]} className={styles.barCol}>
                  <div className={styles.barTrack}>
                    <div className={styles.bar} style={{ height: `${h}%` }} />
                  </div>
                  <span className={styles.barLabel}>{CHART_LABELS[i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Revenue Trend</h2>
            <div className={styles.barChart}>
              {CHART_HEIGHTS.map((h, i) => (
                <div key={CHART_LABELS[i]} className={styles.barCol}>
                  <div className={styles.barTrack}>
                    <div className={styles.bar} style={{ height: `${h}%` }} />
                  </div>
                  <span className={styles.barLabel}>{CHART_LABELS[i]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Users by Industry</h2>
            <div className={styles.pieRow}>
              <div className={styles.pie} style={{ background: PIE_GRADIENT }} />
              <div className={styles.legend}>
                {INDUSTRY_LEGEND.map((item, i) => (
                  <div key={`${item.label}-${i}`} className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ backgroundColor: item.color }} />
                    <span style={{ color: item.color }}>{item.label}</span>
                    <span className={styles.legendValue}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
