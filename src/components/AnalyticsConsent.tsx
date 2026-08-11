"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "binhakim-analytics-consent";
const EVENT_NAME = "binhakim-consent-change";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type Consent = "accepted" | "declined" | "unknown";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT_NAME, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT_NAME, callback);
  };
}

function getSnapshot(): Consent {
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "declined" ? value : "unknown";
}

function getServerSnapshot(): Consent {
  return "unknown";
}

function setConsent(value: Exclude<Consent, "unknown">) {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new Event(EVENT_NAME));
}

export default function AnalyticsConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const enabled = consent === "accepted" && Boolean(GA_ID);

  return (
    <>
      {enabled && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}', { anonymize_ip: true });`}
          </Script>
          <AnalyticsEvents />
        </>
      )}
      {consent === "unknown" && (
        <aside className="consent-banner" aria-label="Analytics preferences">
          <div><strong>Help improve this portfolio?</strong><span>Optional anonymous analytics help me understand which project stories are useful. No contact details are collected.</span></div>
          <div className="consent-actions"><button type="button" className="consent-accept" onClick={() => setConsent("accepted")}>Allow analytics</button><button type="button" className="consent-decline" onClick={() => setConsent("declined")}>No thanks</button></div>
        </aside>
      )}
      <div id="analytics-preferences" className="analytics-preferences"><button type="button" onClick={() => setConsent("accepted")}>Allow analytics</button><button type="button" onClick={() => setConsent("declined")}>Disable analytics</button></div>
    </>
  );
}

function AnalyticsEvents() {
  if (!GA_ID) return null;

  return <AnalyticsEventBridge />;
}

function AnalyticsEventBridge() {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-analytics]");
      const eventName = target?.dataset.analytics;
      if (eventName && typeof window !== "undefined") {
        (window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.("event", eventName);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return null;
}
