import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import styles from "./Locations.module.css";
import { locationsCopy } from "@/content/home";
import { locations, telHref } from "@/content/site";

export function Locations() {
  return (
    <section className="section" id="locations">
      <div className="container">
        <Reveal className="head head--center">
          <p className="eyebrow eyebrow--rose">{locationsCopy.eyebrow}</p>
          <h2 className="h2">{locationsCopy.h2}</h2>
        </Reveal>

        <ul className={styles.grid}>
          {locations.map((location, index) => (
            <Reveal as="li" key={location.slug} delay={index * 80} className={styles.card}>
              <h3 className={`h3 ${styles.name}`}>{location.name}</h3>
              <address className={styles.address}>{location.addressLine}</address>
              <a href={telHref(location.phone)} className={styles.phone} data-call={`locations-${location.slug}`}>
                <Icon name="call" className="icon--sm" />
                {location.phone}
              </a>

              <table className={styles.hours}>
                <caption className="visually-hidden">{location.shortName} opening hours</caption>
                <tbody>
                  {location.hoursDisplay.map((row) => (
                    <tr key={row.day}>
                      <th scope="row">{row.day}</th>
                      <td>{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className={styles.parking}>
                <Icon name="local_parking" className="icon--sm" />
                {location.parking}
              </p>

              <a href={location.directions} className="link" target="_blank" rel="noreferrer noopener">
                {locationsCopy.directions}
                <Icon name="arrow_forward" className="icon--ink" />
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className={`caption ${styles.serving}`}>{locationsCopy.serving}</p>
        </Reveal>
      </div>
    </section>
  );
}
