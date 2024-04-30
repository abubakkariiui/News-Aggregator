import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  // Handling missing data to prevent errors
  const headline = article.headline?.main || "No Title";
  const abstract = article.abstract || "No Description";
  const imageUrl =
    article.multimedia?.[0]?.url || "https://placehold.co/600x400";
  const articleUrl = article.web_url || "#";

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/600x400?text=No+Image+Found";
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition duration-300">
        <img
          src={
            `https://www.nytimes.com/${imageUrl}` ||
            "https://placehold.co/600x400?text=No+Image+Found"
          }
          alt={headline}
          onError={handleImageError}
          className="w-full h-56 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold">{headline}</h2>
          <p className="text-gray-600">{abstract?.substring(0, 100)}...</p>
          <Link
            to={articleUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 mt-2 inline-block"
          >
            Read more
          </Link>
        </div>
      </div>
    </>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.shape({
    headline: PropTypes.shape({
      main: PropTypes.string,
    }),
    abstract: PropTypes.string,
    multimedia: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
      })
    ),
    web_url: PropTypes.string,
  }).isRequired,
};

export default ArticleCard;
