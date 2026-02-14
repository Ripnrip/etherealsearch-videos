import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors, VectorBackground, GridPattern } from "../components/SharedStyles";

const phases = [
  { id: 1, title: "Understanding", description: "Parsing your engineering query...", icon: "brain" },
  { id: 2, title: "Searching", description: "Scanning knowledge base...", icon: "search" },
  { id: 3, title: "Reasoning", description: "Cross-referencing technical data...", icon: "cpu" },
  { id: 4, title: "Answer", description: "Compiling response...", icon: "sparkles" },
];

const PhaseIcon: React.FC<{ type: string; color: string }> = ({ type, color }) => {
  const iconProps = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2 };

  switch (type) {
    case "brain":
      return (
        <svg {...iconProps}>
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.54" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.54" />
        </svg>
      );
    case "search":
      return (
        <svg {...iconProps}>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      );
    case "cpu":
      return (
        <svg {...iconProps}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...iconProps}>
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          <path d="M5 3v4M3 5h4M19 17v4M17 19h4" />
        </svg>
      );
    default:
      return null;
  }
};

export const AgenticDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({ frame, fps, config: { damping: 12 } });

  // Search bar animation
  const searchOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" });

  // Query typing animation
  const queryText = "What is the design wind speed for Austin commercial buildings?";
  const queryProgress = interpolate(frame, [50, 120], [0, queryText.length], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const displayedQuery = queryText.slice(0, Math.floor(queryProgress));

  // Phase animations - each phase takes ~60 frames (2 seconds)
  const getPhaseProgress = (phaseIndex: number) => {
    const startFrame = 130 + phaseIndex * 55;
    const isActive = frame >= startFrame && frame < startFrame + 55;
    const isComplete = frame >= startFrame + 55;
    const progress = isActive ? interpolate(frame, [startFrame, startFrame + 55], [0, 1]) : isComplete ? 1 : 0;
    return { isActive, isComplete, progress };
  };

  // Result animation
  const resultOpacity = interpolate(frame, [340, 360], [0, 1], { extrapolateRight: "clamp" });

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
          padding: 80,
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        {/* Title */}
        <h2
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: colors.white,
            marginBottom: 60,
            textAlign: "center",
            transform: `translateY(${interpolate(titleProgress, [0, 1], [30, 0])}px)`,
            opacity: titleProgress,
          }}
        >
          See the{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${colors.accentSky}, ${colors.accentViolet})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Magic
          </span>{" "}
          in Action
        </h2>

        {/* Glass Card Container */}
        <div
          style={{
            width: "100%",
            maxWidth: 1100,
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: 24,
            padding: 50,
            opacity: searchOpacity,
          }}
        >
          {/* Search Input */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 16,
              padding: "20px 24px",
              marginBottom: 40,
            }}
          >
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.gray500} strokeWidth={2} style={{ marginRight: 16 }}>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span style={{ color: colors.white, fontSize: 20, flex: 1 }}>
              {displayedQuery}
              {frame < 120 && <span style={{ opacity: Math.sin(frame * 0.2) > 0 ? 1 : 0 }}>|</span>}
            </span>
          </div>

          {/* Phase Cards */}
          <div style={{ display: "flex", gap: 20, marginBottom: 40 }}>
            {phases.map((phase, index) => {
              const { isActive, isComplete, progress } = getPhaseProgress(index);
              const bgColor = isComplete
                ? `rgba(${colors.accentSky.replace("#", "")}, 0.1)`
                : isActive
                ? `rgba(${colors.accentViolet.replace("#", "")}, 0.1)`
                : "rgba(255, 255, 255, 0.03)";
              const borderColor = isComplete
                ? "rgba(56, 189, 248, 0.3)"
                : isActive
                ? "rgba(167, 139, 250, 0.3)"
                : "rgba(255, 255, 255, 0.08)";
              const iconColor = isComplete
                ? colors.accentSky
                : isActive
                ? colors.accentViolet
                : colors.gray500;

              return (
                <div
                  key={phase.id}
                  style={{
                    flex: 1,
                    padding: 24,
                    background: bgColor,
                    border: `1px solid ${borderColor}`,
                    borderRadius: 16,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Progress bar */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        height: 3,
                        background: colors.accentViolet,
                        width: `${progress * 100}%`,
                        transition: "width 0.1s",
                      }}
                    />
                  )}

                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: isComplete
                          ? "rgba(56, 189, 248, 0.2)"
                          : isActive
                          ? "rgba(167, 139, 250, 0.2)"
                          : "rgba(255, 255, 255, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {isComplete ? (
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={colors.accentSky} strokeWidth={3}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        <PhaseIcon type={phase.icon} color={iconColor} />
                      )}
                    </div>
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: 16,
                        color: isComplete ? colors.accentSky : isActive ? colors.accentViolet : colors.gray500,
                      }}
                    >
                      {phase.title}
                    </span>
                  </div>
                  {isActive && (
                    <p style={{ fontSize: 13, color: colors.gray400, margin: 0 }}>
                      {phase.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Result Card */}
          <div
            style={{
              background: `linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(167, 139, 250, 0.1))`,
              border: "1px solid rgba(56, 189, 248, 0.2)",
              borderRadius: 16,
              padding: 30,
              opacity: resultOpacity,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={colors.accentSky} strokeWidth={2}>
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
              <span style={{ fontWeight: 600, color: colors.accentSky, fontSize: 18 }}>
                Analysis Complete
              </span>
            </div>
            <p style={{ color: colors.gray400, fontSize: 16, lineHeight: 1.6, marginBottom: 20 }}>
              Based on your query, I found{" "}
              <strong style={{ color: colors.white }}>23 relevant documents</strong> in your
              knowledge base. The design wind speed for Austin commercial buildings is{" "}
              <strong style={{ color: colors.etherealCyan }}>115 mph</strong> (ASCE 7-22, Risk
              Category II).
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              <div
                style={{
                  flex: 1,
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <p style={{ fontSize: 13, color: colors.gray500, marginBottom: 4 }}>Primary Match</p>
                <p style={{ color: colors.white, fontWeight: 500, margin: 0 }}>
                  Austin Building Code 2024, Section 1609
                </p>
              </div>
              <div
                style={{
                  flex: 1,
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <p style={{ fontSize: 13, color: colors.gray500, marginBottom: 4 }}>Confidence Score</p>
                <p style={{ color: colors.accentSky, fontWeight: 600, margin: 0 }}>97.3%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
