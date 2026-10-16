import { useEffect } from "react";
import CallButton from "./components/CallButton";
import Cursor from "./components/Cursor";
import Loader from "./components/Loader";
import PageHero from "./components/PageHero";
import PageTransition from "./components/PageTransition";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import SmoothScroll from "./components/SmoothScroll";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";
import PricePage from "./pages/PricePage";
import PrivacyPage from "./pages/PrivacyPage";
import ProcessPage from "./pages/ProcessPage";
import TrainingPage from "./pages/TrainingPage";
import { introPlays } from "./intro";
import { navigate, useLocation } from "./router";
import { scrollToId, scrollToTop } from "./scroll";
import { syncHead } from "./seo";

const routes = {
  "/": HomePage,
  "/o-nama": AboutPage,
  "/obuka": TrainingPage,
  "/cenovnik": PricePage,
  "/kako-do-dozvole": ProcessPage,
  "/galerija": GalleryPage,
  "/kontakt": ContactPage,
  "/politika-privatnosti": PrivacyPage,
};

const routeAliases = {
  "/index.html": "/",
  "/pocetna": "/",
  "/about": "/o-nama",
  "/o-nama-2": "/o-nama",
  "/obuka-b-kategorija": "/obuka",
  "/cene": "/cenovnik",
  "/cena-obuke": "/cenovnik",
  "/price": "/cenovnik",
  "/put-do-dozvole": "/kako-do-dozvole",
  "/kako-do-vozacke": "/kako-do-dozvole",
  "/kontakt.html": "/kontakt",
  "/zakazi-obuku": "/kontakt",
  "/upis": "/kontakt",
  "/privatnost": "/politika-privatnosti",
};

/*
 * The 2022 site was one page with anchors, and those links are still in the
 * wild. The hash never reaches the server, so the mapping has to happen here:
 * landing on "/#about" is a request for the page that content now lives on.
 */
const hashRoutes = {
  "#about": "/o-nama",
  "#o-nama": "/o-nama",
  "#kako-do-dozvole": "/kako-do-dozvole",
  "#put-do-dozvole": "/kako-do-dozvole",
  "#kontakt": "/kontakt",
  "#galerija": "/galerija",
};

function normalizePath(pathname) {
  const withoutTrailingSlash = pathname.replace(/\/+$/, "");
  return withoutTrailingSlash || "/";
}

function NotFoundPage() {
  return (
    <PageHero
      eyebrow="404"
      title="Stranica nije pronađena"
      lead="Proverite adresu ili otvorite početnu stranicu. Za informacije o upisu kontaktirajte školu."
      image="/media/foto/seat-leon-profil-zalazak.jpg"
      alt="Beli SEAT Leon auto škole Kalden 020 iz profila"
      cta={{ label: "Početna stranica", href: "/" }}
      secondary={{ label: "Kontakt", href: "/kontakt" }}
      compact
    />
  );
}

export default function App() {
  const { pathname, hash } = useLocation();
  const requestedPath = normalizePath(pathname);
  const currentPath = routeAliases[requestedPath] || requestedPath;
  const Page = routes[currentPath] || NotFoundPage;
  const isKnownRoute = Boolean(routes[currentPath]);

  useEffect(() => {
    // An old one-page anchor: send it to the page that answers it instead of
    // looking for a section that is no longer there.
    const redirect = currentPath === "/" ? hashRoutes[hash] : undefined;
    if (redirect) {
      navigate(redirect, { replace: true });
      return undefined;
    }

    syncHead(currentPath);

    const targetId = hash.slice(1);
    if (!targetId) {
      scrollToTop();
      return undefined;
    }

    // The section belongs to the page that just mounted, so wait a frame for
    // it to exist before looking for it.
    const frame = window.requestAnimationFrame(() => {
      if (!scrollToId(targetId)) scrollToTop();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [currentPath, hash]);

  return (
    <div className="site-app" id="top">
      <a className="skip-link" href="#main-content">
        Pređite na glavni sadržaj
      </a>
      <SmoothScroll />
      <PageTransition skipEntry={introPlays} />
      {introPlays && <Loader />}
      <Cursor />
      <SiteHeader currentPath={isKnownRoute ? currentPath : ""} />
      <main id="main-content" tabIndex="-1">
        <Page />
      </main>
      <SiteFooter />
      <CallButton />
    </div>
  );
}
