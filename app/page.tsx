import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ValueProp from "@/components/ValueProp";
import Movements from "@/components/Movements";
import Audience from "@/components/Audience";
import Schedule from "@/components/Schedule";
import Speakers from "@/components/Speakers";
import SocialProof from "@/components/SocialProof";
import Tickets from "@/components/Tickets";
import Sponsorship from "@/components/Sponsorship";
import Objections from "@/components/Objections";
import Urgency from "@/components/Urgency";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ValueProp />
        <Movements />
        <Audience />
        <Schedule />
        <Speakers />
        <SocialProof />
        <Tickets />
        <Sponsorship />
        <Objections />
        <Urgency />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
