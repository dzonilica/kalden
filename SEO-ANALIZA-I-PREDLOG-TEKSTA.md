# Preostale dopune teksta — Auto škola Kalden 020

Ažurirano: 15. oktobar 2026.

Završene tekstualne stavke uklonjene su iz analize. Ovde ostaju dopune koje zahtevaju podatke ili potvrdu škole. Predlozi koji menjaju strukturu, izgled, linkove, funkcionalnost ili tehnički SEO izdvojeni su u [SEO-OSTALE-IZMENE.md](SEO-OSTALE-IZMENE.md) i nisu sprovedeni.

Redosled prati preostale teme iz prvobitne analize. Potvrđene podatke unositi u postojeće tekstove; nove blokove i tabele planirati prema posebnom fajlu. Ne objavljivati uredničke oznake, prazne obrasce ili izmišljene podatke.

## 1. Cena obuke i plaćanje

Pribaviti aktuelan cenovnik sa datumom primene. Dok ga nema, na sajtu ostaje upit telefonom ili e-poštom bez obećanja roka odgovora.

| Podatak koji nedostaje | Šta treba utvrditi |
|---|---|
| Teorijska obuka | Cena i obuhvaćen fond časova. |
| Praktična obuka | Cena i obuhvaćen fond časova. |
| Prvi teorijski ispit | Iznos, primalac uplate i da li ulazi u cenu obuke. |
| Prvi praktični ispit | Iznos, primalac uplate i da li ulazi u cenu obuke. |
| Lekarski pregled | Ko organizuje, kome se plaća i da li je trošak odvojen. |
| Prva pomoć | Ko organizuje i naplaćuje obuku i ispit, šta kandidat sam pribavlja. |
| Dodatni praktični čas | Cena, trajanje i uslovi. |
| Ponovni izlazak na ispit | Posebno teorijski i praktični; sve naknade. |
| Izdavanje dozvole | Koje takse nisu uključene u cenu škole. |
| Plaćanje na rate | Da li postoji, broj rata, iznosi, rokovi i uslovi. |
| Važenje cenovnika | Stvarni datum početka primene. |

Po potvrdi dopuniti tekst na stranici Obuka, odgovor o ceni u `src/data.js` i meta opis Obuke. „Ukupna cena“ sme da stoji samo uz precizan obuhvat; razlikovati cenu obuke od ostalih troškova do izdavanja dozvole. Ne vraćati nepotvrđen raspon 70.000–80.000 RSD iz starog koda.

## 2. Raspored teorije i vožnje

- Pribaviti dane i sate teorijske nastave i datum početka sledeće grupe.
- Utvrditi način dogovaranja termina vožnje i mogućnost nastave vikendom.
- Dopuniti tekst na Obuci i odgovore o trajanju konkretnim rasporedom.
- Orijentaciono kalendarsko trajanje navesti samo ako škola dostavi podatke i uslove na kojima se procena zasniva.

## 3. Dokumentacija i uslovi po statusu kandidata

Pribaviti spisak škole za svaku fazu: pri upisu, pre praktične obuke, pri prijavi ispita i pri zahtevu za izdavanje dozvole. Navesti dokument, mesto pribavljanja, relevantno važenje i odgovornost kandidata.

Posebno razraditi maloletne kandidate, osobe sa postojećom kategorijom i prelazak iz druge škole. Dopuniti objašnjenje ugovora koji za maloletnog kandidata zaključuje roditelj ili staratelj. Podaci moraju odgovarati važećim propisima i stvarnoj proceduri škole.

Potvrditi organizaciju lekarskog pregleda i prve pomoći. Organizacione rokove škole razlikovati od zakonskih uslova; prvu pomoć ne predstavljati kao obavezan uslov početka vožnje ili pristupanja praktičnom ispitu.

Mesta za dopunu: `src/pages/ProcessPage.jsx`, `src/data.js`. Nova tabela dokumentacije ostaje u posebnom fajlu.

## 4. Instruktori i način rada

