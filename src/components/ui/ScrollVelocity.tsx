"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function ScrollVelocityContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden whitespace-nowrap flex flex-col w-full ${className}`}>
      {children}
    </div>
  );
}

export function ScrollVelocityRow({
  children,
  baseVelocity = 5,
  direction = 1,
  className = "",
}: {
  children: React.ReactNode;
  baseVelocity?: number;
  direction?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy * direction);
  });

  return (
    <div className={`flex flex-nowrap ${className}`}>
      <motion.div className="flex whitespace-nowrap gap-16 pr-16" style={{ x }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="flex-shrink-0 inline-block">{children}</span>
        ))}
      </motion.div>
    </div>
  );
}
