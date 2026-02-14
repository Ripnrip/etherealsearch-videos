import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { colors, VectorBackground, GridPattern } from "../components/SharedStyles";

// Logo component
const Logo: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, transform: `scale(${scale})` }}>
    <svg width={40} height={40} viewBox="0 0 24 24" fill="none">
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.accentSky} />
          <stop offset="100%" stopColor={colors.accentViolet} />
        </linearGradient>
      </defs>
      <path
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        stroke="url(#logoGrad)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span style={{ fontSize: 24, fontWeight: 700, color: colors.white }}>
      EtherealSearch
    </span>
  </div>
);

// Opening scene (0-180 frames / 0-6 seconds)
const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 10 } });
  const taglineOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" });
  const taglineY = interpolate(frame, [60, 90], [20, 0], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }}>
      <VectorBackground />
      <div style={{ textAlign: "center" }}>
        <div style={{ transform: `scale(${logoScale})`, marginBottom: 30 }}>
          <Logo scale={2.5} />
        </div>
        <p
          style={{
            fontSize: 32,
            color: colors.gray400,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
          }}
        >
          Agentic RAG Smart Search for Engineering Teams
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Problem scene (180-360 frames / 6-12 seconds)
const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 12 } });

  const problems = [
    "2.4M+ engineering documents scattered across systems",
    "Hours wasted searching for specifications",
    "Critical information buried in PDFs and blueprints",
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <VectorBackground />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 100,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <h2
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: colors.white,
            marginBottom: 60,
            textAlign: "center",
            transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
            opacity: titleProgress,
          }}
        >
          The Challenge
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {problems.map((problem, i) => {
            const progress = spring({ frame: frame - 30 - i * 20, fps, config: { damping: 12 } });
            const isVisible = frame >= 30 + i * 20;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  opacity: isVisible ? progress : 0,
                  transform: `translateX(${interpolate(progress, [0, 1], [-30, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "rgba(239, 68, 68, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" />
                    <path d="m15 9-6 6M9 9l6 6" />
                  </svg>
                </div>
                <span style={{ fontSize: 24, color: colors.gray400 }}>{problem}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Solution scene (360-540 frames / 12-18 seconds)
const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({ frame, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <VectorBackground />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <h2
          style={{
            fontSize: 52,
            fontWeight: 700,
            marginBottom: 40,
            textAlign: "center",
            transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
            opacity: titleProgress,
          }}
        >
          <span style={{ color: colors.white }}>Introducing </span>
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
        </h2>

        <p
          style={{
            fontSize: 28,
            color: colors.gray400,
            maxWidth: 900,
            textAlign: "center",
            lineHeight: 1.6,
            marginBottom: 60,
            opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          AI-powered search that understands engineering documents, diagrams, and blueprints.
          Find answers in seconds, not hours.
        </p>

        {/* Stats */}
        <div style={{ display: "flex", gap: 60 }}>
          {[
            { value: "99.7%", label: "Accuracy" },
            { value: "<500ms", label: "Response Time" },
            { value: "50+", label: "Languages" },
          ].map((stat, i) => {
            const progress = spring({ frame: frame - 60 - i * 15, fps, config: { damping: 12 } });
            const isVisible = frame >= 60 + i * 15;

            return (
              <div
                key={i}
                style={{
                  textAlign: "center",
                  padding: 24,
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 20,
                  minWidth: 180,
                  opacity: isVisible ? progress : 0,
                  transform: `translateY(${interpolate(progress, [0, 1], [20, 0])}px)`,
                }}
              >
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 700,
                    background: `linear-gradient(135deg, ${colors.accentSky}, ${colors.accentViolet})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: 16, color: colors.gray500, marginTop: 8 }}>{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// CTA scene (540-720 frames / 18-24 seconds)
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame, fps, config: { damping: 12 } });
  const pulseScale = 1 + Math.sin(frame * 0.1) * 0.02;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }}>
      <VectorBackground />
      <div
        style={{
          textAlign: "center",
          opacity: progress,
          transform: `translateY(${interpolate(progress, [0, 1], [30, 0])}px)`,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <h2
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: colors.white,
            marginBottom: 40,
          }}
        >
          Ready to Transform Your
          <br />
          <span
            style={{
              background: `linear-gradient(135deg, ${colors.accentSky}, ${colors.accentViolet})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Engineering Workflow?
          </span>
        </h2>

        <button
          style={{
            padding: "20px 48px",
            borderRadius: 16,
            background: `linear-gradient(to right, ${colors.accentSky}, ${colors.accentViolet})`,
            color: colors.white,
            fontWeight: 600,
            fontSize: 22,
            border: "none",
            cursor: "pointer",
            transform: `scale(${pulseScale})`,
            transition: "transform 0.1s",
          }}
        >
          Start Free Trial
        </button>

        <p style={{ fontSize: 20, color: colors.gray500, marginTop: 30 }}>
          14-day free trial. No credit card required.
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Closing scene (720-900 frames / 24-30 seconds)
const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.background, justifyContent: "center", alignItems: "center" }}>
      <VectorBackground />
      <div
        style={{
          textAlign: "center",
          opacity: progress,
          transform: `scale(${progress})`,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <Logo scale={3} />
        <p
          style={{
            fontSize: 28,
            color: colors.gray400,
            marginTop: 40,
          }}
        >
          etherealsearch.io
        </p>
      </div>
    </AbsoluteFill>
  );
};

export const PromoVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.background }}>
      <Sequence from={0} durationInFrames={180}>
        <OpeningScene />
      </Sequence>
      <Sequence from={180} durationInFrames={180}>
        <ProblemScene />
      </Sequence>
      <Sequence from={360} durationInFrames={180}>
        <SolutionScene />
      </Sequence>
      <Sequence from={540} durationInFrames={180}>
        <CTAScene />
      </Sequence>
      <Sequence from={720} durationInFrames={180}>
        <ClosingScene />
      </Sequence>
    </AbsoluteFill>
  );
};
