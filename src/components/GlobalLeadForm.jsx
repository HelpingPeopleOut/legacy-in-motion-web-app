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
    submit: isEs ? "Solicitar Mi Estrategia Gratuita" : "Request My Free Strategy",
    submitting: isEs ? "Enviando su solicitud..." : "Submitting your request..."
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("attachment");

    const sendData = async (base64, name, type) => {
      const payload = {
        Name: formData.get("Name"),
        Email: formData.get("Email"),
        Phone: formData.get("Phone"),
        Interest: formData.get("Interest"),
        Notes: formData.get("Notes"),
        Source: sourcePage || "Website Form",
        fileBase64: base64,
        fileName: name,
        mimeType: type
      };

      try {
        // TU GOOGLE APPS SCRIPT URL YA ESTÁ INTEGRADA AQUÍ:
        await fetch("https://script.google.com/macros/s/AKfycbyitmS-i4AxF7jg9GKgID5zpQAh83JjSDV5cbywccURQ4qqVPplG2kliP-RC59pCweX/exec", {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        
        // Redirige a la página de "Gracias" correcta según el idioma
        router.push(isEs ? "/es/gracias" : "/thank-you");
      } catch (error) {
        console.error("Error submitting form:", error);
        setIsSubmitting(false);
      }
    };

    if (file && file.size > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        sendData(base64String, file.name, file.type);
      };
      reader.readAsDataURL(file);
    } else {
      sendData("", "", "");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ background: "var(--bg-card)", padding: "3rem 2rem", borderRadius: "16px", border: "1px solid var(--border-light)", boxShadow: "var(--shadow-md)" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{title}</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem" }}>{subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.name}</label>
            <input type="text" name="Name" required placeholder={t.namePlaceholder} disabled={isSubmitting} style={inputStyle} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.email}</label>
            <input type="email" name="Email" required placeholder={t.emailPlaceholder} disabled={isSubmitting} style={inputStyle} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.phone}</label>
            <input type="tel" name="Phone" required placeholder={t.phonePlaceholder} disabled={isSubmitting} style={inputStyle} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.interest}</label>
            <select name="Interest" required disabled={isSubmitting} style={{...inputStyle, cursor: "pointer"}}>
              {dropdownOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.notes}</label>
            <textarea name="Notes" rows="4" placeholder={t.notesPlaceholder} disabled={isSubmitting} style={{...inputStyle, resize: "vertical"}}></textarea>
          </div>

          <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
            <label style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>{t.file}</label>
            <input type="file" name="attachment" accept="image/*, application/pdf" disabled={isSubmitting} style={{ color: "var(--text-main)", background: "transparent", border: "1px dashed var(--border-light)", padding: "1rem", borderRadius: "8px", width: "100%", cursor: "pointer" }} />
          </div>

          <button type="submit" className="btn-gold btn-pulse" disabled={isSubmitting} style={{ gridColumn: "1 / -1", padding: "1.2rem", fontSize: "1.1rem", border: "none", borderRadius: "8px", cursor: isSubmitting ? "not-allowed" : "pointer", opacity: isSubmitting ? 0.7 : 1, width: "100%" }}>
            {isSubmitting ? t.submitting : t.submit}
          </button>
          
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "1rem", borderRadius: "8px", border: "1px solid var(--border-light)",
  background: "var(--bg-page)", fontSize: "1rem", color: "var(--text-main)", width: "100%", outline: "none"
};