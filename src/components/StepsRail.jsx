import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import Eyebrow from "./Eyebrow";
import Reveal from "./Reveal";
import RollText from "./RollText";
import SplitText from "./SplitText";
import { steps } from "../data";

/*
 * The six steps, read as a run rather than a list.
 *
 * A single rail runs the height of the column and fills as the section passes,
 * and each marker takes the accent once its step is reached — so the block
 * shows the progression it describes instead of only stating it. The navy
 * ground is the other half of the job: it breaks a long run of white sections
 * and gives the page a second anchor between the hero and the closing band.
 */
export default function StepsRail({
  eyebrow = "Put do dozvole",
  title = "Od upisa do vozačkog ispita",
  lead = "Pregled postupka za kandidate koji prvi put polažu za B kategoriju. Pogledajte uslove za svaku fazu i korake nakon polaganja.",
  link = { href: "/kako-do-dozvole", label: "Uslovi upisa i postupak polaganja" },
}) {
  const railRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [reached, setReached] = useState(reduceMotion ? steps.length - 1 : -1);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 72%", "end 68%"],
  });

  // Damped so the line does not twitch with every wheel tick.
  const fill = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.0005,
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setReached(Math.min(steps.length - 1, Math.floor(value * steps.length + 0.35)));
  });

  return (
    <section className="steps-band section-space" aria-labelledby="steps-band-title">
      <div className="shell steps-band__grid">
        <div className="steps-band__copy">
          <Reveal>
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id="steps-band-title"
            className="display display--sm"
            text={title}
          />
          <Reveal delay={0.12}>
            <p className="steps-band__lead">{lead}</p>
            {link && (
              <a className="link-underline link-underline--light" href={link.href}>
                <RollText>{link.label}</RollText>
                <span className="link-underline__glyph" aria-hidden="true">
                  &#8594;
                </span>
              </a>
            )}
          </Reveal>
        </div>

        <ol className="steps" ref={railRef}>
          <span className="steps__rail" aria-hidden="true">
            <motion.span
              className="steps__rail-fill"
              style={reduceMotion ? { scaleY: 1 } : { scaleY: fill }}
            />
          </span>

          {steps.map((step, index) => (
            <li
              className="steps__item"
              key={step.title}
              data-reached={index <= reached ? "true" : "false"}
            >
              <Reveal className="steps__card" delay={index * 0.05} distance={26}>
                <span className="steps__node" aria-hidden="true" />
                <span className="steps__ghost" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="steps__index">Korak {String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <span className="steps__tag">{step.tag}</span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
