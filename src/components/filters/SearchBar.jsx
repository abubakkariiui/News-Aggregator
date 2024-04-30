// Dummy file for news-aggregator/src/components/filters/SearchBar.js

// create beatiful search bar using tailwind css

const SearchBar = () => {
  return (
    <div className="flex justify-center items-center">
      <input
        type="text"
        placeholder="Search"
        className="border border-gray-500 p-1 w-1/2"
      />
      <button className="bg-blue-500 text-white p-1">Search</button>
    </div>
  );
};

export default SearchBar;
