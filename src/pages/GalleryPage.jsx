import CtaBand from "../components/CtaBand";
import Eyebrow from "../components/Eyebrow";
import Gallery from "../components/Gallery";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SplitText from "../components/SplitText";

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Galerija"
        title="Vozila i instruktori auto škole Kalden 020"
        lead="Fotografije vozila, instruktora i poligona auto škole Kalden 020 u Kragujevcu."
        image="/media/foto/vozni-park-pozadi-zalazak.jpg"
        alt="Vozila auto škole Kalden 020 u zalazak sunca"
        cta={{ label: "Kontakt i upis", href: "/kontakt" }}
        compact
      />

      <section className="gallery-section section-space" aria-labelledby="gallery-title">
        <div className="shell">
          <div className="gallery-section__head">
            <Reveal>
              <Eyebrow>Fotografije i video</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              id="gallery-title"
              className="display display--sm"
              text="Fotografije auto škole"
            />
            <Reveal delay={0.12}>
              <p className="lead">
                Pogledajte vozila SEAT Leon i tim škole. Fotografiju možete otvoriti za
                veći prikaz. Za pregled koristite strelice, a za zatvaranje taster Escape.
              </p>
            </Reveal>
          </div>

          <Gallery />
        </div>
      </section>

      <CtaBand
        title="Informacije o upisu"
        body="Za aktuelnu cenu obuke, uslove plaćanja i početak nastave kontaktirajte auto školu Kalden 020."
      />
    </>
  );
}
