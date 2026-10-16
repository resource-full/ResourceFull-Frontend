import styles from "./AdminPageHeader.module.css";

interface AdminPageHeaderProps {
  title: string;
  subtitle: string;
  exportLabel?: string;
}

export default function AdminPageHeader({ title, subtitle, exportLabel = "Export" }: AdminPageHeaderProps) {
  return (
    <div className={styles.titleRow}>
      <div>
        <h1 className={styles.pageTitle}>{title}</h1>
        <p className={styles.pageSubtitle}>{subtitle}</p>
      </div>
      <button className={styles.exportBtn}>{exportLabel}</button>
    </div>
  );
}
