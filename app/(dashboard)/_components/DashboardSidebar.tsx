"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./DashboardSidebar.module.css";

const ExploreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const CollapseIcon = () => (
  <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.3169 0.183058C12.0729 -0.0610194 11.6771 -0.0610194 11.4331 0.183058L5.18306 6.43306C5.06585 6.55027 5 6.70924 5 6.875C5 7.04076 5.06585 7.19973 5.18306 7.31694L11.4331 13.5669C11.6771 13.811 12.0729 13.811 12.3169 13.5669C12.561 13.3229 12.561 12.9271 12.3169 12.6831L6.50888 6.875L12.3169 1.06694C12.561 0.822864 12.561 0.427136 12.3169 0.183058ZM7.31694 0.183059C7.07286 -0.061019 6.67714 -0.061019 6.43306 0.183059L0.183059 6.43306C0.0658484 6.55027 0 6.70924 0 6.875C0 7.04076 0.0658484 7.19973 0.183059 7.31694L6.43306 13.5669C6.67714 13.811 7.07286 13.811 7.31694 13.5669C7.56102 13.3229 7.56102 12.9271 7.31694 12.6831L1.50888 6.875L7.31694 1.06694C7.56102 0.822864 7.56102 0.427136 7.31694 0.183059Z" fill="#707070" />
  </svg>

);

const SavedIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const AddIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const HelpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const Bag = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.25 5.9375C1.25 5.07456 1.94956 4.375 2.8125 4.375H7.8125C8.67544 4.375 9.375 5.07456 9.375 5.9375V9.0625C9.375 9.92544 8.67544 10.625 7.8125 10.625H2.8125C1.94955 10.625 1.25 9.92544 1.25 9.0625V5.9375ZM2.8125 5.625C2.63991 5.625 2.5 5.76491 2.5 5.9375V9.0625C2.5 9.23509 2.63991 9.375 2.8125 9.375H7.8125C7.98509 9.375 8.125 9.23509 8.125 9.0625V5.9375C8.125 5.76491 7.98509 5.625 7.8125 5.625H2.8125ZM11.25 7.1875C11.25 6.32456 11.9496 5.625 12.8125 5.625H17.1875C18.0504 5.625 18.75 6.32456 18.75 7.1875V14.0625C18.75 14.9254 18.0504 15.625 17.1875 15.625H12.8125C11.9496 15.625 11.25 14.9254 11.25 14.0625V7.1875ZM12.8125 6.875C12.6399 6.875 12.5 7.01491 12.5 7.1875V14.0625C12.5 14.2351 12.6399 14.375 12.8125 14.375H17.1875C17.3601 14.375 17.5 14.2351 17.5 14.0625V7.1875C17.5 7.01491 17.3601 6.875 17.1875 6.875H12.8125ZM2.5 13.4375C2.5 12.5746 3.19956 11.875 4.0625 11.875H8.4375C9.30044 11.875 10 12.5746 10 13.4375V15.3125C10 16.1754 9.30044 16.875 8.4375 16.875H4.0625C3.19955 16.875 2.5 16.1754 2.5 15.3125V13.4375ZM4.0625 13.125C3.88991 13.125 3.75 13.2649 3.75 13.4375V15.3125C3.75 15.4851 3.88991 15.625 4.0625 15.625H8.4375C8.61009 15.625 8.75 15.4851 8.75 15.3125V13.4375C8.75 13.2649 8.61009 13.125 8.4375 13.125H4.0625Z" fill="#0F172A" />
  </svg>
);

const WalletIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.5 10C17.5 8.96447 16.6605 8.125 15.625 8.125H12.5C12.5 9.50571 11.3807 10.625 10 10.625C8.61929 10.625 7.5 9.50571 7.5 8.125H4.375C3.33947 8.125 2.5 8.96447 2.5 10M17.5 10V15C17.5 16.0355 16.6605 16.875 15.625 16.875H4.375C3.33947 16.875 2.5 16.0355 2.5 15V10M17.5 10V7.5M2.5 10V7.5M17.5 7.5C17.5 6.46447 16.6605 5.625 15.625 5.625H4.375C3.33947 5.625 2.5 6.46447 2.5 7.5M17.5 7.5V5C17.5 3.96447 16.6605 3.125 15.625 3.125H4.375C3.33947 3.125 2.5 3.96447 2.5 5V7.5" stroke="#2C2C2C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M16.5847 3.41529C15.3643 2.1949 13.3857 2.1949 12.1653 3.41529L8.41529 7.16529C7.1949 8.38568 7.1949 10.3643 8.41529 11.5847C8.67435 11.8438 8.96648 12.0471 9.27752 12.1957C9.58899 12.3445 9.72086 12.7176 9.57207 13.0291C9.42328 13.3405 9.05018 13.4724 8.73871 13.3236C8.30141 13.1147 7.89219 12.8294 7.53141 12.4686C5.82286 10.76 5.82286 7.98995 7.53141 6.28141L11.2814 2.53141C12.99 0.822864 15.76 0.822864 17.4686 2.53141C19.1771 4.23995 19.1771 7.01005 17.4686 8.71859L16.0044 10.1827C15.7604 10.4268 15.3646 10.4268 15.1206 10.1827C14.8765 9.93866 14.8765 9.54293 15.1206 9.29885L16.5847 7.83471C17.8051 6.61432 17.8051 4.63568 16.5847 3.41529ZM10.4279 6.97094C10.5767 6.65948 10.9498 6.52761 11.2613 6.67639C11.6986 6.8853 12.1078 7.17062 12.4686 7.53141C14.1771 9.23995 14.1771 12.01 12.4686 13.7186L8.71859 17.4686C7.01005 19.1771 4.23995 19.1771 2.53141 17.4686C0.822864 15.76 0.822864 12.99 2.53141 11.2814L3.99555 9.81727C4.23963 9.57319 4.63536 9.57319 4.87943 9.81727C5.12351 10.0613 5.12351 10.4571 4.87943 10.7011L3.41529 12.1653C2.1949 13.3857 2.1949 15.3643 3.41529 16.5847C4.63568 17.8051 6.61432 17.8051 7.83471 16.5847L11.5847 12.8347C12.8051 11.6143 12.8051 9.63568 11.5847 8.41529C11.3257 8.15623 11.0335 7.95289 10.7225 7.80431C10.411 7.65552 10.2791 7.28241 10.4279 6.97094Z" fill="#024385" />
  </svg>
);

const ResourceIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#024A94" />
    <path d="M28.8739 32.1168C30.1994 32.1168 31.2739 33.1913 31.2739 34.5168C31.2739 35.8423 30.1994 36.9168 28.8739 36.9168H12.1305C10.805 36.9168 9.73047 35.8423 9.73047 34.5168C9.73047 33.1913 10.805 32.1168 12.1305 32.1168H28.8739Z" fill="white" />
    <path d="M35.8503 25.0368C37.1758 25.0368 38.2503 26.1114 38.2503 27.4368C38.2503 28.7623 37.1758 29.8368 35.8503 29.8368H12.1305C10.805 29.8368 9.73047 28.7623 9.73047 27.4368C9.73051 26.1113 10.805 25.0368 12.1305 25.0368H35.8503Z" fill="white" />
    <path d="M35.8702 18.0802C37.1956 18.0802 38.2702 19.1548 38.2702 20.4802C38.2702 21.8057 37.1956 22.8802 35.8702 22.8802H12.1503C10.8249 22.8802 9.75031 21.8057 9.75031 20.4802C9.75031 19.1548 10.8249 18.0803 12.1503 18.0802H35.8702Z" fill="white" />
    <path d="M35.8503 11.084C37.1758 11.084 38.2503 12.1585 38.2503 13.484C38.2503 14.8095 37.1758 15.884 35.8503 15.884H12.1305C10.805 15.884 9.73047 14.8095 9.73047 13.484C9.73047 12.1585 10.805 11.084 12.1305 11.084H35.8503Z" fill="white" />
  </svg>
);

const PathwayIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#169AD8" />
    <path fillRule="evenodd" clipRule="evenodd" d="M29.4806 10.8447C31.0798 10.8447 32.6135 11.4801 33.7442 12.6108C34.8749 13.7416 35.5101 15.2752 35.5102 16.8743C35.5102 18.4734 34.875 20.0071 33.7442 21.1379C32.6135 22.2686 31.0798 22.9039 29.4806 22.9039H16.3252C15.3075 22.9039 14.3315 23.3081 13.6119 24.0277C12.8923 24.7473 12.4881 25.7233 12.4881 26.741C12.4881 27.7586 12.8923 28.7345 13.6119 29.4541C14.3315 30.1737 15.3075 30.578 16.3252 30.578H29.2147C29.5559 29.617 30.1862 28.7849 31.0189 28.1961C31.8516 27.6073 32.846 27.2905 33.8658 27.2891C34.7702 27.2891 35.6573 27.5376 36.43 28.0077C37.2027 28.4778 37.8312 29.1512 38.247 29.9544C38.6628 30.7576 38.8497 31.6596 38.7875 32.5619C38.7252 33.4642 38.4161 34.332 37.8939 35.0705C37.3717 35.809 36.6566 36.3898 35.8267 36.7493C34.9968 37.1087 34.084 37.2332 33.1881 37.1089C32.2923 36.9847 31.4478 36.6165 30.747 36.0447C30.0463 35.4729 29.5162 34.7195 29.2147 33.8668H16.3252C14.4353 33.8668 12.6228 33.1161 11.2864 31.7797C9.95005 30.4434 9.19923 28.6309 9.19922 26.741C9.19922 24.8511 9.95004 23.0386 11.2864 21.7022C12.6228 20.3659 14.4353 19.615 16.3252 19.615H29.4806C30.2075 19.615 30.9046 19.3263 31.4186 18.8124C31.9326 18.2984 32.2212 17.6011 32.2212 16.8743C32.2212 16.1474 31.9326 15.4503 31.4186 14.9363C30.9046 14.4223 30.2075 14.1336 29.4806 14.1336H16.3252C15.889 14.1336 15.4707 13.9603 15.1623 13.6519C14.854 13.3435 14.6806 12.9252 14.6806 12.4891C14.6806 12.053 14.854 11.6348 15.1623 11.3264C15.4707 11.0181 15.889 10.8447 16.3252 10.8447H29.4806ZM34.495 30.7032C34.1945 30.5787 33.864 30.5461 33.545 30.6096C33.226 30.673 32.9329 30.8296 32.703 31.0596C32.473 31.2895 32.3164 31.5826 32.253 31.9016C32.1895 32.2206 32.2221 32.5513 32.3466 32.8518C32.471 33.1522 32.6818 33.409 32.9522 33.5897C33.2226 33.7704 33.5406 33.8668 33.8658 33.8668C34.3019 33.8668 34.7202 33.6936 35.0286 33.3852C35.337 33.0768 35.5102 32.6585 35.5102 32.2224C35.5102 31.8972 35.4138 31.5792 35.2331 31.3088C35.0524 31.0384 34.7955 30.8276 34.495 30.7032Z" fill="white" />
  </svg>
);

const HubIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#16891B" />
    <path d="M39.5206 33.4697C39.5206 35.4026 37.9537 36.9695 36.0209 36.9695H12.1404C10.2075 36.9695 8.64062 35.4026 8.64062 33.4697V20.7329C8.64062 18.8001 10.2075 17.2332 12.1404 17.2332H27.3067C29.0196 17.2332 30.4082 15.8446 30.4082 14.1317C30.4082 12.4188 31.7968 11.0303 33.5097 11.0303H36.0209C37.9537 11.0303 39.5206 12.5972 39.5206 14.53V33.4697Z" fill="white" />
  </svg>
);

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const addMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
        setIsAddMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.logoRow}>
        <Link href="/" className={styles.logo}>
          {!isCollapsed ? (
            <Image src="/assets/resourcefull-logo-2.png" alt="Resourcefull Logo" width={204} height={36} className={styles.logoImage} priority />
          ) : (
            <Image src="/assets/mini-logo.png" alt="Resourcefull Logo" width={35} height={36} priority />
          )}
        </Link>
        <button
          className={`${styles.collapseBtn} ${isCollapsed ? styles.collapsedIcon : ''}`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <CollapseIcon />
        </button>
      </div>

      <div className={styles.navSection}>
        <Link
          href="/dashboard"
          className={`${styles.navLink} ${pathname === '/dashboard' ? styles.navLinkActive : ''}`}
        >
          <div className={styles.navLinkInner}>
            <ExploreIcon />
            <span className={styles.navLinkText}>Explore</span>
          </div>
        </Link>
        <Link
          href="/saved"
          className={`${styles.navLink} ${pathname === '/saved' ? styles.navLinkActive : ''}`}
        >
          <div className={styles.navLinkInner}>
            <SavedIcon />
            <span className={styles.navLinkText}>Saved</span>
          </div>
          <span className={styles.badge}>10</span>
        </Link>
        <Link
          href="/purchased"
          className={`${styles.navLink} ${pathname === '/purchased' ? styles.navLinkActive : ''}`}
        >
          <div className={styles.navLinkInner}>
            <Bag />
            <span className={styles.navLinkText}>Purchased</span>
          </div>
          <span className={styles.badge}>10</span>
        </Link>
      </div>

      <div className={styles.navSection} ref={addMenuRef} style={{ position: 'relative' }}>
        <button
          className={styles.addBtn}
          onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
        >
          <AddIcon />
          <span className={styles.addBtnText}>Add</span>
        </button>

        {isAddMenuOpen && (
          <div className={styles.addMenu}>
            <Link href="/add-resource" className={styles.addMenuItem} onClick={() => setIsAddMenuOpen(false)}>
              <div className={styles.addMenuIcon} style={{ background: '#024A94' }}>
                <ResourceIcon />
              </div>
              <div className={styles.addMenuText}>
                <strong>Resource</strong>
                <p>Upload pdf, videos, links etc</p>
              </div>
            </Link>
            <Link href="/add-pathway" className={styles.addMenuItem} onClick={() => setIsAddMenuOpen(false)}>
              <div className={styles.addMenuIcon} style={{ background: '#02a1d3' }}>
                <PathwayIcon />
              </div>
              <div className={styles.addMenuText}>
                <strong>Pathway</strong>
                <p>Organize your process and docs in one place</p>
              </div>
            </Link>
            <Link href="/add-hub" className={styles.addMenuItem} onClick={() => setIsAddMenuOpen(false)}>
              <div className={styles.addMenuIcon} style={{ background: '#2ab234' }}>
                <HubIcon />
              </div>
              <div className={styles.addMenuText}>
                <strong>Hub</strong>
                <p>Organize related resources and pathways into hubs</p>
              </div>
            </Link>
          </div>
        )}
      </div>

      <div className={styles.shareCard}>
        <h4 className={styles.shareTitle}>Share My Link</h4>
        <p className={styles.shareDesc}>
          Share your profile on your socials
        </p>
        <button className={styles.shareLinkBox} onClick={() => alert('Link copied!')}>
          <span className={styles.shareLinkText}>resourcefull.co/adaeze</span>
          <CopyIcon />
        </button>
      </div>

      <div className={styles.bottomNav}>
        {/* <div className="hide">
          <ShareIcon />
        </div> */}
        <Link
          href="/wallet"
          className={`${styles.navLink} ${pathname === '/wallet' ? styles.navLinkActive : ''}`}
        >
          <div className={styles.navLinkInner}>
            <WalletIcon />
            <span className={styles.navLinkText}>Wallet</span>
          </div>
          <span className={styles.badge}>10</span>
        </Link>
        <Link href="/settings" className={`${styles.navLink} ${pathname === '/settings' ? styles.navLinkActive : ''}`}>
          <div className={styles.navLinkInner}>
            <SettingsIcon />
            <span className={styles.navLinkText}>Settings</span>
          </div>
        </Link>
        <Link href="/help" className={styles.navLink}>
          <div className={styles.navLinkInner}>
            <HelpIcon />
            <span className={styles.navLinkText}>Help</span>
          </div>
        </Link>
      </div>
    </aside>
  );
}
