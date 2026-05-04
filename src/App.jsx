import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "./context/LangContext";
import Navbar from "./components/Navbar";
 import Footer from "./components/Footer";
 import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
 import SocialWorkPage from "./pages/SocialWorkPage";
import VideosPage from "./pages/VideosPage";
import PressPage from "./pages/PressPage";
import CampaignsPage from "./pages/CampaignsPage";
import LeadershipPage from "./pages/LeadershipPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
export default function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/social-work" element={<SocialWorkPage />} />
            <Route path="/videos" element={<VideosPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/campaigns" element={<CampaignsPage />} />
            <Route path="/leadership" element={<LeadershipPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </LangProvider>
  );
}