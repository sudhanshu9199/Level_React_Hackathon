import { useEffect, useState } from "react";

export const useImageSlider = (length, delay = 10000) => {
  const [index, setindex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setindex((prev) => (prev + 1) % length);
    }, delay);
    return () => clearInterval(interval);
  }, [length, delay]);

  return index;
};
