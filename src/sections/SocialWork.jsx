import { useLang } from '../context/LangContext'
import SectionHeader from '../components/SectionHeader'
import { useReveal } from '../components/useReveal'
import { works } from '../data/works'

function WorkCard({ item, lang }) {
  const ref = useReveal()
  return (
    <div ref={ref} className="reveal glass rounded-2xl overflow-hidden hover-lift group">
      <div className="relative overflow-hidden h-52">
        <img
          src={item.image}
          alt={item.title.en}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 tag">{item.tag[lang] || item.tag.en}</span>
      </div>
      <div className="p-5">
        <h3 className={`font-display font-bold text-white text-lg mb-2 ${lang === 'mr' ? 'font-deva' : ''}`}>
          {item.title[lang] || item.title.en}
        </h3>
        <p className={`text-white/50 text-sm leading-relaxed ${lang === 'mr' ? 'font-deva' : ''}`}>
          {item.caption[lang] || item.caption.en}
        </p>
      </div>
    </div>
  )
}

export default function SocialWork() {
  const { t, lang } = useLang()
  return (
    <section id="work" className="py-20 md:py-28 bg-[#0a0100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader heading={t.work.heading} sub={t.work.sub} />
        {/* <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map(item => <WorkCard key={item.id} item={item} lang={lang} />)}
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
