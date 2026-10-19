import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight, SteeringWheel } from "@phosphor-icons/react";
import Eyebrow from "./Eyebrow";
import RollText from "./RollText";
import SplitText from "./SplitText";
import { useIntroDone } from "../intro";
import { useIsNarrow, useMediaQuery } from "../hooks";
import { imageSources } from "../media";
import { cta, pricing } from "../data";

/*
 * Home hero.
 *
 * Still a spread (type down a left column, photography beside it as a plate)
 * but no longer on a flat navy field. The ground is built in layers, all of
 * them decoration and all of them aria-hidden:
 *
 *   - a navy-to-cobalt gradient with three slow aurora washes of the brand
 *     blue, so the plate has light to sit in rather than a flat field;
 *   - thin light trails running across the frame at a slight angle, the long
 *     exposure of headlights at dusk, which is the hour the plate was shot;
 *   - a horizon line at the foot of the hero, where the trails would meet the
 *     road;
 *   - "020" set huge in outline behind the plate, the school's own number.
 *
 * Over the plate sit two glass cards: the legal minimum of driving hours for
 * B, read from src/data.js so it follows the price list, and an invitation to
 * start that leads to the contact page.
 *
 * On a mouse the layers drift against each other with the pointer (the
 * numeral one way, the cards the other), which is what gives the stack its
 * depth. Touch, reduced motion and the scroll drift are handled separately,
 * each on its own wrapper so no two of them write the same transform.
 *
 * The plate is square because the source is, and capped at 620px so it is
 * served from the 1440 rung and stays sharp at 2x. PLATE_SIZES below and the
 * preload in index.html are kept in step with that cap.
 */

const EASE = [0.165, 0.84, 0.44, 1];

const PLATE = {
  src: "/media/foto/vozni-park-pozadi-zalazak.jpg",
  alt: "Tri vozila auto škole Kalden 020 sa oznakama „Obuka vozača“ u zalazak sunca",
};

const PLATE_SIZES = "(max-width: 900px) calc(100vw - 40px), (max-width: 1440px) 44vw, 620px";

const HIDDEN_CLIP = "inset(100% 0% 0% 0%)";
const SHOWN_CLIP = "inset(-25% -25% -25% -25%)";

/* The minimum fond for a first B licence. */
const B_FOND = pricing.categories.find((category) => category.id === "B").scenarios[0].driving;

/* Each trail: its height in the frame, its length, how long one pass takes and
   where in that pass it starts, so the set never lines up. */
const TRAILS = [
  { y: "14%", len: "26vw", dur: 9, delay: -2, alpha: 0.5 },
  { y: "27%", len: "40vw", dur: 6.5, delay: -5.2, alpha: 0.75 },
  { y: "41%", len: "18vw", dur: 11, delay: -8, alpha: 0.4 },
  { y: "58%", len: "34vw", dur: 7.8, delay: -0.6, alpha: 0.65 },
  { y: "70%", len: "22vw", dur: 10, delay: -6.4, alpha: 0.45 },
  { y: "83%", len: "46vw", dur: 5.8, delay: -3.1, alpha: 0.8 },
];

function useEntrance(start, reduceMotion) {
  return (delay, from = { opacity: 0, y: 18 }, duration = 0.9) => ({
    initial: reduceMotion ? false : from,
    animate: start ? { opacity: 1, y: 0 } : from,
    transition: { duration, delay: start ? delay : 0, ease: EASE },
  });
}

