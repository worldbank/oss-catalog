import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Code Catalog",
  description: "Browse World Bank's open source software catalog. Filter by topic, language, and popularity. Find tools to use or contribute to sustainable development.",
  keywords: "code catalog, open source software, GitHub repositories, World Bank projects, development tools, programming languages",
  openGraph: {
    title: "World Bank Open Source Code Catalog",
    description: "Browse open source software from the World Bank",
    url: "https://opensource.worldbank.org/catalog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "World Bank Open Source Code Catalog",
    description: "Browse open source software from the World Bank",
  },
  alternates: {
    canonical: "https://opensource.worldbank.org/catalog",
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function CatalogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="wbg-data-init" strategy="beforeInteractive" type="text/javascript">
        {`var wbgData = wbgData || {};
wbgData.page = { pageInfo: { isDefaultPageName: "y", pageCategory: "content page", contentType: "data", channel: "its oss-catalog ext"}};
wbgData.site = { siteInfo: { siteLanguage: "English", siteType: "opensource", siteEnv: "prod"}, techInfo: { cmsType: "github", bussVPUnit: "its", bussUnit: "itset", bussUserGroup: "external", bussAgency: "ibrd"}};`}
      </Script>
      <Script 
        src="//assets.adobedtm.com/223f6e2cf7c9/3eb6c9b72a93/launch-7bc0cdc67098.min.js" 
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
}
