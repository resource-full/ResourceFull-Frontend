"use client";

import Image from "next/image";
import Link from "next/link";
import FilterDropdown, { FilterOption } from "@/app/components/ui/FilterDropdown";
import { COUNTRIES, SKILLS_OPTIONS } from "@/app/lib/constants/onboarding";
import styles from "./DashboardHeader.module.css";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M5.50099 1.39424C5.45037 1.54035 5.3846 1.68147 5.30436 1.8152L4.24543 3.58008C4.20467 3.64802 4.23037 3.73629 4.30124 3.77173C4.3527 3.79746 4.4169 3.7876 4.45902 3.74548C4.69558 3.50892 5.01722 3.375 5.35282 3.375H5.48851C5.78688 3.375 6.07303 3.25647 6.28401 3.0455L6.68176 3.44324L6.28401 3.04549L6.35225 2.97725C6.52346 2.80605 6.785 2.76361 7.00156 2.87188L7.50024 3.12122C8.1055 3.42386 8.40939 4.11467 8.22348 4.76534L8.06712 5.31261C7.86586 6.01701 7.15755 6.4489 6.43919 6.30523L5.55581 6.12855C5.0896 6.03531 4.61511 6.24521 4.37049 6.6529L4.30344 6.76466C4.23082 6.88569 4.18163 7.0193 4.15842 7.15852L4.15314 7.19019C4.06623 7.71168 4.35415 8.22333 4.84502 8.41968L5.33563 8.61592C6.18986 8.95761 6.75 9.78496 6.75 10.705V11.5836C6.75 11.71 6.85247 11.8125 6.97887 11.8125C7.33724 11.8125 7.66933 11.6245 7.85372 11.3172L8.83968 9.6739C8.94458 9.49906 9 9.29899 9 9.09509V8.78699C9 8.41403 9.14816 8.05635 9.41188 7.79262L9.80963 8.19037L9.41188 7.79262L9.56199 7.64251C9.68749 7.51702 9.6668 7.30808 9.51913 7.20963L9.07908 6.91626C8.64674 6.62804 8.44228 6.09915 8.5683 5.59507C8.73688 4.92074 9.4305 4.52013 10.0988 4.71109L11.0535 4.98385C11.0737 4.98963 11.0955 4.98399 11.1104 4.9691C11.5316 4.54789 12.2417 4.66312 12.5081 5.19592L12.005 5.44748L12.5081 5.19592L13.3181 6.81601C13.365 6.90975 13.4247 6.9964 13.4955 7.0735C13.3699 3.767 10.6497 1.125 7.3125 1.125C6.68146 1.125 6.07335 1.21929 5.50099 1.39424ZM13.3769 8.54737L12.7334 7.90388C12.5624 7.73288 12.4201 7.53543 12.3119 7.31912L11.6357 5.96675C11.3669 6.11327 11.0472 6.15207 10.7444 6.06556L9.78977 5.7928C9.73298 5.77657 9.67403 5.81062 9.65971 5.86792C9.649 5.91076 9.66637 5.95571 9.70311 5.9802L10.1432 6.27357C10.8815 6.76581 10.985 7.81052 10.3575 8.43801L9.95974 8.04026L10.3575 8.43801L10.2074 8.58812C10.1546 8.64086 10.125 8.7124 10.125 8.78699V9.09509C10.125 9.50289 10.0142 9.90302 9.80436 10.2527L8.8184 11.896C8.4307 12.5421 7.73241 12.9375 6.97887 12.9375C6.23115 12.9375 5.625 12.3314 5.625 11.5836V10.705C5.625 10.245 5.34493 9.8313 4.91781 9.66046L4.42721 9.46421C3.44547 9.07152 2.86962 8.04822 3.04345 7.00524L3.04873 6.97357C3.09514 6.69513 3.19352 6.42791 3.33876 6.18585L3.40582 6.07409C3.89504 5.25871 4.84402 4.83891 5.77644 5.0254L6.65982 5.20207C6.80349 5.23081 6.94515 5.14443 6.9854 5.00355L7.14177 4.45628C7.17895 4.32614 7.11817 4.18798 6.99712 4.12745L6.84 4.04889C6.45255 4.33999 5.97878 4.5 5.48851 4.5H5.35282C5.31665 4.5 5.28085 4.51465 5.25452 4.54098C4.87144 4.92406 4.28452 5.02115 3.79813 4.77796C3.14112 4.44945 2.90283 3.63115 3.28076 3.00127L3.71497 2.27757C2.14655 3.4003 1.125 5.23753 1.125 7.3125C1.125 10.7298 3.89524 13.5 7.3125 13.5C10.3066 13.5 12.8049 11.3728 13.3769 8.54737ZM4.84621 0.426501C5.61747 0.150238 6.44806 0 7.3125 0C11.3511 0 14.625 3.27392 14.625 7.3125C14.625 7.69681 14.5953 8.07457 14.538 8.44351C13.994 11.9452 10.9667 14.625 7.3125 14.625C3.27392 14.625 0 11.3511 0 7.3125C0 4.13849 2.02191 1.43816 4.84621 0.426501Z" fill="#707070" />
  </svg>

);

const BriefcaseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.6875 5.34375C1.6875 4.87776 2.06526 4.5 2.53125 4.5H7.03125C7.49724 4.5 7.875 4.87776 7.875 5.34375V8.15625C7.875 8.62224 7.49724 9 7.03125 9H2.53125C2.06526 9 1.6875 8.62224 1.6875 8.15625V5.34375Z" stroke="#707070" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.6875 6.46875C10.6875 6.00276 11.0653 5.625 11.5312 5.625H15.4688C15.9347 5.625 16.3125 6.00276 16.3125 6.46875V12.6562C16.3125 13.1222 15.9347 13.5 15.4688 13.5H11.5312C11.0653 13.5 10.6875 13.1222 10.6875 12.6562V6.46875Z" stroke="#707070" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.8125 12.0938C2.8125 11.6278 3.19026 11.25 3.65625 11.25H7.59375C8.05974 11.25 8.4375 11.6278 8.4375 12.0938V13.7812C8.4375 14.2472 8.05974 14.625 7.59375 14.625H3.65625C3.19026 14.625 2.8125 14.2472 2.8125 13.7812V12.0938Z" stroke="#707070" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.1875 10.6124V13.8C15.1875 14.6208 14.5973 15.3269 13.7836 15.435C12.2186 15.6428 10.6218 15.75 9 15.75C7.37818 15.75 5.7814 15.6428 4.21638 15.435C3.40267 15.3269 2.8125 14.6208 2.8125 13.8V10.6124M2.8125 10.6124C2.95771 10.7362 3.12738 10.8339 3.31716 10.897C5.10352 11.4909 7.01421 11.8125 9.00002 11.8125C10.9858 11.8125 12.8965 11.4909 14.6828 10.897C14.8726 10.8339 15.0423 10.7362 15.1875 10.6124C15.5414 10.3107 15.75 9.85416 15.75 9.36666V6.52927C15.75 5.71856 15.1741 5.01811 14.3723 4.89814C13.5283 4.77185 12.6746 4.67486 11.8125 4.60824C10.8844 4.53653 9.94648 4.5 9 4.5C8.05353 4.5 7.11558 4.53653 6.1875 4.60824M2.8125 10.6124C2.45856 10.3107 2.25 9.85415 2.25 9.36665V6.52927C2.25 5.71856 2.82593 5.01811 3.62771 4.89815C4.47175 4.77185 5.32537 4.67486 6.1875 4.60824M11.8125 4.60824V3.9375C11.8125 3.00552 11.057 2.25 10.125 2.25H7.875C6.94302 2.25 6.1875 3.00552 6.1875 3.9375V4.60824M9 9.5625H9.00562V9.56812H9V9.5625Z" stroke="#707070" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

);

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const DocumentIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const PathwayLineIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <polyline points="16 6 12 2 8 6" />
    <line x1="12" y1="2" x2="12" y2="15" />
  </svg>
);

