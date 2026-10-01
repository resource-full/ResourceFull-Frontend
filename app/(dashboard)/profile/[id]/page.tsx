"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { userAPI } from "@/app/lib/api/user";
import { formatPrice } from "@/app/hooks/useDashboardData";
import styles from "./page.module.css";

type Tab = "resources" | "pathways" | "hubs" | "experiences";
type ItemType = "resource" | "pathway" | "hub";

type ProfileRecord = {
  id?: string;
  _id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  shortDescription?: string;
  currentRole?: string;
  position?: string;
  stats?: Record<string, number>;
  socials?: Record<string, string>;
  createdResources?: Record<string, unknown>[];
  resources?: Record<string, unknown>[];
  pathways?: Record<string, unknown>[];
  createdPathways?: Record<string, unknown>[];
  hubs?: Record<string, unknown>[];
  createdHubs?: Record<string, unknown>[];
  experiences?: Record<string, unknown>[];
  linkedExperiences?: Record<string, unknown>[];
};

type DisplayItem = {
  id: string;
  type: ItemType;
  title: string;
  description: string;
  price: string;
  tags: string[];
  image: string;
  countOne: string;
  countTwo: string;
  accent: "blue" | "orange" | "green";
};

const fallbackProfile: ProfileRecord = {
  name: "Stella Della",
  currentRole: "Frontend Development",
  email: "adaeze.builds@resourcefull.co",
  avatar: "/assets/9fa8a96b7774ec94ca80cf93ebd4ece37578f603.jpg",
  coverImage: "/assets/about-backstory.png",
  bio: "Senior PM at Google Lagos · Building career resources for ambitious Africans. Previously Paystack, Andela.",
  stats: { followers: 0, following: 0, totalCreated: 23, totalSold: 0, avgRelevancyScore: 96 },
};

