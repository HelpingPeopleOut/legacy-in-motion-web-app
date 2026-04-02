import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <h3>Legacy in Motion</h3>
        <p className="footer-sub">
          Nelly Lara | Senior Financial Associate | Proudly partnered with Experior Financial Group Inc.
        </p>

        <div className="footer-links">
          <Link href="/">Home</Link>
          <Link href="/#framework">The 7-Steps</Link>
          <Link href="/mission">Mission</Link>
          <Link href="/freedom-financial-baby">Freedom Financial Baby</Link>
          <Link href="/workshops">Workshops</Link>
          <a href="tel:626-203-7652">Call: 626-203-7652</a>
        </div>

        <p
          style={{
            color: "#666666",
            fontSize: "0.85rem",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: "1.8",
          }}
        >
          Disclaimer: The information provided on this website is for educational
          purposes only and does not constitute financial, legal, or tax advice.
          Financial education and long-term financial planning should be tailored
          to individual circumstances. Please consult with a licensed professional
          regarding your specific situation before making investment decisions.
        </p>
      </div>
    </footer>
  );
}