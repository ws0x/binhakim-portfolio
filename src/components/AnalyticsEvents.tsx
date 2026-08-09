"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-track]");
      const name = target?.dataset.track;
      if (!name) return;
      if (name === "project") trackEvent("project_click", { target: target.dataset.target ?? "unknown" });
      if (name === "github") trackEvent("github_click", { target: target.dataset.target ?? "unknown" });
      if (name === "writing") trackEvent("writing_click", { target: target.dataset.target ?? "unknown" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
