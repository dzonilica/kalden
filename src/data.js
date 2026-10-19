/*
 * Everything the pages say about the school, in one place.
 *
 * Copy follows the SEO review. Business details retained from the project
 * still need confirmation from the school. Unconfirmed prices, opening hours,
 * ratings and social profiles are not published as current facts.
 */

export const site = {
  name: "Auto škola Kalden 020",
  shortName: "Kalden 020",
  origin: "https://kalden020.rs",
  city: "Kragujevac",
  foundedISO: "2020-02-24",
  founded: "24. februara 2020.",
  category: "B, AM, A1, A2 i A kategorija",
};

export const contact = {
  phone: "069 2789 623",
  phoneHref: "tel:+381692789623",
  phoneE164: "+381692789623",
  email: "kalden020kg@gmail.com",
  emailHref: "mailto:kalden020kg@gmail.com",
  address: "Dragoslava Srejovića 19",
  postalCode: "34000",
  city: "Kragujevac",
  country: "Srbija",
  addressFull: "Dragoslava Srejovića 19, 34000 Kragujevac",
  mapsHref: "https://goo.gl/maps/MHZ5jGw15GcRQFHR8",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2869.52752146584!2d20.921355215731488!3d44.01049233727057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475721b1535612e5%3A0x5c4f8b08134bbff1!2sKalden020!5e0!3m2!1ssr!2srs!4v1650285541669!5m2!1ssr!2srs",
  /* Dane i sate objaviti tek nakon potvrde škole. */
  hours: [
    ["Radno vreme kancelarije", "Proverite telefonom"],
    ["Termini teorijske nastave", "Proverite pri upisu"],
    ["Termini praktične obuke", "Proverite sa školom"],
  ],
};

export const navigation = [
  { label: "O nama", href: "/o-nama" },
  { label: "Obuka", href: "/obuka" },
  { label: "Cenovnik", href: "/cenovnik" },
  { label: "Kako do dozvole", href: "/kako-do-dozvole" },
  { label: "Galerija", href: "/galerija" },
  { label: "Kontakt", href: "/kontakt" },
];

export const legalNavigation = [{ label: "Politika privatnosti", href: "/politika-privatnosti" }];

export const cta = {
  label: "Kontakt i upis",
  href: "/kontakt",
};

export const advantages = [
  {
    title: "Teorijska nastava",
    body: "Teorijska nastava obuhvata pravila saobraćaja, saobraćajne znakove i prepoznavanje rizika. Nakon završene nastave polaže se teorijski ispit.",
    icon: "/media/ikone/prednost-1-kvalitet.svg",
  },
  {
    title: "Praktična obuka",
    body: "Praktična obuka obuhvata upravljanje vozilom, poligonske radnje i vožnju u saobraćaju uz instruktora. Izvodi se u vozilima auto škole Kalden 020.",
    icon: "/media/ikone/prednost-2-podrska.svg",
  },
  {
    title: "Dodatni časovi",
    body: "Za dodatne časove vožnje kontaktirajte školu i proverite uslove, cenu i raspoložive termine.",
    icon: "/media/ikone/prednost-3-posvecenost.svg",
  },
];

export const steps = [
  {
    title: "Upis i teorijska obuka",
    body: "Postupak počinje upisom i teorijskom obukom. Kontaktirajte školu za dokumentaciju, cenu i početak nastave. Teorijska nastava obuhvata pravila saobraćaja, znakove i prepoznavanje rizika.",
    tag: "Upis i nastava",
    icon: "/media/ikone/korak-1-upis-teorija.svg",
  },
  {
    title: "Teorijski ispit",
    body: "Nakon završene teorijske nastave polaže se teorijski ispit. Ispit traje 45 minuta i proverava poznavanje saobraćajnih propisa. Za prolaz je potrebno najmanje 85% ukupnog broja poena.",
    tag: "45 minuta · 85%",
    icon: "/media/ikone/korak-2-teorijski-ispit.svg",
  },
  {
    title: "Lekarsko uverenje",
    body: "Pre praktične obuke potreban je položen teorijski ispit i odgovarajuće lekarsko uverenje. Za informacije o pribavljanju uverenja obratite se školi.",
    tag: "Pre praktične obuke",
    icon: "/media/ikone/korak-3-lekarsko-prva-pomoc.svg",
  },
  {
    title: "Praktična obuka",
    body: "Praktična obuka obuhvata upravljanje vozilom, poligonske radnje i vožnju u saobraćaju uz instruktora. Za kandidata bez vozačke ili probne dozvole minimalni fond za B kategoriju iznosi 40 časova.",
    tag: "Vožnja sa instruktorom",
    icon: "/media/ikone/korak-4-voznja.svg",
  },
  {
    title: "Praktični ispit",
    body: "Nakon završene obuke i ispunjenja propisanih uslova pristupate praktičnom ispitu. Ispit obuhvata proveru na poligonu i vožnju u javnom saobraćaju.",
    tag: "Poligon i saobraćaj",
    icon: "/media/ikone/korak-5-prakticni-ispit.svg",
  },
  {
    title: "Izdavanje vozačke dozvole",
    body: "Nakon položenog ispita podnosite zahtev za izdavanje dozvole. Za izdavanje je potreban i položen ispit iz prve pomoći. Kandidatima koji prvi put stiču B kategoriju izdaje se probna dozvola, uz ispunjenje propisanih uslova.",
    tag: "Zahtev za dozvolu",
    icon: "/media/ikone/korak-6-vozacka.svg",
  },
];

