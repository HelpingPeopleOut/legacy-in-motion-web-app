import Link from "next/link";
import { notFound } from "next/navigation";
import {
  TOOL_AUDIENCE_META,
  TOOL_CATEGORY_LABELS,
  getToolBySlug,
  TOOLS,
} from "@/lib/tools";
import { getToolAccess, canDownloadHlvReport } from "@/lib/access";
import { ensureDbUser } from "@/lib/user";
import ToolRenderer from "@/components/dashboard/ToolRenderer";
import { ToolIcon } from "@/components/dashboard/ToolIcon";

export const dynamic = "force-static";

export function generateStaticParams() {
  return TOOLS.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  return { title: tool ? `${tool.name} | Client Portal` : "Tool" };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  let user = null;
  try {
    user = await ensureDbUser();
  } catch {
    // preview without DB
  }

  const access = getToolAccess(user, slug);
  const hlvReportAccess = canDownloadHlvReport(user);

  return (
    <>
      <nav className="portal-breadcrumb" aria-label="Breadcrumb">
        <Link href="/dashboard">Tool Hub</Link>
        <span className="portal-breadcrumb-sep" aria-hidden>
          /
        </span>
        <span>{TOOL_AUDIENCE_META[tool.audience].shortLabel}</span>
        <span className="portal-breadcrumb-sep" aria-hidden>
          /
        </span>
        <span aria-current="page">{tool.name}</span>
      </nav>

      <header className="portal-tool-hero portal-fade-in">
        <div className="portal-tool-hero-row">
          <div className="portal-tool-hero-icon">
            <ToolIcon name={tool.icon} className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="portal-tool-meta mb-2">
              <span className="portal-tool-category-pill">{TOOL_AUDIENCE_META[tool.audience].label}</span>
              <span className="portal-tool-category-pill portal-tool-category-pill--muted">
                {TOOL_CATEGORY_LABELS[tool.category]}
              </span>
              {tool.access !== "free" && (
                <span className="portal-tool-badge preview">{tool.access.replace("_", " ")}</span>
              )}
            </div>
            <h1 className="portal-hub-title mb-0 text-2xl md:text-3xl">{tool.name}</h1>
            <p className="portal-hub-sub mb-0 mt-2 max-w-3xl">{tool.description}</p>
          </div>
        </div>
      </header>

      <div className="portal-fade-in portal-fade-in-delay-1">
        <ToolRenderer tool={tool} access={access} hlvReportAccess={hlvReportAccess} />
      </div>
    </>
  );
}
