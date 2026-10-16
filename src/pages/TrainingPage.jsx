import { EnvelopeSimple, Phone } from "@phosphor-icons/react";
import CtaBand from "../components/CtaBand";
import Eyebrow from "../components/Eyebrow";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";
import RollText from "../components/RollText";
import SplitText from "../components/SplitText";
import { SIZES } from "../media";
import { contact, trainingBlocks } from "../data";

function Blocks() {
  return (
    <section className="training section-space" aria-labelledby="training-title">
      <div className="shell training__grid">
        <div>
          <Reveal>
            <Eyebrow>Obuka za B kategoriju</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id="training-title"
            className="display display--sm"
            text="Program obuke i uslovi polaganja"
          />
          <Reveal delay={0.12}>
            <p className="lead">
              U nastavku su pregled teorijske nastave, praktične obuke i ispita, kao i
              obaveze kandidata tokom postupka. Za datum početka nastave i raspoložive
              termine vožnje kontaktirajte školu.
            </p>
          </Reveal>
        </div>

        <ul className="spec-list">
          {trainingBlocks.map((item, index) => (
            <Reveal as="li" key={item.name} delay={Math.min(index, 4) * 0.05} distance={18}>
              <div>
                <span className="spec-list__mark" aria-hidden="true" />
                <span className="spec-list__copy">
                  <strong>{item.name}</strong>
                  <span>{item.line}</span>
                </span>
                <span className="spec-list__detail">{item.detail}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Vehicles() {
  return (
    <section className="split-band section-space" aria-labelledby="vehicles-title">
      <div className="shell split-band__grid">
        <RevealImage
          className="split-band__media"
          src="/media/foto/vozni-park-3-auta-poligon.jpg"
          alt="Tri vozila auto škole Kalden 020 na poligonu"
          ratio="1 / 1"
          parallax={86}
          sizes={SIZES.half}
        />
        <div>
          <Reveal>
            <Eyebrow>Vozila</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id="vehicles-title"
            className="display display--sm"
            text="Vozila za obuku"
          />
          <Reveal delay={0.12}>
            <p className="lead">
              Praktična nastava izvodi se u vozilima SEAT Leon sa oznakama auto škole
              Kalden 020. Fotografije vozila i instruktora možete pogledati u galeriji.
            </p>
            <a className="link-underline" href="/galerija">
              <RollText>Pogledajte vozni park</RollText>
              <span className="link-underline__glyph" aria-hidden="true">
                &#8594;
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/*
 * Cenovnik.
 *
 * The 2022 markup carried a 70.000–80.000 range in schema.org that the page
 * itself never showed, and nobody has confirmed it since. A stale price is the
 * one thing on a page like this that costs a phone call, so the block asks for
 * the call instead — and README.md lists the price list as the first thing to
 * get from the client.
 */
function Price() {
  return (
    <section className="price section-space" aria-labelledby="price-title">
      <div className="shell price__inner">
        <Reveal>
          <Eyebrow>Cena i plaćanje</Eyebrow>
        </Reveal>
        <SplitText
          as="h2"
          id="price-title"
          className="display display--sm"
          text="Cena obuke za B kategoriju i načini plaćanja"
        />
        <Reveal delay={0.12}>
          <p className="lead">
            Aktuelnu cenu obuke, cenu dodatnih časova i načine plaćanja možete proveriti
            telefonom 069 2789 623 ili e-poštom kalden020kg@gmail.com. Pre upisa proverite
            koje stavke ulaze u cenu obuke, a koji se troškovi plaćaju odvojeno.
          </p>
        </Reveal>
        <Reveal className="price__actions" delay={0.18}>
          <a className="btn btn--fill" href={contact.phoneHref}>
            <Phone size={16} weight="fill" aria-hidden="true" />
            <RollText>{contact.phone}</RollText>
          </a>
          <a className="btn btn--outline" href={contact.emailHref}>
            <EnvelopeSimple size={16} weight="regular" aria-hidden="true" />
            <RollText>{contact.email}</RollText>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Obuka"
        title="Obuka za B kategoriju u Kragujevcu"
        lead="Obuka u auto školi Kalden 020 obuhvata teorijsku nastavu i praktične časove sa instruktorom. U nastavku su pregled programa, vozila i informacije o ceni."
        image="/media/foto/seat-leon-profil-zalazak.jpg"
        alt="Beli SEAT Leon auto škole Kalden 020 iz profila u zalazak sunca"
        cta={{ label: "Kontakt i upis", href: "/kontakt" }}
        secondary={{ label: "Uslovi upisa", href: "/kako-do-dozvole" }}
        compact
      />
      <Blocks />
      <Vehicles />
      <Price />
      <CtaBand
        title="Informacije o upisu"
        body="Za aktuelnu cenu obuke, uslove plaćanja i početak nastave kontaktirajte auto školu Kalden 020."
      />
    </>
  );
}