/* Program i povezane obaveze; ovaj pregled nije specifikacija cene. */
export const trainingBlocks = [
  {
    name: "Teorijska obuka",
    line: "Pravila saobraćaja, signalizacija, obaveze učesnika i prepoznavanje opasnih situacija. Za kandidata bez vozačke ili probne dozvole minimalni fond iznosi 40 časova.",
    detail: "Priprema za teorijski ispit",
  },
  {
    name: "Teorijski ispit",
    line: "Nakon završene nastave polaže se teorijski ispit. Traje 45 minuta, a za prolaz je potrebno najmanje 85% ukupnog broja poena.",
    detail: "45 minuta · 85%",
  },
  {
    name: "Lekarsko uverenje i prva pomoć",
    line: "Pre praktične obuke potrebni su položen teorijski ispit i odgovarajuće lekarsko uverenje. Položen ispit iz prve pomoći potreban je za izdavanje dozvole. Organizaciju i troškove proverite pre upisa.",
    detail: "Obaveze u različitim fazama",
  },
  {
    name: "Praktična obuka",
    line: "Upravljanje vozilom, poligonske radnje i vožnja u saobraćaju uz instruktora. Za kandidata bez vozačke ili probne dozvole minimalni fond za B kategoriju iznosi 40 časova.",
    detail: "Vožnja sa instruktorom",
  },
  {
    name: "Praktični ispit",
    line: "Nakon završene obuke i ispunjenja propisanih uslova polaže se praktični ispit, koji obuhvata proveru na poligonu i vožnju u javnom saobraćaju.",
    detail: "Poligon i saobraćaj",
  },
  {
    name: "Dodatni časovi",
    line: "Za dodatne časove vožnje kontaktirajte školu i proverite uslove, cenu i raspoložive termine.",
    detail: "Uslovi i termini na upit",
  },
];

export const facts = [
  { label: "Osnovani", value: "2020." },
  { label: "Kategorije", value: "B, AM, A1, A2, A" },
  { label: "Vozila za obuku", value: "SEAT Leon" },
  { label: "Grad", value: "Kragujevac" },
];

export const gallery = [
  {
    src: "/media/foto/vozni-park-3-auta-poligon.jpg",
    alt: "Tri vozila auto škole Kalden 020 na poligonu",
  },
  {
    src: "/media/foto/tim-instruktori-uz-vozila-1.jpg",
    alt: "Instruktori auto škole Kalden 020 uz otvorena vrata vozila",
  },
  {
    src: "/media/foto/vozni-park-pozadi-zalazak.jpg",
    alt: "Vozila auto škole Kalden 020 snimljena otpozadi u zalazak sunca",
  },
  {
    src: "/media/foto/seat-leon-beli-cunjevi.jpg",
    alt: "Beli SEAT Leon auto škole Kalden 020 među čunjevima",
  },
  {
    src: "/media/foto/seat-leon-profil-zalazak.jpg",
    alt: "Beli SEAT Leon auto škole Kalden 020 iz profila u zalazak sunca",
  },
  {
    src: "/media/foto/seat-leon-crveni.jpg",
    alt: "Crveni SEAT Leon auto škole Kalden 020",
  },
];

