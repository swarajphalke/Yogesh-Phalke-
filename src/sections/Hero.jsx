import { useEffect, useState } from "react";
import { useLang } from "../context/LangContext";
import { ChevronDown } from "lucide-react";

function getVisitorCount() {
  const key = "ypf_visits";
  const count = parseInt(localStorage.getItem(key) || "0") + 1;
  localStorage.setItem(key, count);
  return count;
}

export default function Hero() {
  const { t, lang } = useLang();
  const h = t.hero;
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setCount(getVisitorCount());
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="relative flex items-start justify-center pt-64 pb-24 md:py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0200]">
        <div className="absolute inset-0 opacity-30 hero-gradient" />
        <div className="absolute inset-0 opacity-5 hero-lines" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0f0500] to-transparent" />
      </div>

      {/* Optimized orbs (lighter) */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-orange-600/10 blur-2xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-orange-500/10 blur-2xl animate-pulse" />

      {/* Content */}
      <div
        className={`relative z-10 text-center px-4 max-w-5xl mx-auto transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"} will-change-transform`}
      >
        <div className="flex flex-col items-center space-y-6">
          {/* Party Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-orange-300 text-xs md:text-sm font-medium tracking-wider">
              {h.party}
            </span>
          </div>

          {/* Name (fixed height to avoid shift) */}
          <h1
            className={`min-h-[120px] flex items-center justify-center text-center font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight ${lang === "mr" ? "font-deva" : ""}`}
            style={{ textShadow: "0 4px 30px rgba(249,115,22,0.3)" }}
          >
            {h.name}
          </h1>

          {/* Title */}
          <div className="text-orange-400 text-lg md:text-xl font-semibold">
            {h.title}
          </div>

          {/* Slogan */}
          <p className="text-white/50 text-sm md:text-base italic font-deva">
            "{h.slogan}"
          </p>

          {/* Divider */}
          <div className="saffron-divider max-w-sm mx-auto opacity-60" />

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <Stat
              num="16+"
              label={{ en: "Years Service", mr: "वर्षे सेवा" }}
              lang={lang}
            />
            <div className="w-px h-10 bg-orange-800/50 hidden sm:block" />

            <Stat
              num="50+"
              label={{ en: "Villages Served", mr: "गावे सेवित" }}
              lang={lang}
            />
            <div className="w-px h-10 bg-orange-800/50 hidden sm:block" />

            <Stat
              num="10K+"
              label={{ en: "Workers Mobilized", mr: "कार्यकर्ते" }}
              lang={lang}
            />
            <div className="w-px h-10 bg-orange-800/50 hidden sm:block" />

            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-400 font-display">
                {count.toLocaleString()}
              </div>
              <div className="text-white/40 text-xs mt-1">{h.visitCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 animate-bounce">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}

function Stat({ num, label, lang }) {
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-orange-400 font-display">
        {num}
      </div>
      <div className="text-white/40 text-xs mt-1">
        {label[lang] || label.en}
      </div>
    </div>
  );
}
