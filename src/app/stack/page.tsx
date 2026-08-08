import type { Metadata } from "next";

import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { stack } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { baseGraph, webPageNode, graph } from "@/lib/schema";
import { routeFor } from "@/lib/site";

const ROUTE = "/stack";
const route = routeFor(ROUTE)!;

export const metadata: Metadata = pageMetadata(ROUTE);

const jsonLd = graph(
  ...baseGraph(),
  webPageNode({
    path: ROUTE,
    name: route.title,
    description: route.description,
    trail: [{ name: "Stack", path: ROUTE }],
  })
);

export default function StackPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <main className="section-pad" style={{ maxWidth: "56rem", margin: "0 auto" }}>
        <PageHeader
          eyebrow="~/stack"
          title={
            <>
              What I build with, and{" "}
              <span style={{ color: "var(--cyan)" }}>why</span>
            </>
          }
          lede="A list of tool names says nothing — everyone's list is the same list. What's worth writing down is which ones I reach for without thinking, which ones I pick deliberately, and which ones I've used properly but wouldn't start with today."
          crumbs={[{ label: "stack" }]}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "3.25rem" }}>
          {stack.tiers.map((tier, ti) => (
            <Reveal as="section" delay={ti + 1} key={tier.id} id={tier.id}>
              <h2
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.01em",
                  marginBottom: "0.4rem",
                }}
              >
                {tier.label}
              </h2>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-dim)",
                  lineHeight: 1.65,
                  marginBottom: "1.5rem",
                  maxWidth: "42rem",
                }}
              >
                {tier.blurb}
              </p>

              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {tier.tools.map((tool) => (
                  <li key={tool.name} className="stack-row">
                    <span className="stack-tool">{tool.name}</span>
                    {/* Tools without a defensible reason render as a bare name
                        rather than a placeholder — see stack.json _authoring. */}
                    {tool.note ? (
                      <span className="stack-note">{tool.note}</span>
                    ) : (
                      <span aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </main>
    </>
  );
}
