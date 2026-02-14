import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors, VectorBackground, GridPattern } from "../components/SharedStyles";

export const HeroDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Badge animation
  const badgeScale = spring({ frame, fps, config: { damping: 12 } });
  const badgeOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Title animations with stagger
  const title1Progress = spring({ frame: frame - 15, fps, config: { damping: 10 } });
  const title2Progress = spring({ frame: frame - 30, fps, config: { damping: 10 } });

  // Subtitle animation
  const subtitleOpacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [45, 65], [30, 0], {
    extrapolateRight: "clamp",
  });

  // CTA buttons animation
  const ctaScale = spring({ frame: frame - 70, fps, config: { damping: 12 } });
  const ctaOpacity = interpolate(frame, [70, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Stats animation
  const statsOpacity = interpolate(frame, [100, 130], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Gradient animation
  const gradientPosition = interpolate(frame, [0, 240], [0, 100]);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <VectorBackground />
      <GridPattern />

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 60,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            borderRadius: 9999,
            background: `linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 136, 0.1))`,
            border: "1px solid rgba(0, 212, 255, 0.3)",
            marginBottom: 40,
            transform: `scale(${badgeScale})`,
            opacity: badgeOpacity,
          }}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.etherealCyan} strokeWidth={2}>
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span style={{ color: colors.etherealCyan, fontSize: 14, fontWeight: 500 }}>
            Trusted by 500+ Engineering Teams Worldwide
          </span>
        </div>

        {/* Main Title */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <h1
            style={{
              fontSize: 90,
              fontWeight: 800,
              margin: 0,
              marginBottom: 10,
              transform: `translateY(${interpolate(title1Progress, [0, 1], [50, 0])}px)`,
              opacity: title1Progress,
            }}
          >
            <span
              style={{
                background: `linear-gradient(135deg, ${colors.accentSky}, ${colors.accentViolet})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              EtherealSearch
            </span>
          </h1>
          <h2
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: colors.white,
              margin: 0,
              transform: `translateY(${interpolate(title2Progress, [0, 1], [30, 0])}px)`,
              opacity: title2Progress,
            }}
          >
            Agentic RAG for Engineering
          </h2>
        </div>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 24,
            color: colors.gray400,
            maxWidth: 900,
            textAlign: "center",
            lineHeight: 1.6,
            marginBottom: 50,
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          World-class vision analysis meets intelligent search. Analyze diagrams,
          blueprints, and technical documentation with AI that truly{" "}
          <span style={{ color: colors.etherealCyan }}>understands</span> engineering.
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginBottom: 60,
            transform: `scale(${ctaScale})`,
            opacity: ctaOpacity,
          }}
        >
          <button
            style={{
              padding: "18px 36px",
              borderRadius: 12,
              background: `linear-gradient(to right, ${colors.accentSky}, ${colors.accentViolet})`,
              color: colors.white,
              fontWeight: 600,
              fontSize: 18,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Start Free Trial
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            style={{
              padding: "18px 36px",
              borderRadius: 12,
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: colors.white,
              fontWeight: 600,
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Watch Demo
          </button>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 60,
            opacity: statsOpacity,
          }}
        >
          {[
            { value: "99.7%", label: "Accuracy Rate" },
            { value: "2.4M+", label: "Diagrams Processed" },
            { value: "<500ms", label: "Response Time" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: 20,
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: 16,
                minWidth: 180,
              }}
            >
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${colors.accentSky}, ${colors.accentViolet})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 14, color: colors.gray500, marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
