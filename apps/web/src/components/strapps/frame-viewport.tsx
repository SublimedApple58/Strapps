"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

const DESIGN_WIDTH = 375;

type FrameViewportProps = {
  children: ReactNode;
  designHeight: number;
  maxScale?: number;
  hostMaxWidth?: number;
};

export function FrameViewport({
  children,
  designHeight,
  maxScale = 2,
  hostMaxWidth = 980,
}: FrameViewportProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [hostWidth, setHostWidth] = useState(DESIGN_WIDTH);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setHostWidth(entry.contentRect.width);
    });

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const scale = Math.min(hostWidth / DESIGN_WIDTH, maxScale);
  const viewportHeight = Math.round(designHeight * scale);

  return (
    <div ref={hostRef} className="mx-auto w-full" style={{ maxWidth: `${hostMaxWidth}px` }}>
      <div className="relative w-full overflow-hidden bg-black" style={{ height: `${viewportHeight}px` }}>
        <div
          className="absolute left-1/2 top-0"
          style={{
            width: `${DESIGN_WIDTH}px`,
            height: `${designHeight}px`,
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
