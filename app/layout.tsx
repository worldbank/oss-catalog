import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import FaviconLink from "./components/FaviconLink";

export const metadata: Metadata = {
  metadataBase: new URL('https://opensource.worldbank.org'),
  title: {
    default: "World Bank Open Source",
    template: "%s | World Bank Open Source"
  },
  description: "Discover open source projects, data, and research from the World Bank. Supporting sustainable development through open collaboration and accessible tools.",
  keywords: "World Bank, open source, open data, sustainable development, SDG, GitHub, development tools, research",
  authors: [{ name: "World Bank" }],
  creator: "World Bank",
  publisher: "World Bank",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://opensource.worldbank.org',
    siteName: 'World Bank Open Source',
    title: 'World Bank Open Source',
    description: 'Open source projects, data, and research from the World Bank supporting sustainable development',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'World Bank Open Source',
    description: 'Open source projects, data, and research from the World Bank',
  },
  alternates: {
    canonical: 'https://opensource.worldbank.org',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <FaviconLink />
        <Script id="wbg-data-init" strategy="beforeInteractive" type="text/javascript">
          {`var wbgData = wbgData || {};
wbgData.page = { pageInfo: { isDefaultPageName: "y", pageCategory: "home", contentType: "Homepage", channel: "its oss-catalog ext"}};
wbgData.site = { siteInfo: { siteLanguage: "English", siteType: "opensource", siteEnv: "prod"}, techInfo: { cmsType: "github", bussVPUnit: "its", bussUnit: "itset", bussUserGroup: "external", bussAgency: "ibrd"}};`}
        </Script>
        <Script 
          src="//assets.adobedtm.com/223f6e2cf7c9/3eb6c9b72a93/launch-7bc0cdc67098.min.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
