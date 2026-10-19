import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";
import ContactForm from "../components/ContactForm";
import Eyebrow from "../components/Eyebrow";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import RollText from "../components/RollText";
import SplitText from "../components/SplitText";
import { contact } from "../data";

const channels = [
  {
    label: "Telefon",
    value: contact.phone,
    href: contact.phoneHref,
    icon: Phone,
    note: "Pozovite za informacije o upisu, obuci i radnom vremenu kancelarije.",
  },
  {
    label: "E-pošta",
    value: contact.email,
    href: contact.emailHref,
    icon: EnvelopeSimple,
    note: "Pošaljite upit o obuci, ceni ili terminima nastave.",
  },
  {
    label: "Adresa",
    value: contact.addressFull,
    href: contact.mapsHref,
    icon: MapPin,
    note: "Otvorite mapu lokacije škole u novom prozoru.",
  },
];

function Main() {
  return (
    <section className="contact-main section-space" aria-labelledby="contact-main-title">
      <div className="shell contact-main__grid">
        <div className="contact-main__side">
          <Reveal>
            <Eyebrow>Kontakt</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id="contact-main-title"
            className="display display--sm"
            text="Adresa i kontakt u Kragujevcu"
          />

          <Reveal delay={0.1}>
            <p className="lead">
              Auto škola Kalden 020 nalazi se u ulici Dragoslava Srejovića 19 u Kragujevcu.
              Za informacije o upisu pozovite {contact.phone} ili pošaljite upit e-poštom.
            </p>
          </Reveal>

          <div className="channels">
            {channels.map((item) => {
              const Icon = item.icon;
              const external = item.href.startsWith("http");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : null)}
                >
                  <Icon size={20} weight="regular" aria-hidden="true" />
                  <span>
                    <small>{item.label}</small>
                    <RollText>{item.value}</RollText>
                  </span>
                </a>
              );
            })}
          </div>

          <div className="hours">
            <h3>Radno vreme kancelarije</h3>
            <dl>
              {contact.hours.map(([days, time]) => (
                <div key={days}>
                  <dt>{days}</dt>
                  <dd>{time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="contact-main__form">
          <h2 className="contact-main__form-title">Upit za upis i obuku</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

/*
 * The map is a Google embed, so it is a third party loading on this page. It is
 * framed lazily and named in the privacy policy; the address above it is plain
 * text, so nothing here depends on the frame loading at all.
 */
function Map() {
  return (
    <section className="map" aria-labelledby="map-title">
      <div className="shell">
        <h2 className="map__title" id="map-title">
          Lokacija škole
        </h2>
        <div className="map__frame">
          <iframe
            src={contact.mapsEmbed}
            title="Lokacija auto škole Kalden 020 na mapi"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <p className="map__note">
          Mapu pruža Google. Adresa škole je {contact.addressFull}. Informacije o učitavanju
          mape nalaze se u <a href="/politika-privatnosti">politici privatnosti</a>.
        </p>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Upis i informacije"
        title="Kontakt i upis u auto školu Kalden 020"
        lead="Za informacije o obuci za B, AM, A1, A2 i A kategorije, ceni i terminima nastave pozovite nas ili pošaljite upit e-poštom."
        image="/media/foto/seat-leon-crveni.jpg"
        alt="Crveni SEAT Leon auto škole Kalden 020"
        cta={{ label: `Pozovite ${contact.phone}`, href: contact.phoneHref }}
        compact
      />
      <Main />
      <Map />
    </>
  );
}
