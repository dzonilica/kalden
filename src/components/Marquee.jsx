import { marquee } from "../data";

/*
 * The line under the hero: six short facts, repeated twice so the run can loop
 * without a seam, scrolling on a CSS animation that reduced-motion settings
 * switch off through the global rule in styles.css.
 *
 * The second copy is hidden from assistive tech — it is the same six words.
 */
export default function Marquee() {
  const run = (
    <span className="marquee__run">
      {marquee.map((item) => (
        <span className="marquee__item" key={item}>
          {item}
          <span className="marquee__dot" aria-hidden="true" />
        </span>
      ))}
    </span>
  );

  return (
    <div className="marquee">
      <div className="marquee__track">
        {run}
        <span className="marquee__clone" aria-hidden="true">
          {run}
        </span>
      </div>
    </div>
  );
}
