"use client";

export default function TrustBadges({ lang = "en" }) {
  const isEs = lang === "es";
  
  return (
    <section style={{ padding: "3rem 0", background: "var(--bg-page)", borderBottom: "1px solid var(--border-light)" }}>
      <div className="container text-center">
        <p style={{ 
          fontSize: "0.9rem", 
          textTransform: "uppercase", 
          letterSpacing: "2px", 
          color: "var(--text-muted)", 
          marginBottom: "2rem",
          fontWeight: 600
        }}>
          {isEs ? "Orgullosamente Asociados Con Líderes de la Industria" : "Proudly Partnered With Industry Leaders"}
        </p>
        
        {/* We use CSS grid to make logos responsive */}
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          justifyContent: "center", 
          alignItems: "center", 
          gap: "3rem",
          opacity: 0.6 /* Makes logos look sleek and less distracting */
        }}>
          {/* Replace src with actual paths to your transparent PNG logos in the public folder */}
          <h3 style={{ fontFamily: "var(--font-heading)", margin: 0 }}>EXPERIOR</h3>
          <h3 style={{ fontFamily: "var(--font-heading)", margin: 0 }}>NATIONAL LIFE GROUP</h3>
          <h3 style={{ fontFamily: "var(--font-heading)", margin: 0 }}>FIDELITY</h3>
          <h3 style={{ fontFamily: "var(--font-heading)", margin: 0 }}>ALLIANZ</h3>
          <h3 style={{ fontFamily: "var(--font-heading)", margin: 0 }}>PACIFIC LIFE</h3>
        </div>
      </div>
    </section>
  );
}