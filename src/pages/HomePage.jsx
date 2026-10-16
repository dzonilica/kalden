import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import CtaBand from "../components/CtaBand";
import Eyebrow from "../components/Eyebrow";
import Facts from "../components/Facts";
import FaqList from "../components/FaqList";
import HomeHero from "../components/HomeHero";
import Marquee from "../components/Marquee";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";
import RollText from "../components/RollText";
import SplitText from "../components/SplitText";
import StepsRail from "../components/StepsRail";
import { useIsNarrow } from "../hooks";
import { SIZES, imageSources } from "../media";
import { advantages, trainingBlocks } from "../data";

function Intro() {
  return (
    <section className="intro section-space" aria-labelledby="intro-title">
      <div className="shell intro__grid">
        <div className="intro__copy">
          <Reveal>
            <Eyebrow>Auto škola u Kragujevcu</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id="intro-title"
            className="display"
            text="Obuka za B kategoriju"
          />
          <Reveal delay={0.12}>
            <p className="lead">
              Auto škola Kalden 020 organizuje teorijsku nastavu i praktičnu obuku u
              Kragujevcu. Teorijski deo obuhvata saobraćajne propise, znakove i prepoznavanje
              rizika. Praktični deo obuke izvodi se sa instruktorom, na poligonu i u
              saobraćaju.
            </p>
            <a className="link-underline" href="/o-nama">
              <RollText>O auto školi Kalden 020</RollText>
              <span className="link-underline__glyph" aria-hidden="true">
                &#8594;
              </span>
            </a>
          </Reveal>
        </div>

        <RevealImage
          className="intro__media"
          src="/media/foto/tim-instruktori-uz-vozila-2.jpg"
          alt="Instruktori auto škole Kalden 020 pored vozila"
          ratio="4 / 5"
          parallax={108}
          sizes={SIZES.half}
          priority
        />
      </div>

      <div className="shell">
        <Facts />
      </div>
    </section>
  );
}

