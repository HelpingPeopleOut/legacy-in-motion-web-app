import Link from "next/link";

export default function NotFound() {
  return (
    <section style={{ padding: "8rem 1.25rem 5rem", textAlign: "center", background: "var(--bg-page)" }}>
      <div className="container" style={{ maxWidth: 720 }}>
        <p className="hero-eyebrow">Legacy in Motion</p>
        <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", marginBottom: "1rem" }}>Page not found</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
          That URL is not live. Use one of these paths to continue — or request a free strategy consultation.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
          <Link href="/" className="btn-gold">Home</Link>
          <Link href="/request-callback" className="btn-outline">Free consultation</Link>
          <Link href="/locations" className="btn-outline">Locations</Link>
          <Link href="/financial-education" className="btn-outline">Education hub</Link>
          <Link href="/es" className="btn-outline">Español</Link>
        </div>
      </div>
    </section>
  );
}
