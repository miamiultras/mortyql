import { useState, useRef, useEffect } from "react";

export const useIntersect = (
  { root = null, rootMargin = "0px", threshold = 0 },
  callback: () => void
) => {
  const [node, setNode] = useState<Element | null>(null);
  const observer = useRef(
    new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) callback();
      },
      {
        root,
        rootMargin,
        threshold,
      }
    )
  );

  useEffect(() => {
    const { current: currentObserver } = observer;
    currentObserver.disconnect();

    if (node) currentObserver.observe(node);

    return () => currentObserver.disconnect();
  }, [node]);

  return setNode;
};
