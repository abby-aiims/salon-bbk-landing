import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy | Salon BBK", robots: { index: false, follow: false } };

/** Placeholder until the client's privacy policy is supplied. Not final copy. */
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy">
      <p>
        Salon BBK collects the details you enter on this page (name, phone, email and your appointment
        preferences) only to contact you about a brow consultation and appointment. We do not sell or share
        your details with third parties beyond the providers that deliver our email and booking systems.
      </p>
      <p>
        To access, correct or delete your details, email info@salonbbk.com.au. This page is a placeholder
        pending the salon&apos;s full privacy policy.
      </p>
    </LegalPage>
  );
}
