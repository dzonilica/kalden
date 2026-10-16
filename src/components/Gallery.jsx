import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Play, X } from "@phosphor-icons/react";
import Reveal from "./Reveal";
import { SIZES, imageSources } from "../media";
import { gallery } from "../data";
import { lockScroll, unlockScroll } from "../scroll";

/*
 * Vozni park, as a grid that opens.
 *
 * The 2022 site had a lightbox wired up with an empty image list, so clicking a
 * photograph did nothing. This one is the whole point of the page: the frames
 * are square and cropped in the grid, and opening one shows it whole, with the
 * arrow keys and Escape doing what they look like they should.
 *
 * The film sits in the set as its own tile rather than above it, because it is
 * one of the seven things there are to look at, not a feature.
 */

const EASE = [0.165, 0.84, 0.44, 1];

const items = [
  ...gallery,
  {
    type: "video",
    src: "/media/video/natpis-720.mp4",
    poster: "/media/video/natpis-poster.jpg",
    alt: "Natpis Kalden 020 Auto škola na vratima vozila",
    caption: "Natpis na vozilu",
  },
];

export default function Gallery() {
  const [open, setOpen] = useState(null);
  const closeRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((delta) => {
    setOpen((current) => {
      if (current === null) return current;
      return (current + delta + items.length) % items.length;
    });
  }, []);

  useEffect(() => {
    if (open === null) return undefined;

    const previousFocus = document.activeElement;
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    lockScroll();
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      unlockScroll();
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus?.();
    };
  }, [open, close, step]);

  const current = open === null ? null : items[open];

  return (
    <>
      <ul className="gallery">
        {items.map((item, index) => (
          <Reveal
            as="li"
            className="gallery__cell"
            key={item.src}
            delay={Math.min(index, 4) * 0.05}
            distance={20}
          >
            <button type="button" onClick={() => setOpen(index)}>
              <picture>
                {imageSources(item.type === "video" ? item.poster : item.src).map((source) => (
                  <source
                    key={source.type}
                    type={source.type}
                    srcSet={source.srcSet}
                    sizes={SIZES.card}
                  />
                ))}
                <img
                  src={item.type === "video" ? item.poster : item.src}
                  alt={item.alt}
                  sizes={SIZES.card}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              </picture>
              <span className="gallery__label">
                {item.type === "video" && <Play size={13} weight="fill" aria-hidden="true" />}
                {item.caption}
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      <AnimatePresence>
        {current && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={current.caption}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <button
              className="lightbox__backdrop"
              type="button"
              aria-label="Zatvorite galeriju"
              onClick={close}
            />

            <motion.figure
              className="lightbox__frame"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.42, ease: EASE }}
            >
              {current.type === "video" ? (
                <video
                  src={current.src}
                  poster={current.poster}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : (
                <picture>
                  {imageSources(current.src).map((source) => (
                    <source
                      key={source.type}
                      type={source.type}
                      srcSet={source.srcSet}
                      sizes="(max-width: 900px) 100vw, 1100px"
                    />
                  ))}
                  <img src={current.src} alt={current.alt} decoding="async" />
                </picture>
              )}
              <figcaption>
                <span>{current.caption}</span>
                <span className="lightbox__count">
                  {String(open + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </figcaption>
            </motion.figure>

            <button
              className="lightbox__nav lightbox__nav--prev"
              type="button"
              onClick={() => step(-1)}
              aria-label="Prethodna fotografija"
            >
              <ArrowLeft size={20} weight="regular" aria-hidden="true" />
            </button>
            <button
              className="lightbox__nav lightbox__nav--next"
              type="button"
              onClick={() => step(1)}
              aria-label="Sledeća fotografija"
            >
              <ArrowRight size={20} weight="regular" aria-hidden="true" />
            </button>
            <button
              ref={closeRef}
              className="lightbox__close"
              type="button"
              onClick={close}
              aria-label="Zatvorite galeriju"
            >
              <X size={20} weight="regular" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
