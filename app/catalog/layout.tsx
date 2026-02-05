import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
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
