import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import ValueProp from "@/components/ValueProp";
import Movements from "@/components/Movements";
import Audience from "@/components/Audience";
import Speakers from "@/components/Speakers";
import SocialProof from "@/components/SocialProof";
import Schedule from "@/components/Schedule";
import Venue from "@/components/Venue";
import Tickets from "@/components/Tickets";
import Sponsorship from "@/components/Sponsorship";
import Objections from "@/components/Objections";
import Urgency from "@/components/Urgency";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import LeadSync from "@/components/LeadSync";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Partners />
        <ValueProp />
        <Movements />
        <Audience />
        <Speakers />
        <SocialProof />
        <Schedule />
        <Venue />
        <Tickets />
        <Sponsorship />
        <Objections />
        <Urgency />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
      <LeadSync />
    </>
  );
}
