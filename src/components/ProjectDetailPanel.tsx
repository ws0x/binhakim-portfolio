"use client";

import { useId, useState } from "react";
import type { ProjectCaseStudy } from "@/content/projects";

type Panel = "decisions" | "proof" | "stack";

const labels: Record<Panel, string> = {
  decisions: "Engineering choices",
  proof: "Evidence",
  stack: "Stack",
};

export default function ProjectDetailPanel({ project }: { project: ProjectCaseStudy }) {
  const [activePanel, setActivePanel] = useState<Panel>("decisions");
  const baseId = useId();

  return (
    <section className="project-detail-panel" aria-label={`${project.name} technical details`}>
      <div className="detail-tabs" role="tablist" aria-label={`${project.name} technical detail views`}>
        {(Object.keys(labels) as Panel[]).map((panel) => (
          <button
            aria-controls={`${baseId}-${panel}`}
            aria-selected={activePanel === panel}
            className={activePanel === panel ? "is-active" : ""}
            id={`${baseId}-${panel}-tab`}
            key={panel}
            onClick={() => setActivePanel(panel)}
            role="tab"
            type="button"
          >
            {labels[panel]}
          </button>
        ))}
      </div>

      <div aria-labelledby={`${baseId}-${activePanel}-tab`} className="detail-panel-content" id={`${baseId}-${activePanel}`} role="tabpanel">
        {activePanel === "decisions" && (
          <ul className="detail-decision-list">
            {project.engineeringHighlights.map((highlight, index) => (
              <li key={highlight.title}>
                <span>0{index + 1}</span>
                <div><strong>{highlight.title}</strong><p>{highlight.decision}</p></div>
              </li>
            ))}
          </ul>
        )}

        {activePanel === "proof" && (
          <div className="detail-proof-grid">
            {project.outcomes.map((outcome) => (
              <div key={outcome.value}>
                <strong>{outcome.value}</strong>
                <span>{outcome.context}</span>
                <small>{outcome.evidence} evidence</small>
              </div>
            ))}
            <p>Last verified: <time dateTime={project.verifiedAt}>{project.verifiedAt}</time></p>
          </div>
        )}

        {activePanel === "stack" && (
          <div className="detail-stack"><p>Selected implementation tools</p><div>{project.stack.map((technology) => <span key={technology}>{technology}</span>)}</div></div>
        )}
      </div>
    </section>
  );
}
