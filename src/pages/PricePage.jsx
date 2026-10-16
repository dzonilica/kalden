import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Phone } from "@phosphor-icons/react";
import CtaBand from "../components/CtaBand";
import Eyebrow from "../components/Eyebrow";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import RollText from "../components/RollText";
import SplitText from "../components/SplitText";
import { contact, cta, pricing } from "../data";

/*
 * Cenovnik.
 *
 * Nothing on this page is a stored price except the three unit rates in
 * src/data.js. Every line and every total is multiplied out from them and the
 * legal hour table at render time, which is the only way a page like this stays
 * true: when the school changes a rate, one number moves and 24 totals follow.
 *
 * The categories share one grid rather than four, because the question a
 * visitor arrives with is never "what does B cost" — it is "what does it cost
 * for me", and the answer turns entirely on what they already hold.
 */

const EASE = [0.165, 0.84, 0.44, 1];

const { units, categories, common } = pricing;

function din(value) {
  return value.toLocaleString("sr-RS");
}

function totalFor(scenario) {
  return (
    scenario.theory * units.theory.value +
    scenario.driving * units.driving.value +
    units.exam.value
  );
}

/* The three rates the whole page multiplies out, stated once and up front. */
function Units() {
  return (
    <section className="rates section-space" aria-labelledby="rates-title">
      <div className="shell">
        <div className="rates__panel">
          <Reveal className="rates__head">
            <span className="rates__badge" aria-hidden="true">
              din
            </span>
            <div>
              <h2 id="rates-title">Jedinične cene obuke</h2>
              <p>Iste su za sve kategorije — ukupna cena zavisi samo od broja časova.</p>
            </div>
          </Reveal>

          <ul className="rates__grid">
            {[units.theory, units.driving, units.exam].map((rate, index) => (
              <Reveal as="li" className="rates__cell" key={rate.label} delay={index * 0.07}>
                <span className="rates__label">{rate.label}</span>
                <span className="rates__value">
                  {din(rate.value)}
                  <span>{rate.unit}</span>
                </span>
              </Reveal>
            ))}
          </ul>

          <Reveal className="rates__note" delay={0.2}>
            <p>
              <strong>Kako se računa:</strong> ukupna cena = (broj časova teorije &times;{" "}
              {din(units.theory.value)}) + (broj časova vožnje &times; {din(units.driving.value)}) +{" "}
              {din(units.exam.value)} din za polaganje. Ako već imate neku kategoriju, propisani
              broj časova je manji — pa je i cena niža.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ScenarioCard({ category, scenario, index }) {
  const theoryCost = scenario.theory * units.theory.value;
  const drivingCost = scenario.driving * units.driving.value;

  return (
    <Reveal as="li" className="tariff" delay={Math.min(index, 5) * 0.06} distance={20}>
      <div className="tariff__head">
        <span className="tariff__holds">{scenario.holds}</span>
        <span className="tariff__kat">{category.label} kat.</span>
      </div>

      <dl className="tariff__lines">
        <div>
          <dt>
            Teorija{" "}
            {scenario.theory > 0 && (
              <span>
                ({scenario.theory}č &times; {din(units.theory.value)})
              </span>
            )}
          </dt>
          {/* A waived fond is the one line worth reading twice: it is why this
              card is cheaper, so it is set apart rather than printed as 0. */}
          <dd data-waived={scenario.theory === 0 ? "true" : undefined}>
            {scenario.theory === 0 ? "nema" : `${din(theoryCost)} din`}
          </dd>
        </div>
        <div>
          <dt>
            Vožnja{" "}
            <span>
              ({scenario.driving}č &times; {din(units.driving.value)})
            </span>
          </dt>
          <dd>{din(drivingCost)} din</dd>
        </div>
        <div>
          <dt>Polaganje (T + V)</dt>
          <dd>{din(units.exam.value)} din</dd>
        </div>
      </dl>

      <div className="tariff__total">
        <span>Ukupno</span>
        <strong>{din(totalFor(scenario))} din</strong>
      </div>

      <a className="tariff__cta" href={cta.href}>
        <RollText>Upišite se</RollText>
        <span aria-hidden="true">&#8594;</span>
      </a>
    </Reveal>
  );
}

function Tariffs() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const reduceMotion = useReducedMotion();
  const category = categories.find((item) => item.id === activeId) ?? categories[0];

  return (
    <section className="tariffs section-space" aria-labelledby="tariffs-title">
      <div className="shell">
        <div className="tariffs__head">
          <Reveal>
            <Eyebrow>Cene po kategorijama</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id="tariffs-title"
            className="display display--sm"
            text="Koliko košta vaša kategorija"
          />
          <Reveal delay={0.12}>
            <p className="lead">
              Izaberite kategoriju, pa karticu koja opisuje vašu situaciju. Broj časova u svakoj
              kartici je propisani minimum iz Pravilnika o teorijskoj i praktičnoj obuci kandidata
              za vozače — škola ga ne određuje sama.
            </p>
          </Reveal>
        </div>

        <Reveal className="tariffs__tabs" delay={0.16}>
          <div role="tablist" aria-label="Kategorije obuke">
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`kat-tab-${item.id}`}
                aria-selected={item.id === activeId}
                aria-controls={`kat-panel-${item.id}`}
                tabIndex={item.id === activeId ? 0 : -1}
                className="tariffs__tab"
                onClick={() => setActiveId(item.id)}
              >
                {item.id === activeId && (
                  <motion.span
                    className="tariffs__tab-pill"
                    layoutId="kat-pill"
                    aria-hidden="true"
                    transition={
                      reduceMotion ? { duration: 0 } : { duration: 0.42, ease: EASE }
                    }
                  />
                )}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* mode="wait" so the outgoing grid is gone before the incoming one is
            measured — two card grids of different lengths overlapping would
            otherwise push the panel below them up and down. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={category.id}
            id={`kat-panel-${category.id}`}
            role="tabpanel"
            aria-labelledby={`kat-tab-${category.id}`}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: reduceMotion ? 0.15 : 0.42, ease: EASE }}
          >
            <ul className="tariffs__grid">
              {category.scenarios.map((scenario, index) => (
                <ScenarioCard
                  key={scenario.holds}
                  category={category}
                  scenario={scenario}
                  index={index}
                />
              ))}
            </ul>

            <div className="katcard">
              <div className="katcard__copy">
                <span className="katcard__badge" aria-hidden="true">
                  {category.label}
                </span>
                <Eyebrow>{category.label} kategorija</Eyebrow>
                <h3>{category.name}</h3>
                <p>{category.summary}</p>
                <p className="katcard__age">{category.age}</p>
              </div>

              <div className="katcard__terms">
                <h4>Uslovi i umanjenja</h4>
                <ul>
                  {[...category.conditions, ...common].map((line) => (
                    <li key={line}>
                      <Check size={14} weight="bold" aria-hidden="true" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/*
 * What the totals above do not contain.
 *
 * On a price list this is the part that costs a phone call if it is missing, so
 * it is stated rather than left to the small print.
 */
function Extras() {
  return (
    <section className="price section-space" aria-labelledby="extras-title">
      <div className="shell price__inner">
        <Reveal>
          <Eyebrow>Šta nije u ceni</Eyebrow>
        </Reveal>
        <SplitText
          as="h2"
          id="extras-title"
          className="display display--sm"
          text="Dodatni časovi i troškovi van cenovnika"
        />
        <Reveal delay={0.12}>
          <p className="lead">
            Svaki čas vožnje preko propisanog fonda naplaćuje se {din(units.driving.value)} din, po
            istoj ceni kao i časovi iz obuke. Lekarsko uverenje, obuka i ispit iz prve pomoći,
            taksa za izdavanje vozačke dozvole i eventualno ponovno izlaženje na ispit plaćaju se
            odvojeno i ne ulaze u iznose iz cenovnika. Za uslove plaćanja na rate i aktuelne
            termine pozovite školu.
          </p>
        </Reveal>
        <Reveal className="price__actions" delay={0.18}>
          <a className="btn btn--fill" href={contact.phoneHref}>
            <Phone size={16} weight="fill" aria-hidden="true" />
            <RollText>{contact.phone}</RollText>
          </a>
          <a className="btn btn--outline" href="/kako-do-dozvole">
            <RollText>Kako do dozvole</RollText>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export default function PricePage() {
  return (
    <>
      <PageHero
        eyebrow="Cenovnik"
        title="Cenovnik obuke u Kragujevcu"
        lead="Obuka se plaća po času, a broj časova je propisan zakonom i zavisi od toga koju kategoriju već imate. U nastavku je ukupna cena za svaku kombinaciju, izračunata iz tri jedinične cene."
        image="/media/foto/vozni-park-3-auta-poligon.jpg"
        alt="Tri vozila auto škole Kalden 020 na poligonu"
        cta={{ label: "Kontakt i upis", href: "/kontakt" }}
        secondary={{ label: "Program obuke", href: "/obuka" }}
        compact
      />
      <Units />
      <Tariffs />
      <Extras />
      <CtaBand
        title="Upis i termini"
        body="Za upis, početak nastave i raspoložive termine vožnje pozovite auto školu Kalden 020."
      />
    </>
  );
}
