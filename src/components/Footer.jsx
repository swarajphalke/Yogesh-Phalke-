import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";
import { FacebookIcon, InstagramIcon,WhatsappIcon, YoutubeIcon, XIcon } from "./SocialIcons";

export default function Footer() {
  const { t } = useLang();

  const navLinks = [
    { name: "home", path: "/" },
    { name: "work", path: "/social-work" },
    { name: "banners", path: "/campaigns" },
    { name: "videos", path: "/videos" },
    { name: "press", path: "/press" },
    { name: "leadership", path: "/leadership" },
  ];

  const socials = [
    { Icon: FacebookIcon, link: "https://www.facebook.com/share/18nhQ6YvXc/" },
    {
      Icon: InstagramIcon,
      link: "https://www.instagram.com/yoogeshanandraophalke_?igsh=ZXl1c3ljbm9ieXQ1",
    },
    { Icon: WhatsappIcon, link: "https://wa.me/919172539959" },
    // { Icon: YoutubeIcon, link: "https://youtube.com/yourchannel" },
    // { Icon: XIcon, link: "https://x.com/yourhandle" },
  ];

  return (
    <footer className="bg-[#080100] border-t border-orange-900/20 relative overflow-hidden">
      {/* subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          {/* Logo Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/icon/logo.png"
                alt="Logo"
                className="w-14 h-14 object-cover rounded-full shadow-lg border border-orange-500/20"
              />
              <div>
                <div className="text-white font-semibold text-base tracking-wide">
                  Yogesh Phalke
                </div>
                <div className="text-orange-400 text-xs font-deva">
                  जिल्हाध्यक्ष, सातारा
                </div>
              </div>
            </div>

            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Shiv Kamgar Sena — Shiv Sena <br />
              Wai, Satara District, Maharashtra
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-orange-400 text-xs uppercase tracking-widest font-semibold mb-5">
              Quick Links
            </div>

            <div className="grid grid-cols-2 gap-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-white/40 hover:text-orange-400 text-sm transition-all duration-300 hover:translate-x-1"
                >
                  {t.nav[link.name]}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="text-orange-400 text-xs uppercase tracking-widest font-semibold mb-5">
              Follow Us
            </div>

            <div className="flex gap-4 mb-6">
              {socials.map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-orange-400 hover:border-orange-500/40 transition-all duration-300 hover:scale-110"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <div className="text-white/30 text-sm space-y-1">
              <p className="flex items-center gap-2">
                📍 <span>Wai, Satara, Maharashtra</span>
              </p>
              <p className="flex items-center gap-2">
                📞 <span>+91 9172539959</span>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent mb-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/30 text-xs">
          <p className="text-center sm:text-left">{t.footer.rights}</p>

          <p className="text-center">{t.footer.dev}</p>

          <p className="text-center sm:text-right">
            Developed by{" "}
            <span className="text-orange-400 font-medium hover:text-orange-300 transition-colors">
              Swaraj
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
