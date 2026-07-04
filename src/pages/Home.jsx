import SEO from "../components/SEO";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Leadership from "../sections/Leadership";
import ActivitiesPreview from "../sections/ActivitiesPreview";
import MediaPreview from "../sections/MediaPreview";
import Idol from "../sections/Idol";

export default function Home() {
  return (
    <>
      <SEO
        title="Yogesh Phalke | Official Website"
        description="Official website of Yogesh Sita Anandrao Phalke, District President of Shiv Kamgar Sena Satara."
        url="https://www.yogeshphalke.in/"
      />

      <Hero />

      <div className="section-blend">
        <About />
      </div>
      <div className="section-blend">
        <Idol />
      </div>
      <div className="section-blend">
        <MediaPreview />
      </div>
      <div className="section-blend">
        <ActivitiesPreview />
      </div>
      <div className="section-blend">
        <Leadership />
      </div>
    </>
  );
}
