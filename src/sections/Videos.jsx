import { useLang } from '../context/LangContext'
import SectionHeader from '../components/SectionHeader'
import { useReveal } from '../components/useReveal'
import { videos } from '../data/videos'
import { Calendar } from 'lucide-react'

function VideoCard({ video, lang }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal glass rounded-2xl overflow-hidden hover-lift">
      <div className="video-wrap">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title.en}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className={`text-white font-semibold text-sm mb-2 ${lang === 'mr' ? 'font-deva' : ''}`}>
          {video.title[lang] || video.title.en}
        </h3>
        <div className="flex items-center gap-1.5 text-orange-400/60 text-xs">
          <Calendar size={12} />
          <span>{video.date}</span>
        </div>
      </div>
    </div>
  )
}

export default function Videos() {
  const { t, lang } = useLang()
  return (
    <section id="videos" className="py-20 md:py-28 pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader heading={t.videos.heading} sub={t.videos.sub} />
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((v) => (
            <VideoCard key={v.id} video={v} lang={lang} />
          ))}
        </div> */}
        <div className="flex items-center justify-center py-20">
          <h2 className="text-2xl md:text-4xl font-bold text-white/80 tracking-wide">
            🚧 Coming Soon
          </h2>
        </div>
      </div>
    </section>
  );
}
