"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function GlobalLeadForm({ title, subtitle, sourcePage, dropdownOptions, lang = "en" }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);

  const isEs = lang === "es";

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
    fileLabel: isEs ? "Adjuntar Archivo o Estado de Cuenta (Opcional - 100% Seguro)" : "Attach File or Statement (Optional - 100% Secure)",
    fileDropText: isEs ? "Haga clic para seleccionar o arrastre el archivo aquí" : "Click to browse or drag file here",
    fileSelected: isEs ? "Archivo seleccionado:" : "Selected file:",
    submit: isEs ? "Solicitar Asesoría Privada" : "Request Private Consultation",
    submitting: isEs ? "Enviando de forma segura..." : "Transmitting securely..."
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) setSelectedFileName(e.target.files[0].name);
    else setSelectedFileName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    data.SourcePage = sourcePage;
    data.Language = isEs ? "Spanish" : "English";

    const fileInput = fileInputRef.current;
    if (fileInput && fileInput.files.length > 0) {
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
      
      <style dangerouslySetInnerHTML={{__html: `
        .enterprise-input-container { position: relative; }
        .enterprise-icon { position: absolute; left: 1.2rem; top: 50%; transform: translateY(-50%); color: var(--text-muted); pointer-events: none; transition: all 0.3s; }
        .enterprise-input { width: 100%; padding: 1.2rem 1.2rem 1.2rem 3rem; border-radius: 12px; border: 1px solid var(--border-light); background: var(--bg-page); font-size: 1.05rem; color: var(--text-main); outline: none; transition: all 0.3s; touch-action: manipulation; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); }
        .enterprise-input:focus { border-color: var(--gold); box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1); }
        .enterprise-input:focus + .enterprise-icon { color: var(--gold); }
        
        .file-dropzone { border: 2px dashed var(--border-light); border-radius: 12px; padding: 2rem; text-align: center; cursor: pointer; transition: all 0.3s; background: rgba(0,0,0,0.02); position: relative; overflow: hidden; }
        .file-dropzone:hover { border-color: var(--gold); background: rgba(212, 175, 55, 0.05); }
        .file-dropzone input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />

      <div className="container">
        
        <div className="text-center" style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", color: "var(--text-main)", marginBottom: "1rem" }}>{title}</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: "var(--bg-page)", padding: "clamp(2rem, 5vw, 3.5rem)", borderRadius: "24px", boxShadow: "var(--shadow-md)", border: "1px solid var(--border-light)", maxWidth: "800px", margin: "0 auto", display: "grid", gap: "1.5rem" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.name}</label>
              <div className="enterprise-input-container">
                <input type="text" name="Name" required placeholder={t.namePlaceholder} disabled={isSubmitting} className="enterprise-input" />
                <svg className="enterprise-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.email}</label>
              <div className="enterprise-input-container">
                <input type="email" name="Email" required placeholder={t.emailPlaceholder} disabled={isSubmitting} className="enterprise-input" />
                <svg className="enterprise-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.phone}</label>
              <div className="enterprise-input-container">
                <input type="tel" name="Phone" required placeholder={t.phonePlaceholder} disabled={isSubmitting} className="enterprise-input" />
                <svg className="enterprise-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.interest}</label>
              <div className="enterprise-input-container">
                <select name="Interest" required disabled={isSubmitting} className="enterprise-input" style={{ cursor: "pointer" }}>
                  <option value="" disabled selected>Select an option...</option>
                  {dropdownOptions.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                  ))}
                </select>
                <svg className="enterprise-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.notes}</label>
            <textarea name="Notes" rows="4" placeholder={t.notesPlaceholder} disabled={isSubmitting} className="enterprise-input" style={{ paddingLeft: "1.2rem", resize: "vertical" }}></textarea>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
            <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.fileLabel}</label>
            <div className="file-dropzone">
              <input type="file" name="attachment" accept="image/*, application/pdf" disabled={isSubmitting} ref={fileInputRef} onChange={handleFileChange} />
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "10px" }}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
              {selectedFileName ? (
                <p style={{ color: "var(--text-main)", fontWeight: 600, margin: 0 }}>{t.fileSelected} <span style={{ color: "var(--gold)" }}>{selectedFileName}</span></p>
              ) : (
                <p style={{ color: "var(--text-muted)", margin: 0 }}>{t.fileDropText}</p>
              )}
            </div>
          </div>

          <button type="submit" className="btn-gold btn-pulse" disabled={isSubmitting} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "1.2rem", fontSize: "1.1rem", border: "none", borderRadius: "12px", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.8 : 1, width: "100%", fontWeight: "bold", touchAction: "manipulation" }}>
            {isSubmitting ? (
              <>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                  <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                </svg>
                {t.submitting}
              </>
            ) : (
              t.submit
            )}
          </button>
        </form>
      </div>
    </section>
  );
}