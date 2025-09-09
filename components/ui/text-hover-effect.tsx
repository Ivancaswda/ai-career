"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";

export const TextHoverEffect = ({
                                  text,
                                  duration,
                                }: {
  text: string;
  duration?: number;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
      <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 300 100"
          xmlns="http://www.w3.org/2000/svg"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
          className="select-none"
      >
        <defs>
          <linearGradient
              id="textGradient"
              gradientUnits="userSpaceOnUse"
              cx="50%"
              cy="50%"
              r="50%"
          >
            {hovered && (
                <>
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="25%" stopColor="#9333ea" />
                  <stop offset="50%" stopColor="#ec4899" />
                  <stop offset="75%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#facc15" />
                </>
            )}
          </linearGradient>

          <motion.radialGradient
              id="revealMask"
              gradientUnits="userSpaceOnUse"
              r="25%"
              initial={{ cx: "50%", cy: "50%" }}
              animate={maskPosition}
              transition={{ duration: duration ?? 0.3, ease: "easeOut" }}
          >
            <stop offset="0%" stopColor="white" stopOpacity={0.9} />
            <stop offset="100%" stopColor="black" stopOpacity={0.1} />
          </motion.radialGradient>

          <mask id="textMask">
            <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
          </mask>
        </defs>

        {/* Stroke text */}
        <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            strokeWidth={hovered ? 1.2 : 0.5}
            className="fill-transparent stroke-neutral-200 font-[helvetica] text-5xl font-bold dark:stroke-neutral-800 transition-all duration-300"
        >
          {text}
        </motion.text>

        {/* Gradient masked text */}
        <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            stroke="url(#textGradient)"
            strokeWidth={0.8}
            mask="url(#textMask)"
            className={`fill-transparent font-[helvetica] text-5xl font-bold transition-all duration-300`}
        >
          {text}
        </text>

        {/* Glow effect */}
        {hovered && (
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-transparent text-5xl font-bold font-[helvetica]"
                stroke="white"
                strokeWidth={0.5}
                strokeOpacity={0.3}
                style={{ filter: "blur(4px)" }}
            >
              {text}
            </text>
        )}
      </svg>
  );
};