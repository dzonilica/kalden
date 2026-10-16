import Reveal from "./Reveal";
import { facts } from "../data";

/* Four numbers the school can stand behind, as a row of plain type. */
export default function Facts({ className = "" }) {
  return (
    <dl className={`facts-row ${className}`.trim()}>
      {facts.map((fact, index) => (
        <Reveal as="div" className="facts-row__item" key={fact.label} delay={index * 0.06} distance={18}>
          <dt>{fact.label}</dt>
          <dd>{fact.value}</dd>
        </Reveal>
      ))}
    </dl>
  );
}
