import Hero from "./components/landing/Hero";
import WhyUs from "./components/landing/WhyUs";
import HowHelp from "./components/landing/HowHelp";

export default function Home() {
  return (
    <div>
      <section id="home">
        <Hero />
      </section>
      <section id="why-us">
        <WhyUs />
      </section>
      <section id="features">
        <HowHelp />
      </section>
    </div>
  );
}
