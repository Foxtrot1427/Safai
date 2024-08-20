import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({
  from,
  to,
  duration = 1,
}: {
  from: number;
  to: number;
  duration?: number;
}) {
  const nodeRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        node.textContent = Math.round(value).toString();
      },
    });

    return () => controls.stop();
  }, [from, to, duration]);

  return <p ref={nodeRef} />;
}

export default Counter;
