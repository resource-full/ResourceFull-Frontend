"use client";

import styles from "./ContactForm.module.css";

const PhoneIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.90756 11.8783 8.12168 14.0924 10.8956 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z" fill="#2C2C2C" />
    </svg>
);

const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_2770_84981)">
            <path d="M10 1.80078C12.6719 1.80078 12.9883 1.8125 14.0391 1.85937C15.0156 1.90234 15.543 2.06641 15.8945 2.20313C16.3594 2.38281 16.6953 2.60156 17.043 2.94922C17.3945 3.30078 17.6094 3.63281 17.7891 4.09766C17.9258 4.44922 18.0898 4.98047 18.1328 5.95312C18.1797 7.00781 18.1914 7.32422 18.1914 9.99219C18.1914 12.6641 18.1797 12.9805 18.1328 14.0313C18.0898 15.0078 17.9258 15.5352 17.7891 15.8867C17.6094 16.3516 17.3906 16.6875 17.043 17.0352C16.6914 17.3867 16.3594 17.6016 15.8945 17.7813C15.543 17.918 15.0117 18.082 14.0391 18.125C12.9844 18.1719 12.668 18.1836 10 18.1836C7.32813 18.1836 7.01172 18.1719 5.96094 18.125C4.98438 18.082 4.45703 17.918 4.10547 17.7813C3.64063 17.6016 3.30469 17.3828 2.95703 17.0352C2.60547 16.6836 2.39063 16.3516 2.21094 15.8867C2.07422 15.5352 1.91016 15.0039 1.86719 14.0313C1.82031 12.9766 1.80859 12.6602 1.80859 9.99219C1.80859 7.32031 1.82031 7.00391 1.86719 5.95312C1.91016 4.97656 2.07422 4.44922 2.21094 4.09766C2.39063 3.63281 2.60938 3.29688 2.95703 2.94922C3.30859 2.59766 3.64063 2.38281 4.10547 2.20313C4.45703 2.06641 4.98828 1.90234 5.96094 1.85937C7.01172 1.8125 7.32813 1.80078 10 1.80078ZM10 0C7.28516 0 6.94531 0.0117187 5.87891 0.0585938C4.81641 0.105469 4.08594 0.277344 3.45313 0.523438C2.79297 0.78125 2.23438 1.12109 1.67969 1.67969C1.12109 2.23438 0.78125 2.79297 0.523438 3.44922C0.277344 4.08594 0.105469 4.8125 0.0585938 5.875C0.0117188 6.94531 0 7.28516 0 10C0 12.7148 0.0117188 13.0547 0.0585938 14.1211C0.105469 15.1836 0.277344 15.9141 0.523438 16.5469C0.78125 17.207 1.12109 17.7656 1.67969 18.3203C2.23438 18.875 2.79297 19.2188 3.44922 19.4727C4.08594 19.7188 4.8125 19.8906 5.875 19.9375C6.94141 19.9844 7.28125 19.9961 9.99609 19.9961C12.7109 19.9961 13.0508 19.9844 14.1172 19.9375C15.1797 19.8906 15.9102 19.7188 16.543 19.4727C17.1992 19.2188 17.7578 18.875 18.3125 18.3203C18.8672 17.7656 19.2109 17.207 19.4648 16.5508C19.7109 15.9141 19.8828 15.1875 19.9297 14.125C19.9766 13.0586 19.9883 12.7188 19.9883 10.0039C19.9883 7.28906 19.9766 6.94922 19.9297 5.88281C19.8828 4.82031 19.7109 4.08984 19.4648 3.45703C19.2188 2.79297 18.8789 2.23438 18.3203 1.67969C17.7656 1.125 17.207 0.78125 16.5508 0.527344C15.9141 0.28125 15.1875 0.109375 14.125 0.0625C13.0547 0.0117188 12.7148 0 10 0Z" fill="#2C2C2C" />
        </g>
    </svg>
);

const FacebookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 10C20 4.4772 15.5228 0 10 0C4.4772 0 0 4.4772 0 10C0 14.6896 3.2288 18.6248 7.5844 19.7056V13.056H5.5224V10H7.5844V8.6832C7.5844 5.2796 9.1248 3.702 12.4664 3.702C13.1 3.702 14.1932 3.8264 14.6404 3.9504V6.7204C14.4044 6.6956 13.9944 6.6832 13.4852 6.6832C11.8456 6.6832 11.212 7.3044 11.212 8.9192V10H14.4784L13.9172 13.056H11.212V19.9268C16.1636 19.3288 20.0004 15.1128 20.0004 10H20Z" fill="#2C2C2C" />
    </svg>
);

const XIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.2745 1.58594H18.0857L11.944 8.60551L19.1693 18.1576H13.512L9.08097 12.3643L4.01089 18.1576H1.19796L7.76713 10.6494L0.835938 1.58594H6.63686L10.6421 6.88121L15.2745 1.58594ZM14.2879 16.4749H15.8456L5.79043 3.18021H4.11882L14.2879 16.4749Z" fill="#2C2C2C" />
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

export default function ContactForm() {
    return (
        <section className={styles.section} id="contact-form">
            <div className={styles.container}>
                <div className={styles.content}>
                    <span className={styles.badge}>CONTACT FORM</span>
                    <h2 className={styles.title}>
                        Send us an email.<br />We&apos;ll be with you<br />shortly
                    </h2>

                    <div className={styles.contactLinks}>
                        <div className={styles.contactLink}>
                            <PhoneIcon />
                            <span>+234-893-345-56</span>
                        </div>
                        <div className={styles.contactLink}>
                            <InstagramIcon />
                            <span>@getresourcefull</span>
                        </div>
                        <div className={styles.contactLink}>
                            <FacebookIcon />
                            <span>@getresourcefull</span>
                        </div>
                        <div className={styles.contactLink}>
                            <XIcon />
                            <span>@getresourcefull</span>
                        </div>
                    </div>
                </div>

                <div className={styles.optionsContainer}>
                    <a href="#" className={styles.optionBtn}>
                        <div className={styles.iconWrapper}><ColoredFacebookIcon /></div>
                        <span className={styles.optionText}>Message us on Facebook</span>
                    </a>
                    <a href="#" className={styles.optionBtn}>
                        <div className={styles.iconWrapper}><ColoredWhatsappIcon /></div>
                        <span className={styles.optionText}>Message us on Whatsapp</span>
                    </a>
                    <a href="#" className={styles.optionBtn}>
                        <div className={styles.iconWrapper}><ColoredInstagramIcon /></div>
                        <span className={styles.optionText}>Message us on Instagram</span>
                    </a>
                    <a href="#" className={styles.optionBtn}>
                        <div className={styles.iconWrapper}><ColoredXIcon /></div>
                        <span className={styles.optionText}>Message us on Twitter(X)</span>
                    </a>
                    <a href="#" className={styles.optionBtn}>
                        <div className={styles.iconWrapper}><ColoredEmailIcon /></div>
                        <span className={styles.optionText}>Send us an Email</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
