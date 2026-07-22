"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

// --- Icons ---
const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_2721_42836)">
      <path d="M10 1.80078C12.6719 1.80078 12.9883 1.8125 14.0391 1.85937C15.0156 1.90234 15.543 2.06641 15.8945 2.20313C16.3594 2.38281 16.6953 2.60156 17.043 2.94922C17.3945 3.30078 17.6094 3.63281 17.7891 4.09766C17.9258 4.44922 18.0898 4.98047 18.1328 5.95312C18.1797 7.00781 18.1914 7.32422 18.1914 9.99219C18.1914 12.6641 18.1797 12.9805 18.1328 14.0313C18.0898 15.0078 17.9258 15.5352 17.7891 15.8867C17.6094 16.3516 17.3906 16.6875 17.043 17.0352C16.6914 17.3867 16.3594 17.6016 15.8945 17.7813C15.543 17.918 15.0117 18.082 14.0391 18.125C12.9844 18.1719 12.668 18.1836 10 18.1836C7.32813 18.1836 7.01172 18.1719 5.96094 18.125C4.98438 18.082 4.45703 17.918 4.10547 17.7813C3.64063 17.6016 3.30469 17.3828 2.95703 17.0352C2.60547 16.6836 2.39063 16.3516 2.21094 15.8867C2.07422 15.5352 1.91016 15.0039 1.86719 14.0313C1.82031 12.9766 1.80859 12.6602 1.80859 9.99219C1.80859 7.32031 1.82031 7.00391 1.86719 5.95312C1.91016 4.97656 2.07422 4.44922 2.21094 4.09766C2.39063 3.63281 2.60938 3.29688 2.95703 2.94922C3.30859 2.59766 3.64063 2.38281 4.10547 2.20313C4.45703 2.06641 4.98828 1.90234 5.96094 1.85937C7.01172 1.8125 7.32813 1.80078 10 1.80078ZM10 0C7.28516 0 6.94531 0.0117187 5.87891 0.0585938C4.81641 0.105469 4.08594 0.277344 3.45313 0.523438C2.79297 0.78125 2.23438 1.12109 1.67969 1.67969C1.12109 2.23438 0.78125 2.79297 0.523438 3.44922C0.277344 4.08594 0.105469 4.8125 0.0585938 5.875C0.0117188 6.94531 0 7.28516 0 10C0 12.7148 0.0117188 13.0547 0.0585938 14.1211C0.105469 15.1836 0.277344 15.9141 0.523438 16.5469C0.78125 17.207 1.12109 17.7656 1.67969 18.3203C2.23438 18.875 2.79297 19.2188 3.44922 19.4727C4.08594 19.7188 4.8125 19.8906 5.875 19.9375C6.94141 19.9844 7.28125 19.9961 9.99609 19.9961C12.7109 19.9961 13.0508 19.9844 14.1172 19.9375C15.1797 19.8906 15.9102 19.7188 16.543 19.4727C17.1992 19.2188 17.7578 18.875 18.3125 18.3203C18.8672 17.7656 19.2109 17.207 19.4648 16.5508C19.7109 15.9141 19.8828 15.1875 19.9297 14.125C19.9766 13.0586 19.9883 12.7188 19.9883 10.0039C19.9883 7.28906 19.9766 6.94922 19.9297 5.88281C19.8828 4.82031 19.7109 4.08984 19.4648 3.45703C19.2188 2.79297 18.8789 2.23438 18.3203 1.67969C17.7656 1.125 17.207 0.78125 16.5508 0.527344C15.9141 0.28125 15.1875 0.109375 14.125 0.0625C13.0547 0.0117188 12.7148 0 10 0Z" fill="#707070" />
      <path d="M10 4.86328C7.16406 4.86328 4.86328 7.16406 4.86328 10C4.86328 12.8359 7.16406 15.1367 10 15.1367C12.8359 15.1367 15.1367 12.8359 15.1367 10C15.1367 7.16406 12.8359 4.86328 10 4.86328ZM10 13.332C8.16016 13.332 6.66797 11.8398 6.66797 10C6.66797 8.16016 8.16016 6.66797 10 6.66797C11.8398 6.66797 13.332 8.16016 13.332 10C13.332 11.8398 11.8398 13.332 10 13.332Z" fill="#707070" />
      <path d="M16.5391 4.66016C16.5391 5.32422 16 5.85938 15.3398 5.85938C14.6758 5.85938 14.1406 5.32032 14.1406 4.66016C14.1406 3.99609 14.6797 3.46094 15.3398 3.46094C16 3.46094 16.5391 4 16.5391 4.66016Z" fill="#707070" />
    </g>
    <defs>
      <clipPath id="clip0_2721_42836">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.2706 1.58594H18.0818L11.9401 8.60551L19.1654 18.1576H13.5081L9.07706 12.3643L4.00699 18.1576H1.19406L7.76323 10.6494L0.832031 1.58594H6.63296L10.6382 6.88121L15.2706 1.58594ZM14.284 16.4749H15.8417L5.78653 3.18021H4.11492L14.284 16.4749Z" fill="#707070" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_2721_42843)">
      <path d="M18.5236 0H1.47639C1.08483 0 0.709301 0.155548 0.432425 0.432425C0.155548 0.709301 0 1.08483 0 1.47639V18.5236C0 18.9152 0.155548 19.2907 0.432425 19.5676C0.709301 19.8445 1.08483 20 1.47639 20H18.5236C18.9152 20 19.2907 19.8445 19.5676 19.5676C19.8445 19.2907 20 18.9152 20 18.5236V1.47639C20 1.08483 19.8445 0.709301 19.5676 0.432425C19.2907 0.155548 18.9152 0 18.5236 0ZM5.96111 17.0375H2.95417V7.48611H5.96111V17.0375ZM4.45556 6.1625C4.11447 6.16058 3.7816 6.05766 3.49895 5.86674C3.21629 5.67582 2.99653 5.40544 2.8674 5.08974C2.73826 4.77404 2.70554 4.42716 2.77336 4.09288C2.84118 3.7586 3.0065 3.4519 3.24846 3.21148C3.49042 2.97107 3.79818 2.80772 4.13289 2.74205C4.4676 2.67638 4.81426 2.71133 5.12913 2.84249C5.44399 2.97365 5.71295 3.19514 5.90205 3.47901C6.09116 3.76288 6.19194 4.09641 6.19167 4.4375C6.19488 4.66586 6.15209 4.89253 6.06584 5.104C5.97959 5.31547 5.85165 5.50742 5.68964 5.66839C5.52763 5.82936 5.33487 5.95607 5.12285 6.04096C4.91083 6.12585 4.68389 6.16718 4.45556 6.1625ZM17.0444 17.0458H14.0389V11.8278C14.0389 10.2889 13.3847 9.81389 12.5403 9.81389C11.6486 9.81389 10.7736 10.4861 10.7736 11.8667V17.0458H7.76667V7.49306H10.6583V8.81667H10.6972C10.9875 8.22917 12.0042 7.225 13.5556 7.225C15.2333 7.225 17.0458 8.22083 17.0458 11.1375L17.0444 17.0458Z" fill="#707070" />
    </g>
    <defs>
      <clipPath id="clip0_2721_42843">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_2721_42846)">
      <path d="M10 0C4.4772 0 0 4.4772 0 10C0 14.6896 3.2288 18.6248 7.5844 19.7056V13.056H5.5224V10H7.5844V8.6832C7.5844 5.2796 9.1248 3.702 12.4664 3.702C13.1 3.702 14.1932 3.8264 14.6404 3.9504V6.7204C14.4044 6.6956 13.9944 6.6832 13.4852 6.6832C11.8456 6.6832 11.212 7.3044 11.212 8.9192V10H14.4784L13.9172 13.056H11.212V19.9268C16.1636 19.3288 20.0004 15.1128 20.0004 10C20 4.4772 15.5228 0 10 0Z" fill="#707070" />
    </g>
    <defs>
      <clipPath id="clip0_2721_42846">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const DocumentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.7017 13.1802C13.3005 13.1802 13.7858 13.6655 13.7858 14.2643C13.7858 14.863 13.3005 15.3483 12.7017 15.3483H5.13876C4.54004 15.3483 4.05469 14.863 4.05469 14.2643C4.05469 13.6655 4.54004 13.1802 5.13876 13.1802H12.7017Z" fill="currentColor" />
    <path d="M15.853 9.98215C16.4517 9.98216 16.937 10.4675 16.9371 11.0662C16.9371 11.6649 16.4517 12.1503 15.853 12.1503H5.13876C4.54004 12.1503 4.05469 11.6649 4.05469 11.0662C4.0547 10.4675 4.54006 9.98215 5.13876 9.98215H15.853Z" fill="currentColor" />
    <path d="M15.8619 6.83988C16.4607 6.83989 16.946 7.32524 16.946 7.92396C16.946 8.52267 16.4607 9.00803 15.8619 9.00804H5.14773C4.54902 9.00802 4.06365 8.52267 4.06365 7.92396C4.06365 7.32525 4.54902 6.8399 5.14773 6.83988H15.8619Z" fill="currentColor" />
    <path d="M15.853 3.67969C16.4517 3.67969 16.9371 4.16505 16.9371 4.76376C16.9371 5.36248 16.4517 5.84783 15.853 5.84784H5.13876C4.54004 5.84784 4.05469 5.36248 4.05469 4.76376C4.05469 4.16504 4.54004 3.67969 5.13876 3.67969H15.853Z" fill="currentColor" />
  </svg>
);

const PathwayLineIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.3488 4.53125C13.0336 4.53125 13.6903 4.80331 14.1745 5.28751C14.6587 5.77171 14.9307 6.42841 14.9307 7.11316C14.9307 7.79793 14.6587 8.45468 14.1745 8.93888C13.6903 9.42309 13.0336 9.69514 12.3488 9.69515H6.71547C6.27971 9.69515 5.86174 9.86822 5.55361 10.1763C5.24548 10.4845 5.07241 10.9024 5.07241 11.3382C5.07241 11.774 5.24549 12.1919 5.55361 12.5C5.86174 12.8081 6.27971 12.9813 6.71547 12.9813H12.2349C12.381 12.5697 12.6509 12.2135 13.0075 11.9613C13.3641 11.7092 13.7899 11.5735 14.2266 11.5729C14.6139 11.5729 14.9937 11.6793 15.3246 11.8806C15.6555 12.0819 15.9246 12.3703 16.1027 12.7142C16.2807 13.0582 16.3608 13.4444 16.3341 13.8308C16.3074 14.2172 16.1751 14.5888 15.9515 14.905C15.7279 15.2212 15.4216 15.4699 15.0663 15.6239C14.7109 15.7778 14.32 15.8311 13.9364 15.7779C13.5528 15.7247 13.1912 15.567 12.8911 15.3222C12.591 15.0773 12.364 14.7547 12.2349 14.3895H6.71547C5.9062 14.3895 5.13006 14.0681 4.55782 13.4959C3.98558 12.9236 3.66407 12.1475 3.66406 11.3382C3.66406 10.5289 3.98557 9.7528 4.55782 9.18056C5.13007 8.60831 5.90619 8.2868 6.71547 8.2868H12.3488C12.66 8.28679 12.9586 8.16318 13.1787 7.94309C13.3987 7.723 13.5224 7.42443 13.5224 7.11316C13.5224 6.80191 13.3987 6.50339 13.1787 6.2833C12.9586 6.06322 12.66 5.9396 12.3488 5.9396H6.71547C6.52871 5.9396 6.3496 5.86538 6.21754 5.73332C6.08549 5.60126 6.01126 5.42215 6.01126 5.23539C6.01127 5.04865 6.0855 4.86958 6.21754 4.73753C6.3496 4.60547 6.52871 4.53125 6.71547 4.53125H12.3488ZM14.496 13.0349C14.3673 12.9816 14.2258 12.9676 14.0892 12.9948C13.9526 13.022 13.8271 13.089 13.7286 13.1875C13.6302 13.286 13.5631 13.4115 13.5359 13.548C13.5088 13.6846 13.5227 13.8262 13.576 13.9549C13.6293 14.0836 13.7196 14.1936 13.8354 14.2709C13.9512 14.3483 14.0873 14.3895 14.2266 14.3895C14.4133 14.3895 14.5924 14.3154 14.7245 14.1833C14.8565 14.0513 14.9307 13.8722 14.9307 13.6854C14.9307 13.5461 14.8894 13.41 14.8121 13.2942C14.7347 13.1784 14.6247 13.0882 14.496 13.0349Z" fill="#0AC0C7" />
  </svg>
);

