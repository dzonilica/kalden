# SEO izmene van teksta — za narednu fazu

Datum izdvajanja: 15. oktobar 2026.

Ove stavke prenete su iz `SEO-ANALIZA-I-PREDLOG-TEKSTA.md`. Nisu sprovedene: trenutni zadatak obuhvata samo tekst. Postojeći stilovi, raspored, fotografije, animacije, linkovi i funkcionalnosti ostaju sačuvani. Dopune teksta koje čekaju podatke škole ostaju u [analizi](SEO-ANALIZA-I-PREDLOG-TEKSTA.md).

## 1. Struktura stranica i interni linkovi

- [ ] Razdvojiti svrhu Početne, Obuke i stranice Kako do dozvole; skratiti ponavljanje celih blokova.
- [ ] Na Početnoj razmotriti uklanjanje tri kartice i ponovljenog pregleda obuke; detaljne korake zameniti sažetkom sa linkom ka vodiču. Kartice su sada zadržane sa činjeničnim tekstom.
- [ ] Dodati zaseban blok cene i blok adrese/kontakta na Početnoj. Cena je do tada obrađena u postojećem FAQ i kontakt bloku.
- [ ] Na Obuci razdvojiti teoriju, praksu, raspored i dodatne časove u zasebne celine.
- [ ] Prikazati potvrđen cenovnik u tabeli sa uključenim i odvojenim troškovima, uslovima plaćanja i datumom važenja.
- [ ] Na stranici Kako do dozvole dodati tabelu dokumentacije po fazama i statusu kandidata. Po potrebi izdvojiti starosne uslove i probnu dozvolu u zasebne sekcije; osnovna objašnjenja sada su u postojećim tekstovima.
- [ ] Na stranici O nama pripremiti prikaz imenovanih instruktora kada škola dostavi podatke; ukloniti ili preurediti ponovljene blokove obuke.
- [ ] Razmotriti uklanjanje pokretne trake. Za sada je sačuvana i sadrži kratke podatke o školi i obuci.
- [ ] Razdvojiti izbor FAQ po stranici: na Početnoj kategorija, cena, trajanje i lokacija, a u vodiču uslovi i ispiti. Sačuvano je postojećih osam pitanja; srodni odgovori su objedinjeni radi očuvanja strukture.
- [ ] Uskladiti FAQ strukturirane podatke sa stvarno prikazanim izborom pitanja ako se izbor naknadno promeni.

Plan linkova koji zahteva promenu odredišta ili dodavanje elemenata:

