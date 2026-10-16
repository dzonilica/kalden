# Auto škola Kalden 020 — novi sajt

Novi sajt za auto školu Kalden 020 iz Kragujevca, u istom tehničkom i vizuelnom
maniru kao `sunraymiami` projekat u roditeljskom folderu: Vite + React, sopstveni
ruter bez biblioteke, `motion` za animacije, `lenis` za skrol. Tema je plavo-bela:
brend plava `#139bfe` kao akcenat, dublja plava `#0b63c5` za tekst i dugmad,
teget `#07192f` za tamne sekcije.

Materijal (tekstovi, fotografije, video, ikone, logo) je iz foldera `../kalden`.

## Pokretanje

Zavisnosti se dele sa roditeljskim projektom (`../node_modules`), pa nema
posebnog `npm install`:

```bash
cd kalden-site
npx vite          # dev server na http://127.0.0.1:5174
npx vite build    # produkcija u dist/
npx vite preview  # provera build-a
```

## Stranice

| Ruta | Šta je |
|---|---|
| `/` | Početna: hero spread (tipografija levo, foto ploča uz nju, snimak kao čip), traka sa činjenicama, uvod, tri prednosti, šest koraka, šta ulazi u obuku, vozni park, česta pitanja, CTA |
| `/o-nama` | Podaci o auto školi, foto traka, teorijska i praktična obuka, dodatni časovi |
| `/obuka` | Šest delova obuke, vozila, cena na upit |
| `/cenovnik` | Cene po času i po kategoriji (B, A1, A2, A), sa ukupnim iznosom po situaciji kandidata |
| `/kako-do-dozvole` | Šest koraka u detalje, uslovi, česta pitanja |
| `/galerija` | Fotografije i video, sa lightboxom (strelice i Escape rade) |
| `/kontakt` | Kanali, radno vreme, forma, Google mapa |
| `/politika-privatnosti` | Kontakt poruke, mogući tehnički zapisi hostinga, mailto forma, Google mapa i prava |

Stari jednostrani sajt je imao sidra (`/#about`, `/#kako-do-dozvole`,
`/#kontakt`); ta sidra se u `src/App.jsx` preusmeravaju na nove rute, pa stari
linkovi ne padaju na praznu stranu.

## Šta je svesno izostavljeno

Ovo su podaci koji su postojali u kodu starog sajta, ali ih nije potvrdio nikov
od 2022. godine. Pogrešan podatak na ovakvoj strani košta poziv, pa ih sajt ne
tvrdi — tek kad klijent potvrdi, ulaze u `src/data.js`:

- [x] **Cenovnik.** Škola je 15. oktobra 2026. potvrdila cene po času (teorija
      500, vožnja 2.000 din), a 16. oktobra da se teorijski i praktični ispit
      plaćaju posebno, po 6.000 din. `/cenovnik` računa ukupan
      iznos po kategoriji i po tome šta kandidat već poseduje. Ostaje da se
      potvrdi plaćanje na rate.
- [ ] **Google ocena.** Stari kod je tvrdio 5,0 iz 75 recenzija (2022). Nije
      prikazano nigde — treba aktuelno stanje sa Google profila i dozvola da se
      citira.
- [ ] **Društvene mreže.** Stare ikone su vodile na generički facebook.com /
      instagram.com / youtube.com, pa ih u footeru nema. Treba pravi linkovi.
- [ ] **Radno vreme.** Stari dani i sati nisu potvrđeni pa su uklonjeni iz
      prikaza i strukturiranih podataka. Na `/kontakt` i u footeru stoji upućivanje
      na proveru sa školom; vreme kancelarije odvojeno je od termina nastave.
- [x] **Kategorije.** Pored B, sajt sada pokriva i A1, A2 i A — na `/cenovnik`
      u celosti, a u heru kao četiri slova koja vode na taj spisak. Meta opisi i
      dalje govore o B kategoriji, jer je ona i dalje najtraženija.
