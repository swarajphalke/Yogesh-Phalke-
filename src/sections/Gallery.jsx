import { useState } from 'react'
import { useLang } from '../context/LangContext'
import SectionHeader from '../components/SectionHeader'
import { useReveal } from '../components/useReveal'
import { galleryImages } from '../data/gallery'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

function GalleryGrid({ images, onOpen }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className="reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
    >
      {images.map((src, i) => (
        <button
          key={i}
          onClick={() => onOpen(i)}
          className="group relative aspect-square rounded-xl overflow-hidden hover-lift focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <img
            src={src}
            alt={`Gallery ${i + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-orange-500/80 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="white"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function Gallery() {
  const { t } = useLang()
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const images = galleryImages

  const close = () => setLightboxIdx(null)
  const prev = () => setLightboxIdx(i => (i - 1 + images.length) % images.length)
  const next = () => setLightboxIdx(i => (i + 1) % images.length)

  return (
    <section id="gallery" className="py-20 md:py-28 pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader heading={t.gallery.heading} sub={t.gallery.sub} />
        <GalleryGrid images={images} onOpen={setLightboxIdx} />
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={close}>
          <button onClick={(e) => { e.stopPropagation(); close() }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            <X size={20} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-orange-500/50 flex items-center justify-center text-black transition-colors">
            <ChevronLeft size={20} />
          </button>
          <img
            src={images[lightboxIdx]}
            alt=""
            className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
            onClick={e => e.stopPropagation()}
          />
          <button onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 hover:bg-orange-500/50 flex items-center justify-center text-black transition-colors">
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-4 text-white/40 text-sm">
            {lightboxIdx + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  )
}
