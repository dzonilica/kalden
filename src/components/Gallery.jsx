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
 */

const items = [
  ...gallery,
  {
    type: "video",
    src: "/media/video/natpis-720.mp4",
    poster: "/media/video/natpis-poster.jpg",
    alt: "Natpis Kalden 020 Auto škola na vratima vozila",
    caption: "Natpis na vozilu",
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
              <span className="gallery__label">
                {item.type === "video" && <Play size={13} weight="fill" aria-hidden="true" />}
                {item.caption}
              </span>
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
