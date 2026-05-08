import { Link } from "react-router-dom";
import { useState } from "react";
import { ReelCard } from "./Videos";
import { useLang } from "../context/LangContext";
import SectionHeader from "../components/SectionHeader";
import { useReveal } from "../components/useReveal";

import { videos } from "../data/videos";
import { pressNotes } from "../data/press";

import { Calendar, Newspaper } from "lucide-react";

/* =========================
   VIDEO CARD
========================= */
function VideoCard({ video, lang }) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className="reveal glass rounded-2xl overflow-hidden hover-lift"
    >
      <div className="video-wrap">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title.en}
          allowFullScreen
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3
          className={`text-white font-semibold text-sm mb-2 ${
            lang === "mr" ? "font-deva" : ""
          }`}
        >
          {video.title[lang] || video.title.en}
        </h3>

        <div className="flex items-center gap-1.5 text-orange-400/60 text-xs">
          <Calendar size={12} />
          <span>{video.date}</span>
        </div>
      </div>
    </div>
  );
}

/* =========================
   PRESS CARD
========================= */
function PressCard({ note, lang }) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className="reveal glass rounded-2xl overflow-hidden hover-lift border-l-2 border-orange-600"
    >
      <div className="h-40 w-full overflow-hidden">
        <img
          src={note.image}
          alt={note.title.en}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center mb-2 gap-2">
          <div className="flex items-center gap-2 text-orange-400 min-w-0 flex-1">
            <Newspaper size={14} />

            <span className="text-xs font-semibold truncate">
              {note.source}
            </span>
          </div>

          <div className="flex items-center gap-1 text-white/40 text-xs whitespace-nowrap">
            <Calendar size={11} />
            <span>{note.date}</span>
          </div>
        </div>

        <h3
          className={`text-white font-semibold text-sm mb-1 ${
            lang === "mr" ? "font-deva" : ""
          }`}
        >
          {note.title[lang] || note.title.en}
        </h3>

        <p
          className={`text-white/50 text-xs ${
            lang === "mr" ? "font-deva" : ""
          }`}
        >
          {note.desc[lang] || note.desc.en}
        </p>
      </div>
    </div>
  );
}

/* =========================
   MAIN COMPONENT
========================= */
export default function MediaPreview() {
  const {t, lang } = useLang();

  return (
    <section className="py-20 md:py-28 pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader heading={t.nav.media} sub={t.mediaPreview.sub} />

        {/* =========================
            PRESS
        ========================= */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold text-white relative inline-block">
              {t.press.heading}
              <span className="absolute -bottom-2 left-0 w-14 h-[3px] bg-orange-500 rounded-full" />
            </h2>
            <Link
              to="/press"
              className="px-3 py-1.5 rounded-full border border-orange-500/40 text-orange-300 text-sm font-semibold hover:bg-orange-500/10 animate-blink"
            >
              {t.btn.seeMore}
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {pressNotes.slice(0, 4).map((note) => (
              <PressCard key={note.id} note={note} lang={lang} />
            ))}
          </div>
        </div>

        {/* =========================
            VIDEOS
        ========================= */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold text-white relative inline-block">
              {t.nav.videos}
              <span className="absolute -bottom-2 left-0 w-14 h-[3px] bg-orange-500 rounded-full" />
            </h2>

            <Link
              to="/videos"
              className="px-3 py-1.5 rounded-full border border-orange-500/40 text-orange-300 text-sm font-semibold hover:bg-orange-500/10 animate-blink"
            >
              {t.btn.seeMore}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos
              .slice()
              .reverse()
              .slice(0, 4)
              .map((video) => (
                <ReelCard key={video.id} video={video} lang={lang} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
