import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import RevealImage from "./RevealImage";
import SplitText from "./SplitText";
import { useIsNarrow } from "../hooks";
import { SIZES } from "../media";
import { faqs } from "../data";

/*
 * Native <details> rows: the answers are in the DOM whether or not a row is
 * open, so they are indexed and reachable with the keyboard, and there is no
 * accordion script to go wrong on a phone.
 *
 * Given a photograph the two columns become parallax layers: the head column is
 * pushed back down against the scroll while the list is pulled up with it, so
 * they separate on the way past instead of travelling as one block.
 *
 * The matching FAQPage structured data is emitted from src/seo.js for the
 * walkthrough page only: the home page shows the same answers, and claiming
 * them twice would put one set of questions on two URLs.
 */
export default function FaqList({
  eyebrow = "Česta pitanja",
  title = "Pitanja o obuci i polaganju",
  id = "pitanja",
  media = null,
  mediaAlt = "",
}) {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const narrow = useIsNarrow();

  // A phone has one column, so there is nothing for a layer to separate from.
  const still = reduceMotion || narrow || !media;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headY = useTransform(scrollYProgress, [0, 1], [-46, 46]);
  const listY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section className="faq section-space" id={id} ref={sectionRef} aria-labelledby={`${id}-title`}>
      <div className="shell faq__grid">
        <motion.div className="faq__head" style={still ? undefined : { y: headY }}>
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <SplitText as="h2" id={`${id}-title`} className="display display--sm" text={title} />

          {media && (
            <RevealImage
              className="faq__media"
              src={media}
              alt={mediaAlt}
              ratio="16 / 10"
              parallax={48}
              objectPosition="center 42%"
              sizes={SIZES.half}
            />
          )}
        </motion.div>

        <motion.div className="faq__list" style={still ? undefined : { y: listY }}>
          {faqs.map((item, index) => (
            <Reveal key={item.q} delay={Math.min(index, 3) * 0.05} distance={18}>
              <details className="faq__item" name={id}>
                <summary>
                  <h3>{item.q}</h3>
                  <span className="faq__mark" aria-hidden="true" />
                </summary>
                <div className="faq__answer">
                  <p>{item.a}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
