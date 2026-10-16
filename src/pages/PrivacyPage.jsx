import Reveal from "../components/Reveal";
import SplitText from "../components/SplitText";
import { contact, legal, site } from "../data";

/*
 * Politika privatnosti.
 *
 * It describes what this build actually does and nothing more: no account, no
 * analytics, no cookie set by the site itself, and a contact form that hands
 * the message to the visitor's own mail app rather than posting it anywhere.
 * If a form endpoint or Google Analytics is added — both are listed as options
 * in README.md — sections 2, 3 and 4 have to be rewritten in the same change,
 * and a consent bar has to come with the analytics.
 */

const sections = [
  {
    id: "ko-smo",
    title: "Kontakt za pitanja o privatnosti",
    body: [
      `Ovaj sajt predstavlja ${site.name}, ${contact.addressFull}, ${contact.country}. Za pitanja o obradi podataka pišite na ${contact.email} ili pozovite ${contact.phone}.`,
    ],
  },
  {
    id: "sta-sajt-prikuplja",
    title: "Podaci pri korišćenju sajta",
    body: [
      "Za pregled sajta nije potrebna registracija. Sajt nema ugrađene alate za analitiku ili reklamno praćenje. Na kontakt stranici koristi se Google mapa, čije je učitavanje opisano u nastavku.",
      `Hosting servis može beležiti tehničke podatke, poput IP adrese i vremena pristupa. Za informacije o obradi i čuvanju tih podataka pišite na ${contact.email}.`,
    ],
  },
  {
    id: "kontakt-forma",
    title: "Kontakt forma",
    body: [
      "Kontakt forma priprema poruku u vašoj aplikaciji za e-poštu. Slanje završavate u toj aplikaciji, nakon provere sadržaja. Sama forma ne šalje podatke na server sajta. Otvaranje pripremljene poruke ne potvrđuje da je poruka poslata ili primljena.",
      "Poruka sadrži podatke koje unesete u formu: ime, prezime, telefon, e-poštu, temu i tekst upita. Kada je pošaljete, primalac vidi i adresu pošiljaoca. Podaci iz upita služe za odgovor i dogovor o upisu, obuci ili terminima.",
    ],
  },
  {
    id: "google-mapa",
    title: "Google mapa na strani Kontakt",
    body: [
      "Na kontakt stranici ugrađena je Google mapa. Učitava se automatski tokom pregleda stranice, bez posebnog izbora posetioca. Njenim učitavanjem ostvaruje se veza sa Google servisom, koji može obrađivati tehničke podatke i koristiti kolačiće prema svojim pravilima privatnosti.",
      `Adresa škole navedena je i tekstualno: ${contact.addressFull}. Možete je koristiti u aplikaciji za mape po svom izboru.`,
    ],
  },
  {
    id: "koliko-cuvamo",
    title: "Čuvanje kontakt poruka",
    body: [
      `Kontakt poruke i evidencija o obuci kandidata služe različitim svrhama. Za informacije o rokovima čuvanja poruka i podataka iz evidencije obuke obratite se školi na ${contact.email}.`,
      "U upit unesite samo podatke potrebne za odgovor. Dokumentaciju za upis dostavite na način koji prethodno dogovorite sa školom.",
    ],
  },
  {
    id: "tvoja-prava",
    title: "Vaša prava",
    body: [
      `Za informacije o podacima koji se odnose na vas, kao i za zahteve za pristup, ispravku ili brisanje, pišite na ${contact.email}. Opravdanost zahteva i obaveze čuvanja podataka procenjuju se prema primenljivim propisima.`,
      "Prava i obaveze koje se tiču podataka o ličnosti uređuje Zakon o zaštiti podataka o ličnosti Republike Srbije.",
    ],
  },
  {
    id: "promene",
    title: "Promene ove politike",
    body: [
      `Informacije na ovoj stranici ažuriraju se kada se promeni način rada sajta ili obrade podataka. Poslednja izmena: ${legal.updated}`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <section className="legal" aria-labelledby="legal-title">
      <div className="shell">
        <div className="legal__head">
          <SplitText
            as="h1"
            id="legal-title"
            className="legal__title"
            text="Politika privatnosti"
            trigger="mount"
            delay={0.1}
          />
          <Reveal delay={0.1}>
            <p className="legal__updated">
              <time dateTime={legal.updatedISO}>Ažurirano {legal.updated}</time>
            </p>
          </Reveal>
        </div>

        <div className="legal__layout">
          <nav className="legal__toc" aria-labelledby="legal-toc-title">
            <p className="legal__toc-title" id="legal-toc-title">
              Sadržaj
            </p>
            <ol>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="legal__body">
            {sections.map((section, index) => (
              <section className="legal__section" id={section.id} key={section.id}>
                <h2>
                  <span className="legal__section-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