const fallbackItems: DisplayItem[] = [
  { id: "resource-1", type: "resource", title: "Graphic Designer 80% winning rate CV", description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume.", price: "$120", tags: ["Design", "CV"], image: "/assets/pdf1.png", countOne: "2.5k", countTwo: "16", accent: "blue" },
  { id: "resource-2", type: "resource", title: "Graphic Designer 80% winning rate CV", description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume.", price: "Free", tags: ["Design", "CV"], image: "/assets/pdf.png", countOne: "2.5k", countTwo: "16", accent: "orange" },
  { id: "resource-3", type: "resource", title: "Graphic Designer 80% winning rate CV", description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume.", price: "$120", tags: ["Design", "CV"], image: "/assets/pdf1.png", countOne: "2.5k", countTwo: "16", accent: "blue" },
  { id: "resource-4", type: "resource", title: "Graphic Designer 80% winning rate CV", description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume.", price: "Free", tags: ["Design", "CV"], image: "/assets/pdf.png", countOne: "2.5k", countTwo: "16", accent: "orange" },
  { id: "resource-5", type: "resource", title: "Graphic Designer 80% winning rate CV", description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume.", price: "$120", tags: ["Design", "CV"], image: "/assets/pdf1.png", countOne: "2.5k", countTwo: "16", accent: "blue" },
  { id: "resource-6", type: "resource", title: "Graphic Designer 80% winning rate CV", description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume.", price: "Free", tags: ["Design", "CV"], image: "/assets/pdf.png", countOne: "2.5k", countTwo: "16", accent: "orange" },
  { id: "pathway-1", type: "pathway", title: "Become a Full Stack Developer in 3 Months", description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume.", price: "$120", tags: ["Design", "CV"], image: "/assets/pdf1.png", countOne: "20 Resources", countTwo: "16", accent: "blue" },
  { id: "pathway-2", type: "pathway", title: "Become a Full Stack Developer in 3 Months", description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume.", price: "Free", tags: ["Design", "CV"], image: "/assets/pdf.png", countOne: "20 Resources", countTwo: "16", accent: "orange" },
  { id: "pathway-3", type: "pathway", title: "Become a Full Stack Developer in 3 Months", description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume.", price: "$120", tags: ["Design", "CV"], image: "/assets/pdf1.png", countOne: "20 Resources", countTwo: "16", accent: "blue" },
  { id: "pathway-4", type: "pathway", title: "Become a Full Stack Developer in 3 Months", description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume.", price: "Free", tags: ["Design", "CV"], image: "/assets/pdf.png", countOne: "20 Resources", countTwo: "16", accent: "orange" },
  { id: "hub-1", type: "hub", title: "Become a Full Stack Developer in 3 Months", description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume.", price: "$120", tags: ["Design", "CV"], image: "/assets/pdf1.png", countOne: "20", countTwo: "16", accent: "green" },
  { id: "hub-2", type: "hub", title: "Become a Full Stack Developer in 3 Months", description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume.", price: "Free", tags: ["Design", "CV"], image: "/assets/pdf.png", countOne: "20", countTwo: "16", accent: "green" },
  { id: "hub-3", type: "hub", title: "Become a Full Stack Developer in 3 Months", description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume.", price: "$120", tags: ["Design", "CV"], image: "/assets/pdf1.png", countOne: "20", countTwo: "16", accent: "green" },
  { id: "hub-4", type: "hub", title: "Become a Full Stack Developer in 3 Months", description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume.", price: "Free", tags: ["Design", "CV"], image: "/assets/pdf.png", countOne: "20", countTwo: "16", accent: "green" },
  { id: "hub-5", type: "hub", title: "Become a Full Stack Developer in 3 Months", description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume.", price: "$120", tags: ["Design", "CV"], image: "/assets/pdf1.png", countOne: "20", countTwo: "16", accent: "green" },
  { id: "hub-6", type: "hub", title: "Become a Full Stack Developer in 3 Months", description: "Our Graphic Design CV Resource offers customizable templates, expert tips, and portfolio examples to help you create a standout resume.", price: "Free", tags: ["Design", "CV"], image: "/assets/pdf.png", countOne: "20", countTwo: "16", accent: "green" },
];

const value = (record: Record<string, unknown>, key: string): unknown => record[key];
const text = (record: Record<string, unknown>, keys: string[], fallback = ""): string => {
  for (const key of keys) {
    const result = value(record, key);
    if (typeof result === "string" && result.trim()) return result;
  }
  return fallback;
};
const numberText = (record: Record<string, unknown>, keys: string[], fallback = "0"): string => {
  for (const key of keys) {
    const result = value(record, key);
    if (typeof result === "number" || typeof result === "string") return String(result);
  }
  return fallback;
};

function mapItems(profile: ProfileRecord): DisplayItem[] {
  const source = [
    ...(profile.createdResources ?? profile.resources ?? []).map((item, index) => ({ item, type: "resource" as const, index })),
    ...(profile.createdPathways ?? profile.pathways ?? []).map((item, index) => ({ item, type: "pathway" as const, index })),
    ...(profile.createdHubs ?? profile.hubs ?? []).map((item, index) => ({ item, type: "hub" as const, index })),
  ];

  return source.map(({ item, type, index }) => {
    const rawPrice = value(item, "price");
    const free = value(item, "isFree") === true || rawPrice === 0 || rawPrice === "0";
    const tags = value(item, "tags");
    const itemTags = Array.isArray(tags) ? tags.filter((tag): tag is string => typeof tag === "string").slice(0, 2) : ["Design", "CV"];
    return {
      id: text(item, ["_id", "id"], `${type}-${index}`),
      type,
      title: text(item, ["name", "title"], type === "resource" ? "Graphic Designer 80% winning rate CV" : "Become a Full Stack Developer in 3 Months"),
      description: text(item, ["description", "shortDescription"], "A practical resource built to help you make confident progress."),
      price: free ? "Free" : formatPrice(false, typeof rawPrice === "number" || typeof rawPrice === "string" ? rawPrice : 0, text(item, ["currency"], "$")),
      tags: itemTags,
      image: text(item, ["coverPhoto", "thumbnail", "image"], index % 2 ? "/assets/pdf.png" : "/assets/pdf1.png"),
      countOne: type === "pathway" ? `${numberText(item, ["resourceCount", "blockCount"], "20")} Resources` : numberText(item, ["viewCount", "downloadCount"], type === "hub" ? "20" : "2.5k"),
      countTwo: numberText(item, ["commentCount", "ratingCount", "saveCount"], "16"),
      accent: type === "resource" ? (index % 2 ? "orange" : "blue") : type === "pathway" ? (index % 2 ? "orange" : "blue") : "green",
    };
  });
}

function Icon({ name }: { name: "resource" | "pathway" | "hub" | "bookmark" | "link" | "instagram" | "linkedin" | "facebook" | "x" | "bell" }) {
  const common = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "resource") return <svg {...common}><path d="M6 3h9l3 3v15H6z" /><path d="M15 3v4h4M9 12h6M9 16h6M9 8h2" /></svg>;
  if (name === "pathway") return <svg {...common}><path d="M5 5h8a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h6" /><circle cx="17" cy="17" r="2" /></svg>;
  if (name === "hub") return <svg {...common}><path d="M4 7h6l2 2h8v10H4z" /><path d="M4 7V5h6l2 2" /></svg>;
  if (name === "bookmark") return <svg {...common}><path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v17l-6-3-6 3z" /></svg>;
  if (name === "link") return <svg {...common}><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" /><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 7 20l1.1-1.1" /></svg>;
  if (name === "instagram") return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" /></svg>;
  if (name === "linkedin") return <svg {...common}><path d="M5 8v11M5 5v.1M9 19v-6a4 4 0 0 1 8 0v6M9 10v9" /></svg>;
  if (name === "facebook") return <svg {...common}><path d="M14 21v-8h3l.5-3H14V8.2c0-.9.3-1.5 1.6-1.5H18V4.1c-.4-.1-1.3-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2V10H9v3h2.5v8" /></svg>;
  if (name === "x") return <svg {...common}><path d="m5 4 14 16M19 4 5 20" /></svg>;
  return <svg {...common}><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></svg>;
}

function ResourceCard({ item, profile }: { item: DisplayItem; profile: ProfileRecord }) {
  return (
    <Link href={`/${item.type}s/${item.id}`} className={`${styles.card} ${styles[item.accent]}`}>
      <div className={styles.cardTopLine} />
      <div className={styles.cardAuthor}>
        <img src={profile.avatar || fallbackProfile.avatar} alt="" />
        <span>{profile.name || "Stella Della"}</span>
        <Icon name="bookmark" />
      </div>
      <h3>{item.title}</h3>
      <strong>{item.price}</strong>
      <p>{item.description}</p>
      <div className={styles.tagRow}>{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      {item.type === "resource" && <div className={styles.preview}><Image src={item.image} alt="" fill sizes="250px" /></div>}
      {item.type === "pathway" && <div className={styles.pathwayPreview}><span>Intro</span><i /> <span>Tools</span><i /><span>Projects</span><i /><span>CV Template</span></div>}
      {item.type === "hub" && <div className={styles.hubPreview}><div><Icon name="resource" /> {item.countOne}</div><div><Icon name="pathway" /> {item.countTwo}</div></div>}
      <div className={styles.cardFooter}><span><b className={styles.avatarDot} /> <b className={styles.avatarDotAlt} /> {item.type === "resource" ? item.countOne : "2.5k"}</span><span>{item.countTwo} <span className={styles.rs}>70% C.S</span></span></div>
    </Link>
  );
}

function ExperienceCard({ experience }: { experience: Record<string, unknown> }) {
  return <article className={styles.experienceCard}><h3>{text(experience, ["role", "title", "position"], "Senior Product Manager")}</h3><p>{text(experience, ["company", "organization"], "Google")} · {text(experience, ["type", "employmentType"], "Fulltime")}</p><p>{text(experience, ["duration", "dateRange"], "Jan 2023 - Present · 1yr 4 mos")}</p><p>{text(experience, ["location", "country"], "Nigeria")}</p><hr /><strong>Linked Resources ({numberText(experience, ["resourceCount"], "2")})</strong><div>{[1, 2, 3].map((entry) => <span key={entry}>PM CV — Lagos tech market</span>)}</div></article>;
}

export default function PublicProfilePage() {
  const params = useParams<{ id: string }>();
  const [profile, setProfile] = useState<ProfileRecord>(fallbackProfile);
  const [activeTab, setActiveTab] = useState<Tab>("resources");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    const fetchProfile = async () => {
      try {
        const response = await userAPI.getPublicProfile(params.id) as { success?: boolean; data?: ProfileRecord };
        if (response.success && response.data) setProfile({ ...fallbackProfile, ...response.data });
      } catch {
        setProfile(fallbackProfile);
      }
    };
    fetchProfile();
  }, [params.id]);

  const items = useMemo(() => {
    const mapped = mapItems(profile);
    return mapped.length ? mapped : fallbackItems;
  }, [profile]);
  const experiences = profile.linkedExperiences ?? profile.experiences ?? [];
  const stats = profile.stats ?? {};
  const displayName = profile.name || `${profile.firstName ?? "Stella"} ${profile.lastName ?? "Della"}`;
  const username = profile.email ? `@${profile.email.split("@")[0]}` : "@adaeze.builds";
  const tabItems: { id: Tab; label: string; count: number; icon: "resource" | "pathway" | "hub" }[] = [
    { id: "resources", label: "Resources", count: items.filter((item) => item.type === "resource").length || 245, icon: "resource" },
    { id: "pathways", label: "Pathways", count: items.filter((item) => item.type === "pathway").length || 15, icon: "pathway" },
    { id: "hubs", label: "Hubs", count: items.filter((item) => item.type === "hub").length || 7, icon: "hub" },
  ];

  const copyProfile = async () => {
    await navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return <div className={styles.page}>
    <div className={styles.profileHero}>
      <div className={styles.cover} style={{ backgroundImage: `url(${profile.coverImage || fallbackProfile.coverImage})` }} />
      <div className={styles.profileBody}>
        <div className={styles.identityRow}>
          <img className={styles.avatar} src={profile.avatar || fallbackProfile.avatar} alt={displayName} />
          <div className={styles.identity}><div className={styles.nameRow}><h1>{displayName}</h1><span>{profile.currentRole || profile.position || "Frontend Development"}</span></div><b>{username}</b><p>{profile.bio || profile.shortDescription || fallbackProfile.bio}</p></div>
          <div className={styles.profileActions}><div className={styles.socials}>{(["instagram", "x", "linkedin", "facebook"] as const).map((social) => <a key={social} href={profile.socials?.[social] || "#"} aria-label={social}><Icon name={social} /></a>)}</div><button onClick={copyProfile}><Icon name="link" />{copied ? "Copied" : "Copy profile link"}</button></div>
        </div>
        <div className={styles.stats}><div><strong>~ {stats.avgRelevancyScore ?? 96}%</strong><span>Avg. Confidence Score</span></div><div><strong>{stats.totalCreated ?? 23}</strong><span>Total Created</span></div><div><strong>{experiences.length || 17}</strong><span>Linked Experience</span></div></div>
      </div>
    </div>

    <div className={styles.tabsBar}><div className={styles.tabs}>{tabItems.map((tab) => <button key={tab.id} className={activeTab === tab.id ? styles.activeTab : ""} onClick={() => setActiveTab(tab.id)}><Icon name={tab.icon} />{tab.label}<b>{tab.count}</b></button>)}</div><button className={activeTab === "experiences" ? styles.experienceActive : styles.experienceButton} onClick={() => setActiveTab("experiences")}>Linked Experiences <b>{experiences.length || 15}</b></button></div>

    <section className={styles.content}>{activeTab === "experiences" ? <div className={styles.experienceGrid}>{(experiences.length ? experiences : Array.from({ length: 6 }, (_, index) => ({ id: String(index) }))).map((experience, index) => <ExperienceCard key={String(experience.id ?? index)} experience={experience} />)}</div> : <div className={`${styles.cardGrid} ${styles[`${activeTab}Grid`]}`}>{items.filter((item) => item.type === activeTab.slice(0, -1)).map((item) => <ResourceCard key={item.id} item={item} profile={profile} />)}</div>}</section>
  </div>;
}
