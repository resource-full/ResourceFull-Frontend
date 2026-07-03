"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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

const AnalyticsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.577 4.87638C12.6842 4.47628 13.0955 4.23885 13.4956 4.34605L18.2766 5.62714C18.4688 5.67863 18.6326 5.80432 18.732 5.97659C18.8315 6.14885 18.8585 6.35357 18.807 6.5457L17.5259 11.3268C17.4187 11.7269 17.0074 11.9643 16.6073 11.8571C16.2072 11.7499 15.9698 11.3387 16.077 10.9386L16.8865 7.91754C14.6303 9.3077 12.7541 11.0881 11.2935 13.1203C11.1651 13.299 10.9646 13.4122 10.7452 13.4301C10.5259 13.4479 10.3098 13.3685 10.1542 13.2129L7 10.0587L2.28033 14.7784C1.98744 15.0713 1.51256 15.0713 1.21967 14.7784C0.926777 14.4855 0.926777 14.0106 1.21967 13.7177L6.46967 8.46773C6.76256 8.17483 7.23744 8.17483 7.53033 8.46773L10.6039 11.5413C12.1049 9.62855 13.9633 7.94865 16.1492 6.61002L13.1073 5.79494C12.7072 5.68774 12.4698 5.27648 12.577 4.87638Z" fill="#0F172A" />
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

const ColoredFacebookIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_3265_56680)">
      <path d="M44 22C44 9.84984 34.1502 0 22 0C9.84984 0 0 9.84984 0 22C0 32.3171 7.10336 40.9746 16.6857 43.3523V28.7232H12.1493V22H16.6857V19.103C16.6857 11.6151 20.0746 8.1444 27.4261 8.1444C28.82 8.1444 31.225 8.41808 32.2089 8.69088V14.7849C31.6897 14.7303 30.7877 14.703 29.6674 14.703C26.0603 14.703 24.6664 16.0697 24.6664 19.6222V22H31.8525L30.6178 28.7232H24.6664V43.839C35.5599 42.5234 44.0009 33.2482 44.0009 22H44Z" fill="#0866FF" />
      <path d="M30.617 28.7194L31.8516 21.9962H24.6656V19.6185C24.6656 16.0659 26.0595 14.6993 29.6666 14.6993C30.7868 14.6993 31.6888 14.7265 32.208 14.7811V8.6871C31.2242 8.41342 28.8192 8.14062 27.4252 8.14062C20.0737 8.14062 16.6848 11.6113 16.6848 19.0993V21.9962H12.1484V28.7194H16.6848V43.3485C18.3868 43.7709 20.167 43.9962 21.9992 43.9962C22.9012 43.9962 23.7908 43.9408 24.6647 43.8352V28.7194H30.6161H30.617Z" fill="white" />
    </g>
    <defs>
      <clipPath id="clip0_3265_56680">
        <rect width="44" height="44" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const ColoredWhatsappIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <rect width="44" height="44" fill="url(#pattern0_3265_45436)" />
    <defs>
      <pattern id="pattern0_3265_45436" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_3265_45436" transform="scale(0.0104167)" />
      </pattern>
      <image id="image0_3265_45436" width="96" height="96" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
    </defs>
  </svg>
);

const ColoredInstagramIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <rect width="44" height="44" fill="url(#pattern0_3265_43122)" />
    <defs>
      <pattern id="pattern0_3265_43122" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_3265_43122" transform="scale(0.0104167)" />
      </pattern>
      <image id="image0_3265_43122" width="96" height="96" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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" />
    </defs>
  </svg>
);

const ColoredXIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.5969 3.49219H39.7816L26.2698 18.9353L42.1654 39.9498H29.7193L19.9711 27.2046L8.81693 39.9498H2.62849L17.0807 23.4317L1.83203 3.49219H14.5941L23.4056 15.1418L33.5969 3.49219ZM31.4263 36.2479H34.8533L12.7319 6.9996H9.05438L31.4263 36.2479Z" fill="black" />
  </svg>
);

