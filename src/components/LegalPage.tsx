import { Footer } from "./Footer";
import { Header } from "./Header";

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="section">
        <div className="container" style={{ maxWidth: 760, display: "grid", gap: 20 }}>
          <h1 className="h2">{title}</h1>
          <div style={{ display: "grid", gap: 16, color: "var(--ink-soft)" }}>{children}</div>
          <a href="/" className="link">
            Back to the page
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
