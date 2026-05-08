import Hero from "../sections/Hero";
import About from "../sections/About";
import SocialWork from "../sections/SocialWork";
import Leadership from "../sections/Leadership";
import ActivitiesPreview from "../sections/ActivitiesPreview";
import MediaPreview from "../sections/MediaPreview";
import Idol from "../sections/Idol";


export default function Home() {
  return (
    <>
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
