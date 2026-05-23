"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

interface Post {
  title: string;
  excerpt: string;
  url: string;
  date: string;
  readTime: string;
}

export default function BlogCards({ posts }: { posts: Post[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="writing"
      ref={ref}
      className="section-pad"
      style={{ maxWidth: "72rem", margin: "0 auto" }}
    >
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
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
          <p className="section-header">// 05. Writing</p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            Thoughts &amp; articles
          </h2>
        </div>
        <a
          href="https://medium.com/@binhakim"
          target="_blank"
          rel="noopener noreferrer"
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
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          All articles <ArrowUpRight size={13} />
        </a>
      </motion.div>

      <div className="blog-grid">
        {posts.map((post, i) => (
          <motion.a
            key={i}
            custom={i + 1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="panel glow-border-hover"
            style={{
              padding: "1.5rem",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
            whileHover={{ y: -4 }}
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
          </motion.a>
        ))}
      </div>
    </section>
  );
}
