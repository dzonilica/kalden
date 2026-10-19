import { Play } from "@phosphor-icons/react";
import Lightbox, { useLightbox } from "./Lightbox";
import Reveal from "./Reveal";
import { SIZES, imageSources } from "../media";
import { gallery } from "../data";

/*
 * Vozni park, as a grid that opens.
 *
 * The 2022 site had a lightbox wired up with an empty image list, so clicking a
 * photograph did nothing. This one is the whole point of the page: the frames
 * are square and cropped in the grid, and opening one shows it whole, with the
 * arrow keys and Escape doing what they look like they should.
 *
 * The film sits in the set as its own tile rather than above it, because it is
 * one of the seven things there are to look at, not a feature.
 *
 * Nothing is written over the frames. The film's tile carries only the play
 * mark, so it still reads as a film and not a still.
 */

const items = [
  ...gallery,
  {
    type: "video",
    src: "/media/video/natpis-720.mp4",
    poster: "/media/video/natpis-poster.jpg",
    alt: "Natpis Kalden 020 Auto škola na vratima vozila",
  },
];

export default function Gallery() {
  const lightbox = useLightbox(items.length);

  return (
    <>
      <ul className="gallery">
        {items.map((item, index) => (
          <Reveal
            as="li"
            className="gallery__cell"
            key={item.src}
            delay={Math.min(index, 4) * 0.05}
            distance={20}
          >
            <button type="button" onClick={() => lightbox.open(index)}>
              <picture>
                {imageSources(item.type === "video" ? item.poster : item.src).map((source) => (
                  <source
                    key={source.type}
                    type={source.type}
                    srcSet={source.srcSet}
                    sizes={SIZES.card}
                  />
                ))}
                <img
                  src={item.type === "video" ? item.poster : item.src}
                  alt={item.alt}
                  sizes={SIZES.card}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                />
              </picture>
              {item.type === "video" && (
                <span className="gallery__label" aria-hidden="true">
                  <Play size={13} weight="fill" />
                </span>
              )}
            </button>
          </Reveal>
        ))}
      </ul>

      <Lightbox
        items={items}
        index={lightbox.index}
        onClose={lightbox.close}
        onStep={lightbox.step}
      />
    </>
  );
}
