import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";
import SectionHeader from "../components/SectionHeader";
import { useReveal } from "../components/useReveal";

import { works } from "../data/works";
import { banners } from "../data/banners";

/* =========================
   SOCIAL WORK CARD
========================= */
function WorkCard({ item, lang }) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className="reveal glass rounded-2xl overflow-hidden hover-lift group"
    >
      <div className="relative overflow-hidden h-52">
        <img
          src={item.image}
          alt={item.title.en}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <span className="absolute top-3 left-3 tag">
          {item.tag[lang] || item.tag.en}
        </span>
      </div>

      <div className="p-5">
        <h3
          className={`font-display font-bold text-white text-lg mb-2 ${
            lang === "mr" ? "font-deva" : ""
          }`}
        >
          {item.title[lang] || item.title.en}
        </h3>

        <p
          className={`text-white/50 text-sm leading-relaxed ${
            lang === "mr" ? "font-deva" : ""
          }`}
        >
          {item.caption[lang] || item.caption.en}
        </p>
      </div>
    </div>
  );
}

/* =========================
   CAMPAIGN CARD
========================= */
function BannerCard({ item, lang }) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className="reveal group relative rounded-2xl overflow-hidden aspect-video hover-lift cursor-pointer bg-gray-200"
    >
      <img
        src={item.image}
        alt={item.title.en}
        loading="lazy"
        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

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
   MAIN COMPONENT
========================= */
export default function ActivitiesPreview() {
  const {t, lang } = useLang();
   return (
     <section className="py-20 md:py-28 pattern-bg">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <SectionHeader
           heading={t.nav.activities}
           sub={t.activitiesPreview.sub}
         />

         {/* =========================
            SOCIAL WORK
        ========================= */}
         {/* <div className="mb-20">
           <div className="flex items-center justify-between mb-8">
             <h2 className="text-3xl font-display font-bold text-white relative inline-block">
               {t.nav.work}
               <span className="absolute -bottom-2 left-0 w-14 h-[3px] bg-orange-500 rounded-full" />
             </h2>
             <Link
               to="/social-work"
               className="px-3 py-1.5 rounded-full border border-orange-500/40 text-orange-300 text-sm font-semibold hover:bg-orange-500/10 animate-blink"
             >
               {t.btn.seeMore}
             </Link>
           </div>

           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {works.slice(0, 3).map((item) => (
               <WorkCard key={item.id} item={item} lang={lang} />
             ))}
           </div>
         </div> */}

         {/* =========================
            CAMPAIGNS
        ========================= */}
         <div>
           <div className="flex items-center justify-between mb-8">
             <h2 className="text-3xl font-display font-bold text-white relative inline-block">
               {t.nav.banners}
               <span className="absolute -bottom-2 left-0 w-14 h-[3px] bg-orange-500 rounded-full" />
             </h2>
             <Link
               to="/campaigns"
               className="px-3 py-1.5 rounded-full border border-orange-500/40 text-orange-300 text-sm font-semibold hover:bg-orange-500/10 animate-blink"
             >
               {t.btn.seeMore}
             </Link>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {banners.slice(0, 3).map((item) => (
               <BannerCard key={item.id} item={item} lang={lang} />
             ))}
           </div>
         </div>
       </div>
     </section>
   );
}
