import { useState, useEffect } from "react";
import { Menu, X, Home, Briefcase, PlayCircle, User, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";

export default function Navbar() {
  const { lang, toggle, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activities = [
    // { name: "work", label: t.nav.work, path: "/social-work" },
    { name: "banners", label: t.nav.banners, path: "/campaigns" },
  ];

  const media = [
    { name: "videos", label: t.nav.videos, path: "/videos" },
    { name: "press", label: t.nav.press, path: "/press" },
    { name: "gallery", label: t.nav.gallery, path: "/gallery" },
  ];

  return (
    <>
      {/* ================= TOP NAVBAR ================= */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0f0500]/95 backdrop-blur-md shadow-lg shadow-black/40"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/images/icon/logo.png"
                alt="Shisvena Official Logo"
                className="w-12 h-12 object-cover rounded-full shadow-lg"
              />
              <div className="sm:block">
                <div className="text-white text-sm font-semibold tracking-wide font-display">
                  Yogesh Phalke
                </div>
                <div className="text-orange-400 text-xs font-deva">
                  जिल्हाध्यक्ष, सातारा
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center mr-[100px] gap-6">
              <Link
                to="/"
                className="nav-link text-white/80 hover:text-orange-400"
              >
                {t.nav.home}
              </Link>

              {/* Media */}
              <div className="relative">
                <button
                  onClick={() =>
                    setDropdown(dropdown === "media" ? null : "media")
                  }
                  className="nav-link text-white/80 hover:text-orange-400"
                >
                  {t.nav.media} ▼
                </button>

                {dropdown === "media" && (
                  <div className="absolute top-10 left-0 w-48 bg-[#1a0a00] border border-orange-500/20 rounded-lg shadow-lg">
                    {media.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setDropdown(null)}
                        className="block px-4 py-2 text-white/80 hover:text-orange-400 hover:bg-orange-500/10"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Activities */}
              <div className="relative">
                <button
                  onClick={() => setDropdown(dropdown === "act" ? null : "act")}
                  className="nav-link text-white/80 hover:text-orange-400"
                >
                  {t.nav.activities} ▼
                </button>

                {dropdown === "act" && (
                  <div className="absolute top-10 left-0 w-48 bg-[#1a0a00] border border-orange-500/20 rounded-lg shadow-lg">
                    {activities.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setDropdown(null)}
                        className="block px-4 py-2 text-white/80 hover:text-orange-400 hover:bg-orange-500/10"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/contact"
                className="nav-link text-white/80 hover:text-orange-400"
              >
                {t.nav.contact}
              </Link>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggle}
                className="px-3 py-1.5 rounded-full border border-orange-500/40 text-orange-300 text-xs font-semibold hover:bg-orange-500/10 animate-blink"
              >
                {lang === "en" ? "मराठी" : "English"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= BOTTOM NAV (ONLY MOBILE < md) ================= */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50">
        <div
          className="flex justify-between items-center px-6 py-3 
          bg-white/10 backdrop-blur-xl 
          border border-white/10 
          rounded-2xl shadow-xl"
        >
          <Link to="/" className="mobile-tab text-blue-400">
            <Home size={20} />
            <span className="text-[10px]">{t.nav.home}</span>
          </Link>

          {/* Media */}
          <div className="relative">
            <button
              onClick={() => setDropdown(dropdown === "media" ? null : "media")}
              className="mobile-tab"
            >
              <PlayCircle size={20} />
              <span className="text-[10px]">{t.nav.media}</span>
            </button>

            {dropdown === "media" && (
              <div className="mobile-dropdown">
                {media.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setDropdown(null)}
                    className="mobile-dropdown-item"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Activities */}
          <div className="relative">
            <button
              onClick={() => setDropdown(dropdown === "act" ? null : "act")}
              className="mobile-tab"
            >
              <Briefcase size={20} />
              <span className="text-[10px]">{t.nav.activities}</span>
            </button>

            {dropdown === "act" && (
              <div className="mobile-dropdown">
                {activities.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setDropdown(null)}
                    className="mobile-dropdown-item"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/contact" className="mobile-tab">
            <User size={20} />
            <span className="text-[10px]">{t.nav.contact}</span>
          </Link>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .mobile-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: rgba(255, 255, 255, 0.6);
          transition: 0.25s;
        }

        .mobile-tab:hover {
          color: #fb923c;
        }

        .mobile-tab-center {
          background: linear-gradient(135deg, #f97316, #ea580c);
          padding: 10px;
          border-radius: 50%;
          margin-top: -25px;
          color: white;
          box-shadow: 0 8px 20px rgba(249, 115, 22, 0.4);
        }

        .mobile-dropdown {
          position: absolute;
          bottom: 55px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(20, 6, 0, 0.95);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(249, 115, 22, 0.25);
          border-radius: 14px;
          padding: 6px;
          min-width: 150px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.7);
          animation: fadeUp 0.25s ease;
        }

        .mobile-dropdown-item {
          display: block;
          padding: 10px 12px;
          font-size: 12px;
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.8);
          transition: all 0.2s ease;
        }

        /* Desktop hover (only visible on PC) */
        .mobile-dropdown-item:hover {
          background: rgba(249, 115, 22, 0.12);
          color: #fb923c;
        }

        /* 🔥 THIS is what works on mobile */
        .mobile-dropdown-item:active {
          background: rgba(249, 115, 22, 0.25);
          transform: scale(0.95);
          color: #fb923c;
        }

        /* Optional: slight default highlight feel */
        .mobile-dropdown-item:not(:last-child) {
          margin-bottom: 4px;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translate(-50%, 10px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
      `}</style>
    </>
  );
}
