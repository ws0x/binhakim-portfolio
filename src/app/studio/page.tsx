import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { getStudioProductsByAvailability, STUDIO_PRODUCTS, type StudioProduct } from "@/content/studio-products";

const STUDIO_URL = "https://www.binhakim.dev/studio";

export const metadata: Metadata = {
  title: { absolute: "Hakim Studio | Public Software by Yusuf Naeem" },
  description: "Hakim Studio is Yusuf Naeem's independent collection of public software for reading, local media workflows, and clearer thinking.",
  alternates: { canonical: "/studio" },
  openGraph: { title: "Hakim Studio | Public Software by Yusuf Naeem", description: "Public tools for reading, local media workflows, and clearer thinking.", url: "/studio", images: [{ url: "/studio/opengraph-image", width: 1200, height: 630, alt: "Hakim Studio by Yusuf Naeem" }] },
  twitter: { card: "summary_large_image", title: "Hakim Studio | Public Software by Yusuf Naeem", description: "Public tools for reading, local media workflows, and clearer thinking.", images: ["/studio/opengraph-image"] },
};

function ProductCard({ product, lead = false }: { product: StudioProduct; lead?: boolean }) {
  const hasLinks = product.links.length > 0;
  return <article className={`studio-product-card status-${product.status} ${lead ? "is-lead" : ""}`}>
    <div className="studio-card-header"><p>{product.category}</p><span className="studio-status"><span aria-hidden="true" />{product.statusLabel}</span></div>
    <h3>{hasLinks ? <Link href={`/studio/${product.slug}`}>{product.name}</Link> : product.name}</h3>
    <p className="studio-card-summary">{product.summary}</p>
    <p className="studio-card-audience"><span>Built for</span>{product.audience}</p>
    <p className="studio-card-proof"><span>Why trust it</span>{product.proof}</p>
    <p className="studio-card-availability">{product.availability}</p>
    {hasLinks && <div className="studio-card-actions"><Link href={`/studio/${product.slug}`}>Details <ArrowUpRight size={14} /></Link>{product.links.slice(0, 1).map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label} <ExternalLink size={13} /></a>)}</div>}
  </article>;
}

export default function HakimStudioPage() {
  const { available, inDevelopment } = getStudioProductsByAvailability();
  const jsonLd = { "@context": "https://schema.org", "@type": "CollectionPage", name: "Hakim Studio", description: "Public software by Yusuf Naeem for reading, local media workflows, and clearer thinking.", url: STUDIO_URL, mainEntity: { "@type": "ItemList", itemListElement: STUDIO_PRODUCTS.map((product, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "SoftwareApplication", name: product.name, description: product.summary, url: `${STUDIO_URL}/${product.slug}` } })) } };
  return <main id="main-content" className="studio-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <header className="section-shell studio-hero"><p className="section-label">Hakim Studio / independent software</p><h1>Useful software for reading, media, and clearer thinking.</h1><div className="studio-hero-grid"><p>Hakim Studio is Yusuf Naeem&apos;s independent collection of public tools. Each product is shown with its actual availability, so you can tell what you can use now and what is still being built.</p><dl><div><dt>Builder</dt><dd>Yusuf Naeem</dd></div><div><dt>Focus</dt><dd>Practical software</dd></div><div><dt>Principle</dt><dd>Honest product status</dd></div></dl></div></header>
    <section id="products" className="section-shell studio-section" aria-labelledby="available-heading"><div className="studio-section-heading"><div><p className="section-label">01 / products to use now</p><h2 id="available-heading">Start with the tool, not the story.</h2></div><p>These products have a public path today, whether that is a release candidate, public beta, or open-source source code.</p></div><div className="studio-available-grid">{available.map((product, index) => <ProductCard key={product.slug} product={product} lead={index === 0} />)}</div></section>
    <section id="in-development" className="section-shell studio-section studio-roadmap-section" aria-labelledby="roadmap-heading"><div className="studio-section-heading"><div><p className="section-label">02 / in development</p><h2 id="roadmap-heading">Worth following, not yet available.</h2></div><p>These products are included for context, with no claim of public access or launch readiness.</p></div><div className="studio-roadmap-grid">{inDevelopment.map((product) => <ProductCard key={product.slug} product={product} />)}</div></section>
    <section id="about-studio" className="section-shell studio-about" aria-labelledby="about-heading"><div><p className="section-label">03 / about Hakim Studio</p><h2 id="about-heading">Built independently, released carefully.</h2></div><div><p>Hakim Studio is a one-person software practice by Yusuf Naeem. It is not an agency, consultancy, or venture-backed company. The goal is simple: make useful tools, state their limits plainly, and improve them through real use.</p><Link href="/">About Yusuf&apos;s engineering work <ArrowUpRight size={15} /></Link></div></section>
    <footer className="section-shell studio-footer"><span>Hakim Studio</span><a href="mailto:yusufnaeemhakim@gmail.com">Contact Yusuf</a></footer>
  </main>;
}