const BookmarkIconSmall = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const CommentIconSmall = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TrackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M17.756 7.31264C17.9292 6.86149 18.4353 6.63615 18.8865 6.80933L25.8179 9.47008C26.2691 9.64326 26.4944 10.1494 26.3213 10.6005L23.6605 17.532C23.4873 17.9832 22.9812 18.2085 22.5301 18.0353C22.0789 17.8621 21.8536 17.356 22.0267 16.9049L23.9305 11.9455L22.6629 12.5099C19.8008 13.7842 17.6209 15.9551 16.3042 18.5457C16.1772 18.7955 15.9383 18.9694 15.6615 19.0134C15.3847 19.0574 15.1036 18.9661 14.9054 18.768L10.5 14.3625L3.24372 21.6188C2.90201 21.9605 2.34799 21.9605 2.00628 21.6188C1.66457 21.2771 1.66457 20.7231 2.00628 20.3814L9.88128 12.5064C10.0454 12.3423 10.2679 12.2501 10.5 12.2501C10.7321 12.2501 10.9546 12.3423 11.1187 12.5064L15.3257 16.7133C16.8431 14.2387 19.0996 12.1808 21.9511 10.9112L23.2187 10.3468L18.2593 8.4431C17.8082 8.26991 17.5828 7.76379 17.756 7.31264Z" fill="#023B76" />
  </svg>
)

const EXPERIENCE_OPTIONS: FilterOption[] = [
  { value: "under-graduate", label: "Undergraduate" },
  { value: "recent-graduate", label: "Recent graduate (0-2 years)" },
  { value: "experienced-level", label: "Experienced level (3-6 years)" },
  { value: "professional", label: "Professional (above 6 years)" },
];

export interface DashboardFilters {
  searchQuery: string;
  worldwide: string[];
  industry: string[];
  experience: string[];
}

interface DashboardHeaderProps {
  filters: DashboardFilters;
  onFiltersChange: (newFilters: DashboardFilters) => void;
}