const PathwayLineIconDark = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.3488 4.53125C13.0336 4.53125 13.6903 4.80331 14.1745 5.28751C14.6587 5.77171 14.9307 6.42841 14.9307 7.11316C14.9307 7.79793 14.6587 8.45468 14.1745 8.93888C13.6903 9.42309 13.0336 9.69514 12.3488 9.69515H6.71547C6.27971 9.69515 5.86174 9.86822 5.55361 10.1763C5.24548 10.4845 5.07241 10.9024 5.07241 11.3382C5.07241 11.774 5.24549 12.1919 5.55361 12.5C5.86174 12.8081 6.27971 12.9813 6.71547 12.9813H12.2349C12.381 12.5697 12.6509 12.2135 13.0075 11.9613C13.3641 11.7092 13.7899 11.5735 14.2266 11.5729C14.6139 11.5729 14.9937 11.6793 15.3246 11.8806C15.6555 12.0819 15.9246 12.3703 16.1027 12.7142C16.2807 13.0582 16.3608 13.4444 16.3341 13.8308C16.3074 14.2172 16.1751 14.5888 15.9515 14.905C15.7279 15.2212 15.4216 15.4699 15.0663 15.6239C14.7109 15.7778 14.32 15.8311 13.9364 15.7779C13.5528 15.7247 13.1912 15.567 12.8911 15.3222C12.591 15.0773 12.364 14.7547 12.2349 14.3895H6.71547C5.9062 14.3895 5.13006 14.0681 4.55782 13.4959C3.98558 12.9236 3.66407 12.1475 3.66406 11.3382C3.66406 10.5289 3.98557 9.7528 4.55782 9.18056C5.13007 8.60831 5.90619 8.2868 6.71547 8.2868H12.3488C12.66 8.28679 12.9586 8.16318 13.1787 7.94309C13.3987 7.723 13.5224 7.42443 13.5224 7.11316C13.5224 6.80191 13.3987 6.50339 13.1787 6.2833C12.9586 6.06322 12.66 5.9396 12.3488 5.9396H6.71547C6.52871 5.9396 6.3496 5.86538 6.21754 5.73332C6.08549 5.60126 6.01126 5.42215 6.01126 5.23539C6.01127 5.04865 6.0855 4.86958 6.21754 4.73753C6.3496 4.60547 6.52871 4.53125 6.71547 4.53125H12.3488ZM14.496 13.0349C14.3673 12.9816 14.2258 12.9676 14.0892 12.9948C13.9526 13.022 13.8271 13.089 13.7286 13.1875C13.6302 13.286 13.5631 13.4115 13.5359 13.548C13.5088 13.6846 13.5227 13.8262 13.576 13.9549C13.6293 14.0836 13.7196 14.1936 13.8354 14.2709C13.9512 14.3483 14.0873 14.3895 14.2266 14.3895C14.4133 14.3895 14.5924 14.3154 14.7245 14.1833C14.8565 14.0513 14.9307 13.8722 14.9307 13.6854C14.9307 13.5461 14.8894 13.41 14.8121 13.2942C14.7347 13.1784 14.6247 13.0882 14.496 13.0349Z" fill="#707070" />
  </svg>
);


const HubFolderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M6.04427 6.04167C5.60705 6.04167 5.2526 6.39611 5.2526 6.83333V8.62849C5.48549 8.49377 5.75588 8.41667 6.04427 8.41667H13.9609C14.2493 8.41667 14.5197 8.49377 14.7526 8.62849V8.41667C14.7526 7.97944 14.3982 7.625 13.9609 7.625H11.1222C10.8072 7.625 10.5052 7.49989 10.2825 7.27719L9.16292 6.1576C9.08868 6.08337 8.988 6.04167 8.88302 6.04167H6.04427ZM14.7526 10C14.7526 9.56277 14.3982 9.20833 13.9609 9.20833H6.04427C5.60705 9.20833 5.2526 9.56277 5.2526 10V13.1667C5.2526 13.6039 5.60705 13.9583 6.04427 13.9583H13.9609C14.3982 13.9583 14.7526 13.6039 14.7526 13.1667V10ZM15.5443 13.1667C15.5443 14.0411 14.8354 14.75 13.9609 14.75H6.04427C5.16982 14.75 4.46094 14.0411 4.46094 13.1667V6.83333C4.46094 5.95888 5.16982 5.25 6.04427 5.25H8.88302C9.19796 5.25 9.50001 5.37511 9.72271 5.59781L10.8423 6.7174C10.9165 6.79163 11.0172 6.83333 11.1222 6.83333H13.9609C14.8354 6.83333 15.5443 7.54222 15.5443 8.41667V13.1667Z" fill="#0F172A" />
  </svg>
);

const DraftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.8125 2.5C1.94956 2.5 1.25 3.19956 1.25 4.0625V4.6875C1.25 5.55044 1.94955 6.25 2.8125 6.25H17.1875C18.0504 6.25 18.75 5.55044 18.75 4.6875V4.0625C18.75 3.19956 18.0504 2.5 17.1875 2.5H2.8125Z" fill="currentColor" />
    <path fillRule="evenodd" clipRule="evenodd" d="M2.57233 7.5L3.02214 15.1468C3.09987 16.4682 4.19413 17.5 5.51783 17.5H14.4819C15.8056 17.5 16.8999 16.4682 16.9776 15.1468L17.4274 7.5H2.57233ZM7.70813 10.625C7.70813 10.2798 7.98795 10 8.33313 10H11.6665C12.0116 10 12.2915 10.2798 12.2915 10.625C12.2915 10.9702 12.0116 11.25 11.6665 11.25H8.33313C7.98795 11.25 7.70813 10.9702 7.70813 10.625Z" fill="currentColor" />
  </svg>
);

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M5.83333 5.83073C5.83333 3.52954 7.69881 1.66406 10 1.66406C12.3012 1.66406 14.1667 3.52954 14.1667 5.83073V8.33073H15C16.3807 8.33073 17.5 9.45002 17.5 10.8307V15.8307C17.5 17.2114 16.3807 18.3307 15 18.3307H5C3.61929 18.3307 2.5 17.2114 2.5 15.8307V10.8307C2.5 9.45002 3.61929 8.33073 5 8.33073H5.83333V5.83073ZM7.5 8.33073H12.5V5.83073C12.5 4.45002 11.3807 3.33073 10 3.33073C8.61929 3.33073 7.5 4.45002 7.5 5.83073V8.33073ZM5 9.9974C4.53976 9.9974 4.16667 10.3705 4.16667 10.8307V15.8307C4.16667 16.291 4.53976 16.6641 5 16.6641H15C15.4602 16.6641 15.8333 16.291 15.8333 15.8307V10.8307C15.8333 10.3705 15.4602 9.9974 15 9.9974H5ZM10 11.6641C10.4602 11.6641 10.8333 12.0372 10.8333 12.4974V14.1641C10.8333 14.6243 10.4602 14.9974 10 14.9974C9.53976 14.9974 9.16667 14.6243 9.16667 14.1641V12.4974C9.16667 12.0372 9.53976 11.6641 10 11.6641Z" fill="currentColor" />
  </svg>
);

const MoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

const ResourceTypeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.7017 13.1802C13.3005 13.1802 13.7858 13.6655 13.7858 14.2643C13.7858 14.863 13.3005 15.3483 12.7017 15.3483H5.13876C4.54004 15.3483 4.05469 14.863 4.05469 14.2643C4.05469 13.6655 4.54004 13.1802 5.13876 13.1802H12.7017Z" fill="#024A94" />
    <path d="M15.853 9.98215C16.4517 9.98216 16.937 10.4675 16.9371 11.0662C16.9371 11.6649 16.4517 12.1503 15.853 12.1503H5.13876C4.54004 12.1503 4.05469 11.6649 4.05469 11.0662C4.0547 10.4675 4.54006 9.98215 5.13876 9.98215H15.853Z" fill="#024A94" />
    <path d="M15.8619 6.83988C16.4607 6.83989 16.946 7.32524 16.946 7.92396C16.946 8.52267 16.4607 9.00803 15.8619 9.00804H5.14773C4.54902 9.00802 4.06365 8.52267 4.06365 7.92396C4.06365 7.32525 4.54902 6.8399 5.14773 6.83988H15.8619Z" fill="#024A94" />
    <path d="M15.853 3.67969C16.4517 3.67969 16.9371 4.16505 16.9371 4.76376C16.9371 5.36248 16.4517 5.84783 15.853 5.84784H5.13876C4.54004 5.84784 4.05469 5.36248 4.05469 4.76376C4.05469 4.16504 4.54004 3.67969 5.13876 3.67969H15.853Z" fill="#024A94" />
  </svg>
);

// --- Mock Data ---
const MOCK_RESOURCES_TABLE = [
  { id: 1, name: "Graphic Design CV", desc: "Our Graphic Design...", price: "$120", downloads: "24", saves: "24", status: "Active" },
  { id: 2, name: "Leading text", desc: "Leading text", price: "Free", downloads: "300", saves: "300", status: "Only Me" },
  { id: 3, name: "Leading text", desc: "Leading text", price: "Leading text", downloads: "700,000", saves: "700,000", status: "Label" },
  { id: 4, name: "Leading text", desc: "Leading text", price: "Leading text", downloads: "2M", saves: "2M", status: "Label" },
  { id: 5, name: "Leading text", desc: "Leading text", price: "Leading text", downloads: "1", saves: "1", status: "Label" },
  { id: 6, name: "Leading text", desc: "Leading text", price: "Leading text", downloads: "3", saves: "3", status: "Label" },
];

