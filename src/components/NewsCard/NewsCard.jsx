import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NewsCard = ({ article }) => {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = "https://placehold.co/600x400?text=No+Image+Found";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition duration-300">
      <img
        src={
          article.urlToImage ||
          "https://placehold.co/600x400?text=No+Image+Found"
        }
        alt={article.title}
        className="w-full h-56 object-cover"
        onError={handleImageError}
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{article.title}</h2>
        <p className="text-gray-600">
          {article?.description?.substring(0, 100)}...
        </p>
        <Link
          to={article.url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 mt-2 inline-block"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

NewsCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    urlToImage: PropTypes.string,
  }).isRequired,
};

export default NewsCard;
