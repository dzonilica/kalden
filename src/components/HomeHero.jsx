import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Eyebrow from "./Eyebrow";
import HeroFilm from "./HeroFilm";
import RollText from "./RollText";
import SplitText from "./SplitText";
import { useIntroDone } from "../intro";
import { useIsNarrow } from "../hooks";
import { imageSources } from "../media";
import { cta, pricing } from "../data";

/*
 * Home hero.
 *
 * It used to be the film, full-bleed, with the type centred on top of it. Two
 * things were wrong with that. The footage is a slow pan across the lettering
 * on a car door, and at wallpaper size under a navy veil the lettering was the
 * one thing you could not read. And a centred stack over a moving ground gives
 * the page no spine — every line starts somewhere different.
 *
 * So the hero is a spread now: the type holds a left column with one left edge
 * all the way down, and the photography sits beside it as a plate rather than
 * behind it.
 *
 * The plate is square because the source is. Every photograph the school has
 * is an 1800×1800 crop off its own phone, and 1800px is the whole budget — so
 * the one thing the hero must not do is ask for more pixels than exist. Across
 * the width of the page that frame would be resampled and visibly soft on any
 * retina screen; held to 620px it is served from the 1440 rung and stays sharp
 * at 2×, and a square plate spends the full frame with nothing cropped away.
 * Quality here is a question of restraint, not of a bigger file.
 *
 * The frame itself is the dusk shot of the three cars: the roof signs read at
 * a glance, the sky gives the plate air at the top, and it is the only frame
 * clean enough to carry an offset rule behind it. The film keeps its place as
 * a chip on the plate's corner — small, sharp and undarkened, which is the
 * size the lettering actually reads at.
 *
 * Plate and chip drift against the scroll as one group, so the overlap between
 * them never opens up; nothing else in the hero moves.
 */

const EASE = [0.165, 0.84, 0.44, 1];

const PLATE = {
  src: "/media/foto/vozni-park-pozadi-zalazak.jpg",
  alt: "Tri vozila auto škole Kalden 020 sa oznakama „Obuka vozača“ u zalazak sunca",
};

/* The plate is capped at 620px rather than left to grow with the column, so
   the hint is a width and not a bare vw past the point where the cap bites.
   Without this the browser assumes 100vw and pulls the 1800 rung onto a
   handset that is showing it at 360. Kept in step with .hero__stage. */
const PLATE_SIZES = "(max-width: 900px) calc(100vw - 40px), (max-width: 1440px) 44vw, 620px";

export default function HomeHero() {
  const hostRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const narrow = useIsNarrow();
  // Held back until the opening loader lifts, so the type is not already in
  // place behind the panel.
  const start = useIntroDone();

  const { scrollYProgress } = useScroll({
    target: hostRef,
    offset: ["start start", "end start"],
  });
  const plateShift = useTransform(scrollYProgress, [0, 1], [0, narrow ? -40 : -120]);

  return (
    <section className="hero hero--home" ref={hostRef} aria-labelledby="hero-title">
      <span className="hero__glow" aria-hidden="true" />

      <div className="shell hero__spread">
        <div className="hero__lede">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          >
            <Eyebrow tone="light">Kragujevac &middot; od 2020.</Eyebrow>
          </motion.div>

          <SplitText
            as="h1"
            id="hero-title"
            className="hero__title"
            text="Auto škola Kalden 020 u Kragujevcu"
            trigger="mount"
            active={start}
            delay={0.42}
            stagger={0.085}
            duration={1.15}
          />

          <motion.p
            className="hero__lead"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.9, delay: 0.76, ease: EASE }}
          >
            Teorijska nastava i praktična obuka za B, A1, A2 i A kategoriju. Nalazimo se u
            ulici Dragoslava Srejovića 19. Za upis, cenu i početak nastave pozovite
            069 2789 623.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.9, delay: 0.86, ease: EASE }}
          >
            <a className="btn btn--fill" href={cta.href}>
              <span className="btn__glyph" aria-hidden="true">
                &#8618;
              </span>
              <RollText>{cta.label}</RollText>
            </a>
            <a className="btn btn--ghost" href="/cenovnik">
              <RollText>Cenovnik</RollText>
            </a>
          </motion.div>

          {/* The four letters are the fastest answer to the question most
              visitors actually arrive with, and each one is a way into the
              price list already filtered to it. */}
          <motion.div
            className="hero__kats"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: start ? 1 : 0 }}
            transition={{ duration: 0.8, delay: start ? 1 : 0, ease: EASE }}
          >
            <span className="hero__kats-label">Kategorije</span>
            <span className="hero__kats-row">
              {pricing.categories.map((category) => (
                <a key={category.id} href="/cenovnik" title={category.name}>
                  {category.label}
                </a>
              ))}
            </span>
          </motion.div>
        </div>

        <motion.div
          className="hero__stage"
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 1, delay: 0.62, ease: EASE }}
        >
          {/* The entrance writes `y` on the element above, so the scroll drift
              gets its own layer rather than fighting it for the same channel. */}
          <motion.div
            className="hero__stage-drift"
            style={reduceMotion ? undefined : { y: plateShift }}
          >
            <figure className="hero__plate">
              <span className="hero__plate-frame">
                <picture>
                  {imageSources(PLATE.src).map((source) => (
                    <source
                      key={source.type}
                      type={source.type}
                      srcSet={source.srcSet}
                      sizes={PLATE_SIZES}
                    />
                  ))}
                  <img
                    src={PLATE.src}
                    alt={PLATE.alt}
                    width="1800"
                    height="1800"
                    sizes={PLATE_SIZES}
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              </span>
            </figure>

            <HeroFilm />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="hero__cue"
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: start ? 1 : 0 }}
        transition={{ duration: 0.7, delay: start ? 1.05 : 0, ease: EASE }}
      >
        <span className="hero__cue-label">Saznajte više</span>
        <span className="hero__cue-rail">
          <span className="hero__cue-dot" />
        </span>
      </motion.div>
    </section>
  );
}
