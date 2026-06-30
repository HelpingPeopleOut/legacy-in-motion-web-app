export default function ToolLoadingSkeleton() {
  return (
    <div className="portal-workspace portal-workspace--loading" aria-busy="true" aria-label="Loading tool">
      <div className="portal-skeleton-header">
        <div className="portal-skeleton-line portal-skeleton-line--short" />
        <div className="portal-skeleton-line portal-skeleton-line--title" />
        <div className="portal-skeleton-line portal-skeleton-line--medium" />
      </div>
      <div className="portal-skeleton-grid">
        <div className="portal-skeleton-card" />
        <div className="portal-skeleton-card" />
        <div className="portal-skeleton-card portal-skeleton-card--wide" />
      </div>
    </div>
  );
}
