import PropTypes from "prop-types";

const NotFound = ({ query }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center">
      <p className="text-3xl font-bold text-gray-800 mb-6">
        Oops! No Results Found
      </p>
      <p className="text-lg text-gray-600 mb-4">
        We couldn&apos;t find any articles or news related to &quot;{query}
        &quot;.
      </p>
      <p className="text-sm text-gray-600">
        It seems the topic you&apos;re searching for isn&apos;t available.
        Please try searching for other topics like health, sports, or
        technology.
      </p>
    </div>
  );
};

NotFound.propTypes = {
  query: PropTypes.string.isRequired,
};

export default NotFound;
