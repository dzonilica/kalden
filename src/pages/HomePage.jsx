import { ArrowsOut } from "@phosphor-icons/react";
import CtaBand from "../components/CtaBand";
import Eyebrow from "../components/Eyebrow";
import Facts from "../components/Facts";
import FaqList from "../components/FaqList";
import HomeHero from "../components/HomeHero";
import Lightbox, { useLightbox } from "../components/Lightbox";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";
import RollText from "../components/RollText";
import SplitText from "../components/SplitText";
import StepsRail from "../components/StepsRail";
import { SIZES, imageSources } from "../media";
import { advantages, gallery, trainingBlocks } from "../data";

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
            text="Obuka za B, AM, A1, A2 i A kategorije"
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
 * Vozni park i tim, as a small gallery.
 *
 * Six photographs on a bento grid and nothing written over them: the cars and
 * the people are the content, so the tiles carry no captions, and neither does
 * the lightbox each one opens (the same one the gallery page uses). The
 * cell placement lives in the stylesheet (.fleet__cell:nth-child), so the
 * order here is the order of the set in src/data.js.
 *
 * One big tile and five small ones on three columns; on a phone the first and
 * last span both columns. Kept in step with .fleet__grid.
 */
const FLEET_SIZES = [
  "(max-width: 680px) calc(100vw - 36px), (max-width: 1560px) 62vw, 1000px",
  "(max-width: 680px) 46vw, (max-width: 1560px) 31vw, 500px",
  "(max-width: 680px) 46vw, (max-width: 1560px) 31vw, 500px",
  "(max-width: 680px) 46vw, (max-width: 1560px) 31vw, 500px",
  "(max-width: 680px) 46vw, (max-width: 1560px) 31vw, 500px",
  "(max-width: 680px) calc(100vw - 36px), (max-width: 1560px) 31vw, 500px",
];

function Fleet() {
  const lightbox = useLightbox(gallery.length);

  return (
    <section className="fleet section-space" aria-labelledby="fleet-title">
      <div className="shell">
        <div className="fleet__head">
          <div>
            <Reveal>
              <Eyebrow>Vozni park i tim</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              id="fleet-title"
              className="display display--sm"
              text="Vozila i instruktori"
            />
          </div>
          <Reveal className="fleet__head-link" delay={0.1}>
            <a className="link-underline" href="/galerija">
              <RollText>Cela galerija</RollText>
              <span className="link-underline__glyph" aria-hidden="true">
                &#8594;
              </span>
            </a>
          </Reveal>
        </div>

        <ul className="fleet__grid">
          {gallery.map((item, index) => (
            <Reveal
              as="li"
              className="fleet__cell"
              key={item.src}
              delay={Math.min(index, 5) * 0.06}
              distance={22}
            >
              <button
                type="button"
                onClick={() => lightbox.open(index)}
                aria-label={`Otvorite fotografiju: ${item.alt}`}
              >
                <picture>
                  {imageSources(item.src).map((source) => (
                    <source
                      key={source.type}
                      type={source.type}
                      srcSet={source.srcSet}
                      sizes={FLEET_SIZES[index]}
                    />
                  ))}
                  <img
                    src={item.src}
                    alt={item.alt}
                    sizes={FLEET_SIZES[index]}
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <span className="fleet__zoom" aria-hidden="true">
                  <ArrowsOut size={18} weight="regular" />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <Lightbox
        items={gallery}
        index={lightbox.index}
        onClose={lightbox.close}
        onStep={lightbox.step}
      />
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HomeHero />
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