- [ ] **Dokumentacija i organizacija obuke.** Pribaviti stvarni spisak škole po
      fazama i statusu kandidata. Opisi ispita i osnovni zakonski uslovi provereni
      su tokom tekstualne SEO izmene 15. oktobra 2026.
- [ ] **Instruktori.** Nema imena, biografija ni portreta — zato je sekcija o
      timu vizuelna, bez imena. Sa materijalom bi `/o-nama` dobila pravu sekciju.
- [ ] **Materijali za download** („Test“, „Pitanja“ iz starog footera) — linkovi
      su i tada bili prazni, pa ih nema. Ako postoje fajlovi, idu na `/obuka`.

## Tehnički zadaci pre objave

Posle tekstualne SEO izmene, preostale dopune sadržaja vode se u
[SEO-ANALIZA-I-PREDLOG-TEKSTA.md](SEO-ANALIZA-I-PREDLOG-TEKSTA.md), a predlozi
koji menjaju strukturu, funkcionalnost ili tehnički SEO u
[SEO-OSTALE-IZMENE.md](SEO-OSTALE-IZMENE.md).

- [ ] **HTTPS.** Stari sajt radi bez njega. Ovo je prvi korak, sve ostalo zavisi
      od njega (forma, mapa, SEO).
- [ ] **Logo u vektoru.** Jedini fajl je raster 568×163 sa crnim slovima i belim
      obrubom; zato je logotip u navigaciji složen tipografski
      (`src/components/BrandMark.jsx`), a raster se koristi samo u footeru i kao
      favicon. Sa SVG-om se `BrandMark` menja na jednom mestu.
- [ ] **Kontakt forma.** Sada otvara pripremljen mejl u aplikaciji posetioca i
      ne šalje ništa na server (stari sajt je imao `mail-script.php`). Ako treba
      direktno slanje, dodati endpoint i u istom koraku prepisati sekcije 2–3 u
      `/politika-privatnosti`.
- [ ] **Analitika.** GTM `GTM-K549387` i GA4 `G-X8L1JXH0YL` iz starog sajta
      **nisu** ubačeni: postavljaju kolačiće, pa idu samo uz traku za saglasnost
      (u roditeljskom projektu postoji `CookieConsent` koji se može preneti).
      Google Search Console verifikacija je zadržana u `index.html`.
- [ ] **Preusmerenja.** `vercel.json` pokriva `/index.html` → `/` i SPA fallback.
      Ako se menja hosting, isto uraditi na novom.

## Struktura

```
scripts/
  build-media.py       AVIF/WebP varijante, OG slika, renditioni videa
src/
  App.jsx              rute, aliasi, stara sidra, 404
  data.js              svi tekstovi i podaci na jednom mestu
  media.js             srcset iz manifesta + sizes nagoveštaji
  media-manifest.js    generisano, ne dirati ručno
  seo.js               <head> po ruti + schema.org (LocalBusiness, FAQ, HowTo)
  styles.css           tokeni, komponente, responsive
  components/          navigacija, hero, galerija, forma, animacione primitive
  pages/               sedam strana
public/media/
  foto/                fotografije + AVIF/WebP varijante (480, 960, 1440)
  video/               hero snimak u 720p i 480p (MP4 + WebM) i poster
  ikone/               heksagonalne SVG ikone (prednosti, koraci)
  logo/                raster logo, favicon, webclip
  og.jpg               1200×630 kartica za deljenje
```

## Mediji

Originali ostaju u `../kalden/assets`; u `public/media` stoji ono što se služi.
Posle dodavanja nove fotografije:

```bash
python scripts/build-media.py          # sve: photos | og | film
python scripts/build-media.py photos   # samo varijante slika + manifest
```

Skripta traži Pillow (sa AVIF podrškom) i `ffmpeg` na PATH-u. Slike dobijaju
AVIF i WebP po širinama 480/960/1440 (bez uvećavanja), a `src/media-manifest.js`
beleži šta je stvarno napravljeno, pa `srcset` nikad ne pokazuje na fajl koji ne
postoji. Hero snimak se iz originala (12 s, 2 Mb/s, 3,1 MB) prekodira u 720p i
480p par; telefon povlači manji.
