import { useState } from "react";
import { useLang } from "../context/LangContext";
import SectionHeader from "../components/SectionHeader";
import { useReveal } from "../components/useReveal";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsappIcon,
  YoutubeIcon,
  XIcon,
} from "../components/SocialIcons";
import Footer from "../components/Footer";

export default function Contact() {
  const { t, lang } = useLang();
  const c = t.contact;
  const [sent, setSent] = useState(false);
  const formRef = useReveal();
  const infoRef = useReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const socials = [
    { Icon: FacebookIcon, link: "https://www.facebook.com/share/18nhQ6YvXc/" },
    {
      Icon: InstagramIcon,
      link: "https://www.instagram.com/yoogeshanandraophalke_?igsh=ZXl1c3ljbm9ieXQ1",
    },
    { Icon: WhatsappIcon, link: "https://wa.me/919172539959" },
    // { Icon: XIcon, link: "https://x.com/yourhandle" },
  ];

  return (
    <section id="contact" className="py-20 md:py-28 pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader heading={c.heading} sub={c.sub} />
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div ref={infoRef} className="reveal space-y-8">
            <div>
              <h3 className="font-display text-xl font-bold inline-block text-white mb-6">
                {lang === "mr" ? "संपर्क माहिती" : "Contact Information"}
              </h3>
              <div className="space-y-5">
                {[
                  {
                    icon: Phone,
                    label: c.phone,
                    val: "+91 9172539959",
                    href: "tel:+919172539959",
                  },
                  {
                    icon: Mail,
                    label: c.email,
                    val: "yogeshphalke@shivsena.org",
                    href: "mailto:yogeshphalke@shivsena.org",
                  },
                  {
                    icon: MapPin,
                    label: c.address,
                    val: c.addressVal,
                    href: null,
                  },
                ].map(({ icon: Icon, label, val, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={16} className="text-orange-400" />
                    </div>
                    <div>
                      <div className="text-white/30 text-xs uppercase tracking-wider mb-1">
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          className="text-white/80 hover:text-orange-400 transition-colors text-sm"
                        >
                          {val}
                        </a>
                      ) : (
                        <p
                          className={`text-white/80 text-sm ${lang === "mr" ? "font-deva" : ""}`}
                        >
                          {val}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-white/30 text-xs uppercase tracking-wider mb-4">
                {lang === "mr" ? "सोशल मीडिया" : "Social Media"}
              </div>
              <div className="flex gap-3">
                {socials.map(({ Icon, link }, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/40 hover:text-orange-400 transition-colors hover-lift"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-orange-900/30 h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7591.227116460752!2d73.87637518636622!3d17.950169438797612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc25d24739b748b%3A0xa8d4254863978f5c!2sSiddhanathwadi%2C%20Wai%2C%20Maharashtra%20412803!5e0!3m2!1sen!2sin!4v1777922580773!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wai Location Map"
              />
            </div>
          </div>
          <div ref={formRef} className="reveal">
            <div className="glass rounded-2xl p-6 md:p-8">
              <h3 className="font-display text-xl font-bold text-white mb-6">
                {lang === "mr" ? "संदेश पाठवा" : "Send a Message"}
              </h3>
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                    <svg
                      width="28"
                      height="28"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-green-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <p className="text-white font-medium">
                    {lang === "mr" ? "संदेश पाठविला!" : "Message Sent!"}
                  </p>
                  <p className="text-white/40 text-sm mt-1">
                    {lang === "mr"
                      ? "लवकरच उत्तर मिळेल."
                      : "We will get back to you soon."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { label: c.formName, type: "text", name: "name" },
                    { label: c.formEmail, type: "email", name: "email" },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        name={f.name}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-orange-500/50 transition-colors"
                        placeholder={f.label}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                      {c.formMsg}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
                      placeholder={c.formMsg}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-orange-900/30 transition-all duration-300 hover:scale-[1.02]"
                  >
                    {c.formBtn}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
    </section>
  );
}
