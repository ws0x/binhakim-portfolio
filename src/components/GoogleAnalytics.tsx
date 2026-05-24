import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Injects the Google Analytics 4 gtag.js snippet.
 *
 * - Rendered only when NEXT_PUBLIC_GA_ID is set (no-op in dev/preview
 *   unless the env var is present).
 * - Uses next/script strategy="afterInteractive" so the scripts load
 *   after hydration and never block first paint.
 * - Lives in the root layout so it covers every page automatically.
 */
export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
