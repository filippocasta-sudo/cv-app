"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { PORTRAIT_PATH } from "@/lib/hero";

interface HeroPortraitProps {
  name: string;
  photoUrl?: string;
}

export function HeroPortrait({ name, photoUrl = PORTRAIT_PATH }: HeroPortraitProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="relative mx-auto flex aspect-[4/5] w-full max-w-[240px] items-end justify-center sm:max-w-[280px] lg:max-w-xs">
      <motion.div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute size-[88%] rounded-[40%_60%_55%_45%] bg-gradient-to-br from-mint/45 via-cyan/25 to-indigo/35 blur-sm" />
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute size-[78%] translate-x-3 translate-y-2 rounded-[55%_45%_40%_60%] bg-gradient-to-tr from-coral/40 via-magenta/20 to-amber/30 blur-[2px]" />
      </motion.div>

      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.06, 1], y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute size-[72%] rounded-[48%_52%_58%_42%] bg-gradient-to-b from-mint/30 to-indigo/25 shadow-neumorphic-lg"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-[78%]"
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[38%_62%_63%_37%_37%_63%_62%_38%/41%_42%_58%_59%] shadow-neumorphic-lg">
          {!failed ? (
            <Image
              src={photoUrl}
              alt={`Ritratto di ${name}`}
              fill
              priority
              sizes="(max-width: 768px) 240px, 320px"
              className={`object-cover object-[center_12%] transition-opacity duration-500 ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
              style={{
                filter: "drop-shadow(0 16px 24px rgba(108, 92, 231, 0.22))",
              }}
              onLoad={() => setLoaded(true)}
              onError={() => setFailed(true)}
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-mint via-indigo to-coral">
              <span className="font-display text-5xl font-extrabold text-white">{initials}</span>
            </div>
          )}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -inset-2 -z-10 rounded-[38%_62%_63%_37%] bg-gradient-to-br from-mint/20 via-transparent to-coral/20 blur-xl"
        />
      </motion.div>
    </div>
  );
}
