import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Pause, Play } from "@phosphor-icons/react";
import { useIsNarrow } from "../hooks";

/*
 * The hero film, as a chip rather than a wallpaper.
 *
 * It is the one piece of footage the school has — twelve seconds of camera
 * running across the KALDEN 020 lettering on a car door — and it used to be the
 * full-bleed ground of the home page. Under a navy veil, at that size, the
 * thing it shows was unreadable. So it keeps its place on the page but gets a
 * frame: small, sharp, undarkened, sitting on the corner of the photograph.
 *
 * The loop puts itself back in motion whenever the browser stops it on its own:
 * a refused autoplay, a backgrounded tab, a low-power mode, a stall on a slow
 * connection. The only things that leave it stopped are the visitor's own two
 * choices — the pause control, or an operating system set to reduced motion or
 * data saver, where the poster frame stands in instead.
 *
 * Weight is handled by the encode rather than by switching the film off: a
 * phone pulls the 480p cut (478 KB) and everything else the 720p one (1.2 MB),
 * down from the 3.1 MB original (scripts/build-media.py).
 */

const RENDITIONS = {
  wide: [{ src: "/media/video/natpis-720.mp4", type: "video/mp4" }],
  narrow: [{ src: "/media/video/natpis-480.mp4", type: "video/mp4" }],
};

/* The <video poster> attribute takes one image and no srcset, so it gets the
   960px WebP rather than the full JPEG: it is on screen only for the moment
   before the first frame decodes, and index.html preloads this exact URL. */
const POSTER = "/media/video/natpis-poster.jpg";
const VIDEO_POSTER = "/media/video/natpis-poster-960.webp";

/*
 * Answered during the first render rather than in an effect afterwards. Deciding
 * later means the still is mounted and its file requested before the video
 * replaces it, which costs a wasted download on every visit.
 */
function filmAllowed() {
  if (typeof window === "undefined") return false;

  const connection =
    navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (connection?.saveData) return false;

  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HeroFilm() {
  const hostRef = useRef(null);
  const videoRef = useRef(null);
  /* Set only by the pause control. The watchdog below reads it so that putting
     the film back in motion never overrides a visitor who asked for stillness. */
  const stoppedByVisitor = useRef(false);
  const [enabled, setEnabled] = useState(filmAllowed);
  const [playing, setPlaying] = useState(false);
  const reduceMotion = useReducedMotion();
  const narrow = useIsNarrow();

  /* Re-answered only if the setting changes while the page is open. */
  useEffect(() => {
    setEnabled(reduceMotion ? false : filmAllowed());
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return undefined;
    const video = videoRef.current;
    if (!video) return undefined;

    /* A single play() call is not a guarantee: it is refused while the tab is
       in the background, refused under some autoplay policies until the page
       has been touched, and undone again by the browser on a stall. So the
       attempt is repeated on every event that marks a moment when playback
       could start. play() rejects harmlessly when it still cannot. */
    const resume = () => {
      if (stoppedByVisitor.current || !video.paused || document.hidden) return;
      video.play().catch(() => {});
    };

    const media = ["pause", "ended", "stalled", "suspend", "canplay", "loadeddata"];
    const page = ["visibilitychange", "pointerdown", "keydown", "touchstart"];

    media.forEach((event) => video.addEventListener(event, resume));
    page.forEach((event) => document.addEventListener(event, resume, { passive: true }));
    window.addEventListener("pageshow", resume);
    window.addEventListener("focus", resume);

    /* Scrolling the chip back into view is the other moment worth a retry:
       browsers throttle decoding for off-screen video and do not always pick it
       up again by themselves. */
    const observer = new IntersectionObserver(resume, { threshold: 0 });
    if (hostRef.current) observer.observe(hostRef.current);

    resume();

    return () => {
      media.forEach((event) => video.removeEventListener(event, resume));
      page.forEach((event) => document.removeEventListener(event, resume));
      window.removeEventListener("pageshow", resume);
      window.removeEventListener("focus", resume);
      observer.disconnect();
      video.pause();
    };
  }, [enabled, narrow]);

  const sources = RENDITIONS[narrow ? "narrow" : "wide"];

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      stoppedByVisitor.current = false;
      video.play().catch(() => setPlaying(false));
    } else {
      stoppedByVisitor.current = true;
      video.pause();
    }
  };

  return (
    <div className="hero-film" ref={hostRef}>
      {enabled ? (
        /* Keyed by rendition: a phone rotated into a tablet width needs the
           element rebuilt, since swapping <source> children on a live video
           changes nothing until it is reloaded. */
        <video
          key={narrow ? "narrow" : "wide"}
          id="hero-film"
          ref={videoRef}
          className="hero-film__media"
          poster={VIDEO_POSTER}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          preload="auto"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          {sources.map((source) => (
            <source key={source.type} src={source.src} type={source.type} />
          ))}
        </video>
      ) : (
        <picture>
          <source type="image/webp" srcSet={VIDEO_POSTER} />
          <img
            className="hero-film__media"
            src={POSTER}
            alt="Natpis KALDEN 020 na vratima vozila auto škole"
            decoding="async"
          />
        </picture>
      )}

      <span className="hero-film__tag" aria-hidden="true">
        Vozila škole
      </span>

      {enabled && (
        <button
          className="hero-film__toggle"
          type="button"
          onClick={toggle}
          aria-controls="hero-film"
          aria-label={playing ? "Pauzirajte snimak" : "Pustite snimak"}
        >
          {playing ? (
            <Pause size={11} weight="fill" aria-hidden="true" />
          ) : (
            <Play size={11} weight="fill" aria-hidden="true" />
          )}
        </button>
      )}
    </div>
  );
}
