// hooks/usePreventOverscroll.ts
import { useEffect } from "react";

export function usePreventOverscroll() {
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop <= 0) {
        document.body.style.overflowY = "hidden";
      }
    };

    const handleTouchEnd = () => {
      document.body.style.overflowY = "auto";
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);
}
