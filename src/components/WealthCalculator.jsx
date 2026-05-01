"use client";

import { useState } from "react";

export default function WealthCalculator() {
  const [initialAmount, setInitialAmount] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(20);
  const [interestRate, setInterestRate] = useState(8);

  // Calculate compound interest
  const calculateWealth = () => {
    let total = initialAmount;
    let totalInvested = initialAmount;
    const monthlyRate = interestRate / 100 / 12;
    const totalMonths = years * 12;

    for (let i = 0; i < totalMonths; i++) {
      total = total * (1 + monthlyRate) + monthlyContribution;
      totalInvested += monthlyContribution;
    }

    return {
      futureValue: total,
      totalInvested: totalInvested,
      totalInterest: total - totalInvested,
    };
  };

  const results = calculateWealth();

  // Format currency
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Compound Wealth Projector</h3>
        <p style={styles.subtitle}>See how your money grows over time with the right strategy.</p>
      </div>

      <div style={styles.grid}>
        {/* INPUT CONTROLS */}
        <div style={styles.inputSection}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Initial Investment ($)</label>
            <input 
              type="number" 
              value={initialAmount} 
              onChange={(e) => setInitialAmount(Number(e.target.value))}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Monthly Contribution ($)</label>
            <input 
              type="number" 
              value={monthlyContribution} 
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Years to Grow</label>
            <input 
              type="range" 
              min="1" max="50" 
              value={years} 
              onChange={(e) => setYears(Number(e.target.value))}
              style={styles.range}
            />
            <div style={styles.rangeValue}>{years} Years</div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Estimated Annual Return (%)</label>
            <input 
              type="range" 
              min="1" max="15" step="0.5"
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              style={styles.range}
            />
            <div style={styles.rangeValue}>{interestRate}%</div>
          </div>
        </div>

        {/* RESULTS DISPLAY */}
        <div style={styles.resultSection}>
          <div style={styles.resultCard}>
            <p style={styles.resultLabel}>Estimated Future Value</p>
            <h2 style={styles.resultValueMain}>{formatCurrency(results.futureValue)}</h2>
          </div>
          
          <div style={styles.resultDetails}>
            <div style={styles.detailBox}>
              <p style={styles.detailLabel}>Total Invested</p>
              <p style={styles.detailValue}>{formatCurrency(results.totalInvested)}</p>
            </div>
            <div style={styles.detailBox}>
              <p style={styles.detailLabel}>Interest Earned</p>
              <p style={styles.detailValue} className="text-gold">{formatCurrency(results.totalInterest)}</p>
            </div>
          </div>

          <button style={styles.actionButton} onClick={() => window.location.href = '/request-callback'}>
            Build This Strategy With Nelly
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "var(--bg-page)",
    borderRadius: "16px",
    border: "1px solid var(--border-light)",
    boxShadow: "var(--shadow-md)",
    overflow: "hidden",
    maxWidth: "900px",
    margin: "0 auto",
  },
  header: {
    background: "var(--bg-card)",
    padding: "2rem",
    borderBottom: "1px solid var(--border-light)",
    textAlign: "center",
  },
  title: {
    fontSize: "1.8rem",
    color: "var(--text-main)",
    marginBottom: "0.5rem",
  },
  subtitle: {
    color: "var(--text-muted)",
    fontSize: "1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "0",
  },
  inputSection: {
    padding: "2rem",
    borderRight: "1px solid var(--border-light)",
  },
  inputGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "var(--text-muted)",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  input: {
    width: "100%",
    padding: "0.8rem 1rem",
    borderRadius: "8px",
    border: "1px solid var(--border-light)",
    background: "var(--bg-card)",
    color: "var(--text-main)",
    fontSize: "1.1rem",
    outline: "none",
  },
  range: {
    width: "100%",
    accentColor: "var(--gold)",
    cursor: "pointer",
  },
  rangeValue: {
    textAlign: "right",
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "var(--gold)",
    marginTop: "0.5rem",
  },
  resultSection: {
    padding: "2rem",
    background: "var(--bg-dark)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  resultCard: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  resultLabel: {
    color: "#a0a0a0",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontSize: "0.9rem",
    marginBottom: "1rem",
  },
  resultValueMain: {
    fontSize: "3.5rem",
    color: "#ffffff",
    textShadow: "0 0 20px rgba(212, 175, 55, 0.3)",
    lineHeight: "1",
  },
  resultDetails: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    marginBottom: "2rem",
    background: "rgba(255,255,255,0.05)",
    padding: "1.5rem",
    borderRadius: "12px",
  },
  detailBox: {
    textAlign: "center",
    flex: 1,
  },
  detailLabel: {
    fontSize: "0.85rem",
    color: "#a0a0a0",
    marginBottom: "0.5rem",
  },
  detailValue: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
  actionButton: {
    width: "100%",
    padding: "1rem",
    background: "var(--gold)",
    color: "#000",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "transform 0.2s",
  }
};