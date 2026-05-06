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
            Siga la presentación con Nelly durante el taller. Utilice estas herramientas interactivas para calcular su trayectoria de riqueza y descubrir sus necesidades exactas.
          </p>
        </div>
      </section>

      {/* 7-TOOL POWER GRID (CLEAN ENTERPRISE DESIGN) */}
      <section style={{ padding: "5rem 0", background: "var(--bg-page)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "2.5rem", alignItems: "stretch" }}>
            
            {/* The tools automatically translate themselves! */}
            <WealthCalculator />
            <RuleOf72 />
            <CostOfWaiting />
            <DebtFreedomVisualizer />
            <TaxFreeComparison />
            <DIMECalculator />
            <ProgressTracker />

          </div>
        </div>
      </section>
    </>
  );
}