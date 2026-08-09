export type PortfolioEvent =
  | "audience_path_click"
  | "email_cta_click"
  | "resume_download"
  | "project_click"
  | "github_click"
  | "writing_click";

export function trackEvent(name: PortfolioEvent, params: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (command: string, name: string, params?: Record<string, string>) => void }).gtag;
  if (gtag) gtag("event", name, params);
  const va = (window as Window & { va?: (command: string, params?: Record<string, string>) => void }).va;
  if (va) va("event", { name, ...params });
}
