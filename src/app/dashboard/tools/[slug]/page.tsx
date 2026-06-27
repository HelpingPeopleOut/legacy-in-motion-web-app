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
    <div className="portal-tool-page-header">
      <div className="portal-tool-back-row">
        <Link href="/dashboard" className="portal-tool-back">
          ← Back to Tool Hub
        </Link>
        <Link href="/" className="portal-tool-back">
          ← Main site
        </Link>
      </div>
      <div className="portal-tool-meta">
        <span className="portal-tool-category-pill">{TOOL_AUDIENCE_META[tool.audience].label}</span>
        <span className="portal-tool-category-pill portal-tool-category-pill--muted">
          {TOOL_CATEGORY_LABELS[tool.category]}
        </span>
        {tool.access !== "free" && (
          <span className="portal-tool-badge preview">{tool.access.replace("_", " ")}</span>
        )}
      </div>
      <h1 className="portal-tool-title portal-hub-title">{tool.name}</h1>
      <p className="portal-hub-sub mb-0">{tool.description}</p>
      <div className="mt-8">
        <ToolRenderer tool={tool} access={access} hlvReportAccess={hlvReportAccess} />
      </div>
    </div>
  );
}
