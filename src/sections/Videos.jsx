import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useLang } from "../context/LangContext";
import SectionHeader from "../components/SectionHeader";
import { useReveal } from "../components/useReveal";
import { videos } from "../data/videos";

let currentlyPlayingVideo = null;
let currentlySetCollapse = null;
// let currentlySetThumbnail = null;
// ─── MOBILE REEL CARD ────────────────────────────────────────────────────────
// Hover preview on enter/leave, expand on play, content returns on pause

function MobileReelCard({ video, lang }) {
  const ref = useReveal();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showThumbnail, setShowThumbnail] = useState(true); // ← NEW

  // SYNC PROGRESS
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100 || 0);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // ── External pause listener ── ← NEW
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleExternalPause = () => {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
      setIsExpanded(false);
      setCurrentTime(0);
      setProgress(0);
      setShowThumbnail(true); // ← Restore thumbnail
    };

    video.addEventListener("externalpause", handleExternalPause);
    return () =>
      video.removeEventListener("externalpause", handleExternalPause);
  }, []);

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = x / rect.width;
    videoRef.current.currentTime = ratio * videoRef.current.duration;
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleVideo = async (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    // Notify previous card — playing OR manually paused
    if (currentlyPlayingVideo && currentlyPlayingVideo !== videoRef.current) {
      currentlyPlayingVideo.dispatchEvent(new Event("externalpause")); // ← CHANGED
    }

    if (videoRef.current.paused) {
      videoRef.current.muted = false;
      setIsMuted(false);
      try {
        setShowThumbnail(false); // ← NEW: hide thumbnail before playing
        await videoRef.current.play();
        currentlyPlayingVideo = videoRef.current;
        currentlySetCollapse = setIsExpanded;
        setIsExpanded(true);
        setIsPlaying(true);
      } catch (err) {
        console.error("Playback error:", err);
        setShowThumbnail(true); // ← NEW: restore if play fails
      }
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      // ✅ Do NOT set currentlyPlayingVideo = null — stays tracked for next card
    }
  };

  return (
    <div
      ref={ref}
      className="reveal group relative overflow-hidden rounded-3xl border border-orange-500/5 bg-[#120500] transition-all duration-700 outline-none focus:outline-none focus-within:outline-none"
    >
      {/* VIDEO */}
      <div
        className={`relative overflow-hidden transition-all duration-700 ease-in-out ${
          isExpanded ? "h-[710px]" : "h-[520px]"
        }`}
      >
        {/* THUMBNAIL — ← NEW */}
        {showThumbnail && (
          <img
            src={video.thumbnailMob}
            alt={video.title?.en || "Video thumbnail"}
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        )}

        <video
          ref={videoRef}
          src={video.video}
          poster={video.thumbnail}
          loop
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div
          className={`absolute inset-0 z-20 bg-gradient-to-t from-black via-black/20 to-black/10 transition-opacity duration-500 ${isPlaying ? "opacity-0" : "opacity-100"}`}
        />

        {/* CONTENT OVERLAY — hidden when playing */}
        <div
          className={`absolute bottom-0 left-0 w-full p-5 z-30 transition-all duration-500 ${
            isPlaying
              ? "opacity-0 pointer-events-none translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-orange-400 text-[11px] uppercase tracking-[0.25em] mb-2">
                  Shiv Kamgar Sena
                </p>
                <h3
                  className={`text-white text-sm md:text-base font-semibold leading-relaxed ${
                    lang === "mr" ? "font-deva" : ""
                  }`}
                >
                  {video.title[lang] || video.title.en}
                </h3>
              </div>

              <button
                onClick={toggleVideo}
                className="min-w-[58px] h-[58px] rounded-full bg-orange-500/20 border border-orange-400/30 backdrop-blur-md flex items-center justify-center transition duration-500"
              >
                <Play
                  size={22}
                  className="text-orange-400 fill-orange-400 ml-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* VIDEO CONTROLS BAR */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          isPlaying ? "max-h-[80px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0d0300] border-t border-orange-500/10 px-4 py-3 flex items-center gap-3">
          {/* PAUSE BUTTON */}
          <button
            onClick={toggleVideo}
            className="min-w-[36px] h-[36px] rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center hover:scale-110 transition duration-300"
          >
            {isPlaying ? (
              <Pause size={16} className="text-orange-400 fill-orange-400" />
            ) : (
              <Play
                size={16}
                className="text-orange-400 fill-orange-400 ml-0.5"
              />
            )}
          </button>

          {/* CURRENT TIME */}
          <span className="text-white/50 text-xs w-8 shrink-0">
            {formatTime(currentTime)}
          </span>

          {/* SEEK BAR */}
          <div
            className="flex-1 h-1.5 bg-white/10 rounded-full cursor-pointer relative group/seek"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-orange-500 rounded-full transition-all duration-100 relative"
              style={{ width: `${progress}%` }}
            >
              {/* SCRUBBER DOT */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-orange-400 rounded-full shadow-lg opacity-0 group-hover/seek:opacity-100 transition duration-200" />
            </div>
          </div>

          {/* DURATION */}
          <span className="text-white/50 text-xs w-8 shrink-0 text-right">
            {formatTime(duration)}
          </span>

          {/* MUTE BUTTON */}
          <button
            onClick={toggleMute}
            className="min-w-[36px] h-[36px] rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center hover:scale-110 transition duration-300"
          >
            {isMuted ? (
              <VolumeX size={16} className="text-orange-400" />
            ) : (
              <Volume2 size={16} className="text-orange-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DESKTOP REEL CARD ────────────────────────────────────────────────────────
// Fixed height, hover preview, content hides on play, returns when new video starts

function DesktopReelCard({ video, lang }) {
  const ref = useReveal();
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showThumbnail, setShowThumbnail] = useState(true);

  // ── Time update & metadata ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100 || 0);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  // ── External pause listener (fired when another card starts playing) ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleExternalPause = () => {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
      setProgress(0);
      setShowThumbnail(true); // ← Always restore thumbnail
    };

    video.addEventListener("externalpause", handleExternalPause);
    return () =>
      video.removeEventListener("externalpause", handleExternalPause);
  }, []);

  // ── Helpers ──
  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return "0:00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = ratio * videoRef.current.duration;
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // ── Play / Pause ──
  const toggleVideo = async (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;

    // --- PLAY ---
    if (videoRef.current.paused) {
      // Notify the previous card — whether it was playing OR manually paused
      // KEY FIX: we no longer set currentlyPlayingVideo = null on manual pause,
      // so this always fires correctly
      if (currentlyPlayingVideo && currentlyPlayingVideo !== videoRef.current) {
        currentlyPlayingVideo.dispatchEvent(new Event("externalpause"));
      }

      try {
        setShowThumbnail(false);
        videoRef.current.muted = false;
        setIsMuted(false);
        await videoRef.current.play();
        currentlyPlayingVideo = videoRef.current; // Track this video
        setIsPlaying(true);
      } catch (err) {
        console.error("Video playback failed:", err);
        setShowThumbnail(true);
      }
    }

    // --- MANUAL PAUSE — keep current frame visible ---
    else {
      videoRef.current.pause();
      setIsPlaying(false);
      // ✅ Do NOT set currentlyPlayingVideo = null here
      // This card stays tracked so the next card can still notify it
    }
  };

  return (
    <div
      ref={ref}
      className="reveal group relative overflow-hidden rounded-2xl border border-orange-500/5 bg-[#120500] transition-all duration-700 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden h-[500px]">
        {/* THUMBNAIL — rendered as <img> so it's always reliable */}
        {showThumbnail && (
          <img
            src={video.thumbnailPc}
            alt={video.title?.en || "Video thumbnail"}
            className="absolute inset-0 w-full h-full object-cover z-10"
          />
        )}

        {/* VIDEO */}
        <video
          ref={videoRef}
          src={video.video}
          poster={video.thumbnail}
          loop
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* OVERLAY */}
        <div
          className={`absolute inset-0 z-20 bg-gradient-to-t from-black via-black/20 to-black/10 transition-opacity duration-500 ${
            isPlaying ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* SIDE GRADIENT */}
        <div className="absolute inset-y-0 right-0 w-[45%] z-20 bg-gradient-to-l from-black/70 to-transparent" />

        {/* ORANGE GLOW */}
        <div className="absolute inset-0 z-20 bg-orange-500/0 group-hover:bg-orange-500/5 transition duration-700" />

        {/* CONTENT — title + play button */}
        <div
          className={`absolute bottom-0 left-0 w-full p-3 z-30 transition-all duration-500 ${
            isPlaying
              ? "opacity-0 pointer-events-none translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-xl p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-orange-400 text-[9px] uppercase tracking-[0.2em] mb-1">
                  Shiv Kamgar Sena
                </p>
                <h3
                  className={`text-white text-[11px] font-semibold leading-snug line-clamp-2 ${
                    lang === "mr" ? "font-deva" : ""
                  }`}
                >
                  {video.title[lang] || video.title.en}
                </h3>
              </div>

              <button
                onClick={toggleVideo}
                className="shrink-0 w-10 h-10 rounded-full bg-orange-500/20 border border-orange-400/30 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition duration-500 z-40"
              >
                {isPlaying ? (
                  <Pause
                    size={15}
                    className="text-orange-400 fill-orange-400"
                  />
                ) : (
                  <Play
                    size={15}
                    className="text-orange-400 fill-orange-400 ml-0.5"
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* SHINE EFFECT */}
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none">
          <div className="absolute top-0 left-[-100%] w-[60%] h-full bg-white/10 blur-2xl rotate-12 group-hover:left-[140%] transition-all duration-[1400ms]" />
        </div>
      </div>

      {/* CONTROLS — only visible while playing */}
      <div
        className={`transition-all duration-500 overflow-hidden ${
          isPlaying ? "max-h-[56px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0d0300] border-t border-orange-500/10 px-2.5 py-2 flex items-center gap-1.5">
          {/* PLAY / PAUSE */}
          <button
            onClick={toggleVideo}
            className="min-w-[28px] h-[28px] rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center hover:scale-110 transition duration-300"
          >
            {isPlaying ? (
              <Pause size={12} className="text-orange-400 fill-orange-400" />
            ) : (
              <Play
                size={12}
                className="text-orange-400 fill-orange-400 ml-0.5"
              />
            )}
          </button>

          {/* CURRENT TIME */}
          <span className="text-white/50 text-[10px] w-7 shrink-0">
            {formatTime(currentTime)}
          </span>

          {/* SEEK BAR */}
          <div
            className="flex-1 h-1 bg-white/10 rounded-full cursor-pointer relative group/seek"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-orange-500 rounded-full transition-all duration-100 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-orange-400 rounded-full shadow-lg opacity-0 group-hover/seek:opacity-100 transition duration-200" />
            </div>
          </div>

          {/* DURATION */}
          <span className="text-white/50 text-[10px] w-7 shrink-0 text-right">
            {formatTime(duration)}
          </span>

          {/* MUTE */}
          <button
            onClick={toggleMute}
            className="min-w-[28px] h-[28px] rounded-full bg-orange-500/20 border border-orange-400/30 flex items-center justify-center hover:scale-110 transition duration-300"
          >
            {isMuted ? (
              <VolumeX size={12} className="text-orange-400" />
            ) : (
              <Volume2 size={12} className="text-orange-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── REEL CARD SWITCHER ───────────────────────────────────────────────────────
// Renders MobileReelCard on < lg, DesktopReelCard on lg+

export function ReelCard({ video, lang }) {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1024,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop ? (
    <DesktopReelCard video={video} lang={lang} />
  ) : (
    <MobileReelCard video={video} lang={lang} />
  );
}

// ─── SECTION ─────────────────────────────────────────────────────────────────

export default function Videos() {
  const { t, lang } = useLang();

  return (
    <section id="videos" className="py-20 md:py-28 pattern-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader heading={t.videos.heading} sub={t.videos.sub} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mt-12">
          {videos
            .slice()
            .reverse()
            .map((video, index) => (
              <ReelCard key={index} video={video} lang={lang} />
            ))}
        </div>
      </div>
    </section>
  );
}
