import Navigation from "@/components/Navigation";
import AnalyticsConsent from "@/components/AnalyticsConsent";
import { ProjectStory } from "@/components/ProjectStory";
import {
  BackgroundSection,
  CapabilitiesSection,
  ContactSection,
  EvidenceStrip,
  ExperienceSection,
  HeroSection,
  MoreWorkSection,
  SiteFooter,
  WritingSection,
} from "@/components/SiteSections";
import blogData from "@/data/blog.json";
import { getMediumPosts } from "@/lib/getMediumPosts";
import { getFeaturedProjects } from "@/content/projects";

export default async function Home() {
  const mediumPosts = await getMediumPosts(3);
  const posts = mediumPosts.length > 0 ? mediumPosts : blogData;
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <EvidenceStrip />
        <section id="work" className="section-shell section-block work-section">
          <div className="section-heading work-heading"><div><p className="section-label">01 / selected work</p><h2>Systems built for real constraints</h2></div><p className="section-intro">Four products, four different problems. Each story focuses on the decision that made the system dependable.</p></div>
          <div className="project-stories">{featuredProjects.map((project, index) => <ProjectStory key={project.slug} project={project} index={index + 1} />)}</div>
        </section>
        <ExperienceSection />
        <CapabilitiesSection />
        <MoreWorkSection />
        <WritingSection posts={posts} />
        <BackgroundSection />
        <ContactSection />
      </main>
      <SiteFooter />
      <AnalyticsConsent />
    </>
  );
}
