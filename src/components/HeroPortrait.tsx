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
    <div className="relative mx-auto flex h-[min(420px,55vh)] w-full max-w-[280px] items-end justify-center sm:max-w-[300px] lg:max-w-xs">
      {/* Animated theme blobs — visible through transparent portrait */}
      <motion.div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute size-[90%] rounded-[40%_60%_55%_45%] bg-gradient-to-br from-mint/50 via-cyan/30 to-indigo/40 blur-[1px]" />
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute size-[80%] translate-x-2 translate-y-3 rounded-[55%_45%_40%_60%] bg-gradient-to-tr from-coral/45 via-magenta/25 to-amber/35" />
      </motion.div>

      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.05, 1], y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute size-[70%] rounded-[48%_52%_58%_42%] bg-gradient-to-b from-mint/25 to-indigo/20"
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 h-full w-full"
      >
        {!failed ? (
          <Image
            src={photoUrl}
            alt={`Ritratto di ${name}`}
            fill
            priority
            sizes="(max-width: 768px) 280px, 320px"
            className={`object-contain object-bottom transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              filter: "drop-shadow(0 20px 28px rgba(108, 92, 231, 0.28))",
            }}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-full items-end justify-center pb-4">
            <span className="font-display text-5xl font-extrabold gradient-text-mint">{initials}</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