const ColoredEmailIcon = () => (
  <svg width="44" height="76" viewBox="0 0 44 76" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <rect y="-10" width="44" height="96" fill="url(#pattern0_3265_44872)" />
    <defs>
      <pattern id="pattern0_3265_44872" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_3265_44872" transform="matrix(0.0104167 0 0 0.00477431 0 0.270833)" />
      </pattern>
      <image id="image0_3265_44872" width="96" height="96" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAE9klEQVR4nO2cT0gcVxjAx/5Jm56btBBjShDmbZgxCc7oPlMbWtpAWMWFIJReCqXtyWDopU0JSaBtzDXHHnvtQYUYlZo6U3U2FEKTQgilRzMvf6q2BgNNZrO+8jRbxomu+2be7pud+X7wgafdj+/n/tZ/qCgAAAAAAAAAAAAAAAAAAAAAAADPKDQ373QQ+txBaMJByC2oatFR1UUHoVkHoa+c/ft3KymBOm27PUs7XbS1Wc/WFz1bK3q25nqWNv7E0j+jhexOoU9YUNVeB6E7BYTolqOqKwWETlFFaVISCqVKk2fppzxbe1S0dbrVeJY+X5zWckKetKCqJx2EShWP7xv2Cplpbd2lJAw6c2iXZ2sTlQ4fkFDyLG1AxGd+1cf3SXDnMpluJSF4tt7NElPt8f0SQr8SrH37XnVUdZ73+L556qjqeaooLyiNnBxbH/QszeM9/v8SbM2l19tf435y9oYb4fgNnyTKmZxK88TSP+VewEFoXISAZ0NIV0fDJIl0dXR7lkZEHH/9VaCPcS/BjiZQAHWzxlOCzVgniSpKE8HGIMFm6ORs9VUR9zKOqnoiBRBsrk/W+PmBab6pxAzS3v66i83x8p5iBWge90Iij79BADapi437btZ4X4kJd7H5DsGG699RpAA2sRKwJiEGSaK+5AT3S7wA2UkigeSkVwCuf5I2S06qBZA6JalSclIvgNQ4SdslBwTg2iWpmuTETsCVw0f+kCWACEoST3JqKeCv6YO3uZd/68I8/fLEueU5lFmVIYBETBJvcmohwLP01alJTPKjffyvgJaLhLI5PjhGJw5lS9IEYP4khUmOaAEPrbbHZy8fW+0ZyVM2oQWw0c/fot+/+5E0AaTKJEVJjkgBv0+ZpY9He9cOL0QAG5akLz68QOcyB6QIINskKWpyRAjwbJ2OTnZTlhz/8YUI8Cdp/HCXPAH4+SSJSE5UAUvWQXp27NhzhxcuIGySRB6HrCepSLLG12zWPhb8+DzHv3nVpMHk1FRAmCSJPhCp8URNTs0FbEwSTp2ApW2SUzcB1SYpSQJuVpGcugrYmKTNv3FLggCPIzl1F+BP0k9txr9JE/DPdFuRJznSBJST9MPb+b+TIuD2VeMRb3KkCign6fSJMw/Kf1nXiAI8S1+9MnlkOUxypAsoT+/A8L1ZlFmSfVDCOY+nteVvxj5YiHp46QLYGGd+W3Czxozso5Iqh+36yWhuUdTxpQtgQ/v7X2Q/THOxWYrt4bG56maNS9fb218WefxYCCg/7h3c8Z6LjXsxPP7C3U7jeHnPxApg3O/sfINgcypGyfllPpvd498x0QIYcUiS60tOcL/EC5CdJDeQnNQKkJGkzZKTagH1SlKl5ChpF1DrJG2XnCCpFVCLJFWTnCCpFiAqSTzJCZJ6AVGTxJucICAgQpLCJCcICAiRpCjJCQICOJMUNTlBQABHkkQkJwgI2AZ69OhLLja/Y8M+VgQDAiQDAiQDAiQDAiQDAiQDAiQDAiQDAiQDAiQDAiQTAwHuCgjIi5nh/EPuBVqGyK8gIC9kciN917gXaBkiJ0FAXoyA4Tz/f9BtvfTnK3uHyA0QkI+anxv9P/bvCLVE87fze0RJUBqMHkHHz13ORfs9xYFzt3a0XCQDe4fItShvzEqD0RO+9yu5kb4Cy07oz3wAAAAAAAAAAAAAAAAAAAAAAJQk8R8aBv7q0ZAWyAAAAABJRU5ErkJggg==" />
    </defs>
  </svg>
);

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [addMenuPos, setAddMenuPos] = useState<{ top: number, left: number } | null>(null);
  const addBtnContainerRef = useRef<HTMLDivElement>(null);
  const menuPortalRef = useRef<HTMLDivElement>(null);

  const handleAddClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isAddMenuOpen) {
      const rect = e.currentTarget.getBoundingClientRect();
      setAddMenuPos({
        top: rect.top,
        left: rect.right + 16,
      });
      setIsAddMenuOpen(true);
    } else {
      setIsAddMenuOpen(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const isOutsideBtn = addBtnContainerRef.current && !addBtnContainerRef.current.contains(target);
      const isOutsideMenu = menuPortalRef.current && !menuPortalRef.current.contains(target);

      if (isOutsideBtn && isOutsideMenu) {
        setIsAddMenuOpen(false);
      }
    }
    const handleScrollOrResize = () => setIsAddMenuOpen(false);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleScrollOrResize);
    // Add scroll listener to the main scrollable areas
    const sidebarScroll = document.querySelector(`.${styles.sidebar}`);
    const mainScroll = document.querySelector(`main`);

    sidebarScroll?.addEventListener("scroll", handleScrollOrResize);
    mainScroll?.addEventListener("scroll", handleScrollOrResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleScrollOrResize);
      sidebarScroll?.removeEventListener("scroll", handleScrollOrResize);
      mainScroll?.removeEventListener("scroll", handleScrollOrResize);
    };
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

      <div className={styles.navSection} ref={addBtnContainerRef} style={{ position: 'relative' }}>
        <button
          className={styles.addBtn}
          onClick={handleAddClick}
        >
          <AddIcon />
          <span className={styles.addBtnText}>Add</span>
        </button>

        {isAddMenuOpen && typeof document !== 'undefined' && createPortal(
          <div
            className={styles.addMenu}
            style={addMenuPos ? { top: addMenuPos.top, left: addMenuPos.left } : {}}
            ref={menuPortalRef}
          >
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
          </div>,
          document.body
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
          href="/analytics"
          className={`${styles.navLink} ${pathname === '/analytics' ? styles.navLinkActive : ''}`}
        >
          <div className={styles.navLinkInner}>
            <AnalyticsIcon />
            <span className={styles.navLinkText}>Analytics</span>
          </div>
          <span className={styles.badge}>10</span>
        </Link>
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
        <button
          className={styles.navLink}
          style={{ border: 'none', background: 'transparent', width: '100%', cursor: 'pointer', fontFamily: 'inherit' }}
          onClick={() => setIsHelpOpen(true)}
        >
          <div className={styles.navLinkInner}>
            <HelpIcon />
            <span className={styles.navLinkText}>Help</span>
          </div>
        </button>
      </div>

      {isHelpOpen && typeof document !== 'undefined' && createPortal(
        <div className={styles.helpModalOverlay} onClick={() => setIsHelpOpen(false)}>
          <div className={styles.helpModal} onClick={e => e.stopPropagation()}>
            <h3 className={styles.helpModalTitle}>Need Help?</h3>
            <p className={styles.helpModalSubtitle}>Reach us via these platforms</p>
            <div className={styles.helpOptions}>
              <a href="#" className={styles.helpOptionBtn}>
                <ColoredFacebookIcon /> Message us on Facebook
              </a>
              <a href="#" className={styles.helpOptionBtn}>
                <ColoredWhatsappIcon /> Message us on Whatsapp
              </a>
              <a href="#" className={styles.helpOptionBtn}>
                <ColoredInstagramIcon /> Message us on Instagram
              </a>
              <a href="#" className={styles.helpOptionBtn}>
                <ColoredXIcon /> Message us on Twitter(X)
              </a>
              <a href="#" className={styles.helpOptionBtn}>
                <ColoredEmailIcon /> Send us an Email
              </a>
            </div>
          </div>
        </div>,
        document.body
      )}
    </aside>
  );
}
