import { motion, useReducedMotion } from "motion/react";
import { PhoneCall } from "@phosphor-icons/react";
import { useIntroDone } from "../intro";
import { contact } from "../data";

/*
 * Call button, pinned to the bottom right corner on every page.
 *
 * Most people who reach this site want to ask about enrolment, and on a phone
 * the quickest way to do that is one tap away from wherever they are reading.
 * The ring pulses outward to mark it as live; on a mouse the number slides out
 * beside it on hover, so the visitor sees what they are about to dial.
 *
 * It waits for the opening loader like the navigation does, and sits under the
 * open menu and the lightbox (see z-index in .callfab).
 */

const EASE = [0.165, 0.84, 0.44, 1];

export default function CallButton() {
  const ready = useIntroDone();
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      className="callfab"
      href={contact.phoneHref}
      aria-label={`Pozovite auto školu: ${contact.phone}`}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.6, y: 16 }}
      animate={ready ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 16 }}
      transition={{ duration: 0.7, delay: ready ? 1.4 : 0, ease: EASE }}
    >
      <span className="callfab__label" aria-hidden="true">
        <small>Pozovite</small>
        {contact.phone}
      </span>
      <span className="callfab__button">
        <span className="callfab__ring" aria-hidden="true" />
        <PhoneCall size={24} weight="fill" aria-hidden="true" />
      </span>
    </motion.a>
  );
}
