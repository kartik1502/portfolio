import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
  loopPause?: number;
  className?: string;
  cursor?: boolean;
}

const GLYPHS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789*<>[]{}/=+-_|~%$&!?";

function pickRandom() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

export function Typewriter({
  text,
  speed = 35,
  delay = 900,
  loop = false,
  loopPause = 2500,
  className = "",
  cursor = true,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState(text);
  const [motionOK, setMotionOK] = useState(true);
  const started = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervals = useRef<ReturnType<typeof setInterval>[]>([]);

  const clearAll = () => {
    timers.current.forEach(clearTimeout);
    intervals.current.forEach(clearInterval);
    timers.current = [];
    intervals.current = [];
  };

  const schedule = (fn: () => void, ms: number) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
    return t;
  };

  const decode = (onDone: () => void) => {
    const chars = Array.from(text);
    const settled = new Array(chars.length).fill(false);
    const revealed: string[] = chars.map(() => " ");
    let revealedCount = 0;

    setDisplayed(chars.map(() => " ").join(""));

    chars.forEach((target, index) => {
      if (target === " ") {
        revealed[index] = " ";
        settled[index] = true;
        revealedCount++;
        if (revealedCount === chars.length) onDone();
        return;
      }

      const startDelay = index * (speed * 0.6);
      const settleAt = startDelay + speed * 5 + Math.random() * speed * 4;
      let elapsed = 0;

      const interval = setInterval(() => {
        elapsed += speed;

        if (!settled[index] && elapsed >= settleAt) {
          settled[index] = true;
          revealed[index] = target;
          revealedCount++;
          if (revealedCount === chars.length) {
            clearAll();
            onDone();
            return;
          }
        } else if (!settled[index]) {
          revealed[index] = pickRandom();
        }

        setDisplayed(revealed.join(""));
      }, speed);

      intervals.current.push(interval);
    });
  };

  const runLoop = () => {
    decode(() => {
      schedule(runLoop, loopPause);
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionOK(!mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMotionOK(!e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!motionOK || started.current || typeof document === "undefined") return;
    started.current = true;

    clearAll();
    const timeout = setTimeout(() => {
      if (loop) {
        runLoop();
      } else {
        decode(() => {});
      }
    }, delay);
    timers.current.push(timeout);

    return () => clearAll();
  }, [text, speed, delay, loop, loopPause, motionOK]);

  if (!motionOK) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      <span className="text-foreground">{displayed}</span>
      {cursor && (
        <span
          className="inline-block align-baseline w-[0.6em] h-[0.1em] bg-primary animate-caret ml-1 translate-y-[0.05em]"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
