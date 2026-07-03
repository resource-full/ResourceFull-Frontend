"use client";

import styles from "./HowItWorks.module.css";

const ConfidenceIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="63" height="63" rx="15.5" fill="#E7FEFE" />
    <rect x="0.5" y="0.5" width="63" height="63" rx="15.5" stroke="#0AB4BB" />
    <path d="M36.3197 37.3805C37.2776 37.3805 38.0542 38.1571 38.0542 39.115C38.0542 40.0729 37.2776 40.8495 36.3197 40.8495H24.2189C23.2609 40.8495 22.4844 40.0729 22.4844 39.115C22.4844 38.157 23.2609 37.3805 24.2189 37.3805H36.3197Z" fill="#0AB4BB" />
    <path d="M41.3616 32.2636C42.3196 32.2636 43.0961 33.0402 43.0962 33.9982C43.0962 34.9561 42.3196 35.7327 41.3616 35.7327H24.2189C23.2609 35.7327 22.4844 34.9561 22.4844 33.9982C22.4844 33.0402 23.261 32.2636 24.2189 32.2636H41.3616Z" fill="#0AB4BB" />
    <path d="M41.376 27.236C42.3339 27.236 43.1105 28.0126 43.1105 28.9705C43.1105 29.9285 42.3339 30.705 41.376 30.705H24.2332C23.2753 30.705 22.4987 29.9285 22.4987 28.9705C22.4987 28.0126 23.2753 27.236 24.2332 27.236H41.376Z" fill="#0AB4BB" />
    <path d="M41.3616 22.1797C42.3196 22.1797 43.0962 22.9563 43.0962 23.9142C43.0962 24.8722 42.3196 25.6487 41.3616 25.6487H24.2189C23.2609 25.6487 22.4844 24.8722 22.4844 23.9142C22.4844 22.9563 23.2609 22.1797 24.2189 22.1797H41.3616Z" fill="#0AB4BB" />
  </svg>
);

const SmartIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="63" height="63" rx="15.5" fill="#E7FEFE" />
    <rect x="0.5" y="0.5" width="63" height="63" rx="15.5" stroke="#0AB4BB" />
    <path fillRule="evenodd" clipRule="evenodd" d="M25.6661 25.6671C24.9666 25.6671 24.3995 26.2342 24.3995 26.9337V29.806C24.7721 29.5904 25.2047 29.4671 25.6661 29.4671H38.3328C38.7942 29.4671 39.2269 29.5904 39.5995 29.806V29.4671C39.5995 28.7675 39.0324 28.2004 38.3328 28.2004H33.7908C33.2869 28.2004 32.8036 28.0002 32.4473 27.6439L30.656 25.8526C30.5372 25.7338 30.3761 25.6671 30.2081 25.6671H25.6661ZM39.5995 32.0004C39.5995 31.3008 39.0324 30.7337 38.3328 30.7337H25.6661C24.9666 30.7337 24.3995 31.3008 24.3995 32.0004V37.0671C24.3995 37.7666 24.9666 38.3337 25.6661 38.3337H38.3328C39.0324 38.3337 39.5995 37.7666 39.5995 37.0671V32.0004ZM40.8661 37.0671C40.8661 38.4662 39.7319 39.6004 38.3328 39.6004H25.6661C24.267 39.6004 23.1328 38.4662 23.1328 37.0671V26.9337C23.1328 25.5346 24.267 24.4004 25.6661 24.4004H30.2081C30.7121 24.4004 31.1953 24.6006 31.5516 24.9569L33.343 26.7482C33.4618 26.867 33.6228 26.9337 33.7908 26.9337H38.3328C39.7319 26.9337 40.8661 28.0679 40.8661 29.4671V37.0671Z" fill="#0F172A" />
  </svg>
);

