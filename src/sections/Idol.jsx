import { useLang } from "../context/LangContext";
import SectionHeader from "../components/SectionHeader";
import { useReveal } from "../components/useReveal";
import { idols } from "../data/idols";

function IdolCard({ img, name, info, quote, delay, lang }) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className="reveal group relative isolate rounded-3xl overflow-hidden bg-[#140600] border border-orange-500/10 hover:border-orange-500/40 transition-all duration-500 hover:-translate-y-2"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Image Wrapper */}
      <div className="relative w-full overflow-hidden rounded-3xl">
        <img
          src={img}
          alt={`${name.en} - ${quote.en}`}
          title={name.en}
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu will-change-transform"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#140600]/60 via-[#140600]/20 to-transparent pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-5">
        <div className="bg-[#1a0700]/75 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-5 shadow-xl bg-clip-padding">
          {/* Name */}
          <h3 className="text-white text-xl font-semibold mb-1 tracking-wide">
            {name[lang]}
          </h3>

          {/* Accent Line */}
          <div className="w-10 h-[2px] bg-orange-500 mb-3"></div>

          {/* Info */}
          <p className="text-white/70 text-sm leading-relaxed mb-3">
            {info[lang]}
          </p>

          {/* Quote */}
          <p className="text-orange-400 text-sm italic leading-relaxed">
            “{quote[lang]}”
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Idols() {
  const { t, lang } = useLang(); 
 
  return (
    <section id="idols" className="py-20 md:py-24 pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader heading={t.idol.heading} sub={t.idol.sub} />

        <div className="grid sm:grid-cols-3 gap-6 mt-10">
          {idols.map((i, index) => (
            <IdolCard key={i.id} {...i} lang={lang} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}