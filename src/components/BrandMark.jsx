/*
 * The drawn logo, placed rather than rebuilt in type.
 *
 * There are two cuts of the same mark and each one only works on one ground:
 * the original is black letters with a white outline, and the glossy cut the
 * school supplied is white letters with the blue L. So the variant is not a
 * colour switch on one file — it picks the file. `light` is the mark for dark
 * grounds (the navy capsule, the loader), `dark` the one for pale grounds.
 *
 * Both are raster. The width is fixed per surface in CSS and the glossy cut
 * ships at 380 and 760 so a retina navbar still pulls a file it can use; the
 * original is a single 568px file and is only ever drawn smaller than that.
 */

const MARKS = {
  light: {
    src: "/media/logo/kalden020-logo-light-760.png",
    srcSet:
      "/media/logo/kalden020-logo-light-380.png 380w, /media/logo/kalden020-logo-light-760.png 760w",
    width: 760,
    height: 241,
  },
  dark: {
    src: "/media/logo/kalden020-logo.png",
    srcSet: undefined,
    width: 568,
    height: 163,
  },
};

export default function BrandMark({
  variant = "light",
  className = "",
  sizes = "200px",
  priority = false,
}) {
  const mark = MARKS[variant] ?? MARKS.light;

  return (
    <img
      className={`brand ${className}`.trim()}
      data-variant={variant}
      src={mark.src}
      srcSet={mark.srcSet}
      sizes={mark.srcSet ? sizes : undefined}
      width={mark.width}
      height={mark.height}
      alt="Auto škola Kalden 020"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
