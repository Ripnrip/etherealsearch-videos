import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { colors, VectorBackground, GridPattern } from "../components/SharedStyles";

const features = [
  { icon: "scan", title: "Diagram Analysis", description: "Parse blueprints & schematics with precision" },
  { icon: "camera", title: "Photo Processing", description: "Analyze field photos & equipment images" },
  { icon: "languages", title: "Multi-Language OCR", description: "Extract text in 50+ languages" },
  { icon: "brain", title: "Agentic Reasoning", description: "AI that thinks through complex problems" },
  { icon: "database", title: "Knowledge Integration", description: "Connect to your existing systems" },
  { icon: "users", title: "Collaboration", description: "Share analyses & build team knowledge" },
];

const FeatureIcon: React.FC<{ type: string; color: string }> = ({ type, color }) => {
  const props = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2 };

  switch (type) {
    case "scan":
      return (
        <svg {...props}>
          <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
          <rect x="7" y="7" width="10" height="10" rx="1" />
        </svg>
      );
    case "camera":
      return (
        <svg {...props}>
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      );
    case "languages":
      return (
        <svg {...props}>
          <path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6" />
        </svg>
      );
    case "brain":
      return (
        <svg {...props}>
          <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.54" />
          <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.54" />
        </svg>
      );
    case "database":
      return (
        <svg {...props}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5V19A9 3 0 0 0 21 19V5" />
          <path d="M3 12A9 3 0 0 0 21 12" />
        </svg>
      );
    case "users":
      return (
        <svg {...props}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return null;
  }
};

export const FeaturesDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Title animation
  const titleProgress = spring({ frame, fps, config: { damping: 12 } });

  // Feature cards stagger animation
  const getCardProgress = (index: number) => {
    const startFrame = 30 + index * 15;
    return spring({ frame: frame - startFrame, fps, config: { damping: 12 } });
  };

  // Marquee animation
  const marqueeX = interpolate(frame, [200, 300], [0, -500], { extrapolateRight: "clamp" });

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
          Powerful{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${colors.accentSky}, ${colors.accentViolet})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Capabilities
          </span>
        </h2>

        {/* Features Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            width: "100%",
            maxWidth: 1200,
          }}
        >
          {features.map((feature, index) => {
            const progress = getCardProgress(index);
            const isVisible = frame >= 30 + index * 15;

            return (
              <div
                key={index}
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 20,
                  padding: 32,
                  opacity: isVisible ? progress : 0,
                  transform: `translateY(${interpolate(progress, [0, 1], [30, 0])}px)`,
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: `linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(167, 139, 250, 0.2))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <FeatureIcon type={feature.icon} color={colors.accentSky} />
                </div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: colors.white,
                    marginBottom: 12,
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: 15, color: colors.gray400, margin: 0, lineHeight: 1.5 }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tech Marquee */}
        {frame >= 200 && (
          <div
            style={{
              position: "absolute",
              bottom: 60,
              left: 0,
              right: 0,
              overflow: "hidden",
              padding: "20px 0",
              background: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 48,
                transform: `translateX(${marqueeX}px)`,
              }}
            >
              {[...Array(2)].map((_, setIndex) =>
                [
                  "Artificial Intelligence",
                  "Machine Learning",
                  "Computer Vision",
                  "NLP",
                  "Knowledge Graphs",
                  "RAG Architecture",
                ].map((tech, i) => (
                  <div
                    key={`${setIndex}-${i}`}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      borderRadius: 9999,
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      background: "rgba(255, 255, 255, 0.05)",
                      padding: "12px 24px",
                      fontSize: 16,
                      fontWeight: 500,
                      color: colors.gray400,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tech}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
