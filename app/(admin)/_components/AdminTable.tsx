"use client";

import { useState, useMemo } from "react";
import styles from "./AdminTable.module.css";

export interface AdminTableColumn<T> {
  key: string;
  label: string;
  render: (row: T) => React.ReactNode;
}

interface AdminTableProps<T> {
  countLabel: string;
  sortOptions: string[];
  columns: AdminTableColumn<T>[];
  rows: T[];
  searchPlaceholder?: string;
  getSearchText: (row: T) => string;
}

export default function AdminTable<T>({
  countLabel,
  sortOptions,
  columns,
  rows,
  searchPlaceholder = "Search",
  getSearchText,
}: AdminTableProps<T>) {
  const [search, setSearch] = useState("");
  const [activeSort, setActiveSort] = useState(sortOptions[0]);

  const filteredRows = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((row) => getSearchText(row).toLowerCase().includes(q));
  }, [rows, search, getSearchText]);

  return (
    <div className={styles.card}>
      <div className={styles.toolbar}>
        <span className={styles.countLabel}>{countLabel}</span>
        <div className={styles.toolbarRight}>
          <input
            className={styles.searchInput}
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className={styles.sortLabel}>Sort by</span>
          {sortOptions.map((option) => (
            <button
              key={option}
              className={`${styles.chip} ${activeSort === option ? styles.chipActive : ""}`}
              onClick={() => setActiveSort(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col) => (
                  <td key={col.key}>{col.render(row)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