| Mesto | Predloženi link ili promena |
|---|---|
| Početna, drugo hero dugme | `/obuka` — „Obuka za B kategoriju“; sada vodi ka postupku. |
| Početna, uvodni blok | `/obuka` — „Pogledajte program obuke“; sada vodi na O nama. |
| Početna, cena | `/obuka#cena` — „Cena obuke“; dodati sidro `cena` na Obuci. |
| Početna, adresa | Link mape i „Kontakt i radno vreme“. |
| Galerija, završni blok | Link ka `/obuka` — „Obuka za B kategoriju“, uz odgovarajući tekst. |
| Kontakt | Zasebno dugme „Otvorite mapu“ ako se dodaje novi element. |
| Probna dozvola | Link ka aktuelnim zvaničnim pravilima. Polazni izvor: [ABS — Zakon o bezbednosti saobraćaja](https://abs.gov.rs/static/uploads/17585_ZOBS_19-25.pdf). |

Postojeće URL adrese ne menjati samo radi dodavanja grada. Ako se pravi prava stranica `/cenovnik`, ukloniti postojeći alias koji tu adresu vezuje za `/obuka` i urediti trajna preusmerenja.

## 2. Kontakt forma i Google mapa

- [ ] Ako se uvede direktno slanje upita, povezati server/servis, proveriti prijem i prikazati potvrdu tek posle uspešnog odgovora servera. Predvideti grešku pri slanju. Tada promeniti tekst dugmeta i politiku privatnosti.
- [ ] Ako se uvodi izbor učitavanja Google mape, napraviti stvarno dugme „Prikažite mapu“ i učitavati iframe tek nakon izbora. Tek tada opisati taj izbor u politici privatnosti.

Trenutna forma ostaje `mailto`, a mapa zadržava automatsko učitavanje. Tekstovi sada odgovaraju tom ponašanju.

## 3. Početni HTML i canonical po ruti

- [ ] Obezbediti unapred generisan HTML za svih sedam stranica, sa vidljivim tekstom, naslovima, linkovima i metapodacima koji pripadaju ruti.
- [ ] U početnom odgovoru svake rute postaviti odgovarajući canonical. Trenutno `index.html` daje canonical početne, koji JavaScript naknadno menja.
- [ ] Proveriti kako Google zaista obrađuje objavljene stranice u Search Console. Ne zaključivati da postojeća JavaScript aplikacija nije indeksabilna samo zbog načina renderovanja.

Mesta: `index.html`, `src/seo.js`, build i hosting konfiguracija. [Google — JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)

## 4. Nepostojeće adrese i preusmerenja

- [ ] Izmeriti HTTP status nepostojeće adrese na stvarnom hostingu; obezbediti HTTP 404 uz postojeći ekran greške.
- [ ] Postaviti zasebne metapodatke za nepoznatu rutu. `syncHead` trenutno ne obrađuje takvu rutu.
- [ ] Uskladiti serverska preusmerenja sa aliasima u `src/App.jsx`, uključujući `/about`, `/o-nama-2`, `/obuka-b-kategorija`, `/upis` i ostale korišćene stare adrese.

Mesta: `src/App.jsx`, `src/router.js`, `src/seo.js`, `vercel.json` i stvarni hosting.

## 5. Poslovni i strukturirani podaci

- [ ] Objediniti izvor poslovnog JSON-LD koji se sada održava u `index.html` i `src/seo.js`, kao i duplirane naslove i opise u HTML-u i `src/data.js`.
- [ ] Nakon potvrde radnog vremena vratiti tačne dane i sate u poslovni JSON-LD. Nepotvrđeni sati uklonjeni su tokom ispravke sadržaja.
- [ ] Preispitati potrebu za FAQPage i HowTo oznakama bez očekivanja posebnog Google prikaza; odluku doneti prema aktuelnoj dokumentaciji. Korisna pitanja i postupak zadržati zbog posetilaca.

Izvori za narednu proveru: [Google — promene dokumentacije](https://developers.google.com/search/updates), [Google — FAQ i HowTo prikazi](https://developers.google.com/search/blog/2023/08/howto-faq-changes).

## 6. Lokalna vidljivost van sajta

- [ ] Proveriti stvarni Google Business Profile, vezu ka sajtu, lokaciju pina i geografske koordinate u podacima sajta.
- [ ] Uskladiti potvrđene naziv, adresu, telefon i radno vreme profila sa sajtom.
- [ ] Dodati aktuelne fotografije ulaza, učionice, vozila i instruktora uz odgovarajuće pravo korišćenja.
- [ ] Odrediti ko ažurira informacije o grupama i terminima.
- [ ] Pozivati stvarne kandidate da ostave iskreno iskustvo i odgovarati na recenzije; ne izmišljati ocene i broj kandidata.
- [ ] Povezati potvrđene zvanične društvene profile, umesto generičkih početnih stranica mreža.

[Google Business Profile — lokalno rangiranje](https://support.google.com/business/answer/7091?hl=en)

## 7. Provera objavljenog sajta i merenje

- [ ] Posle objavljivanja proveriti direktno otvaranje svih ruta, mobilni prikaz, pozivanje broja, mapu i otvaranje e-pošte.
- [ ] U Search Console pregledati renderovani sadržaj, status indeksiranja i canonical koji je Google izabrao.
- [ ] Izmeriti mobilne performanse i Core Web Vitals. Prisustvo animacija samo po sebi nije dokaz problema sa indeksacijom.
- [ ] Zabeležiti početno stanje i porediti uporedive periode: prikaze, klikove, stranice i nebrendirane upite odvojeno od upita za naziv škole.
- [ ] Razlikovati klik na telefon, otvaranje e-pošte, stvarno primljen upit i upis. Klik na `mailto` nije dokaz dostavljene poruke.
- [ ] Odrediti odgovornu osobu za potvrđivanje i održavanje poslovnih podataka.

Promene iz ovog spiska sprovoditi u narednoj fazi; završene stavke uklanjati iz fajla.