export default function DashboardHeader({ filters, onFiltersChange }: DashboardHeaderProps) {
  const [isNotifOpen, setIsNotifOpen] = React.useState(false);
  const notifRef = React.useRef<HTMLDivElement>(null);

  const pathname = usePathname()

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, searchQuery: e.target.value });
  };

  const setWorldwide = (val: string[]) => onFiltersChange({ ...filters, worldwide: val });
  const setIndustry = (val: string[]) => onFiltersChange({ ...filters, industry: val });
  const setExperience = (val: string[]) => onFiltersChange({ ...filters, experience: val });

  const renderPill = (
    categoryOptions: FilterOption[],
    selectedVals: string[],
    onClear: (val: string) => void
  ) => {
    return selectedVals.map(val => {
      const option = categoryOptions.find(o => o.value === val);
      if (!option) return null;
      return (
        <div key={val} className={styles.filterPill}>
          {option.icon && <span className={styles.pillIcon}>{option.icon}</span>}
          {option.label}
          <button className={styles.pillClose} onClick={() => onClear(val)}>
            <CloseIcon />
          </button>
        </div>
      );
    });
  };

  return (
    <div className={styles.header}>
      {/* Mobile Logo */}
      <Link href="/" className={styles.mobileLogo}>
        <Image src="/assets/resourcefull-logo-2.png" alt="Resourcefull Logo" width={120} height={21} style={{ height: 'auto' }} priority />
      </Link>

      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}><SearchIcon /></span>
          <input
            type="text"
            placeholder="Search Resourcefull"
            className={styles.searchInput}
            value={filters.searchQuery}
            onChange={handleSearch}
          />
          <button className={styles.searchBtn}>Search</button>
        </div>

        <div className={styles.filterPillsContainer}>
          {filters.worldwide.length > 0
            ? renderPill(COUNTRIES, filters.worldwide, (val) => setWorldwide(filters.worldwide.filter(v => v !== val)))
            : <FilterDropdown label="Worldwide" icon={<GlobeIcon />} options={COUNTRIES.filter(c => c.value !== 'worldwide')} selectedValues={filters.worldwide} onChange={setWorldwide} enableSearch />
          }

          {filters.industry.length > 0
            ? renderPill(SKILLS_OPTIONS, filters.industry, (val) => setIndustry(filters.industry.filter(v => v !== val)))
            : <FilterDropdown label="Industry" icon={<BriefcaseIcon />} options={SKILLS_OPTIONS} selectedValues={filters.industry} onChange={setIndustry} enableSearch />
          }

          {filters.experience.length > 0
            ? renderPill(EXPERIENCE_OPTIONS, filters.experience, (val) => setExperience(filters.experience.filter(v => v !== val)))
            : <FilterDropdown label="Experience" icon={<UserIcon />} options={EXPERIENCE_OPTIONS} selectedValues={filters.experience} onChange={setExperience} />
          }
        </div>
      </div>

      <div className={styles.userSection}>
        {
          pathname === "/wallet" ? <TrackIcon /> : (
            <div></div>
          )
        }
        <div className={styles.bellWrapper} ref={notifRef}>
          <button
            className={styles.bellBtn}
            aria-label="Notifications"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
          >
            <BellIcon />
          </button>

          {isNotifOpen && (
            <div className={styles.notificationsDropdown}>
              <div className={styles.notifHeader}>
                <div className={styles.notifTitleGroup}>
                  <h3 className={styles.notifTitle}>Notifications</h3>
                  <span className={styles.notifBadge}>16</span>
                </div>
                <button className={styles.notifMarkRead}>Mark all read</button>
              </div>

              <div className={styles.notifList}>
                <div className={styles.notifItem}>
                  <div className={styles.notifIcon}>OM</div>
                  <div className={styles.notifTextGroup}>
                    <div className={styles.notifText}>
                      <strong>Abisola</strong> uploaded a new resource - The Road to Resourcefull
                    </div>
                    <div className={styles.notifTime}>2 minutes ago</div>
                  </div>
                  <div className={styles.notifRightIcon}><DocumentIcon /></div>
                </div>

                <div className={styles.notifItem}>
                  <div className={styles.notifIcon}>OM</div>
                  <div className={styles.notifTextGroup}>
                    <div className={styles.notifText}>
                      <strong>Jude</strong> uploaded a new resource - The Road to Resourcefull
                    </div>
                    <div className={styles.notifTime}>2 minutes ago</div>
                  </div>
                  <div className={styles.notifRightIcon}><DocumentIcon /></div>
                </div>

                <div className={styles.notifItem}>
                  <div className={styles.notifIcon}>OM</div>
                  <div className={styles.notifTextGroup}>
                    <div className={styles.notifText}>
                      <strong>Promise</strong> uploaded a new pathway - The Road to Resourcefull
                    </div>
                    <div className={styles.notifTime}>2 minutes ago</div>
                  </div>
                  <div className={styles.notifRightIcon}><PathwayLineIcon /></div>
                </div>

                <div className={styles.notifItem}>
                  <div className={styles.notifIcon}>OM</div>
                  <div className={styles.notifTextGroup}>
                    <div className={styles.notifText}>
                      <strong>Ebi</strong> saved your resource
                    </div>
                    <div className={styles.notifTime}>2 minutes ago</div>
                  </div>
                  <div className={styles.notifRightIcon}><BookmarkIconSmall /></div>
                </div>

                <div className={styles.notifItem}>
                  <div className={styles.notifIcon}>OM</div>
                  <div className={styles.notifTextGroup}>
                    <div className={styles.notifText}>
                      <strong>Abisola</strong> commented on your resource - The Road to Resourcefull
                    </div>
                    <div className={styles.notifTime}>2 minutes ago</div>
                  </div>
                  <div className={styles.notifRightIcon}><CommentIconSmall /></div>
                </div>

                <div className={styles.notifItem}>
                  <div className={styles.notifIcon}>OM</div>
                  <div className={styles.notifTextGroup}>
                    <div className={styles.notifText}>
                      <strong>Jide</strong> uploaded a new resource - The Road to Resourcefull
                    </div>
                    <div className={styles.notifTime}>2 minutes ago</div>
                  </div>
                  <div className={styles.notifRightIcon}><DocumentIcon /></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Link href="/profile">
          <Image
            src="https://i.pravatar.cc/150?img=47"
            alt="User Profile"
            width={40}
            height={40}
            className={styles.avatar}
            unoptimized
          />
        </Link>
      </div>
    </div>
    // </div>
  );
}
