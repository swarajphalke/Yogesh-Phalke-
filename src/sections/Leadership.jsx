import { useState } from "react";
import { useLang } from "../context/LangContext";
import SectionHeader from "../components/SectionHeader";
import { useReveal } from "../components/useReveal";
import { leaders } from "../data/leaders";

function LeaderCard({ leader, lang }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal text-center group hover-lift">
      <div className="relative mx-auto mb-4 w-28 h-28 md:w-36 md:h-36">
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-orange-500/30 group-hover:border-orange-500/70 transition-colors duration-300 shadow-lg shadow-orange-950/30">
          <img
            src={leader.image}
            alt={`${leader.name} - ${leader.role.en}`}
            title={leader.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 rounded-full ring-2 ring-orange-500/0 group-hover:ring-orange-500/30 ring-offset-2 ring-offset-transparent transition-all duration-300" />
      </div>

      <h3
        className={`font-display font-bold text-white text-base mb-1 ${
          lang === "mr" ? "font-deva" : ""
        }`}
      >
        {lang === "mr" ? leader.nameMr : leader.name}
      </h3>

      <p
        className={`text-white/40 text-xs line-clamp-2 ${lang === "mr" ? "font-deva" : ""}`}
      >
        {leader.role[lang] || leader.role.en}
      </p>
    </div>
  );
}

export default function Leadership() {
  const { t, lang } = useLang();

  const [type, setType] = useState("minister"); // default section

  const labels = {
    mp: { en: "MP", mr: "खासदार" },
    mla: { en: "MLA", mr: "आमदार" },
    minister: { en: "Minister", mr: "मंत्री" },
    nete: { en: "Leaders", mr: "नेते" },
  };

  return (
    <section id="leadership" className="py-16 md:py-18 pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header + Dropdown */}
        <div className="relative mb-8">
          {/* Dropdown RIGHT */}
          <div className="absolute right-0 top-[92%] -translate-y-1/2 md:top-1/2">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="bg-[#1a0a00] text-white text-sm px-3 pr-1 py-2 rounded-lg border border-orange-500/30 focus:outline-none"
            >
              {Object.keys(leaders).map((key) => (
                <option key={key} value={key}>
                  {labels[key][lang] || labels[key].en}
                </option>
              ))}
            </select>
          </div>

          {/* Heading CENTER */}
          <div className="flex justify-center">
            <SectionHeader
              heading={t.leadership.heading}
              sub={t.leadership.sub}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 justify-items-center">
          {leaders[type].map((l) => (
            <LeaderCard key={l.id} leader={l} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
