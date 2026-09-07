import type { Metadata } from "next";
import Image from "next/image";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { thankYou } from "@/content/home";
import { site } from "@/content/site";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "You're booked in | Salon BBK",
  robots: { index: false, follow: false },
};

function clean(value: string | string[] | undefined, fallback: string, max = 40): string {
  const raw = Array.isArray(value) ? value[0] : value;
  const text = (raw ?? "").replace(/[<>"'`]/g, "").trim().slice(0, max);
  return text || fallback;
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const name = clean(params.name, "and thank you");
  const location = clean(params.location, "Salon BBK");

  return (
    <>
      <Header />
      <main id="main" className={styles.main}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.copy}>
            <p className="eyebrow eyebrow--rose">Consultation request received</p>
            <h1 className="display">{thankYou.h1(name)}</h1>
            <p className="lede">{thankYou.body(location)}</p>
            <div className={styles.actions}>
              <a href={site.timely} className="btn btn--primary" target="_blank" rel="noreferrer noopener" data-timely>
                {thankYou.button}
              </a>
              <a href={site.instagram} className="link" target="_blank" rel="noreferrer noopener">
                {thankYou.secondary}
              </a>
            </div>
          </div>
          <div className={styles.media}>
            <Image
              src="/images/service-brow-lamination.webp"
              alt="Model with brushed-up fluffy brows after brow lamination at Salon BBK"
              width={533}
              height={800}
              sizes="(min-width: 900px) 40vw, 100vw"
              priority
              className={styles.image}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
