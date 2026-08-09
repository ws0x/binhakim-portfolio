import Reveal from "./ui/Reveal";

const principles = [
  ["Model the boundary", "Start with the data model, permissions and failure modes before polishing the interface."],
  ["Ship the smallest useful loop", "Keep the workflow focused on the next action a real user needs to complete."],
  ["Operate what ships", "Treat testing, observability, documentation and post-launch fixes as part of the product."],
] as const;

export default function HowIWork() {
  return (
    <section className="section-pad" aria-labelledby="how-i-work-heading">
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <Reveal as="div" delay={0} style={{ marginBottom: "2rem", maxWidth: "42rem" }}>
          <p className="section-header">{"// how_i_work"}</p>
          <h2 id="how-i-work-heading" style={{ color: "var(--text-primary)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)", margin: ".5rem 0" }}>Built for the part after launch</h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>A practical process for teams that need software to remain understandable when the first version is no longer the whole story.</p>
        </Reveal>
        <div className="audience-grid">
          {principles.map(([title, body], index) => (
            <Reveal as="article" delay={index + 1} key={title} className="panel audience-card">
              <span className="audience-label">{title}</span>
              <span>{body}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