export const faqs = [
  {
    q: "Za koje kategorije organizujete obuku?",
    a: "Auto škola Kalden 020 organizuje teorijsku i praktičnu obuku za B, AM, A1, A2 i A kategorije u Kragujevcu. Nalazimo se u ulici Dragoslava Srejovića 19. Za informacije o upisu pozovite 069 2789 623.",
  },
  {
    q: "Koliko traje obuka i koliko časova obuhvata?",
    a: "Za kandidata bez vozačke ili probne dozvole minimalni fond za B kategoriju iznosi 40 časova teorijske i 40 časova praktične obuke. Ako već imate neku kategoriju, proverite koji fond važi za vas. Kalendarsko trajanje zavisi od rasporeda nastave, termina vožnje i ispita. Za datum početka i aktuelni raspored kontaktirajte školu.",
  },
  {
    q: "Kako izgleda teorijski ispit?",
    a: "Teorijski ispit proverava poznavanje saobraćajnih propisa. Traje 45 minuta. Za prolaz je potrebno najmanje 85% ukupnog broja poena.",
  },
  {
    q: "Šta je potrebno pre početka praktične obuke?",
    a: "Potreban je položen teorijski ispit i odgovarajuće lekarsko uverenje.",
  },
  {
    q: "Kako izgleda praktični ispit?",
    a: "Praktični ispit obuhvata proveru na poligonu i vožnju u javnom saobraćaju.",
  },
  {
    q: "Koja vozila koristite?",
    a: "Praktična obuka izvodi se u vozilima SEAT Leon auto škole Kalden 020. Fotografije su dostupne u galeriji.",
  },
  {
    q: "Da li organizujete dodatne časove?",
    a: "Za dodatne časove proverite uslove, cenu i raspoložive termine direktno sa školom.",
  },
  {
    q: "Koliko košta obuka?",
    a: "Za aktuelnu cenu obuke i uslove plaćanja pozovite 069 2789 623 ili pišite na kalden020kg@gmail.com.",
  },
];

export const routeMeta = {
  "/": {
    title: "Auto škola Kragujevac – B, AM, A1, A2 i A kategorija | Kalden 020",
    description:
      "Auto škola Kalden 020 u Kragujevcu. Teorijska i praktična obuka za B, AM, A1, A2 i A kategorije. Informacije o upisu, ceni i terminima: 069 2789 623.",
    label: "Početna",
  },
  "/o-nama": {
    title: "O auto školi Kalden 020 u Kragujevcu",
    description:
      "Upoznajte auto školu Kalden 020 u Kragujevcu. Osnovni podaci o školi, obuci za B, AM, A1, A2 i A kategorije i vozilima za praktičnu nastavu.",
    label: "O nama",
  },
  "/obuka": {
    title: "Obuka za B, AM, A1, A2 i A kategorije u Kragujevcu | Kalden 020",
    description:
      "Obuka za B, AM, A1, A2 i A kategorije u auto školi Kalden 020 u Kragujevcu. Saznajte kako izgleda nastava, koja vozila koristimo i kako da dobijete aktuelni cenovnik.",
    label: "Obuka",
  },
  "/cenovnik": {
    title: "Cenovnik auto škole u Kragujevcu | Kalden 020",
    description:
      "Cenovnik obuke za B, AM, A1, A2 i A kategorije u Kragujevcu. Čas teorije 500 din, čas vožnje 2.000 din, teorijski i praktični ispit po 6.000 din. Ukupna cena po svakoj situaciji kandidata.",
    label: "Cenovnik",
  },
  "/kako-do-dozvole": {
    title: "Uslovi upisa i polaganje vozačkog ispita | Kalden 020",
    description:
      "Pregled postupka za B, AM, A1, A2 i A kategorije: upis, teorijska nastava, vožnja, ispiti i dokumentacija. Informacije za kandidate auto škole Kalden 020.",
    label: "Kako do dozvole",
  },
  "/galerija": {
    title: "Vozila i instruktori – Galerija | Kalden 020",
    description:
      "Pogledajte fotografije vozila, instruktora i poligona auto škole Kalden 020 u Kragujevcu. Saznajte više o praktičnoj obuci za B, AM, A1, A2 i A kategorije.",
    label: "Galerija",
  },
  "/kontakt": {
    title: "Kontakt i upis – Kalden 020, Kragujevac",
    description:
      "Kontakt auto škole Kalden 020: Dragoslava Srejovića 19, Kragujevac. Pozovite 069 2789 623 za informacije o upisu, obuci i ceni.",
    label: "Kontakt",
  },
  "/politika-privatnosti": {
    title: "Politika privatnosti | Auto škola Kalden 020",
    description:
      "Informacije o kontakt formi, e-pošti, Google mapi i obradi podataka na sajtu auto škole Kalden 020. Kontakt za pitanja o privatnosti.",
    label: "Politika privatnosti",
  },
};

export const legal = {
  updated: "15. oktobra 2026.",
  updatedISO: "2026-10-15",
};