const MagicIcon = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="63" height="63" rx="15.5" fill="#E7FEFE" />
    <rect x="0.5" y="0.5" width="63" height="63" rx="15.5" stroke="#0AB4BB" />
    <path fillRule="evenodd" clipRule="evenodd" d="M35.7549 23.2539C36.8506 23.2539 37.9014 23.6892 38.6761 24.4639C39.4508 25.2386 39.886 26.2894 39.886 27.385C39.886 28.4806 39.4508 29.5314 38.6761 30.3061C37.9014 31.0808 36.8506 31.5161 35.7549 31.5161H26.7416C26.0444 31.5161 25.3757 31.7931 24.8827 32.2861C24.3896 32.7791 24.1127 33.4478 24.1127 34.145C24.1127 34.8422 24.3897 35.5109 24.8827 36.0039C25.3757 36.4969 26.0444 36.7739 26.7416 36.7739H35.5727C35.8065 36.1155 36.2384 35.5454 36.8089 35.142C37.3794 34.7386 38.0607 34.5216 38.7594 34.5206C39.379 34.5206 39.9868 34.6909 40.5162 35.0129C41.0456 35.335 41.4763 35.7964 41.7611 36.3467C42.046 36.897 42.1741 37.515 42.1314 38.1332C42.0888 38.7514 41.877 39.346 41.5192 39.8519C41.1614 40.3579 40.6715 40.7558 40.1029 41.0021C39.5343 41.2484 38.9089 41.3337 38.2951 41.2485C37.6813 41.1634 37.1027 40.9111 36.6226 40.5194C36.1425 40.1276 35.7793 39.6114 35.5727 39.0272H26.7416C25.4468 39.0272 24.205 38.5129 23.2894 37.5973C22.3738 36.6817 21.8594 35.4399 21.8594 34.145C21.8594 32.8502 22.3738 31.6084 23.2894 30.6928C24.205 29.7772 25.4468 29.2628 26.7416 29.2628H35.7549C36.2529 29.2628 36.7306 29.065 37.0827 28.7129C37.4349 28.3607 37.6326 27.883 37.6326 27.385C37.6326 26.887 37.4349 26.4093 37.0827 26.0572C36.7306 25.7051 36.2529 25.5073 35.7549 25.5073H26.7416C26.4428 25.5073 26.1562 25.3885 25.9449 25.1772C25.7337 24.9659 25.6149 24.6793 25.6149 24.3805C25.6149 24.0817 25.7337 23.7952 25.9449 23.584C26.1562 23.3727 26.4428 23.2539 26.7416 23.2539H35.7549ZM39.1905 36.8597C38.9846 36.7744 38.7581 36.7521 38.5396 36.7956C38.3211 36.839 38.1203 36.9463 37.9627 37.1039C37.8051 37.2614 37.6979 37.4622 37.6544 37.6808C37.6109 37.8993 37.6332 38.1259 37.7185 38.3318C37.8038 38.5376 37.9482 38.7136 38.1334 38.8374C38.3187 38.9612 38.5366 39.0272 38.7594 39.0272C39.0582 39.0272 39.3448 38.9085 39.5561 38.6972C39.7674 38.486 39.886 38.1994 39.886 37.9006C39.886 37.6777 39.82 37.4599 39.6962 37.2746C39.5724 37.0893 39.3964 36.945 39.1905 36.8597Z" fill="#0AB4BB" />
  </svg>
);

const steps = [
  {
    icon: <ConfidenceIcon />,
    badge: "CONFIDENCE SCORES",
    title: "Only fresh resources rise to the top",
    description: "Every resource gets a real-time trust score rated by peers, verified by success stories. Green means worth your time. Stale links stay buried.",
  },
  {
    icon: <SmartIcon />,
    badge: "SMART HUBS",
    title: "Curate and share. Credit stays yours",
    description: "Mix resources from any contributor into your own hub. Share it as one link. Original creators keep their attribution on every asset inside it, automatically.",
  },
  {
    icon: <MagicIcon />,
    badge: "MAGIC PATHWAYS",
    title: "Your exact roadmap.",
    description: "Tell us where you are and where you want to go. Get a step-by-step timeline from your starting point to the exact job you want, with the right resource at every step.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>HOW IT WORKS</span>
          <h2 className={styles.title}>Built for you to<br />actually grow</h2>
          <p className={styles.subtitle}>
            ResourceFull puts every career tool you need in one place — no<br />more hunting across WhatsApp groups and Google Drives.
          </p>
        </div>
        <div className={styles.grid}>
          {steps.map((step, idx) => (
            <div key={idx} className={styles.card}>
              {step.icon}
              <div className="flex flex-col gap-[12px]">
                <h3 className="text-[10px] font-semibold text-[#119DA4]">{step.badge}</h3>
                <h3 className="text-[25px] font-medium text-[#2C2C2C]">{step.title}</h3>
                <p className="text-[16px] font-normal text-[#707070]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
