import { Composition } from "remotion";
import { HeroDemo } from "./compositions/HeroDemo";
import { AgenticDemo } from "./compositions/AgenticDemo";
import { FeaturesDemo } from "./compositions/FeaturesDemo";
import { PromoVideo } from "./compositions/PromoVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main promotional video - 30 seconds */}
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Hero section demo - 8 seconds */}
      <Composition
        id="HeroDemo"
        component={HeroDemo}
        durationInFrames={240}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Agentic RAG flow demo - 12 seconds */}
      <Composition
        id="AgenticDemo"
        component={AgenticDemo}
        durationInFrames={360}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Features showcase - 10 seconds */}
      <Composition
        id="FeaturesDemo"
        component={FeaturesDemo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
