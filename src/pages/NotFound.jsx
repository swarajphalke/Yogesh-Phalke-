import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <>
      <SEO
        title="404 - Page Not Found | Yogesh Phalke"
        description="The page you are looking for does not exist."
        url="https://www.yogeshphalke.in/404"
      />

      <section className="min-h-screen flex items-center justify-center pattern-bg px-4">
        <div className="glass rounded-3xl p-10 max-w-xl w-full text-center border border-orange-900/20">
          <span className="inline-block text-orange-400 text-sm uppercase tracking-[0.3em] mb-3">
            Error 404
          </span>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            Page Not Found
          </h2>

          <p className="text-white/60 leading-relaxed mb-8">
            The page you are looking for doesn't exist or may have been moved.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 px-6 py-3 text-white font-semibold transition-all duration-300 hover:scale-105"
          >
            Return to Home
          </Link>
        </div>
      </section>
    </>
  );
}
