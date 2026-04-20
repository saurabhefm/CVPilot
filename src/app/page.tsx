import Hero from "@/components/sections/Hero";
import UploadZone from "@/components/sections/UploadZone";
import FeatureGrid from "@/components/sections/FeatureGrid";
import TailoringModule from "@/components/sections/TailoringModule";
import SummaryModule from "@/components/sections/SummaryModule";
import Pricing from "@/components/sections/Pricing";

export default function Home() {
  return (
    <>
      <Hero />
      <UploadZone />
      <FeatureGrid />
      <TailoringModule />
      <SummaryModule />
      <Pricing />
    </>
  );
}
