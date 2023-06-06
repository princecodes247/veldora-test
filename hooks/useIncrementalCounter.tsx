import { useState, useEffect, useRef } from "react";
function easeInOutQuad(t: number) {
  t /= 0.5;
  if (t < 1) {
    return 0.5 * t * t;
  }
  t -= 1;
  return -0.5 * (t * (t - 2) - 1);
}

const useIncrementalCounter = (
  startValue: number,
  endValue: number,
  duration: number
): number => {
  const [count, setCount] = useState(startValue);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    const updateCount = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1); // Clamp the percentage between 0 and 1
      const easedValue = easeInOutQuad(percentage); // Apply the easing function to the percentage
      const updatedCount = Math.round(
        startValue + (endValue - startValue) * easedValue
      );
      setCount(updatedCount);

      if (progress < duration) {
        // Continue animating
        requestRef.current = requestAnimationFrame(updateCount);
      }
    };

    requestRef.current = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(requestRef.current!);
  }, [startValue, endValue, duration]);

  return count;
};

export default useIncrementalCounter;
