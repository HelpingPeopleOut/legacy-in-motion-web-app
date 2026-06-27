"use client";

import { useCallback, useId, useRef, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_FORM_ACTION ?? "";

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function validatePhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10;
}

function scheduleSubmit(task) {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    window.requestIdleCallback(task);
    return;
  }
  setTimeout(task, 0);
}

export default function GlobalLeadForm({
  title,
  subtitle,
  sourcePage,
  dropdownOptions,
  locationCity = "",
  locationState = "",
}) {
  const formId = useId();
  const statusId = `${formId}-status`;
  const router = useRouter();
  const pathname = usePathname() || "/";
  const isSpanish = pathname.startsWith("/es");
  const formRef = useRef(null);

  const [status, setStatus] = useState("idle");
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [, startTransition] = useTransition();

  const labels = {
    name: isSpanish ? "Nombre completo" : "Full Name",
    email: isSpanish ? "Correo electrónico" : "Email Address",
    phone: isSpanish ? "Teléfono" : "Phone Number",
    interest: isSpanish ? "Área de interés principal" : "Primary Area of Interest",
    notes: isSpanish ? "Notas adicionales" : "Additional Notes",
    attachment: isSpanish ? "Adjuntar archivo (opcional)" : "Attach File or Statement (Optional - 100% Secure)",
    submit: isSpanish ? "Solicitar consulta privada" : "Request Private Consultation",
    submitting: isSpanish ? "Enviando…" : "Submitting…",
    selectPlaceholder: isSpanish ? "Seleccione una opción…" : "Select an option…",
    success: isSpanish
      ? "¡Gracias! Redirigiendo para confirmar su solicitud…"
      : "Thank you! Redirecting to confirm your request…",
    errorGeneric: isSpanish
      ? "No pudimos enviar su solicitud. Intente de nuevo o llámenos."
      : "We couldn't submit your request. Please try again or call us.",
    nameRequired: isSpanish ? "Ingrese su nombre." : "Please enter your name.",
    emailInvalid: isSpanish ? "Ingrese un correo válido." : "Please enter a valid email.",
    phoneInvalid: isSpanish ? "Ingrese un teléfono válido (10+ dígitos)." : "Please enter a valid phone (10+ digits).",
    interestRequired: isSpanish ? "Seleccione un área de interés." : "Please select an area of interest.",
  };

  const validateForm = useCallback((form) => {
    const data = new FormData(form);
    const errors = {};
    const name = String(data.get("Name") ?? "").trim();
    const email = String(data.get("Email") ?? "").trim();
    const phone = String(data.get("Phone") ?? "").trim();
    const interest = String(data.get("Interest") ?? "").trim();

    if (!name) errors.name = labels.nameRequired;
    if (!email || !validateEmail(email)) errors.email = labels.emailInvalid;
    if (!phone || !validatePhone(phone)) errors.phone = labels.phoneInvalid;
    if (!interest) errors.interest = labels.interestRequired;

    return errors;
  }, [labels.emailInvalid, labels.interestRequired, labels.nameRequired, labels.phoneInvalid]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const form = event.currentTarget;

      const errors = validateForm(form);
      setFieldErrors(errors);
      setFormError("");

      if (Object.keys(errors).length > 0) return;

      setStatus("submitting");

      scheduleSubmit(() => {
        startTransition(async () => {
          try {
            const payload = new FormData(form);

            if (LEAD_ENDPOINT) {
              const response = await fetch(LEAD_ENDPOINT, {
                method: "POST",
                body: payload,
                mode: "no-cors",
              });
              // no-cors returns opaque — treat as submitted when endpoint is configured
              void response;
            }

            setStatus("success");
            form.reset();

            const thanksPath = isSpanish ? "/es/gracias" : "/thanks";
            router.push(thanksPath);
          } catch {
            setStatus("error");
            setFormError(labels.errorGeneric);
          }
        });
      });
    },
    [isSpanish, labels.errorGeneric, router, validateForm]
  );

  const isSubmitting = status === "submitting";

  return (
    <section
      id="consultation"
      className="lead-gen"
      style={{ padding: "6rem 0", background: "var(--bg-card)" }}
      aria-labelledby={`${formId}-title`}
    >
      <div className="container">
        <div className="text-center" style={{ marginBottom: "3rem" }}>
          <h2
            id={`${formId}-title`}
            style={{ fontSize: "clamp(2rem, 5vw, 2.5rem)", color: "var(--text-main)", marginBottom: "1rem" }}
          >
            {title}
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            {subtitle}
          </p>
        </div>

        <div
          id={statusId}
          role="status"
          aria-live="polite"
          className={`lead-form-status${status === "error" ? " lead-form-status--error" : ""}${status === "success" ? " lead-form-status--success" : ""}`}
          style={{ display: status === "idle" ? "none" : "block" }}
        >
          {status === "success" && labels.success}
          {status === "error" && (formError || labels.errorGeneric)}
        </div>

        <form
          ref={formRef}
          noValidate
          onSubmit={handleSubmit}
          className="lead-form-grid"
          style={{
            background: "var(--bg-page)",
            padding: "clamp(2rem, 5vw, 3.5rem)",
            borderRadius: "24px",
            boxShadow: "var(--shadow-md)",
            border: "1px solid var(--border-light)",
            maxWidth: "800px",
            margin: "0 auto",
            display: "grid",
            gap: "1.5rem",
          }}
        >
          <input type="hidden" name="Source" value={sourcePage || "Website Contact Form"} />
          {locationCity ? <input type="hidden" name="LocationCity" value={locationCity} /> : null}
          {locationState ? <input type="hidden" name="LocationState" value={locationState} /> : null}
          <input type="hidden" name="PagePath" value={pathname} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label htmlFor={`${formId}-name`} style={labelStyle}>
                {labels.name}
              </label>
              <div className="enterprise-input-container">
                <input
                  id={`${formId}-name`}
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g. John Doe"
                  className={`enterprise-input${fieldErrors.name ? " input-invalid" : ""}`}
                  name="Name"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? `${formId}-name-error` : undefined}
                />
                <svg className="enterprise-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
              </div>
              {fieldErrors.name ? (
                <span id={`${formId}-name-error`} className="field-error" role="alert">
                  {fieldErrors.name}
                </span>
              ) : null}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label htmlFor={`${formId}-email`} style={labelStyle}>
                {labels.email}
              </label>
              <div className="enterprise-input-container">
                <input
                  id={`${formId}-email`}
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@email.com"
                  className={`enterprise-input${fieldErrors.email ? " input-invalid" : ""}`}
                  name="Email"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? `${formId}-email-error` : undefined}
                />
                <svg className="enterprise-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </div>
              {fieldErrors.email ? (
                <span id={`${formId}-email-error`} className="field-error" role="alert">
                  {fieldErrors.email}
                </span>
              ) : null}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label htmlFor={`${formId}-phone`} style={labelStyle}>
                {labels.phone}
              </label>
              <div className="enterprise-input-container">
                <input
                  id={`${formId}-phone`}
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(555) 123-4567"
                  className={`enterprise-input${fieldErrors.phone ? " input-invalid" : ""}`}
                  name="Phone"
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? `${formId}-phone-error` : undefined}
                />
                <svg className="enterprise-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </div>
              {fieldErrors.phone ? (
                <span id={`${formId}-phone-error`} className="field-error" role="alert">
                  {fieldErrors.phone}
                </span>
              ) : null}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label htmlFor={`${formId}-interest`} style={labelStyle}>
                {labels.interest}
              </label>
              <div className="enterprise-input-container">
                <select
                  id={`${formId}-interest`}
                  name="Interest"
                  required
                  className={`enterprise-input${fieldErrors.interest ? " input-invalid" : ""}`}
                  style={{ cursor: "pointer" }}
                  defaultValue=""
                  aria-invalid={Boolean(fieldErrors.interest)}
                  aria-describedby={fieldErrors.interest ? `${formId}-interest-error` : undefined}
                >
                  <option value="" disabled>
                    {labels.selectPlaceholder}
                  </option>
                  {dropdownOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <svg className="enterprise-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
              </div>
              {fieldErrors.interest ? (
                <span id={`${formId}-interest-error`} className="field-error" role="alert">
                  {fieldErrors.interest}
                </span>
              ) : null}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <label htmlFor={`${formId}-notes`} style={labelStyle}>
              {labels.notes}
            </label>
            <textarea
              id={`${formId}-notes`}
              name="Notes"
              rows={4}
              placeholder={
                isSpanish ? "Describa brevemente su situación u objetivos…" : "Briefly describe your situation or goals…"
              }
              className="enterprise-input"
              style={{ paddingLeft: "1.2rem", resize: "vertical" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" }}>
            <label htmlFor={`${formId}-attachment`} style={labelStyle}>
              {labels.attachment}
            </label>
            <div className="file-dropzone">
              <input id={`${formId}-attachment`} type="file" accept="image/*, application/pdf" name="attachment" />
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" style={{ marginBottom: "10px" }} aria-hidden><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
              <p style={{ color: "var(--text-muted)", margin: 0 }}>
                {isSpanish ? "Haga clic o arrastre un archivo aquí" : "Click to browse or drag file here"}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="btn-gold btn-pulse"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              padding: "1.2rem",
              fontSize: "1.1rem",
              border: "none",
              borderRadius: "12px",
              cursor: isSubmitting ? "wait" : "pointer",
              width: "100%",
              fontWeight: "bold",
              touchAction: "manipulation",
              opacity: isSubmitting ? 0.85 : 1,
            }}
          >
            {isSubmitting ? labels.submitting : labels.submit}
          </button>
        </form>
      </div>
    </section>
  );
}

const labelStyle = {
  fontWeight: 600,
  color: "var(--text-muted)",
  fontSize: "0.9rem",
  textTransform: "uppercase",
  letterSpacing: "1px",
};
