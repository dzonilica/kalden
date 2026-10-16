import { useEffect, useState } from "react";

/* Media query as state. Read on mount rather than during render, so the first
   paint never differs between the markup and the client. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    setMatches(list.matches);

    const onChange = (event) => setMatches(event.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/* One definition of "this is a phone" for the JS side of the layout, matching
   the 900px breakpoint where the stylesheet collapses every two-column grid. */
export const NARROW = "(max-width: 900px)";

export function useIsNarrow() {
  return useMediaQuery(NARROW);
}