/* =======================================================================
 * Cenovnik
 *
 * The school charges by the hour, and the number of hours is not its own
 * decision: it is the minimum fond propisan Pravilnikom o teorijskoj i
 * praktičnoj obuci kandidata za vozače. So the price list is not a table of
 * prices at all — it is three unit prices and the legal hour table, and every
 * total on /cenovnik is computed from them rather than typed in. A rate change
 * is one number here; nothing else moves.
 *
 * The hour counts below are the Pravilnik's, article by article:
 *   teorijska obuka  — čl. 6 (fond and the reductions), čl. 8 (full exemption)
 *   praktična obuka  — čl. 31 (AM), čl. 32 (A1), čl. 33 (A2), čl. 34 (A), čl. 36 (B)
 *
 * `theory: 0` means the Pravilnik exempts that candidate from theory entirely
 * (čl. 8) — it is not a missing value, and the page prints it as "nema".
 * ======================================================================= */

export const pricing = {
  /* Unit prices confirmed by the school on 15 October 2026. The two exams are
     separate payments of 6.000 din each, corrected by the school on
     16 October 2026 (it had been read as one 6.000 din fee for both). */
  units: {
    theory: { label: "Čas teorije", value: 500, unit: "din / čas" },
    driving: { label: "Čas vožnje", value: 2000, unit: "din / čas" },
    theoryExam: { label: "Teorijski ispit", value: 6000, unit: "din / ispit" },
    drivingExam: { label: "Praktični ispit", value: 6000, unit: "din / ispit" },
  },

  categories: [
    {
      id: "B",
      label: "B",
      name: "Putnička i teretna vozila",
      summary:
        "B kategorija obuhvata motorna vozila čija najveća dozvoljena masa nije veća od 3.500 kg i koja, pored sedišta za vozača, imaju najviše osam sedišta. Najtraženija kategorija — vozilo za svakodnevnu vožnju, posao i porodicu.",
      age: "Vozačka dozvola se stiče sa 17 godina, a obuka može početi najranije 12 meseci ranije. Kandidatu koji prvi put stiče B kategoriju izdaje se probna dozvola.",
      scenarios: [
        { holds: "Bez vozačke dozvole", theory: 40, driving: 40 },
        { holds: "Poseduje AM ili A1", theory: 7, driving: 35 },
        { holds: "Poseduje A2 ili A", theory: 7, driving: 30 },
        { holds: "Poseduje B1", theory: 0, driving: 20 },
        { holds: "Poseduje F (traktor)", theory: 20, driving: 20 },
        { holds: "Poseduje M (radna mašina)", theory: 25, driving: 40 },
      ],
      conditions: [
        "Sa AM ili A1: 7č teorije i 35č vožnje. Sa A2 ili A: 7č teorije i 30č vožnje.",
        "Sa B1 kategorijom nema teorijske obuke — ostaje 20 časova vožnje.",
        "Sa F kategorijom: 20č teorije i 20č vožnje. Sa M kategorijom: 25č teorije i pun fond vožnje.",
      ],
    },
    /* AM is listed for a candidate without a licence only: the Pravilnik's
       30+10 theory fond and 7 hours of driving. Reductions for holders of
       another category are left to the school to confirm rather than guessed. */
    {
      id: "AM",
      label: "AM",
      name: "Mopedi",
      summary:
        "AM kategorija obuhvata mopede, lake tricikle i lake četvorocikle. Propisani fond vožnje je najmanji među svim kategorijama — 7 časova.",
      age: "Vozačka dozvola se stiče sa 16 godina, a obuka može početi najranije 12 meseci ranije. Za maloletne kandidate potrebna je saglasnost roditelja ili staratelja.",
      scenarios: [{ holds: "Bez vozačke dozvole", theory: 40, driving: 7 }],
      conditions: [
        "Za kandidata bez vozačke dozvole: 40 časova teorije i 7 časova vožnje.",
        "Ako već imate neku kategoriju, proverite sa školom koji fond teorije važi za vas.",
      ],
    },
    {
      id: "A1",
      label: "A1",
      name: "Laki motocikli",
      summary:
        "A1 kategorija obuhvata motocikle čija radna zapremina motora nije veća od 125 cm³ i snaga motora nije veća od 11 kW, pri čemu odnos snage i mase nije veći od 0,1 kW/kg. Prvi korak za kandidate koji kreću na dva točka.",
      age: "Vozačka dozvola se stiče sa 16 godina, a obuka može početi najranije 12 meseci ranije. Za maloletne kandidate potrebna je saglasnost roditelja ili staratelja.",
      scenarios: [
        { holds: "Bez vozačke dozvole", theory: 40, driving: 20 },
        { holds: "Poseduje AM", theory: 0, driving: 7 },
        { holds: "Poseduje B (ili B1, C, D)", theory: 7, driving: 20 },
        { holds: "Poseduje F (traktor)", theory: 20, driving: 20 },
        { holds: "Poseduje M (radna mašina)", theory: 25, driving: 20 },
      ],
      conditions: [
        "Sa AM kategorijom nema teorijske obuke — ostaje 7 časova vožnje.",
        "Sa B kategorijom (ili B1, C1, C, D1, D i pripadajućim E): 7č teorije i pun fond vožnje.",
        "Fond vožnje se ne umanjuje zbog B, F ili M kategorije — umanjuje se samo teorija.",
      ],
    },
    {
      id: "A2",
      label: "A2",
      name: "Srednji motocikli",
      summary:
        "A2 kategorija obuhvata motocikle čija snaga motora nije veća od 35 kW i čiji odnos snage i mase nije veći od 0,2 kW/kg. Kategorija koja pokriva najveći deo motocikala na putu.",
      age: "Vozačka dozvola se stiče sa 18 godina, a obuka može početi najranije 12 meseci ranije — dakle sa navršenih 17.",
      scenarios: [
        { holds: "Bez vozačke dozvole", theory: 40, driving: 30 },
        { holds: "Poseduje AM", theory: 0, driving: 14 },
        { holds: "Poseduje A1", theory: 0, driving: 7 },
        { holds: "Poseduje B (ili B1, C, D)", theory: 7, driving: 30 },
        { holds: "Poseduje F (traktor)", theory: 20, driving: 30 },
        { holds: "Poseduje M (radna mašina)", theory: 25, driving: 30 },
      ],
      conditions: [
        "Sa AM nema teorije i ostaje 14 časova vožnje. Sa A1 nema teorije i ostaje 7 časova.",
        "Sa B kategorijom: 7č teorije, ali pun fond od 30 časova vožnje.",
        "Prelazak unutar motociklističkih kategorija je najjeftiniji put do A2.",
      ],
    },
    {
      id: "A",
      label: "A",
      name: "Teški motocikli",
      summary:
        "A kategorija obuhvata motocikle i teške tricikle čija snaga motora prelazi 35 kW. Nema ograničenja snage — zato je i propisani fond časova najveći među motociklističkim kategorijama.",
      age: "Vozačka dozvola se stiče sa 24 godine, odnosno sa 20 godina ako kandidat najmanje dve godine poseduje A2 kategoriju. Obuka može početi najranije 12 meseci ranije.",
      scenarios: [
        { holds: "Bez vozačke dozvole", theory: 40, driving: 40 },
        { holds: "Poseduje AM", theory: 0, driving: 21 },
        { holds: "Poseduje A1", theory: 0, driving: 14 },
        { holds: "Poseduje A2", theory: 0, driving: 7 },
        { holds: "Poseduje B (ili B1, C, D)", theory: 7, driving: 40 },
        { holds: "Poseduje F (traktor)", theory: 20, driving: 40 },
        { holds: "Poseduje M (radna mašina)", theory: 25, driving: 40 },
      ],
      conditions: [
        "Sa A2 nema teorije i ostaje samo 7 časova vožnje — najpovoljniji put do A kategorije.",
        "Sa A1 nema teorije i ostaje 14 časova, sa AM nema teorije i ostaje 21 čas.",
        "Sa B kategorijom: 7č teorije, ali pun fond od 40 časova vožnje.",
      ],
    },
  ],

  /* Obaveze koje važe za svakog kandidata, bez obzira na kategoriju. */
  common: [
    "Lična karta je obavezna pri upisu, tokom obuke i na oba dela ispita.",
    "Za maloletne kandidate potrebna je saglasnost i potpis roditelja ili staratelja na ugovoru.",
    "Lekarski pregled i prva pomoć moraju biti završeni pre prve vožnje. Teorijsku nastavu i teorijski ispit kandidat može završiti i pre toga.",
    "Teorijski ispit traje 45 minuta, a za prolaz je potrebno najmanje 85% ukupnog broja poena.",
    "Praktični ispit obuhvata proveru na poligonu i vožnju u javnom saobraćaju.",
  ],
};

/* One total, used by /cenovnik and by the offers in the structured data, so
   the page and the schema can never disagree. Both exams are charged on every
   card, the same as the single fee was before the school split it. */
export function totalFor(scenario) {
  const { units } = pricing;
  return (
    scenario.theory * units.theory.value +
    scenario.driving * units.driving.value +
    units.theoryExam.value +
    units.drivingExam.value
  );
}
