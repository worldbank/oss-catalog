import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About the OSPO",
  description: "The World Bank Open Source Program Office (OSPO) strives to cultivate open source development by building communities for support, maintenance, and enhancement, and by sharing knowledge and expertise in alignment with the Sustainable Development Goals.",
  openGraph: {
    title: "About the World Bank Open Source Program Office",
    description: "How the World Bank OSPO supports open source development, communities, and the Open Source Code Catalog.",
    url: "https://opensource.worldbank.org/about",
    type: "website",
  },
  alternates: {
    canonical: "https://opensource.worldbank.org/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script id="wbg-data-init" strategy="beforeInteractive" type="text/javascript">
        {`var wbgData = wbgData || {};
wbgData.page = { pageInfo: { isDefaultPageName: "y", pageCategory: "content page", contentType: "about", channel: "its oss-catalog ext"}};
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
