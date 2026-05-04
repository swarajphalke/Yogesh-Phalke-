import { useState } from "react";
import { useLang } from "../context/LangContext";
import SectionHeader from "../components/SectionHeader";
import { useReveal } from "../components/useReveal";
import { pressNotes } from "../data/press";
import { Newspaper, Calendar, X } from "lucide-react";

function PressCard({ note, lang, onOpen }) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      onClick={() => onOpen(note.image)}
      className="reveal glass rounded-2xl overflow-hidden hover-lift border-l-2 border-orange-600 cursor-pointer"
    >
      {/* IMAGE */}
      <div className="h-40 w-full overflow-hidden">
        <img
          src={note.image}
          alt={note.title.en}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4">
        <div className="flex items-center mb-2 gap-2">
          {/* LEFT (Source) */}
          <div className="flex items-center gap-2 text-orange-400 min-w-0 flex-1">
            <Newspaper size={14} />
            <span className="text-xs font-semibold truncate">
              {note.source}
            </span>
          </div>

          {/* RIGHT (Date) */}
          <div className="flex items-center gap-1 text-white/40 text-xs whitespace-nowrap">
            <Calendar size={11} />
            <span>{note.date}</span>
          </div>
        </div>

        <h3
          className={`text-white font-semibold text-sm mb-1 ${lang === "mr" ? "font-deva" : ""}`}
        >
          {note.title[lang] || note.title.en}
        </h3>

        <p
          className={`text-white/50 text-xs ${lang === "mr" ? "font-deva" : ""}`}
        >
          {note.desc[lang] || note.desc.en}
        </p>
      </div>
    </div>
  );
}

export default function Press() {
  const { t, lang } = useLang();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="py-20 bg-[#0a0100]">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader heading={t.press.heading} sub={t.press.sub} />

        {/* GRID */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {pressNotes.map((note) => (
            <PressCard
              key={note.id}
              note={note}
              lang={lang}
              onOpen={setSelectedImage}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full"
          >
            <X size={20} />
          </button>

          {/* IMAGE */}
          <img
            src={selectedImage}
            alt=""
            className="max-w-full max-h-[85vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
