import { useState, useEffect } from "react";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);

    // Modern browsers
    if (media.addEventListener) {
      media.addEventListener("change", listener);
    }
    // // Legacy browsers
    // else {
    //   media.addListener(listener);
    // }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", listener);
      }
      //   } else {
      //     media.removeListener(listener);
      //   }
    };
  }, [query, matches]);

  return matches;
};

export default useMediaQuery;