const MOCK_PATHWAYS_TABLE = [
  { id: 1, name: "Graphic Design CV", desc: "Our Graphic Design...", price: "$120", resources: "9", downloads: "24", saves: "24", status: "Active" },
  { id: 2, name: "Leading text", desc: "Leading text", price: "Free", resources: "3", downloads: "300", saves: "300", status: "Only Me" },
  { id: 3, name: "Leading text", desc: "Leading text", price: "Leading text", resources: "2", downloads: "700,000", saves: "700,000", status: "Label" },
  { id: 4, name: "Leading text", desc: "Leading text", price: "Leading text", resources: "5", downloads: "2M", saves: "2M", status: "Label" },
  { id: 5, name: "Leading text", desc: "Leading text", price: "Leading text", resources: "10", downloads: "1", saves: "1", status: "Label" },
  { id: 6, name: "Leading text", desc: "Leading text", price: "Leading text", resources: "3", downloads: "3", saves: "3", status: "Label" },
];

const MOCK_HUBS_TABLE = [
  { id: 1, name: "Graphic Design CV", desc: "Our Graphic Design...", resources: "9", pathways: "1", downloads: "24", saves: "24", status: "Active" },
  { id: 2, name: "Leading text", desc: "Leading text", resources: "3", pathways: "3", downloads: "300", saves: "300", status: "Only Me" },
  { id: 3, name: "Leading text", desc: "Leading text", resources: "2", pathways: "2", downloads: "700,000", saves: "700,000", status: "Label" },
  { id: 4, name: "Leading text", desc: "Leading text", resources: "5", pathways: "5", downloads: "2M", saves: "2M", status: "Label" },
  { id: 5, name: "Leading text", desc: "Leading text", resources: "10", pathways: "10", downloads: "1", saves: "1", status: "Label" },
  { id: 6, name: "Leading text", desc: "Leading text", resources: "3", pathways: "3", downloads: "3", saves: "3", status: "Label" },
];

const MOCK_MIXED_TABLE = [
  { id: 1, type: "resource", name: "Graphic Design CV", desc: "Our Graphic Design...", downloads: "24", saves: "24" },
  { id: 2, type: "pathway", name: "Leading text", desc: "Leading text", downloads: "300", saves: "300" },
  { id: 3, type: "hub", name: "Leading text", desc: "Leading text", downloads: "700,000", saves: "700,000" },
  { id: 4, type: "pathway", name: "Leading text", desc: "Leading text", downloads: "2M", saves: "2M" },
  { id: 5, type: "resource", name: "Leading text", desc: "Leading text", downloads: "1", saves: "1" },
  { id: 6, type: "hub", name: "Leading text", desc: "Leading text", downloads: "3", saves: "3" },
];


import { useDashboardData } from "@/app/hooks/useDashboardData";
import { userAPI } from "@/app/lib/api/user";
import { UserProfileStats, UserProfileSocials } from "@/app/lib/types/user";

