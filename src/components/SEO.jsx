import { Helmet } from "react-helmet-async";

const WEBSITE_URL = "https://www.yogeshphalke.in";
const DEFAULT_IMAGE = `${WEBSITE_URL}/images/yogesh-phalke-official-portrait.jpg`;

export default function SEO({
  title,
  description,
  url = WEBSITE_URL,
  image = DEFAULT_IMAGE,
}) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yogesh Sita Anandrao Phalke",
    alternateName: "Yogesh Phalke",
    url: WEBSITE_URL,
    image: DEFAULT_IMAGE,
    jobTitle: "District President, Shiv Kamgar Sena, Satara",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wai",
      addressRegion: "Maharashtra",
      addressCountry: "India",
    },
    sameAs: [
      "https://www.facebook.com/yoogeshphalke.59/",
      "https://www.instagram.com/yoogeshphalke_/",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Yogesh Phalke",
    url: WEBSITE_URL,
    inLanguage: "en-IN",
  };

  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Yogesh Phalke" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>

      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
}
