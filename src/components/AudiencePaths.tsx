"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AUDIENCE_PATHS } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

export default function AudiencePaths() {
  return (
    <section className="section-pad audience-section" aria-labelledby="audience-heading">
      <div className="audience-shell">
        <div className="audience-intro">
          <p className="section-header">{"// choose_a_path"}</p>
          <h2 id="audience-heading">What brings you here?</h2>
          <p>One portfolio, three useful ways to evaluate the work.</p>
        </div>
        <div className="audience-grid">
          {AUDIENCE_PATHS.map((path) => (
            <Link
              key={path.id}
              href={path.href}
              className="panel audience-card"
              onClick={() => trackEvent("audience_path_click", { path: path.id })}
            >
              <span className="audience-label">{path.label}</span>
              <span>{path.description}</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
