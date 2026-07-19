import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";

const Ecosystem = dynamic(() =>
  import("@/components/sections/Ecosystem").then((m) => m.Ecosystem),
);
const ValueProps = dynamic(() =>
  import("@/components/sections/ValueProps").then((m) => m.ValueProps),
);
const SpaceCarousel = dynamic(() =>
  import("@/components/sections/SpaceCarousel").then((m) => m.SpaceCarousel),
);
const ConceptSection = dynamic(() =>
  import("@/components/sections/concept/ConceptSection").then(
    (m) => m.ConceptSection,
  ),
);
const Footer = dynamic(() =>
  import("@/components/sections/Footer").then((m) => m.Footer),
);

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Ecosystem />
      <ValueProps />
      <SpaceCarousel />
      <ConceptSection />
      <Footer />
    </main>
  );
}
