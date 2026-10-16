"use client";

import AdminPageHeader from "../../../_components/AdminPageHeader";
import dashStyles from "../dashboard/page.module.css";
import styles from "./page.module.css";

const METRICS = [
  { label: "Daily Active Users", value: "4,820", delta: "18%", up: true, color: "#0d5010" },
  { label: "Weekly Active Users", value: "22,340", delta: "12%", up: true, color: "#300d50" },
  { label: "Avg. Session Duration", value: "6m 42s", delta: "4%", up: false, color: "#0d504f" },
  { label: "30-Day Retention", value: "61%", delta: "9%", up: true, color: "#502b0d" },
];

const CHART_LABELS = ["Apr 01", "Apr 02", "Apr 03", "Apr 04", "Apr 05", "Apr 06", "Apr 07", "Apr 08", "Apr 09", "Apr 10", "Apr 11", "Apr 12"];
const ENGAGEMENT_HEIGHTS = [60, 68, 72, 65, 80, 86, 78, 92, 100, 88, 74, 66];
const RETENTION_HEIGHTS = [45, 50, 48, 55, 60, 58, 63, 61, 67, 70, 66, 72];

function Delta({ delta, up }: { delta: string; up: boolean }) {
  return <span style={{ color: up ? "#1cab22" : "#ab1c3a", fontSize: "10px", fontWeight: 500 }}>{up ? "↑" : "↓"} {delta} vs last period</span>;
}

export default function AdminAnalyticsPage() {
  return (
    <div className={styles.pageContainer}>
      <AdminPageHeader title="Analytics" subtitle="Engagement metrics and platform health" />

      <div className={dashStyles.card}>
        <h2 className={dashStyles.cardTitle}>Overview</h2>
        <div className={dashStyles.metricGrid}>
          {METRICS.map((m) => (
            <div key={m.label} className={dashStyles.metricBox}>
              <span className={dashStyles.metricLabel} style={{ color: m.color }}>{m.label}</span>
              <span className={dashStyles.metricValue}>{m.value}</span>
              <Delta delta={m.delta} up={m.up} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={dashStyles.card}>
          <h2 className={dashStyles.cardTitle}>Daily Active Users</h2>
          <div className={dashStyles.barChart}>
            {ENGAGEMENT_HEIGHTS.map((h, i) => (
              <div key={CHART_LABELS[i]} className={dashStyles.barCol}>
                <div className={dashStyles.barTrack}>
                  <div className={dashStyles.bar} style={{ height: `${h}%` }} />
                </div>
                <span className={dashStyles.barLabel}>{CHART_LABELS[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={dashStyles.card}>
          <h2 className={dashStyles.cardTitle}>Retention Trend</h2>
          <div className={dashStyles.barChart}>
            {RETENTION_HEIGHTS.map((h, i) => (
              <div key={CHART_LABELS[i]} className={dashStyles.barCol}>
                <div className={dashStyles.barTrack}>
                  <div className={dashStyles.bar} style={{ height: `${h}%` }} />
                </div>
                <span className={dashStyles.barLabel}>{CHART_LABELS[i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
