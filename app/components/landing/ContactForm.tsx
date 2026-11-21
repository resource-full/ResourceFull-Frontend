"use client";

import styles from "./ContactForm.module.css";

const PhoneIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.90756 11.8783 8.12168 14.0924 10.8956 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z" fill="#2C2C2C" />
    </svg>
);

const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="18" height="18" rx="5" stroke="#2C2C2C" strokeWidth="1.6" />
        <circle cx="10" cy="10" r="4.4" stroke="#2C2C2C" strokeWidth="1.6" />
        <circle cx="14.8" cy="5.2" r="1.1" fill="#2C2C2C" />
    </svg>
);

const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="18" height="18" rx="3" stroke="#2C2C2C" strokeWidth="1.6" />
        <circle cx="6" cy="6.5" r="1.1" fill="#2C2C2C" />
        <rect x="5.1" y="8.5" width="1.8" height="7" fill="#2C2C2C" />
        <path d="M9.3 8.5H11V9.6C11.4 8.9 12.2 8.3 13.4 8.3C15.6 8.3 16 9.7 16 11.6V15.5H14.2V11.9C14.2 11 14 10.3 13 10.3C12 10.3 11.6 11 11.6 11.9V15.5H9.3V8.5Z" fill="#2C2C2C" />
    </svg>
);

const XIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.2745 1.58594H18.0857L11.944 8.60551L19.1693 18.1576H13.512L9.08097 12.3643L4.01089 18.1576H1.19796L7.76713 10.6494L0.835938 1.58594H6.63686L10.6421 6.88121L15.2745 1.58594ZM14.2879 16.4749H15.8456L5.79043 3.18021H4.11882L14.2879 16.4749Z" fill="#2C2C2C" />
    </svg>
);

const ColoredLinkedInIcon = () => (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="44" height="44" rx="8" fill="#0A66C2" />
        <path d="M14.4 17.6H9.6V34.4H14.4V17.6Z" fill="white" />
        <path d="M12 15.2C13.5464 15.2 14.8 13.9464 14.8 12.4C14.8 10.8536 13.5464 9.6 12 9.6C10.4536 9.6 9.2 10.8536 9.2 12.4C9.2 13.9464 10.4536 15.2 12 15.2Z" fill="white" />
        <path d="M19.6 17.6H24.2V19.808H24.264C24.904 18.512 26.52 17.2 28.92 17.2C33.72 17.2 34.8 20.088 34.8 24.544V34.4H30V25.52C30 23.52 29.624 21.6 27.2 21.6C24.84 21.6 24.4 23.368 24.4 25.656V34.4H19.6V17.6Z" fill="white" />
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
                            <LinkedInIcon />
                            <span>@getresourcefull</span>
                        </div>
                        <div className={styles.contactLink}>
                            <XIcon />
                            <span>@getresourcefull</span>
                        </div>
                    </div>
                </div>

                <div className={styles.optionsContainer}>
                    <a href="https://www.linkedin.com/company/getresourcefull/" target="_blank" rel="noopener noreferrer" className={styles.optionBtn}>
                        <div className={styles.iconWrapper}><ColoredLinkedInIcon /></div>
                        <span className={styles.optionText}>Message us on LinkedIn</span>
                    </a>
                    <a href="https://www.instagram.com/getresourcefull/" target="_blank" rel="noopener noreferrer" className={styles.optionBtn}>
                        <div className={styles.iconWrapper}><ColoredInstagramIcon /></div>
                        <span className={styles.optionText}>Message us on Instagram</span>
                    </a>
                    <a href="#" className={styles.optionBtn}>
                        <div className={styles.iconWrapper}><ColoredXIcon /></div>
                        <span className={styles.optionText}>Message us on Twitter(X)</span>
                    </a>
                    <a href="mailto:admin@resourcefull.store" className={styles.optionBtn}>
                        <div className={styles.iconWrapper}><ColoredEmailIcon /></div>
                        <span className={styles.optionText}>Send us an Email</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
