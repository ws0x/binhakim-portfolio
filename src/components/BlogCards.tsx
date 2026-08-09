import Reveal from "./ui/Reveal";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";

interface Post {
  title: string;
  excerpt: string;
  url: string;
  date: string;
  readTime: string;
}

export default function BlogCards({ posts }: { posts: Post[] }) {
  return (
    <section
      id="writing"
      className="section-pad"
      style={{ maxWidth: "72rem", margin: "0 auto" }}
    >
      <Reveal as="div" delay={0}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "3rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <p className="section-header">{"// 10. Writing"}</p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Thoughts &amp; Articles
          </h2>
        </div>
        <Link
          href="/writing"
          className="fade-hover"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontFamily: "var(--font-jet), monospace",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--cyan)",
            textDecoration: "none",
          }}
        >
          Writing index <ArrowUpRight size={13} />
        </Link>
      </Reveal>

      <div className="blog-grid">
        {posts.map((post, i) => (
          <Reveal as="a" delay={i + 1}
            key={i}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="panel glow-border-hover lift-hover lift-hover-lg"
            style={{
              padding: "1.5rem",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {/* Date + read time */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-jet), monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  color: "var(--text-dim)",
                }}
              >
                {post.date}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                  fontFamily: "var(--font-jet), monospace",
                  fontSize: "0.65rem",
                  color: "var(--text-dim)",
                }}
              >
                <Clock size={10} />
                {post.readTime}
              </span>
            </div>

            <h3
              style={{
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                lineHeight: 1.45,
              }}
            >
              {post.title}
            </h3>

            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--text-secondary)",
                lineHeight: 1.65,
                flexGrow: 1,
              }}
            >
              {post.excerpt}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.3rem",
                fontFamily: "var(--font-jet), monospace",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--cyan)",
                marginTop: "0.25rem",
              }}
            >
              Read on Medium <ArrowUpRight size={11} />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
