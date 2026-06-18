export default function AgentHello() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)", color: "#fff", fontFamily: "Space Grotesk, system-ui, sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", textAlign: "center" }}>
      <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🤖</div>
      <h1 style={{ fontSize: "3rem", fontWeight: 700, margin: 0, background: "linear-gradient(90deg, #F5A05A, #C8960C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Glitch Inc Engineering</h1>
      <p style={{ fontSize: "1.2rem", color: "#8C8C8C", maxWidth: 500, marginTop: "1rem" }}>
        This page was autonomously designed, built, tested, and deployed by the AI engineering team.
        No human touched the code.
      </p>
      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        {["Wasla", "NexaPay", "Fabrix", "Tanit"].map(p => (
          <span key={p} style={{ padding: "0.5rem 1.5rem", background: "rgba(245,160,90,0.1)", border: "1px solid rgba(245,160,90,0.3)", borderRadius: 20, fontSize: "0.9rem", color: "#F5A05A" }}>{p}</span>
        ))}
      </div>
      <p style={{ color: "#555E6B", fontSize: "0.8rem", marginTop: "3rem" }}>backendglitch.com/test/hello</p>
    </div>
  );
}
