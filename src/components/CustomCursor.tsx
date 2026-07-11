"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        setHovering(!!el.closest("a, button, [role='button'], input, textarea, select"));
      }
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [visible, mouseX, mouseY]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100]"
      style={{ translateX: mouseX, translateY: mouseY }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.1 }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2 w-[18px] h-[18px] border border-body flex items-center justify-center">
        <div className="w-[2px] h-[2px] bg-body rounded-full" />
      </div>
    </motion.div>
  );
}