export default function HomeHero() {
  const hostRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const narrow = useIsNarrow();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  // Held back until the opening loader lifts, so nothing is already in place
  // behind the panel.
  const start = useIntroDone();
  const enter = useEntrance(start, reduceMotion);

  const { scrollYProgress } = useScroll({
    target: hostRef,
    offset: ["start start", "end start"],
  });
  const plateShift = useTransform(scrollYProgress, [0, 1], [0, narrow ? -40 : -120]);

  /* Pointer position across the hero, -1 to 1 on each axis, eased by a
     spring so the layers settle rather than snap. */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 60, damping: 18, mass: 0.7 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 18, mass: 0.7 });

  const auroraX = useTransform(springX, (v) => v * -34);
  const auroraY = useTransform(springY, (v) => v * -22);
  const numeralX = useTransform(springX, (v) => v * -28);
  const numeralY = useTransform(springY, (v) => v * -18);
  const plateX = useTransform(springX, (v) => v * 8);
  const plateY = useTransform(springY, (v) => v * 6);
  const cardX = useTransform(springX, (v) => v * 20);
  const cardY = useTransform(springY, (v) => v * 14);

  const parallax = finePointer && !reduceMotion;

  const onPointerMove = (event) => {
    if (!parallax || !hostRef.current) return;
    const rect = hostRef.current.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const depth = (x, y) => (parallax ? { x, y } : undefined);

  return (
    <section
      className="hero hero--home"
      ref={hostRef}
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="hero__ground" aria-hidden="true">
        <motion.div className="hero__aurora" style={depth(auroraX, auroraY)}>
          <span className="hero__aurora-wash hero__aurora-wash--a" />
          <span className="hero__aurora-wash hero__aurora-wash--b" />
          <span className="hero__aurora-wash hero__aurora-wash--c" />
        </motion.div>

        <span className="hero__trails">
          {TRAILS.map((trail) => (
            <i
              key={trail.y}
              style={{
                "--y": trail.y,
                "--len": trail.len,
                "--dur": `${trail.dur}s`,
                "--delay": `${trail.delay}s`,
                "--alpha": trail.alpha,
              }}
            />
          ))}
        </span>

        <span className="hero__horizon" />
      </div>

      <div className="shell hero__spread">
        <div className="hero__lede">
          <motion.div {...enter(0.5, { opacity: 0, y: 14 }, 0.8)}>
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

          <motion.p className="hero__lead" {...enter(0.76)}>
            Teorijska nastava i praktična obuka za B, AM, A1, A2 i A kategorije. Nalazimo se u
            ulici Milovana Gušića 62. Za upis, cenu i početak nastave pozovite
            069 2789 623.
          </motion.p>

          <motion.div className="hero__actions" {...enter(0.86)}>
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
              price list. */}
          <motion.div className="hero__kats" {...enter(1, { opacity: 0, y: 10 }, 0.8)}>
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
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: start ? 1 : 0 }}
          transition={{ duration: 0.6, delay: start ? 0.5 : 0, ease: EASE }}
        >
          <motion.span
            className="hero__numeral"
            aria-hidden="true"
            style={depth(numeralX, numeralY)}
          >
            020
          </motion.span>

          {/* Scroll drift on this layer, pointer depth on the ones inside it,
              entrances on the elements themselves: one transform each. */}
          <motion.div
            className="hero__stage-drift"
            style={reduceMotion ? undefined : { y: plateShift }}
          >
            <motion.div className="hero__stage-depth" style={depth(plateX, plateY)}>
              <span className="hero__plate-outline" aria-hidden="true" />

              {/* The wipe ends past the plate's edges rather than on them, so
                  the clip never cuts off the plate's own shadow. */}
              <motion.figure
                className="hero__plate"
                initial={reduceMotion ? false : { clipPath: HIDDEN_CLIP }}
                animate={{ clipPath: start ? SHOWN_CLIP : HIDDEN_CLIP }}
                transition={{ duration: 1.25, delay: start ? 0.58 : 0, ease: EASE }}
              >
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
                    <motion.img
                      src={PLATE.src}
                      alt={PLATE.alt}
                      width="1800"
                      height="1800"
                      sizes={PLATE_SIZES}
                      fetchPriority="high"
                      decoding="async"
                      initial={reduceMotion ? false : { scale: 1.16 }}
                      animate={{ scale: start ? 1 : 1.16 }}
                      transition={{ duration: 1.8, delay: start ? 0.58 : 0, ease: EASE }}
                    />
                  </picture>
                </span>
              </motion.figure>
            </motion.div>

            <motion.div className="hero__card-slot hero__card-slot--fond" style={depth(cardX, cardY)}>
              <motion.div className="hero__card" {...enter(1.1, { opacity: 0, y: 22 })}>
                <span className="hero__card-icon" aria-hidden="true">
                  <SteeringWheel size={22} weight="duotone" />
                </span>
                <span className="hero__card-copy">
                  <span className="hero__card-figure">
                    {B_FOND}
                    <small>časova vožnje</small>
                  </span>
                  <span className="hero__card-note">Minimum za B kategoriju</span>
                </span>
              </motion.div>
            </motion.div>

            <motion.div className="hero__card-slot hero__card-slot--start" style={depth(cardX, cardY)}>
              <motion.a
                className="hero__card hero__card--link"
                href={cta.href}
                {...enter(1.28, { opacity: 0, y: 22 })}
              >
                <span className="hero__card-label">Upis je u toku</span>
                <span className="hero__card-figure hero__card-figure--text">Kreni već sutra</span>
                <span className="hero__card-more">
                  {cta.label}
                  <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
