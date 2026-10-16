import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/*
 * Heading text broken into visual lines, each line clipped by its own mask and
 * slid up into place. Lines are measured from the real rendered type, so the
 * break points always match whatever the layout actually produced.
 */

const EASE = [0.165, 0.84, 0.44, 1];

export default function SplitText({
  text,
  as: Tag = "h2",
  className = "",
  id,
  delay = 0,
  stagger = 0.075,
  duration = 1,
  trigger = "inView",
  once = true,
  active = true,
}) {
  const hostRef = useRef(null);
  const widthRef = useRef(0);
  const [lines, setLines] = useState(null);
  const reduceMotion = useReducedMotion();
  const words = String(text).trim().split(/\s+/);

  useLayoutEffect(() => {
    setLines(null);
  }, [text]);

  useLayoutEffect(() => {
    if (reduceMotion || lines !== null) return;
    const host = hostRef.current;
    if (!host) return;

    const marks = host.querySelectorAll("[data-word]");
    if (!marks.length) return;

    const rows = [];
    let rowTop = null;
    marks.forEach((mark) => {
      const top = mark.offsetTop;
      if (rowTop === null || Math.abs(top - rowTop) > 2) {
        rowTop = top;
        rows.push([]);
      }
      /* The measure pass carries a trailing space inside each word span so the
         words separate; joining on a space as well would double it, and the
         widened line then wraps a second time inside its own mask. */
      rows[rows.length - 1].push(mark.textContent.trim());
    });

    widthRef.current = host.offsetWidth;
    setLines(rows.map((row) => row.join(" ")));
  }, [lines, reduceMotion]);

  /* Lines measured in the fallback face break in the wrong places once the web
     font swaps in, and the width does not change, so the observer below never
     hears about it. Measure again when the fonts land. */
  useLayoutEffect(() => {
    if (reduceMotion || !document.fonts || document.fonts.status === "loaded") return undefined;
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) setLines(null);
    });
    return () => {
      cancelled = true;
    };
  }, [reduceMotion]);

  useLayoutEffect(() => {
    if (reduceMotion) return undefined;
    const host = hostRef.current;
    if (!host || typeof ResizeObserver === "undefined") return undefined;

    const observer = new ResizeObserver(() => {
      const width = hostRef.current?.offsetWidth ?? 0;
      if (Math.abs(width - widthRef.current) < 1) return;
      widthRef.current = width;
      setLines(null);
    });

    observer.observe(host);
    return () => observer.disconnect();
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <Tag className={className} id={id}>
        {text}
      </Tag>
    );
  }

  // First pass: the real type, laid out normally, so line breaks can be read off it.
  if (lines === null) {
    return (
      <Tag ref={hostRef} className={className} id={id}>
        {words.map((word, index) => (
          <span data-word="" key={`${word}-${index}`}>
            {word}
            {index < words.length - 1 ? " " : ""}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={hostRef} className={className} id={id}>
      <motion.span
        className="split"
        variants={{
          rest: {},
          run: { transition: { staggerChildren: stagger, delayChildren: delay } },
        }}
        initial="rest"
        {...(trigger === "mount"
          ? { animate: active ? "run" : "rest" }
          : { whileInView: "run", viewport: { once, amount: 0.25 } })}
      >
        {lines.map((line, index) => (
          <span className="split__mask" key={`${line}-${index}`}>
            <motion.span
              className="split__line"
              variants={{ rest: { y: "112%" }, run: { y: 0, transition: { duration, ease: EASE } } }}
            >
              {/* The trailing space is what keeps the heading one sentence when
                  it is read as a flat string rather than as laid-out lines:
                  without it the last word of a line runs into the first word of
                  the next ("prati do" + "dozvole"). It collapses at the end of
                  a line, so nothing moves. */}
              {index < lines.length - 1 ? `${line} ` : line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
