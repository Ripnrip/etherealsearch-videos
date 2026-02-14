import React from "react";

// Color constants matching EtherealSearch design
export const colors = {
  background: "#030712",
  backgroundSecondary: "#0c1222",
  accentSky: "#38bdf8",
  accentViolet: "#a78bfa",
  etherealCyan: "#00d4ff",
  etherealGreen: "#00ff88",
  white: "#ffffff",
  gray400: "#9ca3af",
  gray500: "#6b7280",
};

// Shared styles object
export const styles = {
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.background,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter, system-ui, sans-serif",
    position: "relative" as const,
    overflow: "hidden" as const,
  },
  gradientText: {
    background: `linear-gradient(135deg, ${colors.accentSky}, ${colors.accentViolet})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  gradientTextCyan: {
    background: `linear-gradient(90deg, ${colors.etherealCyan}, ${colors.etherealGreen}, ${colors.etherealCyan})`,
    backgroundSize: "200% 100%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  glass: {
    background: "rgba(255, 255, 255, 0.03)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
  },
  button: {
    background: `linear-gradient(to right, ${colors.accentSky}, ${colors.accentViolet})`,
    padding: "16px 32px",
    borderRadius: 12,
    color: colors.white,
    fontWeight: 600,
    fontSize: 18,
    border: "none",
    cursor: "pointer",
  },
};

// Vector background component
export const VectorBackground: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      opacity: 0.3,
      background: `
        radial-gradient(circle at 20% 20%, ${colors.accentSky}15 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, ${colors.accentViolet}15 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, ${colors.etherealCyan}10 0%, transparent 70%)
      `,
    }}
  />
);

// Grid pattern overlay
export const GridPattern: React.FC = () => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
    }}
  />
);
