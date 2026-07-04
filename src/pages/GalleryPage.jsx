import SEO from "../components/SEO";
import Gallery from "../sections/Gallery";

export default function GalleryPage() {
  return (
    <>
      <SEO
        title="Gallery | Yogesh Phalke"
        description="Browse photos of Yogesh Phalke from public meetings, social initiatives, leadership events, and community programs."
        url="https://www.yogeshphalke.in/gallery"
      />

      <Gallery />
    </>
  );
}
