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
      <p className="text-base text-red-500 mb-4">
        It's testing purpose API which has rate limit and hit limit per seconds
        so may be it's an issue.
      </p>
      <p className="text-base text-gray-600">
        It seems the topic you&apos;re searching for isn&apos;t available. Rate
        limit quota violation. Quota limit exceeded.
      </p>
    </div>
  );
};

NotFound.propTypes = {
  query: PropTypes.string.isRequired,
};

export default NotFound;
