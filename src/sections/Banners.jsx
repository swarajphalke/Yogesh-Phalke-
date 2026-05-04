import { useState } from "react";
import { useLang } from "../context/LangContext";
import SectionHeader from "../components/SectionHeader";
import { useReveal } from "../components/useReveal";
import { banners } from "../data/banners";

/* =========================
   Banner Card Component
========================= */
function BannerCard({ item, lang, onClick }) {
  const ref = useReveal();
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      ref={ref}
      onClick={() => onClick(item)}
      className="reveal group relative rounded-2xl overflow-hidden aspect-video hover-lift cursor-pointer bg-gray-200"
    >
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
      )}

      {/* Image */}
      <img
        src={item.image}
        alt={item.title.en}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition duration-500 group-hover:scale-105 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Text */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-0.5 w-6 bg-orange-500" />
          <span className="text-orange-400 text-xs uppercase tracking-wider font-medium">
            Shiv Kamgar Sena
          </span>
        </div>

        <h3
          className={`text-white font-semibold text-sm md:text-base ${
            lang === "mr" ? "font-deva" : ""
          }`}
        >
          {item.title[lang] || item.title.en}
        </h3>
      </div>
    </div>
  );
}

/* =========================
   Image Modal Component
========================= */
function ImageModal({ selected, onClose }) {
  if (!selected) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <img
        src={selected.image}
        alt="preview"
        className="max-w-full max-h-full rounded-lg shadow-lg"
      />
    </div>
  );
}

/* =========================
   Main Component
========================= */
export default function Banners() {
  const { t, lang } = useLang();
  const [selected, setSelected] = useState(null);

  return (
    <section id="banners" className="py-20 md:py-28 pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader heading={t.banners.heading} sub={t.banners.sub} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((b) => (
            <BannerCard key={b.id} item={b} lang={lang} onClick={setSelected} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <ImageModal selected={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
