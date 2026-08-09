"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

export default function TrackedEmailLink({ href, source, className, children }: { href: string; source: string; className?: string; children: ReactNode }) {
  return <a href={href} className={className} onClick={() => trackEvent("email_cta_click", { source })}>{children}</a>;
}
