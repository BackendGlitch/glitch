import { Metadata } from "next";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Glitch Inc — Agent Lab",
  description: "Pages autonomously built by the Glitch Inc AI engineering team.",
};

function getAgentPages() {
  const agentsDir = path.join(process.cwd(), "app", "test", "agent-pages");
  if (!fs.existsSync(agentsDir)) return {};
  const pages: Record<string, string> = {};
  for (const d of fs.readdirSync(agentsDir, { withFileTypes: true })) {
    if (d.isDirectory()) {
      const pf = path.join(agentsDir, d.name, "page.tsx");
      if (fs.existsSync(pf)) pages[d.name] = d.name.replace(/-/g, " ");
    }
  }
  return pages;
}

export default async function TestPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const route = slug?.join("/") || "";

  // Dynamically import agent pages — sanitized to prevent path traversal
  if (route) {
    const safe = route.replace(/[^a-zA-Z0-9\-_\/]/g, "").replace(/\.\./g, "");
    if (safe !== route || route.includes("..")) {
      return (<div style={{padding:40,fontFamily:"system-ui"}}><h1>400</h1><p>Invalid path</p></div>);
    }
    try {
      const mod = await import(`@/app/test/agent-pages/${safe}/page`);
      const Component = mod.default;
      return <Component />;
    } catch (e) {
      return (
        <div style={{ minHeight: "100vh", background: "#FAFAF8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui" }}>
          <h1 style={{ fontSize: "3rem", color: "#1A1A1A" }}>404</h1>
          <p style={{ color: "#8C8C8C" }}>Agent page /test/{route} not found</p>
          <a href="/test" style={{ color: "#F5A05A", marginTop: "1rem" }}>← Back to Lab</a>
        </div>
      );
    }
  }

  const pages = getAgentPages();
  return (
    <div style={{ minHeight: "100vh", background: "#FAFAF8", color: "#1A1A1A", fontFamily: "Space Grotesk, system-ui, sans-serif", padding: "4rem 2rem", maxWidth: 900, margin: "0 auto" }}>
      <p style={{ color: "#F5A05A", fontWeight: 600, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Glitch Inc Engineering</p>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, margin: "0.5rem 0" }}>/test — Agent Laboratory</h1>
      <p style={{ color: "#8C8C8C", marginBottom: "2rem" }}>Pages autonomously designed, built, tested, and deployed by the AI engineering team. 100% free local models. No API costs.</p>
      {Object.keys(pages).length === 0 ? (
        <div style={{ padding: "3rem", background: "#F0EFEC", borderRadius: 12, textAlign: "center", color: "#8C8C8C" }}>
          <p style={{ fontSize: "1.2rem", margin: 0 }}>No agent pages yet</p>
          <p style={{ fontSize: "0.9rem" }}>The engineering team is building. Every page is verified before deployment.</p>
        </div>
      ) : (
        Object.entries(pages).map(([name, title]) => (
          <a key={name} href={`/test/${name}`} style={{ display: "block", padding: "1.5rem", background: "#F0EFEC", borderRadius: 8, textDecoration: "none", color: "#1A1A1A", fontWeight: 600, borderLeft: "3px solid #F5A05A", marginBottom: "0.5rem" }}>
            {title} <span style={{ fontWeight: 400, color: "#8C8C8C", fontSize: "0.85rem", marginLeft: "0.5rem" }}>/test/{name}</span>
          </a>
        ))
      )}
      <div style={{ marginTop: "3rem", padding: "1.5rem", background: "#F0EFEC", borderRadius: 8, fontSize: "0.85rem", color: "#8C8C8C" }}>
        <strong style={{ color: "#1A1A1A" }}>Agent protocol:</strong> Every page is built → verified locally → build must pass → committed → pushed → verified live. No exceptions.
      </div>
    </div>
  );
}
