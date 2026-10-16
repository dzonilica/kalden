import CtaBand from "../components/CtaBand";
import Eyebrow from "../components/Eyebrow";
import FaqList from "../components/FaqList";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import RevealImage from "../components/RevealImage";
import RollText from "../components/RollText";
import SplitText from "../components/SplitText";
import { SIZES } from "../media";
import { steps } from "../data";

/* Uslovi koji se pominju u koracima, izvučeni na jedno mesto. */
const requirements = [
  {
    title: "Početak praktične obuke",
    body: "Pre početka praktične obuke potrebni su položen teorijski ispit i odgovarajuće lekarsko uverenje.",
  },
  {
    title: "Praktični ispit",
    body: "Praktičnom ispitu možete pristupiti sa navršenih 17 godina, nakon završene praktične obuke i ispunjenja ostalih propisanih uslova.",
  },
  {
    title: "Izdavanje dozvole",
    body: "Nakon položenog vozačkog ispita sledi podnošenje zahteva za izdavanje dozvole. Za izdavanje je potrebna i položena prva pomoć, uz ostale propisane uslove. Probna dozvola podrazumeva posebna pravila i ograničenja sa kojima treba da se upoznate pre vožnje.",
  },
];

function Phases() {
  return (
    <section className="phases section-space" aria-labelledby="phases-title">
      <div className="shell phases__layout">
        <div className="phases__rail">
          <Reveal>
            <Eyebrow>Šest koraka</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id="phases-title"
            className="display display--sm"
            text="Postupak od upisa do dozvole"
          />
          <Reveal delay={0.12}>
            <p className="lead">
              Postupak obuhvata upis, teorijsku nastavu i ispit, praktičnu obuku i ispit,
              a zatim zahtev za izdavanje dozvole. Trajanje zavisi od rasporeda nastave,
              termina vožnje i polaganja ispita.
            </p>
            <a className="link-underline" href="/obuka">
              <RollText>Sadržaj obuke i cena</RollText>
              <span className="link-underline__glyph" aria-hidden="true">
                &#8594;
              </span>
            </a>
          </Reveal>
        </div>

        <ol className="phases__list">
          {steps.map((step, index) => (
            <li className="phase" key={step.title}>
              <Reveal className="phase__copy" delay={0.04} distance={22}>
                <span className="phase__index">
                  Korak {String(index + 1).padStart(2, "0")}
                </span>
                <div className="phase__head">
                  <img src={step.icon} alt="" width="58" height="52" loading="lazy" />
                  <h3>{step.title}</h3>
                </div>
                <p>{step.body}</p>
                <span className="phase__tag">{step.tag}</span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Requirements() {
  return (
    <section className="reqs section-space" aria-labelledby="reqs-title">
      <div className="shell reqs__grid">
        <div>
          <Reveal>
            <Eyebrow>Uslovi</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            id="reqs-title"
            className="display display--sm"
            text="Uslovi za obuku, ispit i izdavanje dozvole"
          />
          <Reveal delay={0.12}>
            <p className="lead">
              Obuka za B kategoriju može da počne sa navršenih 16 godina. Uslovi i
              dokumentacija razlikuju se prema fazi postupka i statusu kandidata.
              Pre upisa proverite u školi šta je potrebno za vaš program obuke.
            </p>
          </Reveal>
          <RevealImage
            className="reqs__media"
            src="/media/foto/tim-instruktori-uz-vozila-2.jpg"
            alt="Instruktori auto škole Kalden 020 pored vozila"
            ratio="16 / 10"
            parallax={48}
            sizes={SIZES.half}
          />
        </div>

        <dl className="reqs__list">
          {requirements.map((item, index) => (
            <Reveal as="div" className="reqs__row" key={item.title} delay={index * 0.06} distance={18}>
              <dt>{item.title}</dt>
              <dd>{item.body}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Kako do dozvole"
        title="Kako do vozačke dozvole za B kategoriju"
        lead="Pregled postupka za kandidate koji prvi put polažu za B kategoriju. Ako već imate vozačku dozvolu ili ste započeli obuku u drugoj školi, pre upisa proverite koji program i dokumentacija važe za vas."
        image="/media/foto/vozni-park-3-auta-poligon.jpg"
        alt="Tri vozila auto škole Kalden 020 na poligonu"
        cta={{ label: "Kontakt i upis", href: "/kontakt" }}
        compact
        bright
      />
      <Phases />
      <Requirements />
      <FaqList
        media="/media/foto/seat-leon-crveni.jpg"
        mediaAlt="Crveni SEAT Leon auto škole Kalden 020"
      />
      <CtaBand
        title="Informacije o upisu"
        body="Za uslove upisa, dokumentaciju i početak nastave kontaktirajte auto školu Kalden 020."
      />
    </>
  );
}
