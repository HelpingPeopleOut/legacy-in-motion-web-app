"use client";

import { useEffect } from "react";
import WealthCalculator from "@/components/WealthCalculator";
import ProgressTracker from "@/components/ProgressTracker";
import RuleOf72 from "@/components/RuleOf72";
import DIMECalculator from "@/components/DIMECalculator";
import DebtFreedomVisualizer from "@/components/DebtFreedomVisualizer";
import TaxFreeComparison from "@/components/TaxFreeComparison";
import CostOfWaiting from "@/components/CostOfWaiting";

export default function HerramientasPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <title>Herramientas del Taller | Legacy in Motion</title>
      
      <section className="hero" style={{ padding: "10rem 0 4rem 0", background: "var(--bg-dark)" }}>
        <div className="container text-center">
          <span style={{ color: "var(--gold)", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" }}>
            Acceso Exclusivo de la Aplicación
          </span>
          <h1 style={{ fontSize: "3.2rem", maxWidth: "800px", margin: "1rem auto 1.5rem", color: "#fff" }}>
            Caja de Herramientas <span className="text-gold">del Taller.</span>
          </h1>
          <p style={{ fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto", color: "#ccc" }}>
            Siga la presentación con Nelly durante el taller. Utilice estas herramientas para calcular su trayectoria de riqueza y descubrir sus necesidades exactas.
          </p>
        </div>
      </section>

      {/* 7-TOOL POWER GRID (SPANISH) */}
      <section style={{ padding: "5rem 0", background: "var(--bg-page)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "stretch" }}>
            
            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>1. Calculadora de Riqueza</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Calcule el poder del interés compuesto exactamente como se muestra en la presentación.</p>
              <WealthCalculator />
            </div>

            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>2. La Regla del 72</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Descubra cuántos años tarda su dinero en duplicarse según su tasa de interés.</p>
              <RuleOf72 />
            </div>

            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>3. El Costo de Esperar</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Vea exactamente cuánta riqueza pierde al posponer su inversión por solo 5 años.</p>
              <CostOfWaiting />
            </div>

            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>4. Visualizador de Deuda</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Vea exactamente cuántos intereses le están robando los bancos a su futuro.</p>
              <DebtFreedomVisualizer />
            </div>

            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>5. Jubilación Libre de Impuestos</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Compare los impuestos de un 401(k) contra una estrategia de riqueza libre de impuestos (IUL).</p>
              <TaxFreeComparison />
            </div>

            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>6. Método D.I.M.E.</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Calcule exactamente cuánto seguro de vida necesita su familia para estar protegida.</p>
              <DIMECalculator />
            </div>

            <div>
              <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "var(--text-main)" }}>7. Su Lista de Progreso</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Marque los pasos a medida que asegura su fortaleza financiera. ¡Se guarda en su celular!</p>
              <ProgressTracker />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}