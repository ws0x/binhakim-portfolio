"use client";

import CommitMockupPanel from "@/components/live/mockups/commit";
import NexFlowMockupPanel from "@/components/live/mockups/nexflow";
import OrbitMockupPanel from "@/components/live/mockups/orbit";
import type { WorkCaseStudy } from "@/lib/content";

export default function WorkMockup({ kind }: { kind: WorkCaseStudy["mockup"] }) {
  if (kind === "commit") return <CommitMockupPanel />;
  if (kind === "nexflow") return <NexFlowMockupPanel />;
  return <OrbitMockupPanel />;
}