/* Tri obećanja, sa heksagonalnim ikonama iz brend materijala. */
function Advantages() {
  return (
    <section className="cards-band section-space" aria-labelledby="cards-title">
      <div className="shell">
        <div className="cards-band__head">
          <Reveal>
            <Eyebrow>Program obuke</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id="cards-title"
            className="display display--sm"
            text="Teorijska nastava, praktična obuka i dodatni časovi"
          />
        </div>

        <ul className="cards">
          {advantages.map((item, index) => (
            <Reveal as="li" className="card" key={item.title} delay={index * 0.08} distance={24}>
              <img className="card__icon" src={item.icon} alt="" width="58" height="52" loading="lazy" />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Šta ulazi u obuku, kao spisak a ne kao mreža kartica: svaki red nosi i
   podatak koji kandidati zapravo traže (koliko traje, šta je uslov). */
function TrainingIndex() {
  return (
    <section className="collection section-space" aria-labelledby="collection-title">
      <div className="shell">
        <div className="collection__head">
          <div>
            <Reveal>
              <Eyebrow>Obuka</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              id="collection-title"
              className="display"
              text="Pregled obuke i ispita"
            />
          </div>
          <Reveal className="collection__head-link" delay={0.1}>
            <a className="link-underline" href="/obuka">
              <RollText>Pogledajte program obuke</RollText>
              <span className="link-underline__glyph" aria-hidden="true">
                &#8594;
              </span>
            </a>
          </Reveal>
        </div>

        <ul className="index__list">
          {trainingBlocks.map((item, index) => (
            <Reveal
              as="li"
              className="index__row"
              key={item.name}
              delay={Math.min(index, 4) * 0.05}
              distance={18}
            >
              <a href="/obuka">
                <h3 className="index__name">{item.name}</h3>
                <span className="index__line">{item.line}</span>
                <span className="index__tag">{item.detail}</span>
                <span className="index__go" aria-hidden="true">
                  &#8618;
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/*
 * Vozni park, as plates floating over the page.
 *
 * Five photographs scattered down a tall ground rather than lined up in a row:
 * each sits on its own columns, starts at its own height and drifts at its own
 * rate as the section passes, so the set never resolves into a grid. All five
 * are driven from one section progress and differ only in amplitude — that is
 * what makes them read as floating against each other. The empty space between
 * them is doing the work.
 *
 * A phone has neither the width for the scatter nor the frames for five
 * parallax layers, so it gets a plain two-up grid; so does anyone who asked for
 * reduced motion.
 */
const plates = [
  {
    src: "/media/foto/vozni-park-3-auta-poligon.jpg",
    alt: "Tri vozila auto škole Kalden 020 na poligonu",
    label: "Vozni park",
    meta: "Poligon",
    ratio: "4 / 5",
    col: "1 / 6",
    lift: "0vw",
    drift: 104,
  },
  {
    src: "/media/foto/seat-leon-beli-cunjevi.jpg",
    alt: "Beli SEAT Leon auto škole Kalden 020 među čunjevima",
    label: "SEAT Leon",
    meta: "Vozila obuke",
    ratio: "4 / 3",
    col: "8 / 13",
    lift: "13vw",
    drift: 46,
  },
  {
    src: "/media/foto/tim-instruktori-uz-vozila-1.jpg",
    alt: "Instruktori auto škole Kalden 020 uz otvorena vrata vozila",
    label: "Instruktori",
    meta: "Tim",
    ratio: "3 / 4",
    col: "4 / 9",
    lift: "6vw",
    drift: 138,
  },
  {
    src: "/media/foto/vozni-park-pozadi-zalazak.jpg",
    alt: "Vozila auto škole Kalden 020 u zalazak sunca",
    label: "Vozni park",
    meta: "Zalazak",
    ratio: "16 / 11",
    col: "9 / 13",
    lift: "20vw",
    drift: 62,
  },
  {
    src: "/media/foto/seat-leon-profil-zalazak.jpg",
    alt: "Beli SEAT Leon auto škole Kalden 020 iz profila",
    label: "SEAT Leon",
    meta: "Vozilo za obuku",
    ratio: "1 / 1",
    col: "1 / 5",
    lift: "4vw",
    drift: 120,
  },
];

/* Two plates to a row on a phone, so the default card hint — which assumes one
   column there — would have the browser pull a file twice the width it needs. */
const PLATE_SIZES = "(max-width: 900px) calc(50vw - 28px), (max-width: 1180px) 45vw, 30vw";

function Plate({ item, progress, still }) {
  /* One shared progress, one amplitude per plate. Hooks run either way — only
     the style that consumes them is dropped when the section is held still. */
  const y = useTransform(progress, [0, 1], [item.drift, -item.drift]);

  return (
    <motion.figure
      className="work__plate"
      style={{
        "--col": item.col,
        "--lift": item.lift,
        "--ratio": item.ratio,
        ...(still ? null : { y }),
      }}
    >
      <span className="work__plate-frame">
        <picture>
          {imageSources(item.src).map((source) => (
            <source
              key={source.type}
              type={source.type}
              srcSet={source.srcSet}
              sizes={PLATE_SIZES}
            />
          ))}
          <img src={item.src} alt={item.alt} sizes={PLATE_SIZES} loading="lazy" decoding="async" />
        </picture>
      </span>

      <figcaption className="work__plate-label">
        <span className="work__plate-name">{item.label}</span>
        <span className="work__plate-meta">{item.meta}</span>
      </figcaption>
    </motion.figure>
  );
}

function Fleet() {
  const fieldRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const narrow = useIsNarrow();
  const still = reduceMotion || narrow;

  const { scrollYProgress } = useScroll({
    target: fieldRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      className={`work section-space${still ? " work--still" : ""}`}
      aria-labelledby="work-title"
    >
      <div className="shell">
        <div className="work__head">
          <Reveal>
            <Eyebrow>Vozni park i tim</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id="work-title"
            className="display display--sm"
            text="Vozila za praktičnu obuku"
          />
          <Reveal className="work__head-link" delay={0.12}>
            <p>
              Praktična obuka izvodi se u vozilima auto škole Kalden 020. U galeriji možete
              pogledati vozila SEAT Leon i fotografije instruktora.
            </p>
            <a className="link-underline" href="/galerija">
              <RollText>Pogledajte vozila i instruktore</RollText>
              <span className="link-underline__glyph" aria-hidden="true">
                &#8594;
              </span>
            </a>
          </Reveal>
        </div>

        <div className="work__field" ref={fieldRef}>
          {plates.map((item) => (
            <Plate key={item.src} item={item} progress={scrollYProgress} still={still} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Marquee />
      <Intro />
      <Advantages />
      <StepsRail />
      <TrainingIndex />
      <Fleet />
      <FaqList
        media="/media/foto/seat-leon-crveni.jpg"
        mediaAlt="Crveni SEAT Leon auto škole Kalden 020"
      />
      <CtaBand />
    </>
  );
}
