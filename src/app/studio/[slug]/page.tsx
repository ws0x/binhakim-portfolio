import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { getStudioProduct, STUDIO_PRODUCTS } from "@/content/studio-products";

const STUDIO_ORIGIN = "https://studio.binhakim.dev";
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return STUDIO_PRODUCTS.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getStudioProduct((await params).slug);
  if (!product) return {};
  const title = `${product.name} | Hakim Studio`;
  return {
    title,
    description: product.summary,
    keywords: product.keywords,
    alternates: { canonical: `${STUDIO_ORIGIN}/${product.slug}` },
    openGraph: { title, description: product.summary, url: `${STUDIO_ORIGIN}/${product.slug}`, images: [{ url: `${STUDIO_ORIGIN}/${product.slug}/opengraph-image`, width: 1200, height: 630, alt: `${product.name} by Hakim Studio` }] },
    twitter: { card: "summary_large_image", title, description: product.summary, images: [`${STUDIO_ORIGIN}/${product.slug}/opengraph-image`] },
  };
}

export default async function StudioProductPage({ params }: Props) {
  const product = getStudioProduct((await params).slug);
  if (!product) notFound();
  const productIndex = STUDIO_PRODUCTS.findIndex((item) => item.slug === product.slug) + 1;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.summary,
    applicationCategory: product.category,
    operatingSystem: product.platforms.join(", "),
    url: `${STUDIO_ORIGIN}/${product.slug}`,
    author: { "@type": "Person", name: "Yusuf Naeem", url: "https://www.binhakim.dev" },
    keywords: product.keywords.join(", "),
  };

  return (
    <main id="main-content" className="studio-detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="studio-detail-shell">
        <nav className="studio-detail-breadcrumb" aria-label="Breadcrumb"><a href={STUDIO_ORIGIN}><ArrowLeft size={15} /> Hakim Studio</a><span>/</span><span>{product.category}</span></nav>
        <header className="studio-detail-header">
          <div className="studio-detail-title-block"><div className="studio-detail-number">{String(productIndex).padStart(2, "0")}</div><p className="studio-section-kicker">{product.category}</p><div className="studio-detail-title-line"><h1>{product.name}</h1><span className={`studio-status status-${product.status}`}><i aria-hidden="true" />{product.statusLabel}</span></div><p className="studio-detail-summary">{product.summary}</p><div className="studio-detail-actions">{product.links.map((link) => <a className="studio-action-primary" key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <ExternalLink size={14} /></a>)}<a className="studio-action-secondary" href={STUDIO_ORIGIN}>Browse all products <ArrowUpRight size={14} /></a></div></div>
          <aside className="studio-detail-facts"><div><span className="studio-field-label">Status</span><strong>{product.statusLabel}</strong></div><div><span className="studio-field-label">Built for</span><strong>{product.audience}</strong></div><div><span className="studio-field-label">Availability</span><strong>{product.availability}</strong></div></aside>
        </header>

        <div className="studio-detail-main-grid">
          <section className="studio-detail-overview"><p className="studio-section-kicker">What it does</p><h2>{product.details[0]?.title ?? "What it does"}</h2><p>{product.details[0]?.body ?? product.summary}</p></section>
          <aside className="studio-detail-signal"><p className="studio-section-kicker">Built with</p><p>{product.proof}</p></aside>
        </div>

        <section className="studio-detail-capabilities" aria-labelledby="capabilities-heading"><div><p className="studio-section-kicker">Core capabilities</p><h2 id="capabilities-heading">Designed around the job.</h2></div><div className="studio-capability-list">{product.capabilities.map((capability, index) => <div key={capability}><span>{String(index + 1).padStart(2, "0")}</span><strong>{capability}</strong></div>)}</div></section>

        <section className="studio-detail-technical" aria-labelledby="technical-heading"><div><p className="studio-section-kicker">Technical boundary</p><h2 id="technical-heading">Useful because its limits are explicit.</h2></div><div><p>{product.technicalNote}</p><div className="studio-row-tags">{product.platforms.map((platform) => <span key={platform}>{platform}</span>)}</div></div></section>

        {product.details.slice(1).map((detail) => <section className="studio-detail-note" key={detail.title}><p className="studio-section-kicker">{product.name}</p><div><h2>{detail.title}</h2><p>{detail.body}</p></div></section>)}

        <footer className="studio-detail-footer"><a href={STUDIO_ORIGIN}><ArrowLeft size={15} /> All Hakim Studio products</a><a href="https://www.binhakim.dev">Yusuf&apos;s engineering portfolio <ArrowUpRight size={15} /></a></footer>
      </div>
    </main>
  );
}
