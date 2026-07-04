import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";
import { FacebookIcon, InstagramIcon, WhatsappIcon } from "./SocialIcons";
import { Phone, Mail, MapPin } from "lucide-react";
export default function Footer() {
  const { t } = useLang();

  const navLinks = [
    { name: "home", path: "/" },
    { name: "gallery", path: "/gallery" },
    { name: "press", path: "/press" },
    { name: "banners", path: "/campaigns" },
    { name: "videos", path: "/videos" },
   ];

  const socials = [
    {
      Icon: FacebookIcon,
      link: "https://www.facebook.com/yoogeshphalke.59/",
      label: "Facebook",
    },
    {
      Icon: InstagramIcon,
      link: "https://www.instagram.com/yoogeshphalke_/",
      label: "Instagram",
    },
    { Icon: WhatsappIcon, link: "https://wa.me/919172539959", label: "Whatsapp" },
  ];

  return (
    <footer className="bg-[#080100] border-t border-orange-900/20 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/icon/logo.png"
                alt="Shisvena Official Logo"
                className="w-11 h-11 object-cover rounded-full shadow-lg border border-orange-500/20"
              />
              <div>
                <div className="text-white font-semibold text-sm tracking-wide font-display">
                  Yogesh Phalke
                </div>
                <div className="text-orange-400 text-xs font-deva">
                  जिल्हाध्यक्ष, सातारा
                </div>
              </div>
            </div>

            {/* Active badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-orange-400/80 text-[10px] tracking-widest uppercase">
                Shiv Kamgar Sena
              </span>
            </div>

            <p className="text-white/35 text-sm leading-relaxed border-l-2 border-orange-500/20 pl-3">
              Shiv Sena · Wai, Satara District
              <br />
              Maharashtra
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-2 text-orange-400 text-[10px] uppercase tracking-widest font-semibold mb-5">
              Quick Links
              <div className="flex-1 h-px bg-orange-500/20" />
            </div>

            <div className="space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center gap-2 text-white/40 hover:text-orange-400 text-sm transition-all duration-300 group"
                >
                  <span className="text-orange-400/40 group-hover:text-orange-400">
                    ›
                  </span>
                  {t.nav[link.name]}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <div className="flex items-center gap-2 text-orange-400 text-[10px] uppercase tracking-widest font-semibold mb-5">
              Connect
              <div className="flex-1 h-px bg-orange-500/20" />
            </div>

            <div className="flex gap-3 mb-6">
              {socials.map(({ Icon, link, label }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-10 h-10 rounded-xl bg-white/4 border border-white/10 flex items-center justify-center text-white/40 hover:text-orange-400 hover:border-orange-500/40 hover:bg-orange-500/8 transition-all duration-300 hover:scale-110"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>

            <div className="space-y-3">
              {[
                {
                  icon: Phone,
                  text: "+91 9172539959",
                  href: "tel:+919172539959",
                },
                {
                  icon: Mail,
                  text: "yogeshphalke@shivsena.org",
                  href: "mailto:yogeshphalke@shivsena.org",
                },
                {
                  icon: MapPin,
                  text: "Wai, Satara, Maharashtra",
                },
              ].map(({ icon: Icon, text, href }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-white/35 text-sm"
                >
                  <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/15 flex items-center justify-center flex-shrink-0">
                    <Icon size={14} className="text-orange-400" />
                  </div>

                  {href ? (
                    <a
                      href={href}
                      className="hover:text-orange-400 transition-colors"
                    >
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-orange-500/25 to-transparent mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/25 text-[11px]">
          <p>{t.footer.rights}</p>
          <span className="text-orange-500/30">❖</span>
          <p>
            Developed by{" "}
            <span className="text-orange-400 font-medium hover:text-orange-300 transition-colors cursor-default">
              Swaraj
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}