- Pribaviti imena, uloge, kategorije za koje instruktori rade i proverljivo iskustvo.
- Pribaviti kratak, konkretan opis rada sa kandidatima koji instruktor potvrđuje.
- Potvrditi uslove eventualnog izbora instruktora i dodatnih časova za vozače sa dozvolom.
- Ne izmišljati biografije, broj kandidata, prolaznost ili podršku posle ispita.

Tekst za buduću biografiju: **Ime i prezime — instruktor vožnje**, zatim potvrđeno iskustvo i konkretan opis rada. Prazan obrazac nije za objavljivanje. Dopuniti stranicu O nama kada podaci stignu; novu strukturu tima planirati odvojeno.

## 5. Vozila, lokacija i osnovni podaci

- Potvrditi da su SEAT Leon vozila i dalje aktuelna i navesti tip menjača.
- Potvrditi praksu korišćenja vozila na ispitu pre dodavanja tvrdnje o istom automobilu na časovima i ispitu.
- Potvrditi naziv, godinu osnivanja, B kategoriju, telefon i e-poštu zadržane iz projekta.
- Potvrditi adresu za dolazak kandidata, poštanski broj, tačan ulaz i proverene orijentire; razlikovati poslovnicu od sedišta pravnog lica ako adrese nisu iste.
- Ne dodavati tvrdnje o parkingu, autobuskim linijama ili položaju u centru bez provere.

Mesta za dopunu: `src/data.js`, Obuka, O nama, Kontakt, podnožje i odgovarajući opisi u `index.html` i `src/seo.js`.

## 6. Radno vreme kancelarije

Pribaviti potvrđene dane i sate rada kancelarije. Termine teorije i vožnje navesti odvojeno. Tekst „Proverite telefonom“ zameniti stvarnim podacima po potvrdi škole.

Mesta za dopunu: `contact.hours` u `src/data.js`, Kontakt i podnožje. Vraćanje potvrđenog radnog vremena u strukturirane podatke evidentirano je u posebnom fajlu.

## 7. Politika privatnosti

Opis forme i mape usklađen je sa postojećim kodom, ali politika zahteva stvarne poslovne podatke da bi bila potpuna. Pribaviti i uneti:

- Identitet i kontakt rukovaoca podacima, uključujući podatke o pravnom licu.
- Hosting provajdera, vrste tehničkih zapisa, svrhe, pristup i rokove čuvanja.
- Pružaoce usluge e-pošte, relevantne primaoce podataka i odnose sa obrađivačima.
- Svrhe i pravne osnove obrade, posebno za upite zainteresovanih i posebno za evidenciju upisanih kandidata.
- Stvarne rokove čuvanja i pravila brisanja za svaku svrhu.
- Proveren postupak i rokove za zahteve lica na koja se podaci odnose.

Dopuniti `src/pages/PrivacyPage.jsx` prema stvarnom poslovanju i primenljivim pravilima. Ne predstavljati postojeći frontend opis kao proveru potpune pravne usklađenosti. Buduće direktno slanje forme, uvođenje analitike ili promena učitavanja mape zahteva odgovarajuću dopunu teksta.

## 8. Zvanični profili i dokazi iskustva

Pribaviti prave adrese zvaničnih društvenih profila, aktuelne recenzije sa izvorom i potvrdu za korišćenje. Staru ocenu 5,0 i broj 75 ne vraćati bez provere. Objavljivati samo autentična iskustva kandidata. Dodavanje profila, fotografija i novih prikaza recenzija evidentirano je u posebnom fajlu.

## Pravila za naredne dopune

Koristiti obraćanje „vi“, konkretne naslove i jednostavne rečenice. Razlikovati fond časova, trajanje časa, kalendarsko trajanje obuke, termin ispita i izdavanje dozvole. Ne obećavati rok, uspeh, cenu ili poslovnu pogodnost bez potvrde. Kada se neka dopuna sprovede, ukloniti njenu stavku iz ovog fajla.
