import type { Metadata } from "next";

import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms | Salon BBK", robots: { index: false, follow: false } };

/** Booking policy summary from the current site. The full policy lives on salonbbk.com.au. */
export default function TermsPage() {
  return (
    <LegalPage title="Terms and booking policy">
      <p>
        Enquiring through this page is free. Appointments are secured with a non-refundable deposit. With 48
        hours notice the deposit transfers to a future appointment. Same day cancellations are charged the
        full service fee, and arrivals ten minutes or more after the appointment time may lose the deposit.
      </p>
      <p>
        Please tell us about pregnancy, medication, health conditions, allergies, contact lenses, recent
        surgery, recent Botox or filler in the treatment area and active skincare before your treatment.
        Results are not guaranteed and cosmetic tattoo may need additional sessions.
      </p>
      <p>
        The full policy is at{" "}
        <a href="https://www.salonbbk.com.au/important-info" target="_blank" rel="noreferrer noopener">
          salonbbk.com.au/important-info
        </a>
        .
      </p>
    </LegalPage>
  );
}
