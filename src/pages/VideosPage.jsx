import SEO from "../components/SEO";
import Videos from "../sections/Videos";

export default function VideosPage() {
  return (
    <>
      <SEO
        title="Videos | Yogesh Phalke"
        description="Watch speeches, interviews, public meetings, and official videos of Yogesh Phalke."
        url="https://www.yogeshphalke.in/videos"
      />

      <Videos />
    </>
  );
}
