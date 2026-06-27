import Link from "next/link";
import { notFound } from "next/navigation";
import { getToolBySlug, TOOLS } from "@/lib/tools";
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
    <div>
      <Link
        href="/dashboard"
        className="mb-6 inline-block text-sm text-[var(--color-portal-muted)] hover:text-[var(--color-portal-gold)]"
      >
        ← Back to Tool Hub
      </Link>
      <h1 className="mb-2 text-2xl font-semibold">{tool.name}</h1>
      <p className="mb-8 max-w-2xl text-[var(--color-portal-muted)]">{tool.description}</p>
      <ToolRenderer tool={tool} access={access} hlvReportAccess={hlvReportAccess} />
    </div>
  );
}
