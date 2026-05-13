import { useState,useEffect  } from "react";
import { useLang } from "../context/LangContext";
import SectionHeader from "../components/SectionHeader";
import { useReveal } from "../components/useReveal";
import { Flag, Lightbulb, Users } from "lucide-react";


  

function Card({ icon: Icon, title, text, delay }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="reveal glass rounded-2xl p-6 hover-lift"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 rounded-xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center mb-4">
        <Icon size={22} className="text-orange-400" />
      </div>
      <h3 className="font-display text-lg font-bold text-white mb-3">
        {title}
      </h3>
      <p className="text-white/55 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

export default function About() {
  const { t, lang } = useLang();
  const a = t.about;
  const textRef = useReveal();
  const imgRef = useReveal();

  const [readMore, setReadMore] = useState(false);

 const images = [
   "/images/profile1.jpg",
   "/images/profile2.png",
   "/images/profile3.jpeg",
   "/images/profile4.jpeg",
 ];

 const [currentImage, setCurrentImage] = useState(0);

 useEffect(() => {
   const interval = setInterval(() => {
     setCurrentImage((prev) => (prev + 1) % images.length);
   }, 3000);

   return () => clearInterval(interval);
 }, []);

  return (
    <section id="about" className="py-20 md:py-28 pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader heading={a.heading} sub={a.sub} />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center mb-16">
          {/* Image column */}
          <div ref={imgRef} className="reveal order-2 lg:order-1">
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              <div className="relative w-full h-[500px] rounded-3xl overflow-hidden border border-orange-900/30 shadow-2xl shadow-orange-950/50">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Yogesh Phalke"
                    loading="lazy"
                    className={`absolute top-0 left-0 w-full h-full object-cover object-center transition-all duration-[2000ms] ease-in-out ${
                      index === currentImage
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  />
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0500]/70 via-transparent to-transparent" />
              </div>

              {/* Accent border */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl border-2 border-orange-500/20 -z-10" />

              {/* Badge */}
              <div className="absolute bottom-6 left-6 glass rounded-xl px-4 py-3">
                <div className="text-orange-400 text-lg font-bold">
                  जिल्हाध्यक्ष, शिव कामगार सेना
                </div>
                <div className="text-white font-semibold text-base">
                  सातारा जिल्हा
                </div>
              </div>
            </div>
          </div>

          {/* Text column */}
          <div ref={textRef} className="reveal order-1 lg:order-2 space-y-6">
            {/* Intro */}
            <p
              className={`text-white/70 leading-relaxed text-base md:text-lg ${
                lang === "mr" ? "font-deva" : ""
              }`}
            >
              {a.intro}
            </p>

            {/* P2 (hidden on mobile until click, always visible on lg) */}
            <p
              className={`text-white/55 leading-relaxed ${
                lang === "mr" ? "font-deva" : ""
              } ${readMore ? "block" : "hidden"} lg:block`}
            >
              {a.p2}
            </p>

            {/* Read More button (mobile only) */}
            <button
              onClick={() => setReadMore(!readMore)}
              className="lg:hidden text-orange-400 text-sm font-medium underline animate-blink"
            >
              {readMore
                ? lang === "mr"
                  ? "कमी वाचा"
                  : "Read Less"
                : lang === "mr"
                  ? "पुढे वाचा"
                  : "Read More"}
            </button>

            {/* Timeline */}
            <div className="space-y-3 pt-2">
              {[
                {
                  year: "2023",
                  label: {
                    en: "Assembly President, Yuva Sena (Wai–Khandala–Mahabaleshwar)",
                    mr: "विधानसभा अध्यक्ष, युवासेना (वाई–खंडाळा–महाबळेश्वर)",
                  },
                },
                {
                  year: "2025",
                  label: {
                    en: "Sub-District Organizer, Shiv Sena (Wai)",
                    mr: "उपजिल्हा संघटक, शिवसेना (वाई)",
                  },
                },
                {
                  year: "2025",
                  label: {
                    en: "District President, Shiv Kamgar Sena (Satara)",
                    mr: "जिल्हा अध्यक्ष, शिव कामगार सेना (सातारा)",
                  },
                },
              ].map((item, index) => (
                <div
                  key={`${item.year}-${index}`}
                  className="flex items-center gap-4"
                >
                  <span className="tag shrink-0">{item.year}</span>
                  <span
                    className={`text-white/65 text-sm ${
                      lang === "mr" ? "font-deva" : ""
                    }`}
                  >
                    {item.label[lang] || item.label.en}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          <Card icon={Flag} title={a.journey} text={a.journeyText} delay={0} />
          <Card
            icon={Lightbulb}
            title={a.ideology}
            text={a.ideologyText}
            delay={100}
          />
          <Card
            icon={Users}
            title={a.association}
            text={a.assocText}
            delay={200}
          />
        </div>
      </div>
    </section>
  );
}
