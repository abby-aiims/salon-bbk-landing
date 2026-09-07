import { AnnouncementBar } from "@/components/AnnouncementBar";
import { BookingModal } from "@/components/BookingModal";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { ProofBar } from "@/components/ProofBar";
import { StickyBar } from "@/components/StickyBar";
import { BookingBand } from "@/components/sections/BookingBand";
import { BrowFinder } from "@/components/sections/BrowFinder";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Locations } from "@/components/sections/Locations";
import { Results } from "@/components/sections/Results";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { SocialStrip } from "@/components/sections/SocialStrip";
import { Steps } from "@/components/sections/Steps";
import { Team } from "@/components/sections/Team";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhyBBK } from "@/components/sections/WhyBBK";

/**
 * Section order per 03-copy/copy-deck.md, final. The form sits high (straight
 * after services) and again at the end; every primary CTA anchors to #book.
 *
 * Those anchors are what BookingModal listens for: it opens over the page
 * instead of letting it jump, and falls back to the anchor scroll when there
 * is no JavaScript to open it with.
 */
export default function LandingPage() {
  return (
    <>
      <JsonLd />
      <AnnouncementBar />
      <ProofBar />
      <Header />
      <main id="main">
        <Hero />
        <TrustStrip />
        <Services />
        <BookingBand variant="first" />
        <BrowFinder />
        <WhyBBK />
        <Steps />
        <Results />
        <Reviews />
        <SocialStrip />
        <Team />
        <Locations />
        <Faq />
        <BookingBand variant="final" />
      </main>
      <Footer />
      <StickyBar />
      <BookingModal />
    </>
  );
}
