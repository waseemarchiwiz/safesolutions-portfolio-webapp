import { Helmet } from "react-helmet";
import  logo  from "../../src/assets/logo.png";

const SEOComponent = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph tags for social media */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Safe Solutions Consultants",
          url: "https://www.safesolutionsconsultants.com",
          logo: `https://www.safesolutionsconsultants.com/${logo.png}`,
          description: description,
          // Add more properties
        })}
      </script>
    </Helmet>
  );
};

export default SEOComponent;
