"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GlobalLeadForm({ title, subtitle, sourcePage, dropdownOptions, lang = "en" }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Detect Language
  const isEs = lang === "es";

  // Auto-Translating Dictionary
  const t = {
    name: isEs ? "Nombre Completo" : "Full Name",
    namePlaceholder: isEs ? "Ej. Juan Pérez" : "e.g. John Doe",
    email: isEs ? "Correo Electrónico" : "Email Address",
    emailPlaceholder: isEs ? "su@correo.com" : "you@email.com",
    phone: isEs ? "Número de Teléfono" : "Phone Number",
    phonePlaceholder: isEs ? "(555) 123-4567" : "(555) 123-4567",
    interest: isEs ? "Área de Interés Principal" : "Primary Area of Interest",
    notes: isEs ? "Notas Adicionales" : "Additional Notes",
    notesPlaceholder: isEs ? "Describa brevemente su situación o metas..." : "Briefly describe your situation or goals...",
    file: isEs ? "Adjuntar Archivo o Estado de Cuenta (Opcional - 100% Seguro)" : "Attach File or Statement (Optional - 100% Secure)",
    submit: isEs ? "Solicitar Asesoría Privada" : "Request Private Consultation",
    submitting: isEs ? "Enviando de forma segura..." : "Transmitting securely..."
  };

  // Enterprise Input Styling (Prevents zoom, removes 300ms tap delay)
  const inputStyle = {
    width: "100%",
    padding: "1.2rem",
    borderRadius: "12px",
    border: "1px solid var(--border-light)",
    background: "var(--bg-page)",
    fontSize: "1.05rem",
    color: "var(--text-main)",
    outline: "none",
    transition: "var(--transition)",
    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)",
    touchAction: "manipulation" // <--- The magic zero-latency rule
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Inject the page context so Nelly knows exactly which funnel they used
    data.SourcePage = sourcePage;
    data.Language = isEs ? "Spanish" : "English";

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      
      reader.onloadend = async () => {
        data.fileName = file.name;
        data.mimeType = file.type;
        data.fileData = reader.result.split(',')[1]; 
        
        await sendDataToAppScript(data);
      };
      reader.readAsDataURL(file);
    } else {
      await sendDataToAppScript(data);
    }
  };

  const sendDataToAppScript = async (data) => {
    try {
      const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE"; 
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      
      router.push(isEs ? "/es/gracias" : "/thank-you");
    } catch (error) {
      console.error("Submission Error:", error);
      alert(isEs ? "Ocurrió un error. Por favor intente de nuevo." : "An error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="consultation" className="lead-gen fade-in" style={{ padding: "6rem 0", background: "var(--bg-card)" }}>
      <div className="container">
        
        <div className="text-center" style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", color: "var(--text-main)", marginBottom: "1rem" }}>{title}</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: "var(--bg-page)", padding: "3rem 2rem", borderRadius: "24px", boxShadow: "var(--shadow-md)", border: "1px solid var(--border-light)", maxWidth: "800px", margin: "0 auto", display: "grid", gap: "1.5rem" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.name}</label>
              <input type="text" name=\"Name\" required placeholder={t.namePlaceholder} disabled={isSubmitting} style={inputStyle} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.email}</label>
              <input type="email" name=\"Email\" required placeholder={t.emailPlaceholder} disabled={isSubmitting} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.phone}</label>
              <input type="tel" name=\"Phone\" required placeholder={t.phonePlaceholder} disabled={isSubmitting} style={inputStyle} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.interest}</label>
              <select name="Interest" required disabled={isSubmitting} style={inputStyle}>
                {dropdownOptions.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.notes}</label>
            <textarea name="Notes" rows="4" placeholder={t.notesPlaceholder} disabled={isSubmitting} style={{...inputStyle, resize: "vertical"}}></textarea>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
            <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.file}</label>
            <input type="file" name="attachment" accept="image/*, application/pdf" disabled={isSubmitting} style={{ color: "var(--text-main)", background: "transparent", border: "1px dashed var(--border-light)", padding: "1rem", borderRadius: "12px", width: "100%", cursor: "pointer", touchAction: "manipulation" }} />
          </div>

          <button type="submit" className="btn-gold btn-pulse" disabled={isSubmitting} style={{ padding: "1.2rem", fontSize: "1.1rem", border: "none", borderRadius: "12px", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.7 : 1, width: "100%", fontWeight: "bold", touchAction: "manipulation" }}>
            {isSubmitting ? t.submitting : t.submit}
          </button>
          
        </form>
      </div>
    </section>
  );
}