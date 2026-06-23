import type { Metadata } from "next";
import "./globals.css";
import Script from 'next/script'

export const metadata: Metadata = {
  title: "Resourcefull — Get Access to Resources Fast",
  description:
    "Resourcefull is trusted by ambitious startups and enterprises of every size. Get access to resources you want as fast and easy as you can imagine.",
};

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Script
            src="https://widgets.easyappz.com/widget.js?client=philipjones"
            strategy="afterInteractive"
          />
        </Providers>
      </body>
    </html>
  );
}
