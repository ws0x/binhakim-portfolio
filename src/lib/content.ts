import { z } from "zod";

import experienceJson from "../data/experience.json";
import projectsJson from "../data/projects.json";
import credentialsJson from "../data/credentials.json";
import skillsJson from "../data/skills.json";
import stackJson from "../data/stack.json";

/**
 * Validated access to the JSON content files.
 *
 * The components used to import these JSON files directly, which meant a typo
 * or a missing field surfaced as a blank patch of UI (or a runtime crash on a
 * prerendered page) rather than a build failure. Parsing here fails the build
 * instead, with a message naming the file and the offending path.
 *
 * Import from this module rather than reaching for the JSON directly.
 */

const nonEmpty = z.string().trim().min(1);

/* ── Schemas ─────────────────────────────────────────────────────────── */

export const experienceSchema = z.object({
  title: nonEmpty,
  company: nonEmpty,
  period: nonEmpty,
  location: nonEmpty,
  description: nonEmpty,
  bullets: z.array(nonEmpty).min(1),
  tech: z.array(nonEmpty),
});

export const projectSchema = z.object({
  id: nonEmpty.regex(/^[a-z0-9-]+$/, "id must be a URL-safe slug"),
  title: nonEmpty,
  tagline: nonEmpty,
  description: nonEmpty,
  tech: z.array(nonEmpty),
  github: z.url().nullable(),
  live: z.url().nullable(),
  status: nonEmpty.nullable(),
  featured: z.boolean(),
  category: nonEmpty,
});

export const credentialsSchema = z.object({
  education: z.object({
    degree: nonEmpty,
    major: nonEmpty,
    school: nonEmpty,
    location: nonEmpty,
    period: nonEmpty,
    gpa: nonEmpty,
    activities: z.array(nonEmpty),
    volunteering: nonEmpty,
    graduate: nonEmpty,
  }),
  certifications: z
    .array(
      z.object({
        name: nonEmpty,
        issuer: nonEmpty,
        year: nonEmpty.nullable(),
      })
    )
    .min(1),
  honours: z.array(
    z.object({ title: nonEmpty, detail: nonEmpty, year: nonEmpty })
  ),
  languages: z
    .array(
      z.object({
        name: nonEmpty,
        level: nonEmpty,
        // Drives the three-segment proficiency meter in Languages.tsx.
        bars: z.number().int().min(1).max(3),
      })
    )
    .min(1),
});

export const skillsSchema = z.object({
  categories: z
    .array(
      z.object({
        label: nonEmpty,
        icon: nonEmpty,
        skills: z.array(nonEmpty).min(1),
      })
    )
    .min(1),
  softSkills: z.array(
    z.object({ label: nonEmpty, level: z.number().int().min(0).max(100) })
  ),
});

export const stackSchema = z.object({
  // Authoring guidance for whoever edits the file; not rendered.
  _authoring: z.array(z.string()).optional(),
  tiers: z
    .array(
      z.object({
        id: nonEmpty.regex(/^[a-z0-9-]+$/),
        label: nonEmpty,
        blurb: nonEmpty,
        tools: z
          .array(
            z.object({
              name: nonEmpty,
              // Deliberately allowed to be empty: a tool with nothing honest to
              // say about it renders as a bare name rather than a placeholder.
              note: z.string(),
            })
          )
          .min(1),
      })
    )
    .min(1),
});

/* ── Parsing ─────────────────────────────────────────────────────────── */

function parse<T>(schema: z.ZodType<T>, data: unknown, file: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  • ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid content in src/data/${file}:\n${issues}`);
  }
  return result.data;
}

export const experience = parse(
  z.array(experienceSchema).min(1),
  experienceJson,
  "experience.json"
);

export const projects = parse(
  z.array(projectSchema).min(1),
  projectsJson,
  "projects.json"
);

export const credentials = parse(
  credentialsSchema,
  credentialsJson,
  "credentials.json"
);

export const skills = parse(skillsSchema, skillsJson, "skills.json");

export const stack = parse(stackSchema, stackJson, "stack.json");

/* ── Types ───────────────────────────────────────────────────────────── */

export type Experience = z.infer<typeof experienceSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Credentials = z.infer<typeof credentialsSchema>;
export type Skills = z.infer<typeof skillsSchema>;
export type Stack = z.infer<typeof stackSchema>;
