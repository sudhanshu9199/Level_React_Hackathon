// useUserMenuAnimation.js
import { useEffect } from "react";
import { gsap } from "gsap";

export const useUserMenuAnimation = (menuOpen, menuRef) => {
  useEffect(() => {
    if (!menuRef.current) return;

    gsap.killTweensOf(menuRef.current);

    if (menuOpen) {
      // Opening animation
      gsap.fromTo(
        menuRef.current,
        {
          opacity: 0,
          height: 0,
          rotationX: -90, // Start rolled up
          pointerEvents: "none",
        },
        {
          opacity: 1,
          height: "auto",
          rotationX: 0,
          duration: 0.6,
          ease: "power3.out",
          pointerEvents: "auto",
        }
      );
    } else {
      // Closing animation
      gsap.to(menuRef.current, {
        opacity: 0,
        height: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => gsap.set(menuRef.current, { pointerEvents: "none" }),
      });
    }
  }, [menuOpen, menuRef]);
};
