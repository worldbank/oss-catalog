import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import FaviconLink from "./components/FaviconLink";

export const metadata: Metadata = {
  title: "World Bank Open Source",
  description: "Discover open source projects, data, and research from the World Bank.",
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
