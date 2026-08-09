import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { articleFor, writingArticles } from "@/lib/writing";
import { absoluteUrl, routeFor } from "@/lib/site";
import { baseGraph, graph, webPageNode } from "@/lib/schema";
import { pageMetadata } from "@/lib/metadata";
import { workCaseStudies } from "@/lib/content";
import { marked } from "marked";
import PageHeader from "@/components/ui/PageHeader";

type Props = { params: Promise<{ slug: string }> };
const ROUTE = routeFor("/writing")!;

export function generateStaticParams() {
  return writingArticles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articleFor(slug);
  if (!article) return {};
  return pageMetadata(`/writing/${slug}`, {
    title: article.title,
    description: article.excerpt,
    openGraph: { type: "article", publishedTime: article.publishedAt },
  });
}

export default async function WritingArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articleFor(slug);
  if (!article) notFound();

  const path = `/writing/${article.slug}`;
  const related = workCaseStudies.filter((study) => article.relatedWork.includes(study.slug));
  const jsonLd = graph(
    ...baseGraph(),
    webPageNode({ path, name: article.title, description: article.excerpt, trail: [{ name: ROUTE.label, path: "/writing" }, { name: article.title, path }] }),
    {
      "@type": "Article",
      "@id": `${absoluteUrl(path)}#article`,
      headline: article.title,
      description: article.excerpt,
      datePublished: article.publishedAt,
      dateModified: article.publishedAt,
      mainEntityOfPage: { "@id": `${absoluteUrl(path)}/#webpage` },
      author: { "@id": "https://binhakim.dev/#person" },
      inLanguage: "en-US",
    },
  );
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <main className="section-pad route-shell route-shell-narrow">
        <PageHeader eyebrow={`~/writing/${article.slug}`} title={article.title} lede={article.excerpt} crumbs={[{ label: "writing", href: "/writing" }, { label: article.slug }]} />
        <article className="article-shell panel">
          <div className="article-meta"><span>{article.publishedAt}</span><span>{article.readTime}</span><span>{article.category}</span></div>
          <div className="article-markdown" dangerouslySetInnerHTML={{ __html: marked.parse(article.body) }} />
        </article>
        {related.length > 0 ? (
          <aside className="article-related panel">
            <p className="panel-label">Related work</p>
            {related.map((study) => <Link key={study.slug} href={`/work/${study.slug}`}>{study.name} case study <ArrowUpRight size={13} /></Link>)}
          </aside>
        ) : null}
        <Link href="/writing" className="case-back"><ArrowLeft size={13} /> All writing</Link>
      </main>
    </>
  );
}
