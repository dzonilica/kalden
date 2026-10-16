import CtaBand from "../components/CtaBand";
import Eyebrow from "../components/Eyebrow";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";
import RollText from "../components/RollText";
import SplitText from "../components/SplitText";
import { SIZES } from "../media";
import { advantages, contact, site } from "../data";

const rows = [
  { label: "Početak rada", value: "2020. godina" },
  { label: "Kategorija", value: "B kategorija" },
  { label: "Vozila za obuku", value: "SEAT Leon" },
  { label: "Nastava", value: "Teorijska i praktična obuka" },
  { label: "Adresa", value: contact.addressFull },
];

function Story() {
  return (
    <section className="story section-space" aria-labelledby="story-title">
      <div className="shell story__grid">
        <div className="story__copy">
          <Reveal>
            <Eyebrow>Rad škole</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id="story-title"
            className="display display--sm"
            text="Obuka za vozače B kategorije"
          />
          <Reveal delay={0.12}>
            <p className="lead">
              Auto škola Kalden 020 radi u Kragujevcu od {site.founded} godine. Rad škole
              obuhvata teorijsku nastavu, praktičnu obuku i pripremu kandidata za vozački
              ispit za B kategoriju.
            </p>
            <p>
              Teorijska nastava obuhvata saobraćajne propise, znakove i prepoznavanje rizika.
              Praktična obuka odvija se sa instruktorom, na poligonu i u saobraćaju.
            </p>
            <p>
              Program i uslove obuke možete pogledati na stranici „Obuka za B kategoriju“.
            </p>
          </Reveal>
        </div>

        <RevealImage
          className="story__media"
          src="/media/foto/seat-leon-beli-cunjevi.jpg"
          alt="Beli SEAT Leon auto škole Kalden 020 među čunjevima"
          ratio="4 / 5"
          parallax={100}
          sizes={SIZES.half}
        />
      </div>
    </section>
  );
}

function Rows() {
  return (
    <section className="facts section-space" aria-labelledby="facts-title">
      <div className="shell">
        <Reveal>
          <Eyebrow>Osnovni podaci</Eyebrow>
        </Reveal>
        <SplitText
          as="h2"
          id="facts-title"
          className="display display--sm"
          text="Osnovni podaci o školi"
        />

        <dl className="facts__list">
          {rows.map((row, index) => (
            <Reveal as="div" className="facts__row" key={row.label} delay={index * 0.05} distance={16}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Band() {
  return (
    <section className="band" aria-labelledby="band-title">
      <RevealImage
        className="band__media"
        src="/media/foto/vozni-park-pozadi-zalazak.jpg"
        alt=""
        parallax={70}
        sizes={SIZES.full}
      />
      <div className="shell band__inner">
        <Reveal>
          <Eyebrow tone="light">Naš cilj</Eyebrow>
        </Reveal>
        <SplitText
          as="h2"
          id="band-title"
          className="display display--sm"
          text="Priprema za vozački ispit i odgovorno učešće u saobraćaju"
        />
        <Reveal delay={0.12}>
          <p>
            Obuka obuhvata poznavanje propisa, upravljanje vozilom i prepoznavanje rizika.
            Za dodatne časove proverite uslove, cenu i raspoložive termine u školi.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Commitments() {
  return (
    <section className="commitments section-space" aria-labelledby="commitments-title">
      <div className="shell commitments__grid">
        <div>
          <Reveal>
            <Eyebrow>Program obuke</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id="commitments-title"
            className="display display--sm"
            text="Teorijska nastava, praktična obuka i dodatni časovi"
          />
          <Reveal delay={0.12}>
            <p className="lead">
              Pogledajte sadržaj teorijske i praktične obuke, vozila i informacije o ceni.
              Za početak nastave i raspoložive termine kontaktirajte školu.
            </p>
            <a className="link-underline" href="/obuka">
              <RollText>Program obuke</RollText>
              <span className="link-underline__glyph" aria-hidden="true">
                &#8594;
              </span>
            </a>
          </Reveal>
        </div>

        <dl className="commitments__list">
          {advantages.map((item, index) => (
            <Reveal
              as="div"
              className="commitments__row"
              key={item.title}
              delay={index * 0.06}
              distance={18}
            >
              <dt>
                <img src={item.icon} alt="" width="58" height="52" loading="lazy" />
                {item.title}
              </dt>
              <dd>{item.body}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="O nama"
        title="O auto školi Kalden 020"
        lead="Auto škola Kalden 020 radi u Kragujevcu od 2020. godine. Organizujemo teorijsku i praktičnu obuku za B kategoriju. Nalazimo se u ulici Dragoslava Srejovića 19."
        image="/media/foto/tim-instruktori-uz-vozila-1.jpg"
        alt="Instruktori auto škole Kalden 020 uz otvorena vrata vozila"
        cta={{ label: "Kontakt i upis", href: "/kontakt" }}
        secondary={{ label: "Uslovi upisa", href: "/kako-do-dozvole" }}
        compact
      />
      <Story />
      <Rows />
      <Band />
      <Commitments />
      <CtaBand />
    </>
  );
}
