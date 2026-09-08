import type { Metadata } from "next";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { getStudioProductsByAvailability, STUDIO_PRODUCTS, type StudioProduct } from "@/content/studio-products";

const STUDIO_ORIGIN = "https://studio.binhakim.dev";

export const metadata: Metadata = {
  title: { absolute: "Hakim Studio | Public Software by Yusuf Naeem" },
  description: "Public software by Yusuf Naeem for reading, local media workflows, and clearer thinking.",
  alternates: { canonical: STUDIO_ORIGIN },
  openGraph: {
    title: "Hakim Studio | Public Software by Yusuf Naeem",
    description: "Public tools for reading, local media workflows, and clearer thinking.",
    url: STUDIO_ORIGIN,
    images: [{ url: `${STUDIO_ORIGIN}/opengraph-image`, width: 1200, height: 630, alt: "Hakim Studio by Yusuf Naeem" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hakim Studio | Public Software by Yusuf Naeem",
    description: "Public tools for reading, local media workflows, and clearer thinking.",
    images: [`${STUDIO_ORIGIN}/opengraph-image`],
  },
};

function ProductRow({ product, index, available }: { product: StudioProduct; index: number; available: boolean }) {
  const firstLink = product.links[0];
  return (
    <article className={`studio-catalog-row ${available ? "is-available" : "is-roadmap"} status-${product.status}`}>
      <div className="studio-row-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
      <div className="studio-row-main">
        <div className="studio-row-kicker"><span>{product.category}</span><span className="studio-status"><i aria-hidden="true" />{product.statusLabel}</span></div>
        <h3>{available ? <a href={`${STUDIO_ORIGIN}/${product.slug}`}>{product.name}</a> : product.name}</h3>
        <p>{product.summary}</p>
        <div className="studio-row-tags">{product.platforms.slice(0, 4).map((platform) => <span key={platform}>{platform}</span>)}</div>
      </div>
      <div className="studio-row-proof">
        <span className="studio-field-label">Signal</span>
        <p>{product.proof}</p>
        <span className="studio-field-label">Availability</span>
        <p>{product.availability}</p>
      </div>
      <div className="studio-row-actions">
        {available ? <a className="studio-action-primary" href={`${STUDIO_ORIGIN}/${product.slug}`}>Explore product <ArrowUpRight size={15} /></a> : <span className="studio-action-muted">Not public yet</span>}
        {firstLink && <a className="studio-action-secondary" href={firstLink.href} target="_blank" rel="noopener noreferrer">{firstLink.label} <ExternalLink size={13} /></a>}
      </div>
    </article>
  );
}

export default function HakimStudioPage() {
  const { available, inDevelopment } = getStudioProductsByAvailability();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Hakim Studio",
    description: "Public software by Yusuf Naeem for reading, local media workflows, and clearer thinking.",
    url: STUDIO_ORIGIN,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: STUDIO_PRODUCTS.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@type": "SoftwareApplication", name: product.name, description: product.summary, url: `${STUDIO_ORIGIN}/${product.slug}` },
      })),
    },
  };

  return (
    <main id="main-content" className="studio-catalog-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="studio-catalog-shell">
        <header className="studio-catalog-header" id="top">
          <div className="studio-catalog-eyebrow"><span>Hakim Studio</span><span>Public software by Yusuf Naeem</span></div>
          <div className="studio-catalog-intro">
            <div><h1>Focused software for reading, media, and clearer thinking.</h1><p>Hakim Studio makes practical tools for Kindle highlights, local media workflows, and turning dense material into structured notes.</p></div>
            <aside className="studio-catalog-index" aria-label="Studio catalog index">
              <div><span>01</span><a href="#available">Use now</a></div>
              <div><span>02</span><a href="#in-development">In development</a></div>
              <div><span>03</span><a href="#about">About the studio</a></div>
            </aside>
          </div>
        </header>

        <section id="available" className="studio-catalog-section" aria-labelledby="available-heading">
          <div className="studio-catalog-section-head">
            <div><span className="studio-section-number">01</span><div><p className="studio-section-kicker">Available products</p><h2 id="available-heading">Use something useful today.</h2></div></div>
            <p>MarginSync, Videx, and Cerebro each have a public path, a stated status, and a direct next step. Start with the tool, not a portfolio story.</p>
          </div>
          <div className="studio-catalog-list">{available.map((product, index) => <ProductRow key={product.slug} product={product} index={index} available />)}</div>
        </section>

        <section id="in-development" className="studio-catalog-section studio-catalog-development" aria-labelledby="development-heading">
          <div className="studio-catalog-section-head">
            <div><span className="studio-section-number">02</span><div><p className="studio-section-kicker">In development</p><h2 id="development-heading">Worth following. Not available yet.</h2></div></div>
            <p>Commit and Orbit are shown for context only. Their labels describe their current state, not a launch promise.</p>
          </div>
          <div className="studio-catalog-list">{inDevelopment.map((product, index) => <ProductRow key={product.slug} product={product} index={index + available.length} available={false} />)}</div>
        </section>

        <section id="about" className="studio-catalog-about" aria-labelledby="about-heading">
          <div><span className="studio-section-number">03</span><p className="studio-section-kicker">About Hakim Studio</p></div>
          <div><h2 id="about-heading">A one-person studio for practical software.</h2><p>Hakim Studio is Yusuf Naeem&apos;s independent product studio. Each tool starts with one specific user problem, has a visible technical boundary, and states exactly what is ready to use.</p><a className="studio-action-primary" href="https://www.binhakim.dev">See Yusuf&apos;s engineering work <ArrowUpRight size={15} /></a></div>
        </section>

        <footer className="studio-catalog-footer"><span>Hakim Studio · Yusuf Naeem</span><a href="mailto:yusufnaeemhakim@gmail.com">Contact Yusuf</a></footer>
      </div>
    </main>
  );
}
