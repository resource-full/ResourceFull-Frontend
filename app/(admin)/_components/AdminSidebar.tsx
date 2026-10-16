"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";
import Logo from "@/app/components/ui/Logo";
import styles from "./AdminSidebar.module.css";

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const TrendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ListIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const PathwayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

const HubsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const MarketplaceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const CollapseIcon = () => (
  <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.3169 0.183058C12.0729 -0.0610194 11.6771 -0.0610194 11.4331 0.183058L5.18306 6.43306C5.06585 6.55027 5 6.70924 5 6.875C5 7.04076 5.06585 7.19973 5.18306 7.31694L11.4331 13.5669C11.6771 13.811 12.0729 13.811 12.3169 13.5669C12.561 13.3229 12.561 12.9271 12.3169 12.6831L6.50888 6.875L12.3169 1.06694C12.561 0.822864 12.561 0.427136 12.3169 0.183058ZM7.31694 0.183059C7.07286 -0.061019 6.67714 -0.061019 6.43306 0.183059L0.183059 6.43306C0.0658484 6.55027 0 6.70924 0 6.875C0 7.04076 0.0658484 7.19973 0.183059 7.31694L6.43306 13.5669C6.67714 13.811 7.07286 13.811 7.31694 13.5669C7.56102 13.3229 7.56102 12.9271 7.31694 12.6831L1.50888 6.875L7.31694 1.06694C7.56102 0.822864 7.56102 0.427136 7.31694 0.183059Z" fill="currentColor" />
  </svg>
);

const SignOutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const NAV_ITEMS_OVERVIEW = [
  { href: "/admin/dashboard", label: "Dashboard", icon: GridIcon },
  { href: "/admin/analytics", label: "Analytics", icon: TrendIcon },
];

const NAV_ITEMS_CONTENT = [
  { href: "/admin/users", label: "Users", icon: UsersIcon },
  { href: "/admin/resources", label: "Resources", icon: ListIcon },
  { href: "/admin/pathways", label: "Pathways", icon: PathwayIcon },
  { href: "/admin/hubs", label: "Hubs", icon: HubsIcon },
  { href: "/admin/marketplace", label: "Marketplace", icon: MarketplaceIcon },
];

export default function AdminSidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const email = user?.email || "admin@resourcefull.com";
  const name = user?.name || email.split("@")[0];

  const handleSignOut = async () => {
    try {
      await logout();
    } finally {
      router.push("/login");
    }
  };

  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoRow}>
        <Link href="/admin/dashboard" className={styles.logo}>
          <Logo iconSize={32} fontSize={20} light />
        </Link>
        <button className={styles.collapseBtn} aria-label="Collapse sidebar">
          <CollapseIcon />
        </button>
      </div>

      <div className={styles.navGroup}>
        <div className={styles.navLabel}>Overview</div>
        <div className={styles.navSection}>
          {NAV_ITEMS_OVERVIEW.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={`${styles.navLink} ${isActive(href) ? styles.navLinkActive : ""}`}>
              <div className={styles.navLinkInner}>
                <Icon />
                {label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.navGroup}>
        <div className={styles.navLabel}>Content</div>
        <div className={styles.navSection}>
          {NAV_ITEMS_CONTENT.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={`${styles.navLink} ${isActive(href) ? styles.navLinkActive : ""}`}>
              <div className={styles.navLinkInner}>
                <Icon />
                {label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.spacer} />

      <div className={styles.userCard}>
        <Image src="https://i.pravatar.cc/150?img=47" alt={name} width={36} height={36} className={styles.avatar} unoptimized />
        <div className={styles.userInfo}>
          <div className={styles.userName}>{name}</div>
          <div className={styles.userEmail}>{email}</div>
        </div>
        <button className={styles.signOutBtn} aria-label="Sign out" onClick={handleSignOut}>
          <SignOutIcon />
        </button>
      </div>
    </aside>
  );
}
