import BrandMark from "./BrandMark";
import RollText from "./RollText";
import { contact, cta, legalNavigation, navigation, site } from "../data";

/*
 * The footer is the one pale ground on the site, so it carries the original
 * cut of the mark — black letters with a white outline. The navy chrome takes
 * the glossy cut instead; BrandMark picks between them.
 */
export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="shell foot__top">
        <div className="foot__brand">
          <a href="/" aria-label="Kalden 020, početna stranica">
            <BrandMark variant="dark" />
          </a>
          <p>
            Auto škola Kalden 020 u Kragujevcu. Teorijska i praktična obuka za B kategoriju.
          </p>
          <a className="foot__cta" href={cta.href}>
            <span aria-hidden="true">&#8618;</span>
            <RollText>{cta.label}</RollText>
          </a>
        </div>

        <div className="foot__cols">
          <nav aria-labelledby="foot-pages">
            <h2 id="foot-pages">Stranice</h2>
            {[{ label: "Početna", href: "/" }, ...navigation].map((item) => (
              <a key={item.href} href={item.href}>
                <RollText>{item.label}</RollText>
              </a>
            ))}
          </nav>

          <div>
            <h2>Kontakt</h2>
            <a href={contact.phoneHref}>
              <RollText>{contact.phone}</RollText>
            </a>
            <a href={contact.emailHref}>
              <RollText>{contact.email}</RollText>
            </a>
            <a href={contact.mapsHref} target="_blank" rel="noreferrer">
              {contact.addressFull}
            </a>
          </div>

          <div>
            <h2>Radno vreme kancelarije</h2>
            {contact.hours.map(([days, time]) => (
              <p key={days}>
                <span>{days}</span>
                {time}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="shell foot__bottom">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. Sva prava zadržana.
        </p>
        <div className="foot__bottom-links">
          {legalNavigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a href="#top">Na vrh stranice</a>
        </div>
      </div>
    </footer>
  );
}
