import { contact, faqs, pricing, routeMeta, site, steps, totalFor } from "./data";

/*
 * Structured data and head tags.
 *
 * The business block is the same on every page, so it ships in index.html and
 * is never rewritten here. What changes per route is the WebPage node, the
 * breadcrumb trail, and — on the walkthrough page alone — the FAQ and HowTo
 * blocks. The home page shows the same questions but does not claim them a
 * second time: one set of answers, one URL that owns them.
 *
 * Nothing in here asserts a fact the school has not published. The rates were
 * confirmed on 15 October 2026 and are emitted; there is still no rating on
 * file that anyone has stood behind since 2022, so that one stays out — wrong
 * structured data is worse for local search than none.
 */

const ORG_ID = `${site.origin}/#organization`;
const SITE_ID = `${site.origin}/#website`;

const ALL_TOTALS = pricing.categories.flatMap((category) =>
  category.scenarios.map(totalFor),
);

export function canonicalFor(path) {
  return `${site.origin}${path === "/" ? "/" : path}`;
}

function organizationNode() {
  return {
    "@type": ["LocalBusiness", "EducationalOrganization"],
    "@id": ORG_ID,
    name: site.name,
    alternateName: site.shortName,
    url: `${site.origin}/`,
    telephone: contact.phoneE164,
    email: contact.email,
    image: `${site.origin}/media/og.jpg`,
    logo: `${site.origin}/media/logo/kalden020-logo.png`,
    description:
      "Auto škola Kalden 020 u Kragujevcu. Teorijska i praktična obuka za B, AM, A1, A2 i A kategorije.",
    foundingDate: site.foundedISO,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      postalCode: contact.postalCode,
      addressLocality: contact.city,
      addressCountry: "RS",
    },
    geo: { "@type": "GeoCoordinates", latitude: 44.010628, longitude: 20.923517 },
    hasMap: contact.mapsHref,
    areaServed: { "@type": "City", name: contact.city },
    /* Read off the price list rather than written down beside it, so the two
       can never drift apart. */
    priceRange: `${Math.min(...ALL_TOTALS).toLocaleString("sr-RS")}\u2013${Math.max(
      ...ALL_TOTALS,
    ).toLocaleString("sr-RS")} RSD`,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Upis i informacije",
      telephone: contact.phoneE164,
      email: contact.email,
      areaServed: "RS",
      availableLanguage: ["Serbian"],
    },
  };
}

function breadcrumbNode(path) {
  const meta = routeMeta[path];
  const trail = [{ name: "Početna", item: `${site.origin}/` }];
  if (path !== "/" && meta) {
    trail.push({ name: meta.label, item: canonicalFor(path) });
  }

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalFor(path)}#breadcrumb`,
    itemListElement: trail.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: entry.item,
    })),
  };
}

function faqNode(path) {
  return {
    "@type": "FAQPage",
    "@id": `${canonicalFor(path)}#faq`,
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/* The six steps, as the sequence they are. Only claimed on the page that
   actually prints them. */
function howToNode(path) {
  return {
    "@type": "HowTo",
    "@id": `${canonicalFor(path)}#howto`,
    name: "Kako do vozačke dozvole za B, AM, A1, A2 i A kategorije",
    description:
      "Pregled postupka od upisa do izdavanja dozvole za kandidate koji prvi put polažu za B, AM, A1, A2 ili A kategoriju u auto školi Kalden 020 u Kragujevcu.",
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.body,
    })),
  };
}

/*
 * The price list as offers.
 *
 * One Offer per card on /cenovnik, with the same total the card shows, because
 * both are multiplied out from the same three rates. A flat OfferCatalog is
 * deliberate: a Course node would have to claim a schedule the school has not
 * published, and an incomplete Course is worth less than an honest Offer.
 */
function offerCatalogNode(path) {
  return {
    "@type": "OfferCatalog",
    "@id": `${canonicalFor(path)}#offers`,
    name: "Cenovnik obuke",
    itemListElement: pricing.categories.flatMap((category) =>
      category.scenarios.map((scenario) => ({
        "@type": "Offer",
        name: `${category.label} kategorija \u2014 ${scenario.holds}`,
        description: `Teorijska obuka ${scenario.theory} \u010dasova, prakti\u010dna obuka ${scenario.driving} \u010dasova i polaganje teorijskog i prakti\u010dnog ispita.`,
        price: totalFor(scenario),
        priceCurrency: "RSD",
        availability: "https://schema.org/InStock",
        areaServed: { "@type": "City", name: contact.city },
        seller: { "@id": ORG_ID },
      })),
    ),
  };
}

/* One page owns the questions, even though two render them. */
const FAQ_ROUTES = new Set(["/kako-do-dozvole"]);
const HOWTO_ROUTES = new Set(["/kako-do-dozvole"]);
const OFFER_ROUTES = new Set(["/cenovnik"]);

export function graphFor(path) {
  const meta = routeMeta[path];
  if (!meta) return null;

  const url = canonicalFor(path);
  const graph = [
    /* Same @id as the block in index.html, which is the JS-free baseline: a
       consumer merges the two on the shared identifier rather than reading two
       businesses. */
    organizationNode(),
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: `${site.origin}/`,
      name: site.name,
      publisher: { "@id": ORG_ID },
      inLanguage: "sr-Latn-RS",
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: meta.title,
      description: meta.description,
      isPartOf: { "@id": SITE_ID },
      about: { "@id": ORG_ID },
      inLanguage: "sr-Latn-RS",
      breadcrumb: { "@id": `${url}#breadcrumb` },
      primaryImageOfPage: `${site.origin}/media/og.jpg`,
    },
    breadcrumbNode(path),
  ];

  if (FAQ_ROUTES.has(path)) graph.push(faqNode(path));
  if (HOWTO_ROUTES.has(path)) graph.push(howToNode(path));
  if (OFFER_ROUTES.has(path)) graph.push(offerCatalogNode(path));

  return { "@context": "https://schema.org", "@graph": graph };
}

function setMeta(selector, attribute, value) {
  const node = document.head.querySelector(selector);
  if (node) node.setAttribute(attribute, value);
}

export function syncHead(path) {
  const meta = routeMeta[path];
  if (!meta) return;

  const url = canonicalFor(path);

  document.title = meta.title;
  setMeta('meta[name="description"]', "content", meta.description);
  setMeta('meta[property="og:title"]', "content", meta.title);
  setMeta('meta[property="og:description"]', "content", meta.description);
  setMeta('meta[property="og:url"]', "content", url);
  setMeta('meta[name="twitter:title"]', "content", meta.title);
  setMeta('meta[name="twitter:description"]', "content", meta.description);
  setMeta('link[rel="canonical"]', "href", url);

  const graph = graphFor(path);
  if (!graph) return;

  let script = document.head.querySelector('script[data-page-schema="true"]');
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.pageSchema = "true";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(graph);
}