export default function ProfilePage() {
  const router = useRouter();
  const { displayResources, displayPathways, displayHubs } = useDashboardData();
  const [activeTab, setActiveTab] = useState("resources");
  const [profile, setProfile] = useState({
    name: "Stella Della",
    profession: "Frontend Development",
    username: "@adaeze.builds",
    bio: "Senior PM at Google Lagos · Building career resources for ambitious Africans. Previously Paystack, Andela.",
    avatar: "/assets/9fa8a96b7774ec94ca80cf93ebd4ece37578f603.jpg",
    coverPhoto: "linear-gradient(90deg, #d4a72d 0%, #a6d88c 100%)"
  });

  const [stats, setStats] = useState<UserProfileStats | null>(null);
  const [socials, setSocials] = useState<UserProfileSocials | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userAPI.getUserProfile();
        if (res.success && res.data) {
          setProfile({
            name: res.data.name || `${res.data.firstName} ${res.data.lastName}`,
            profession: res.data.currentRole || "Professional",
            username: res.data.email ? `@${res.data.email.split('@')[0]}` : "@user",
            bio: res.data.bio || res.data.shortDescription || "Building career resources...",
            avatar: res.data.avatar || "",
            coverPhoto: res.data.coverImage || "linear-gradient(90deg, #d4a72d 0%, #a6d88c 100%)"
          });
          setStats(res.data.stats || null);
          setSocials(res.data.socials || null);
        }
      } catch (e) {
        console.error("Error fetching profile from API:", e);
      }
    };
    fetchProfile();
  }, []);

  const renderStatus = (status: string) => {
    if (status === "Active") return <span className={`${styles.statusLabel} ${styles.statusActive}`}>{status}</span>;
    if (status === "Only Me") return <span className={`${styles.statusLabel} ${styles.statusOnlyMe}`}>{status}</span>;
    return <span className={`${styles.statusLabel} ${styles.statusLabelDefault}`}>{status}</span>;
  };

  const renderTypeIcon = (type: string) => {
    if (type === 'resource') return <span style={{ color: '#024A94', display: 'flex' }}><ResourceTypeIcon /></span>;
    if (type === 'pathway') return <span style={{ color: '#00B5D8', display: 'flex' }}><PathwayLineIcon /></span>;
    if (type === 'hub') return <span style={{ color: '#5a6474', display: 'flex' }}><HubFolderIcon /></span>;
    return null;
  };

  return (
    <div className={styles.pageContainer}>

      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div
          className={styles.coverImage}
          style={{
            background: profile.coverPhoto.startsWith("linear-gradient") ? profile.coverPhoto : undefined,
            backgroundImage: !profile.coverPhoto.startsWith("linear-gradient") ? `url(${profile.coverPhoto})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        <div className={styles.profileInfo}>
          <div className={styles.avatarWrapper}>
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt={profile.name}
                width={96}
                height={96}
                className={styles.avatar}
                unoptimized
              />
            ) : (
              <div
                className={styles.avatar}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f1f5f9',
                  color: '#8c95a6',
                  fontWeight: 600,
                  fontSize: '2rem'
                }}
              >
                {profile.name.charAt(0)}
              </div>
            )}
          </div>

          <div className={styles.profileHeaderContent}>
            <div className={styles.infoTopRow}>
              <div className={styles.leftInfo}>
                <h1 className={styles.name}>{profile.name}</h1>
                {profile.profession && (
                  <span className={styles.badge}>{profile.profession}</span>
                )}
              </div>
              <div className={styles.rightActions}>
                <div className={styles.socialLinks}>
                  <span className={styles.socialIcon}><InstagramIcon /></span>
                  <span className={styles.socialIcon}><XIcon /></span>
                  <span className={styles.socialIcon}><LinkedInIcon /></span>
                  <span className={styles.socialIcon}><FacebookIcon /></span>
                </div>
                <div className={styles.actions}>
                  <button className={styles.btnOutline} onClick={() => alert('Link copied!')}>
                    <CopyIcon /> Copy profile link
                  </button>
                  <button className={styles.btnPrimary} onClick={() => router.push("/profile/edit")}>
                    <EditIcon /> Edit profile
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.handle}>{profile.username}</div>
            <p className={styles.bio}>{profile.bio}</p>
          </div>

          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats?.following || 0}</span>
              <span className={styles.statLabel}>Following</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats?.followers || 0}</span>
              <span className={styles.statLabel}>Followers</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats?.totalCreated || 0}</span>
              <span className={styles.statLabel}>Total Created</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{stats?.totalSold || 0}</span>
              <span className={styles.statLabel}>Total Sold</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>~ {stats?.avgRelevancyScore || 0}%</span>
              <span className={styles.statLabel}>Avg. Confidence Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsSection}>
        <button
          className={`${styles.tab} ${activeTab === 'resources' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          <DocumentIcon /> Resources <span className={styles.tabCount}>{displayResources.length}</span>
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'pathways' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('pathways')}
        >
          <PathwayLineIconDark /> Pathways <span className={styles.tabCount}>{displayPathways.length}</span>
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'hubs' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('hubs')}
        >
          <HubFolderIcon /> Hubs <span className={styles.tabCount}>{displayHubs.length}</span>
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'onlyme' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('onlyme')}
        >
          <LockIcon /> Only me <span className={styles.tabCount}>0</span>
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'drafts' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('drafts')}
        >
          <DraftIcon /> Drafts <span className={styles.tabCount}>0</span>
        </button>
      </div>

      {/* Content Section */}
      <div className={styles.contentSection}>
        {activeTab === 'resources' && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Resource Name</th>
                  <th className={styles.th}>Short Description</th>
                  <th className={styles.th}>Price</th>
                  <th className={styles.th}>Downloads</th>
                  <th className={styles.th}>Saves</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Edit</th>
                  <th className={styles.th}>More</th>
                </tr>
              </thead>
              <tbody>
                {displayResources.map((res) => (
                  <tr key={res.id} className={styles.tr}>
                    <td className={styles.td}>
                      <div className={styles.resourceName}>
                        <div className={styles.checkbox}></div>
                        {res.title}
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.shortDesc}>{res.description}</span>
                    </td>
                    <td className={styles.td}>{res.price}</td>
                    <td className={styles.td}>{res.viewCount}</td>
                    <td className={styles.td}>{res.viewCount}</td>
                    <td className={styles.td}>
                      {renderStatus(res.id === MOCK_RESOURCES_TABLE[0].id ? "Active" : "Active")}
                    </td>
                    <td className={styles.td}>
                      <Link href={`/edit-resource/${res.id}`} className={styles.actionIcon}>
                        <EditIcon />
                      </Link>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.actionIcon}><MoreIcon /></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'pathways' && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Pathway Name</th>
                  <th className={styles.th}>Short Description</th>
                  <th className={styles.th}>Price</th>
                  <th className={styles.th}>Resources</th>
                  <th className={styles.th}>Downloads</th>
                  <th className={styles.th}>Saves</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Edit</th>
                  <th className={styles.th}>More</th>
                </tr>
              </thead>
              <tbody>
                {displayPathways.map((pw) => (
                  <tr key={pw.id} className={styles.tr}>
                    <td className={styles.td}>
                      <div className={styles.resourceName}>
                        <div className={styles.checkbox}></div>
                        {pw.title}
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.shortDesc}>{pw.description}</span>
                    </td>
                    <td className={styles.td}>{pw.price}</td>
                    <td className={styles.td}>{pw.resourceCount}</td>
                    <td className={styles.td}>{pw.viewCount}</td>
                    <td className={styles.td}>{pw.viewCount}</td>
                    <td className={styles.td}>
                      {renderStatus(pw.id === MOCK_PATHWAYS_TABLE[0].id ? "Active" : "Active")}
                    </td>
                    <td className={styles.td}>
                      <Link href={`/edit-pathway/${pw.id}`} className={styles.actionIcon}>
                        <EditIcon />
                      </Link>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.actionIcon}><MoreIcon /></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'hubs' && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Hub Name</th>
                  <th className={styles.th}>Short Description</th>
                  <th className={styles.th}>Resources</th>
                  <th className={styles.th}>Pathways</th>
                  <th className={styles.th}>Downloads</th>
                  <th className={styles.th}>Saves</th>
                  <th className={styles.th}>Status</th>
                  <th className={styles.th}>Edit</th>
                  <th className={styles.th}>More</th>
                </tr>
              </thead>
              <tbody>
                {displayHubs.map((hub) => (
                  <tr key={hub.id} className={styles.tr}>
                    <td className={styles.td}>
                      <div className={styles.resourceName}>
                        <div className={styles.checkbox}></div>
                        {hub.title}
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.shortDesc}>{hub.description}</span>
                    </td>
                    <td className={styles.td}>{hub.resourceCount}</td>
                    <td className={styles.td}>{hub.pathwayCount}</td>
                    <td className={styles.td}>{hub.viewCount}</td>
                    <td className={styles.td}>{hub.viewCount}</td>
                    <td className={styles.td}>
                      {renderStatus(hub.id === MOCK_HUBS_TABLE[0].id ? "Active" : "Active")}
                    </td>
                    <td className={styles.td}>
                      <Link href={`/edit-hub/${hub.id}`} className={styles.actionIcon}>
                        <EditIcon />
                      </Link>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.actionIcon}><MoreIcon /></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


        {/* Placeholders for other tabs */}
        {(activeTab === 'onlyme' || activeTab === 'drafts') && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Type</th>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Short Description</th>
                  <th className={styles.th}>Downloads</th>
                  <th className={styles.th}>Saves</th>
                  <th className={styles.th}>Edit</th>
                  <th className={styles.th}>More</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_MIXED_TABLE.map((row) => (
                  <tr key={row.id} className={styles.tr}>
                    <td className={styles.td}>
                      <div className={styles.resourceName}>
                        {renderTypeIcon(row.type)}
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.resourceName} style={{ color: row.id === 1 ? '#024A94' : '#11243d' }}>
                        {row.name}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.shortDesc}>{row.desc}</span>
                    </td>
                    <td className={styles.td}>{row.downloads}</td>
                    <td className={styles.td}>{row.saves}</td>
                    <td className={styles.td}>
                      <Link href={`/edit-${row.type}/${row.id}`} className={styles.actionIcon}>
                        <EditIcon />
                      </Link>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.actionIcon}><MoreIcon /></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
