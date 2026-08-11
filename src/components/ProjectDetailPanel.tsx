"use client";

import { type KeyboardEvent, useId, useRef, useState } from "react";
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
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const panels = Object.keys(labels) as Panel[];

  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % panels.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + panels.length) % panels.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = panels.length - 1;
    else return;

    event.preventDefault();
    setActivePanel(panels[nextIndex]);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="project-detail-panel" aria-label={`${project.name} technical details`}>
      <div className="detail-tabs" role="tablist" aria-label={`${project.name} technical detail views`}>
        {panels.map((panel, index) => (
          <button
            aria-controls={`${baseId}-${panel}`}
            aria-selected={activePanel === panel}
            className={activePanel === panel ? "is-active" : ""}
            id={`${baseId}-${panel}-tab`}
            key={panel}
            onClick={() => setActivePanel(panel)}
            onKeyDown={(event) => moveFocus(event, index)}
            ref={(element) => { tabRefs.current[index] = element; }}
            role="tab"
            tabIndex={activePanel === panel ? 0 : -1}
            type="button"
          >
            {labels[panel]}
          </button>
        ))}
      </div>

      {panels.map((panel) => (
        <div
          aria-labelledby={`${baseId}-${panel}-tab`}
          className="detail-panel-content"
          hidden={activePanel !== panel}
          id={`${baseId}-${panel}`}
          key={panel}
          role="tabpanel"
          tabIndex={0}
        >
        {panel === "decisions" && (
          <ul className="detail-decision-list">
            {project.engineeringHighlights.map((highlight, index) => (
              <li key={highlight.title}>
                <span>0{index + 1}</span>
                <div><strong>{highlight.title}</strong><p>{highlight.decision}</p></div>
              </li>
            ))}
          </ul>
        )}

        {panel === "proof" && (
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

        {panel === "stack" && (
          <div className="detail-stack"><p>Selected implementation tools</p><div>{project.stack.map((technology) => <span key={technology}>{technology}</span>)}</div></div>
        )}
        </div>
      ))}
    </section>
  );
}
