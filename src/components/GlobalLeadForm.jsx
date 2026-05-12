"use client";

export default function GlobalLeadForm({ title, subtitle, sourcePage, dropdownOptions }) {
  return (
    <section className="lead-gen" style={{ padding: "6rem 0", background: "var(--bg-card)" }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", color: "var(--text-main)", marginBottom: "1rem" }}>
            {title}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            {subtitle}
          </p>
        </div>
        
        <form 
          style={{ background: "var(--bg-page)", padding: "clamp(2rem, 5vw, 3.5rem)", borderRadius: "24px", boxShadow: "var(--shadow-md)", border: "1px solid var(--border-light)", maxWidth: "800px", margin: "0 auto", display: "grid", gap: "1.5rem" }}
        >
          <input type="hidden" name="Source" value={sourcePage || "Website Contact Form"} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>Full Name</label>
              <div className="enterprise-input-container">
                <input type="text" required placeholder="e.g. John Doe" className="enterprise-input" name="Name" />
                <svg className="enterprise-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>Email Address</label>
              <div className="enterprise-input-container">
                <input type="email" required placeholder="you@email.com" className="enterprise-input" name="Email" />
                <svg className="enterprise-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>Phone Number</label>
              <div className="enterprise-input-container">
                <input type="tel" required placeholder="(555) 123-4567" className="enterprise-input" name="Phone" />
                <svg className="enterprise-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>Primary Area of Interest</label>
              <div className="enterprise-input-container">
                {/* CRITICAL FIX: Removed the illegal 'selected' attribute. Added defaultValue="" to the select parent instead. */}
                <select name="Interest" required className="enterprise-input" style={{ cursor: "pointer" }} defaultValue="">
                  <option value="" disabled>Select an option...</option>
                  {dropdownOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
                <svg className="enterprise-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>Additional Notes</label>
            <textarea name="Notes" rows="4" placeholder="Briefly describe your situation or goals..." className="enterprise-input" style={{ paddingLeft: "1.2rem", resize: "vertical" }}></textarea>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
            <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>Attach File or Statement (Optional - 100% Secure)</label>
            <div className="file-dropzone">
              <input type="file" accept="image/*, application/pdf" name="attachment" />
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "10px" }}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
              <p style={{ color: "var(--text-muted)", margin: 0 }}>Click to browse or drag file here</p>
            </div>
          </div>

          <button type="submit" className="btn-gold btn-pulse" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "1.2rem", fontSize: "1.1rem", border: "none", borderRadius: "12px", cursor: "pointer", width: "100%", fontWeight: "bold", touchAction: "manipulation" }}>
            Request Private Consultation
          </button>
        </form>
      </div>
    </section>
  );
}