import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "@phosphor-icons/react";
import { imageSources } from "../media";
import { lockScroll, unlockScroll } from "../scroll";

/*
 * The full-size view behind every photo grid on the site: the gallery page and
 * the fleet grid on the home page both open into this one. The grid owns which
 * frame is open; this owns showing it, the arrow keys and Escape, the scroll
 * lock, and handing focus back to the tile that opened it.
 */

const EASE = [0.165, 0.84, 0.44, 1];

export default function Lightbox({ items, index, onClose, onStep }) {
  const closeRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const open = index !== null;

  useEffect(() => {
    if (!open) return undefined;

    const previousFocus = document.activeElement;
    const frame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onStep(1);
      if (event.key === "ArrowLeft") onStep(-1);
    };

    lockScroll();
    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      unlockScroll();
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus?.();
    };
  }, [open, onClose, onStep]);

  const current = open ? items[index] : null;

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28, ease: EASE }}
        >
          <button
            className="lightbox__backdrop"
            type="button"
            aria-label="Zatvorite galeriju"
            onClick={onClose}
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
              <span className="lightbox__count">
                {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </figcaption>
          </motion.figure>

          <button
            className="lightbox__nav lightbox__nav--prev"
            type="button"
            onClick={() => onStep(-1)}
            aria-label="Prethodna fotografija"
          >
            <ArrowLeft size={20} weight="regular" aria-hidden="true" />
          </button>
          <button
            className="lightbox__nav lightbox__nav--next"
            type="button"
            onClick={() => onStep(1)}
            aria-label="Sledeća fotografija"
          >
            <ArrowRight size={20} weight="regular" aria-hidden="true" />
          </button>
          <button
            ref={closeRef}
            className="lightbox__close"
            type="button"
            onClick={onClose}
            aria-label="Zatvorite galeriju"
          >
            <X size={20} weight="regular" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Open/close/step state for a grid that opens into the lightbox. */
export function useLightbox(count) {
  const [index, setIndex] = useState(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (delta) =>
      setIndex((current) => (current === null ? current : (current + delta + count) % count)),
    [count],
  );
  return { index, open: setIndex, close, step };
}
